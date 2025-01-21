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

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const buf = await buffer(req);
  const sig = req.headers['stripe-signature']!;

  try {
    const event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);

    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        // Handle successful payment
        // Update order status in database
        // Send confirmation email
        break;
      
      case 'payment_intent.payment_failed':
        const paymentIntent = event.data.object;
        // Handle failed payment
        // Update order status in database
        break;
    }

    res.status(200).json({ received: true });
  } catch (err: any) { // Type the error and handle it properly
    console.error('Webhook error:', err);
    res.status(400).json({ 
      message: 'Webhook Error',
      error: err instanceof Error ? err.message : 'Unknown error'
    });
  }
}
