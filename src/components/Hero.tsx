import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { heroImage, studio } from '../data/site'
import { cascade, ligneMasquee, useEstMobile } from '../lib/motion'

const lignesTitre = ['Atelier Solène', 'Vaudray']

type Props = {
  /** Le hero n'entre en scène qu'une fois le rideau retiré. */
  pret: boolean
}

export default function Hero({ pret }: Props) {
  const section = useRef<HTMLElement>(null)
  const estMobile = useEstMobile()
  const mouvementReduit = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: section,
    offset: ['start start', 'end start'],
  })

  // Parallaxe discrète : l'image descend deux fois moins vite que le texte.
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '16%'])
  const contenuY = useTransform(scrollYProgress, [0, 1], ['0%', '-28%'])
  const contenuOpacite = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  // Sur mobile et en mouvement réduit, on ne rattache rien au scroll.
  const parallaxeActive = !estMobile && !mouvementReduit
  const etat = pret ? 'visible' : 'masque'

  return (
    <section
      ref={section}
      id="hero"
      className="grain relative flex h-[100svh] min-h-[560px] w-full flex-col justify-end overflow-hidden bg-encre"
    >
      <motion.div
        className="absolute inset-0"
        style={parallaxeActive ? { y: imageY } : undefined}
        initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
        animate={pret ? { clipPath: 'inset(0% 0% 0% 0%)' } : undefined}
        transition={{ duration: 1.3, ease: [0.76, 0, 0.24, 1] }}
      >
        <motion.picture
          className="block h-full w-full"
          initial={{ scale: 1.14 }}
          animate={pret ? { scale: 1 } : undefined}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <source media="(max-width: 767px)" srcSet={heroImage.srcPetit} />
          <img
            src={heroImage.src}
            alt={heroImage.alt}
            width={1920}
            height={1280}
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover"
          />
        </motion.picture>
      </motion.div>

      {/* Voile chaud : garde le texte lisible sans éteindre la photo. */}
      <div className="absolute inset-0 bg-gradient-to-t from-encre via-encre/55 to-encre/25" />
      <div className="absolute inset-0 bg-terracotta/10 mix-blend-multiply" />

      <motion.div
        className="relative z-10 mx-auto w-full max-w-[1600px] px-6 pb-12 md:px-12 md:pb-16"
        style={parallaxeActive ? { y: contenuY, opacity: contenuOpacite } : undefined}
      >
        <motion.p
          className="mb-6 text-[0.72rem] font-medium uppercase tracking-[0.28em] text-lin md:mb-8 md:text-[0.8rem]"
          initial={{ opacity: 0 }}
          animate={pret ? { opacity: 1 } : undefined}
          transition={{ duration: 0.9, delay: 0.35 }}
        >
          {studio.metier} — {studio.ville}
        </motion.p>

        <motion.h1
          className="display text-[clamp(3rem,11.5vw,10.5rem)] text-chaux"
          variants={cascade(0.09, 0.15)}
          initial="masque"
          animate={etat}
        >
          {lignesTitre.map((ligne) => (
            <span
              key={ligne}
              className="ml-[-0.14em] block overflow-hidden pb-[0.34em] pl-[0.14em] -mb-[0.26em]"
            >
              <motion.span variants={ligneMasquee} className="block">
                {ligne}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        <motion.div
          className="mt-10 flex flex-col gap-8 border-t border-chaux/20 pt-6 md:mt-14 md:flex-row md:items-start md:justify-between md:gap-16"
          initial={{ opacity: 0, y: 20 }}
          animate={pret ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 1, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="max-w-md text-balance text-sm leading-relaxed text-chaux/80 md:text-base">
            {studio.intro}
          </p>

          <a
            href="#atelier"
            className="group flex shrink-0 items-center gap-4 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-chaux md:text-[0.78rem]"
          >
            Découvrir l'atelier
            <span className="relative block h-10 w-px overflow-hidden bg-chaux/30">
              <motion.span
                className="absolute inset-x-0 top-0 block h-1/2 bg-terracotta"
                animate={mouvementReduit ? undefined : { y: ['-100%', '200%'] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              />
            </span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}
