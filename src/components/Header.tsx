import { useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { navigation, studio } from '../data/site'

/**
 * Bandeau minimal : transparent au-dessus du hero, fond chaux dès qu'on descend.
 * Sur mobile, les ancres passent dans un volet plein écran.
 */
export default function Header() {
  const { scrollY } = useScroll()
  const [descendu, setDescendu] = useState(false)
  const [voletOuvert, setVoletOuvert] = useState(false)

  useMotionValueEvent(scrollY, 'change', (valeur) => {
    setDescendu(valeur > window.innerHeight * 0.85)
  })

  const couleurTexte = descendu ? 'text-encre' : 'text-chaux'

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="absolute inset-0 origin-top border-b border-encre/10 bg-chaux/90 backdrop-blur-sm"
          initial={false}
          animate={{ opacity: descendu ? 1 : 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />

        <div
          className={`relative mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 transition-colors duration-400 md:px-12 ${couleurTexte}`}
        >
          <a href="#hero" className="display text-xl tracking-tight md:text-2xl">
            {studio.nomCourt}
            <span className="text-terracotta">.</span>
          </a>

          <nav className="hidden items-center gap-10 md:flex">
            {navigation.map((lien) => (
              <a
                key={lien.ancre}
                href={lien.ancre}
                className="filet-anime text-[0.8rem] font-medium uppercase tracking-[0.16em]"
              >
                {lien.libelle}
              </a>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setVoletOuvert(true)}
            className="text-[0.8rem] font-medium uppercase tracking-[0.16em] md:hidden"
            aria-label="Ouvrir le menu"
          >
            Menu
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {voletOuvert && (
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col justify-between bg-encre px-6 py-5 text-chaux md:hidden"
            initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="flex items-center justify-between">
              <span className="display text-xl">{studio.nomCourt}</span>
              <button
                type="button"
                onClick={() => setVoletOuvert(false)}
                className="text-[0.8rem] font-medium uppercase tracking-[0.16em]"
                aria-label="Fermer le menu"
              >
                Fermer
              </button>
            </div>

            <nav className="flex flex-col gap-3">
              {navigation.map((lien, index) => (
                <motion.a
                  key={lien.ancre}
                  href={lien.ancre}
                  onClick={() => setVoletOuvert(false)}
                  className="display text-[13vw] leading-[1.05]"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.18 + index * 0.06,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {lien.libelle}
                </motion.a>
              ))}
            </nav>

            <p className="text-xs text-lin">{studio.email}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
