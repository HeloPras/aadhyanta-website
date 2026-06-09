'use client'
import {delay, easeInOut, motion} from 'framer-motion'

const TextFlipper = ({children,className}:{children?:string,className?:string}) => {
  return (
    <motion.div
      initial="initial"
      whileHover="hovered"
      className={`relative whitespace-nowrap overflow-hidden ${className}`}
      style = {{lineHeight:0.75}}
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
              transition={{ease:easeInOut, delay: 0.015 * i }}
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
              transition={{ease:easeInOut, delay: 0.015 * i }}
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