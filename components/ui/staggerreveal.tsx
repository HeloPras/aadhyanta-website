'use client'

import { motion, useAnimation, useInView, type Variants } from "framer-motion"
import { useEffect, useRef } from "react"



export function StaggerReveal({
  children,
  className,
  childVariants,
  staggerDelay = 0.1,
  threshold = 0.1,
}: {
  children: React.ReactNode
  className?: string
  childVariants: Variants
  staggerDelay?: number
  threshold?: number
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "0px 0px -60px 0px", amount: threshold })
  const controls = useAnimation()

  useEffect(() => {
    if (inView) controls.start("visible")
  }, [inView, controls])

  const childArray = Array.isArray(children) ? children : [children]

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
    >
      {childArray.map((child, i) => (
        <motion.div key={i} variants={childVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}