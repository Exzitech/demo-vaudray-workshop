import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { temoignages } from '../data/site'
import { auScroll, monteeDouce } from '../lib/motion'

const DUREE_AFFICHAGE = 7000

export default function Temoignages() {
  const mouvementReduit = useReducedMotion()
  const [rang, setRang] = useState(0)
  const [enPause, setEnPause] = useState(false)

  useEffect(() => {
    if (mouvementReduit || enPause) return
    const minuteur = window.setInterval(
      () => setRang((precedent) => (precedent + 1) % temoignages.length),
      DUREE_AFFICHAGE,
    )
    return () => window.clearInterval(minuteur)
  }, [mouvementReduit, enPause])

  const actuel = temoignages[rang]

  return (
    <section
      id="temoignages"
      className="grain relative overflow-hidden bg-terracotta text-chaux"
      // La rotation s'arrête pendant la lecture : personne n'aime se faire couper.
      onPointerEnter={() => setEnPause(true)}
      onPointerLeave={() => setEnPause(false)}
      onFocusCapture={() => setEnPause(true)}
      onBlurCapture={() => setEnPause(false)}
    >
      <div className="mx-auto max-w-[1600px] px-6 py-20 md:px-12 md:py-28">
        <motion.div
          variants={monteeDouce}
          initial="masque"
          whileInView="visible"
          viewport={auScroll}
        >
          <p className="mb-10 flex items-center gap-5 text-[0.72rem] font-medium uppercase tracking-[0.28em] text-chaux/70">
            <span>04</span>
            <span className="h-px w-12 bg-chaux/30" />
            Ils ont fait appel à l'atelier
          </p>

          {/* Hauteur réservée : la bande ne saute pas d'un témoignage à l'autre. */}
          <div className="relative min-h-[16rem] sm:min-h-[13rem] md:min-h-[15rem]">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={rang}
                initial={{ opacity: 0, y: mouvementReduit ? 0 : 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: mouvementReduit ? 0 : -24 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-5xl"
              >
                <p className="display text-[clamp(1.5rem,3.6vw,3rem)] italic leading-[1.2]">
                  « {actuel.texte} »
                </p>
                <footer className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.72rem] font-medium uppercase tracking-[0.2em] text-chaux/75">
                  <span className="text-chaux">{actuel.auteur}</span>
                  <span className="h-px w-8 bg-chaux/40" />
                  {actuel.projet}
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          <div className="mt-10 flex gap-3">
            {temoignages.map((temoignage, index) => (
              <button
                key={temoignage.auteur}
                type="button"
                onClick={() => setRang(index)}
                aria-label={`Témoignage ${index + 1} sur ${temoignages.length}`}
                aria-current={index === rang}
                className="group relative h-6 w-14 cursor-pointer"
              >
                <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-chaux/35" />
                <motion.span
                  className="absolute inset-x-0 top-1/2 h-px origin-left -translate-y-1/2 bg-chaux"
                  initial={false}
                  animate={{ scaleX: index === rang ? 1 : 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                />
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
