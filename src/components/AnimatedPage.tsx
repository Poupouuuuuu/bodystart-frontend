import { motion, type Transition } from 'framer-motion'

const pageVariants = {
    initial: {
        opacity: 0,
        y: 10
    },
    in: {
        opacity: 1,
        y: 0
    },
    out: {
        opacity: 0,
        y: -10
    }
}

const pageTransition: Transition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.3
}

interface AnimatedPageProps {
    children: React.ReactNode
}

export const AnimatedPage: React.FC<AnimatedPageProps> = ({ children }) => {
    return (
        <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            style={{ width: '100%', minHeight: '100%' }}
        >
            {children}
        </motion.div>
    )
}

export default AnimatedPage
