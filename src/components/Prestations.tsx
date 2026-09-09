import { useRef } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { prestations } from '../data/site'
import { auScroll, cascade, ligneMasquee, monteeDouce, usePointeurFin } from '../lib/motion'

const AMPLITUDE_INCLINAISON = 7

const voile: Variants = {
  repos: { y: '101%' },
  survol: { y: '0%', transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

const apparition = { duration: 0.5, ease: [0.22, 1, 0.36, 1] } as const

const detail: Variants = {
  repos: { opacity: 0, y: 16 },
  survol: { opacity: 1, y: 0, transition: apparition },
  tactile: { opacity: 1, y: 0, transition: apparition },
}

const numero: Variants = {
  repos: { y: 0, opacity: 0.55 },
  survol: { y: -8, opacity: 1, transition: apparition },
  tactile: { y: 0, opacity: 1, transition: apparition },
}

const fleche: Variants = {
  repos: { x: -14, opacity: 0 },
  survol: { x: 0, opacity: 1, transition: apparition },
  tactile: { x: 0, opacity: 0.7, transition: apparition },
}

const photo: Variants = {
  repos: { scale: 1 },
  survol: {
    scale: 1.09,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
}

type CarteProps = {
  prestation: (typeof prestations)[number]
}

function Carte({ prestation }: CarteProps) {
  const carte = useRef<HTMLElement>(null)
  const pointeurFin = usePointeurFin()
  const mouvementReduit = useReducedMotion()

  // Position du curseur dans la carte, normalisée entre -0.5 et 0.5.
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const ressort = { stiffness: 160, damping: 18, mass: 0.6 }
  const rotateX = useSpring(
    useTransform(py, [-0.5, 0.5], [AMPLITUDE_INCLINAISON, -AMPLITUDE_INCLINAISON]),
    ressort,
  )
  const rotateY = useSpring(
    useTransform(px, [-0.5, 0.5], [-AMPLITUDE_INCLINAISON, AMPLITUDE_INCLINAISON]),
    ressort,
  )

  const inclinaisonActive = pointeurFin && !mouvementReduit

  function suivreCurseur(evenement: React.PointerEvent<HTMLElement>) {
    if (!inclinaisonActive || !carte.current) return
    const zone = carte.current.getBoundingClientRect()
    px.set((evenement.clientX - zone.left) / zone.width - 0.5)
    py.set((evenement.clientY - zone.top) / zone.height - 0.5)
  }

  function relacher() {
    px.set(0)
    py.set(0)
  }

  return (
    // La carte est enveloppée : l'apparition au scroll et les états de survol
    // sont deux animations distinctes, elles ne doivent pas se marcher dessus.
    <motion.div variants={monteeDouce} className="h-full">
      <motion.article
        ref={carte}
        initial="repos"
        whileHover={pointeurFin ? 'survol' : undefined}
        // Sans vrai pointeur : pas d'inclinaison ni de voile, seulement les détails révélés.
        whileInView={pointeurFin ? undefined : 'tactile'}
        viewport={auScroll}
        onPointerMove={suivreCurseur}
        onPointerLeave={relacher}
        style={
          inclinaisonActive
            ? {
                rotateX,
                rotateY,
                transformPerspective: 1100,
                transformStyle: 'preserve-3d',
              }
            : undefined
        }
        className="group relative flex aspect-[5/6] flex-col justify-end overflow-hidden bg-encre sm:aspect-[4/5] lg:aspect-[5/6]"
      >
        <motion.img
          variants={photo}
          src={prestation.image}
          alt=""
          width={700}
          height={900}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Lisibilité du texte : voile permanent, puis voile terracotta qui monte au survol. */}
        <div className="absolute inset-0 bg-gradient-to-t from-encre via-encre/70 to-encre/10" />
        <motion.div
          variants={voile}
          className="absolute inset-0 bg-terracotta/85 mix-blend-multiply"
        />

        <div className="relative z-10 flex flex-1 flex-col justify-between p-6 md:p-8">
          <div className="flex items-start justify-between gap-4">
            <motion.span variants={numero} className="display text-4xl text-ocre md:text-5xl">
              {prestation.numero}
            </motion.span>
            <motion.span
              variants={fleche}
              aria-hidden
              className="display text-2xl leading-none text-chaux"
            >
              →
            </motion.span>
          </div>

          <div>
            <h3 className="display text-[clamp(1.6rem,2.4vw,2.2rem)] text-chaux">
              {prestation.titre}
            </h3>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-chaux/80">
              {prestation.resume}
            </p>

            <motion.ul
              variants={detail}
              className="mt-5 flex flex-wrap gap-x-4 gap-y-2 border-t border-chaux/25 pt-4"
            >
              {prestation.details.map((ligne) => (
                <li
                  key={ligne}
                  className="text-[0.68rem] font-medium uppercase tracking-[0.16em] text-chaux"
                >
                  {ligne}
                </li>
              ))}
            </motion.ul>
          </div>
        </div>
      </motion.article>
    </motion.div>
  )
}

export default function Prestations() {
  return (
    <section id="prestations" className="bg-chaux">
      <div className="mx-auto max-w-[1600px] px-6 py-24 md:px-12 md:py-36">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <motion.p
              className="mb-8 flex items-center gap-5 text-[0.72rem] font-medium uppercase tracking-[0.28em] text-encre/50"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={auScroll}
              transition={{ duration: 0.8 }}
            >
              <span className="text-terracotta">02</span>
              <span className="h-px w-12 bg-encre/20" />
              Prestations
            </motion.p>

            <motion.h2
              className="display max-w-4xl text-[clamp(2.2rem,5vw,4rem)]"
              variants={cascade(0.08)}
              initial="masque"
              whileInView="visible"
              viewport={auScroll}
            >
              {['Quatre façons', 'de travailler ensemble'].map((ligne, index) => (
                <span
                  key={ligne}
                  className="ml-[-0.14em] block overflow-hidden pb-[0.34em] pl-[0.14em] -mb-[0.26em]"
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
            className="max-w-sm text-sm leading-relaxed text-encre/70 lg:pb-3"
            variants={monteeDouce}
            initial="masque"
            whileInView="visible"
            viewport={auScroll}
          >
            Chaque projet démarre par une visite sur place, gratuite et sans engagement. Le devis
            arrive sous une semaine, détaillé poste par poste.
          </motion.p>
        </div>

        <motion.div
          className="mt-16 grid gap-5 sm:grid-cols-2 md:mt-24 lg:grid-cols-4"
          variants={cascade(0.1)}
          initial="masque"
          whileInView="visible"
          viewport={auScroll}
        >
          {prestations.map((prestation) => (
            <Carte key={prestation.numero} prestation={prestation} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
