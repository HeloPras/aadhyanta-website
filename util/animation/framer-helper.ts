import { easeInOut} from "motion";

export const container = {
  hidden:{},
  visible:{
    transition:{
      staggerChildren:0.1,
    }
  }
}

export const sfl = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x:0,
    transition:{
      ease: easeInOut,
    }
  },
}

export const sfd = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y:0,
    transition:{
      ease: easeInOut,
    }
  },
}