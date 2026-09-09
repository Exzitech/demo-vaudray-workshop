import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { studio } from '../data/site'

type Props = {
  /** Appelé quand le rideau commence à se retirer : le hero enchaîne dessus. */
  onFini: () => void
}

/**
 * Rideau d'ouverture. Volontairement court (~900 ms) et jamais bloquant :
 * si la page met plus longtemps à charger, il se retire quand même.
 */
export default function Preloader({ onFini }: Props) {
  const mouvementReduit = useReducedMotion()
  const [visible, setVisible] = useState(!mouvementReduit)

  useEffect(() => {
    if (mouvementReduit) {
      onFini()
      return
    }
    const minuteur = window.setTimeout(() => {
      setVisible(false)
      onFini()
    }, 900)
    return () => window.clearTimeout(minuteur)
  }, [mouvementReduit, onFini])

  // Le scroll est bloqué le temps du rideau pour éviter un saut à l'ouverture.
  useEffect(() => {
    document.body.style.overflow = visible ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [visible])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="rideau"
          className="fixed inset-0 z-[100] flex items-end bg-encre px-6 pb-10 md:px-12 md:pb-14"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden
        >
          <div className="flex w-full items-end justify-between gap-6">
            <motion.p
              className="display text-[12vw] leading-none text-chaux md:text-[7vw]"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              {studio.nomCourt}
            </motion.p>
            <motion.span
              className="mb-2 h-px flex-1 max-w-[38%] origin-right bg-terracotta"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
