import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import type { Projet } from '../data/site'

type Props = {
  projet: Projet
  rang: number
  total: number
  onFermer: () => void
  onPrecedent: () => void
  onSuivant: () => void
}

const transitionPartagee = { duration: 0.6, ease: [0.22, 1, 0.36, 1] } as const

export default function Lightbox({ projet, rang, total, onFermer, onPrecedent, onSuivant }: Props) {
  const mouvementReduit = useReducedMotion()
  const [netteteChargee, setNetteteChargee] = useState(false)

  // La version haute définition arrive après coup : on repart de la vignette
  // (déjà en cache) pour que la transition partagée n'ait jamais de trou blanc.
  useEffect(() => {
    setNetteteChargee(false)
  }, [projet.id])

  useEffect(() => {
    function auClavier(evenement: KeyboardEvent) {
      if (evenement.key === 'Escape') onFermer()
      if (evenement.key === 'ArrowLeft') onPrecedent()
      if (evenement.key === 'ArrowRight') onSuivant()
    }
    window.addEventListener('keydown', auClavier)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', auClavier)
      document.body.style.overflow = ''
    }
  }, [onFermer, onPrecedent, onSuivant])

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex flex-col bg-encre"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      role="dialog"
      aria-modal="true"
      aria-label={`${projet.titre}, projet ${rang + 1} sur ${total}`}
    >
      {/* Fond cliquable : fermer en cliquant à côté de l'image. */}
      <button
        type="button"
        onClick={onFermer}
        aria-label="Fermer la vue projet"
        className="absolute inset-0 cursor-zoom-out"
      />

      <div className="pointer-events-none relative z-10 flex h-full flex-col px-4 py-4 md:px-10 md:py-8">
        <div className="pointer-events-auto flex items-center justify-between text-chaux">
          <span className="text-[0.7rem] font-medium uppercase tracking-[0.2em] text-lin">
            {String(rang + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
          <button
            type="button"
            onClick={onFermer}
            className="filet-anime text-[0.7rem] font-medium uppercase tracking-[0.2em]"
          >
            Fermer
          </button>
        </div>

        <div className="flex min-h-0 flex-1 items-center justify-center py-5 md:py-8">
          <motion.figure
            layoutId={mouvementReduit ? undefined : `projet-${projet.id}`}
            transition={transitionPartagee}
            className="pointer-events-auto relative max-h-full w-full max-w-5xl overflow-hidden bg-encre"
          >
            <img
              src={projet.image}
              alt=""
              aria-hidden
              className="max-h-[62vh] w-full object-cover md:max-h-[68vh]"
            />
            <img
              src={projet.imageLarge}
              alt={projet.alt}
              onLoad={() => setNetteteChargee(true)}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
                netteteChargee ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </motion.figure>
        </div>

        <motion.div
          className="pointer-events-auto grid gap-6 border-t border-chaux/20 pt-5 text-chaux md:grid-cols-12 md:gap-10"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          <div className="md:col-span-5">
            <h3 className="display text-[clamp(1.6rem,3vw,2.6rem)]">{projet.titre}</h3>
            <p className="mt-2 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-ocre">
              {projet.categorie}
            </p>
          </div>

          <p className="text-sm leading-relaxed text-chaux/75 md:col-span-4">
            {projet.description}
          </p>

          <dl className="flex flex-wrap gap-x-8 gap-y-3 text-sm md:col-span-3 md:flex-col md:gap-y-2">
            {[
              ['Lieu', projet.lieu],
              ['Année', projet.annee],
              ['Surface', projet.surface],
            ].map(([intitule, valeur]) => (
              <div key={intitule} className="flex gap-3">
                <dt className="text-lin/70">{intitule}</dt>
                <dd>{valeur}</dd>
              </div>
            ))}
          </dl>

          <div className="flex gap-8 md:col-span-12">
            <button
              type="button"
              onClick={onPrecedent}
              className="filet-anime text-[0.7rem] font-medium uppercase tracking-[0.2em]"
            >
              ← Précédent
            </button>
            <button
              type="button"
              onClick={onSuivant}
              className="filet-anime text-[0.7rem] font-medium uppercase tracking-[0.2em]"
            >
              Suivant →
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
