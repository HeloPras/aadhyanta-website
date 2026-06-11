import { easeInOut, easeOut } from "motion"

export const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export const sfl = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
  },
  transition: {
    ease: easeOut,
  },
}

export const sfd = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.25,
      ease:easeOut
    },
  },
}
