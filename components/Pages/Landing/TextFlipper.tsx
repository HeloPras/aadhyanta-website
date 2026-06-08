'use client'
import {delay, motion} from 'framer-motion'

const TextFlipper = ({children,className}:{children?:string,className?:string}) => {
  return (
    <motion.div
      initial="initial"
      whileHover="hovered"
      className={`relative whitespace-nowrap overflow-hidden ${className}`}
    >
      <div
      >
        {children?.split("").map((l, i) => {
          return (
            <motion.span
              className="inline-block"
              variants={{
                initial: { y: 0 },
                hovered: { y: "-150%" },
              }}
              transition={{ delay: 0.03 * i }}
              key={i}
            >
              {l}
            </motion.span>
          )
        })}
      </div>

      <div
        className="absolute  inset-0 "
      >
        {children?.split("").map((l, i) => {
          return (
            <motion.span
              className="inline-block"
              variants={{
                initial: { y: "100%" },
                hovered: { y: 0 },
              }}
              transition={{ delay: 0.03 * i }}
              key={i}
            >
              {l}
            </motion.span>
          )
        })}
      </div>
    </motion.div>
  )
}

export default TextFlipper