import { motion } from 'framer-motion';

export default function AnimatedLogo() {
  // Realistic steam paths with Bézier curves for natural movement
  const steamPaths = [
    "M 48,20 C 48,20 52,10 46,12 C 40,14 47,8 51,7 C 55,6 54,11 54,13",
    "M 51,18 C 51,18 57,8 50,7 C 43,6 52,3 56,4 C 60,5 58,10 58,12",
    "M 46,22 C 46,22 50,12 44,14 C 38,16 45,10 49,9 C 53,8 52,13 52,15",
    "M 54,19 C 54,19 58,9 52,8 C 46,7 54,4 58,5 C 62,6 60,11 60,13",
  ];

  return (
    <motion.div
      className="flex items-center space-x-2 sm:space-x-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative w-11 h-11 sm:w-14 sm:h-14">
        <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
          {/* Enhanced glowing effect */}
          <motion.circle
            cx="50"
            cy="50"
            r="35"
            className="fill-coffee-light/5"
            initial={{ scale: 0 }}
            animate={{ 
              scale: [1, 1.05, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Enhanced steam filter for better visibility */}
          <defs>
            <filter id="steam-blur">
              <feGaussianBlur stdDeviation="0.8" />
              <feColorMatrix
                type="matrix"
                values="1 0 0 0 0
                        0 1 0 0 0
                        0 0 1 0 0
                        0 0 0 2 0" 
              />
            </filter>
          </defs>

          {/* Steam with enhanced visibility */}
          {steamPaths.map((path, i) => (
            <motion.path
              key={i}
              d={path}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-coffee-light/40" // Increased opacity from 25 to 40
              filter="url(#steam-blur)"
              initial={{ opacity: 0.3, y: 0 }} // Increased initial opacity
              animate={{
                opacity: [0.2, 0.5, 0.2], // Increased opacity range
                y: [-2, -12, -2],
                x: [0, i % 2 === 0 ? 3 : -3, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.4,
              }}
            />
          ))}

          {/* Add steam glow effect */}
          <filter id="steam-glow">
            <feGaussianBlur stdDeviation="1" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 3 0"
              result="glow"
            />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Additional subtle steam background */}
          <motion.path
            d="M 45,25 Q 50,15 55,25"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-coffee-light/30"
            filter="url(#steam-glow)"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.2, 0.4, 0.2],
              y: [-1, -4, -1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* New creative cup design */}
          <defs>
            <linearGradient id="cupGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5E34" />
              <stop offset="50%" stopColor="#D4915D" />
              <stop offset="100%" stopColor="#8B5E34" />
            </linearGradient>
            
            {/* Add texture pattern */}
            <pattern id="texture" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
              <path d="M 0 0 L 4 4 M 4 0 L 0 4" stroke="rgba(60, 42, 33, 0.1)" strokeWidth="0.5" fill="none"/>
            </pattern>
            
            {/* Enhanced inner shadow */}
            <filter id="innerShadow">
              <feOffset dx="0" dy="2" />
              <feGaussianBlur stdDeviation="1.5" result="offset-blur" />
              <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
              <feFlood floodColor="black" floodOpacity="0.3" result="color" />
              <feComposite operator="in" in="color" in2="inverse" result="shadow" />
              <feComposite operator="over" in="shadow" in2="SourceGraphic" />
            </filter>

            {/* Add new gradient for beans */}
            <linearGradient id="beanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4A3428" />
              <stop offset="50%" stopColor="#8B5E34" />
              <stop offset="100%" stopColor="#4A3428" />
            </linearGradient>
          </defs>

          {/* Modern cup shape */}
          <motion.path
            d="M 25,45 
               C 25,45 23,75 25,75 
               Q 50,82 75,75 
               C 77,75 75,45 75,45
               Q 65,42 50,42
               Q 35,42 25,45"
            fill="url(#pattern-texture)"
            stroke="url(#cupGradient)"
            strokeWidth="3"
            filter="url(#innerShadow)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />

          {/* Decorative lines */}
          <motion.path
            d="M 30,50 Q 50,53 70,50"
            fill="none"
            stroke="url(#cupGradient)"
            strokeWidth="1.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          />

          {/* Artistic handle */}
          <motion.path
            d="M 75,48 
               C 85,48 88,55 88,60
               C 88,65 85,72 75,72"
            fill="none"
            stroke="url(#cupGradient)"
            strokeWidth="3"
            filter="url(#innerShadow)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />

          {/* Liquid surface with ripple */}
          <motion.path
            d="M 28,47 
               Q 38,45 50,45
               Q 62,45 72,47"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-coffee-light/60"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              y: [0, -1, 0],
              x: [0, 0.5, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Coffee bean decorations */}
          {[1, 2, 3].map((i) => (
            <motion.path
              key={i}
              d={`M ${35 + i * 12},60 Q ${38 + i * 12},57 ${41 + i * 12},60 Q ${38 + i * 12},63 ${35 + i * 12},60`}
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-coffee-light/40"
              initial={{ opacity: 0, rotate: -30 }}
              animate={{ 
                opacity: 1, 
                rotate: 0,
                y: [0, -0.5, 0]
              }}
              transition={{ 
                duration: 2,
                delay: 0.3 * i,
                y: {
                  repeat: Infinity,
                  duration: 2 + i * 0.5
                }
              }}
            />
          ))}

          {/* Add coffee beans in the middle of the cup - adjusted position */}
          <motion.g transform="translate(50, 58) scale(0.4)">
            {[1, 2, 3].map((i) => (
              <motion.path
                key={i}
                d={`M ${-20 + i * 15},-2 
                   C ${-15 + i * 15},-8 ${-5 + i * 15},-8 ${0 + i * 15},-2
                   C ${-5 + i * 15},4 ${-15 + i * 15},4 ${-20 + i * 15},-2
                   M ${-17 + i * 15},-2
                   C ${-12 + i * 15},-6 ${-8 + i * 15},-6 ${-3 + i * 15},-2
                   C ${-8 + i * 15},2 ${-12 + i * 15},2 ${-17 + i * 15},-2`}
                fill="url(#beanGradient)"
                stroke="url(#cupGradient)"
                strokeWidth="0.5"
                initial={{ rotate: -45, scale: 0 }}
                animate={{ 
                  rotate: [-45, -40, -45],
                  scale: 1,
                  y: [0, -1, 0]
                }}
                transition={{ 
                  duration: 2,
                  delay: 0.2 * i,
                  y: {
                    repeat: Infinity,
                    duration: 1.5 + i * 0.3
                  }
                }}
              />
            ))}
          </motion.g>

        </svg>
      </div>

      <motion.div
        className="flex flex-col"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <motion.span 
          className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#8B5E34] via-[#D4915D] to-[#8B5E34] bg-300% animate-gradient bg-clip-text text-transparent"
          whileHover={{
            scale: 1.02,
            letterSpacing: "0.01em",
            transition: { duration: 0.2 }
          }}
        >
          Mocha & Co
        </motion.span>
        <motion.span 
          className="text-[0.6rem] sm:text-[0.65rem] tracking-[0.2em] sm:tracking-[0.25em] text-[#D4915D] font-medium uppercase"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0.7, 1, 0.7],
            y: [0, -1, 0]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          Artisan Coffee
        </motion.span>
      </motion.div>
    </motion.div>
  );
}


