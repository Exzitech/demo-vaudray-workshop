import { useCallback, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { projets } from '../data/site'
import { auScroll, cascade, ligneMasquee, monteeDouce } from '../lib/motion'
import Lightbox from './Lightbox'

const vignette: Variants = {
  repos: { scale: 1 },
  survol: { scale: 1.06, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
}

const titreVignette: Variants = {
  repos: { y: '105%' },
  survol: { y: '0%', transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

export default function Portfolio() {
  const [ouvert, setOuvert] = useState<number | null>(null)
  const mouvementReduit = useReducedMotion()

  const fermer = useCallback(() => setOuvert(null), [])
  const precedent = useCallback(
    () =>
      setOuvert((rang) => (rang === null ? null : (rang - 1 + projets.length) % projets.length)),
    [],
  )
  const suivant = useCallback(
    () => setOuvert((rang) => (rang === null ? null : (rang + 1) % projets.length)),
    [],
  )

  return (
    <section id="projets" className="bg-chaux-fonce">
      <div className="mx-auto max-w-[1600px] px-6 py-24 md:px-12 md:py-36">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <motion.p
              className="mb-8 flex items-center gap-5 text-[0.72rem] font-medium uppercase tracking-[0.28em] text-encre/50"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={auScroll}
              transition={{ duration: 0.8 }}
            >
              <span className="text-terracotta">03</span>
              <span className="h-px w-12 bg-encre/20" />
              Projets
            </motion.p>

            <motion.h2
              className="display text-[clamp(2.5rem,6.5vw,5rem)]"
              variants={cascade(0.08)}
              initial="masque"
              whileInView="visible"
              viewport={auScroll}
            >
              {['Six lieux,', 'six histoires'].map((ligne, index) => (
                <span
                  key={ligne}
                  className="ml-[-0.14em] -mb-[0.26em] block overflow-hidden pb-[0.34em] pl-[0.14em]"
                >
                  <motion.span
                    variants={ligneMasquee}
                    className={index === 1 ? 'block italic text-terracotta' : 'block'}
                  >
                    {ligne}
                  </motion.span>
                </span>
              ))}
            </motion.h2>
          </div>

          <motion.p
            className="max-w-xs text-sm leading-relaxed text-encre/60 lg:pb-3 lg:text-right"
            variants={monteeDouce}
            initial="masque"
            whileInView="visible"
            viewport={auScroll}
          >
            Cliquez sur un projet pour l'ouvrir en grand.
          </motion.p>
        </div>

        {/* Quinconce : la colonne de droite est décalée vers le bas, les hauteurs alternent. */}
        <div className="mt-16 grid gap-x-6 gap-y-14 md:mt-24 md:grid-cols-2 md:gap-y-24">
          {projets.map((projet, index) => (
            <motion.button
              key={projet.id}
              type="button"
              onClick={() => setOuvert(index)}
              variants={monteeDouce}
              initial="masque"
              whileInView="visible"
              viewport={auScroll}
              whileHover="survol"
              whileFocus="survol"
              className={`group block w-full text-left ${index % 2 === 1 ? 'md:mt-24' : ''}`}
            >
              <motion.figure
                layoutId={mouvementReduit ? undefined : `projet-${projet.id}`}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={`relative overflow-hidden bg-encre/10 ${
                  projet.format === 'haut' ? 'aspect-[3/4]' : 'aspect-[4/3]'
                }`}
              >
                <motion.img
                  variants={vignette}
                  initial="repos"
                  src={projet.image}
                  alt={projet.alt}
                  width={900}
                  height={projet.format === 'haut' ? 1200 : 700}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-encre/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100" />

                <div className="absolute inset-x-0 bottom-0 overflow-hidden p-5 md:p-7">
                  <motion.span
                    variants={titreVignette}
                    initial="repos"
                    className="flex items-center gap-3 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-chaux"
                  >
                    <span className="h-px w-8 bg-ocre" />
                    Voir le projet
                  </motion.span>
                </div>
              </motion.figure>

              <div className="mt-5 flex items-baseline justify-between gap-6 border-t border-encre/15 pt-4">
                <h3 className="display text-[clamp(1.3rem,2.2vw,1.9rem)]">{projet.titre}</h3>
                <span className="shrink-0 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-encre/45">
                  {projet.annee}
                </span>
              </div>
              <p className="mt-1 text-sm text-encre/60">
                {projet.categorie} — {projet.lieu} — {projet.surface}
              </p>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {ouvert !== null && (
          <Lightbox
            projet={projets[ouvert]}
            rang={ouvert}
            total={projets.length}
            onFermer={fermer}
            onPrecedent={precedent}
            onSuivant={suivant}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
