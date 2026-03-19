'use client'

import { motion, useAnimation, useInView, type Variants } from "framer-motion"
import { useEffect, useRef } from "react"

export function ScrollReveal({
  children,
  variants,
  className,
  delay = 0,
  threshold = 0.12,
}: {
  children: React.ReactNode
  variants: Variants
  className?: string
  delay?: number
  threshold?: number
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "0px 0px -60px 0px", amount: threshold })
  const controls = useAnimation()

  useEffect(() => {
    if (inView) controls.start("visible")
  }, [inView, controls])

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={controls}
      variants={variants}
      transition={{ delay, ease: [0.16, 1, 0.3, 1], duration: 0.7 }}
    >
      {children}
    </motion.div>
  )
}


