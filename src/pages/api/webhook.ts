import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { buffer } from 'micro';

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

interface OrderData {
  id: string;
  amount: number;
  metadata: {
    orderId: string;
    customerEmail: string;
  };
  status: string;
}

async function processOrder(orderData: OrderData) {
  // Implement your order processing logic here
  // For example: update database, send confirmation email, etc.
  console.log('Processing order:', orderData);
}

async function handleSuccessfulPayment(paymentData: OrderData) {
  // Implement your payment success logic here
  // For example: update payment status, trigger fulfillment, etc.
  console.log('Payment successful:', paymentData);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  let event: Stripe.Event;

  try {
    const rawBody = await buffer(req);
    event = stripe.webhooks.constructEvent(
      rawBody,
      req.headers['stripe-signature'] as string,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const orderData: OrderData = {
          id: session.id,
          amount: session.amount_total || 0,
          metadata: {
            orderId: session.metadata?.orderId || session.id,
            customerEmail: session.customer_email || '',
          },
          status: session.status || 'unknown',
        };
        await processOrder(orderData);
        break;
      }
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        const paymentData: OrderData = {
          id: paymentIntent.id,
          amount: paymentIntent.amount,
          metadata: {
            orderId: paymentIntent.metadata.orderId || paymentIntent.id,
            customerEmail: paymentIntent.metadata.customerEmail || '',
          },
          status: paymentIntent.status,
        };
        await handleSuccessfulPayment(paymentData);
        break;
      }
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    res.status(500).json({ error: 'Webhook handler failed' });
  }
}
