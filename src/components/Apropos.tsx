import { motion } from 'framer-motion'
import { apropos, studio } from '../data/site'
import {
  auScroll,
  auScrollImage,
  cascade,
  ligneMasquee,
  monteeDouce,
  revelationBas,
  revelationGauche,
  zoomRepos,
} from '../lib/motion'
import TexteRevele from './TexteRevele'

const titre = ['Enlever', "avant d'ajouter."]

export default function Apropos() {
  return (
    <section id="atelier" className="grain relative overflow-hidden bg-olive text-chaux">
      <div className="mx-auto max-w-[1600px] px-6 py-24 md:px-12 md:py-36">
        <motion.p
          className="mb-16 flex items-center gap-5 text-[0.72rem] font-medium uppercase tracking-[0.28em] text-lin md:mb-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={auScroll}
          transition={{ duration: 0.8 }}
        >
          <span className="text-ocre">01</span>
          <span className="h-px w-12 bg-chaux/25" />
          L'atelier
        </motion.p>

        <div className="grid gap-y-24 lg:grid-cols-12 lg:gap-x-10">
          {/* Colonne images : le portrait tient 6 colonnes, le détail déborde de la grille. */}
          <div className="relative lg:col-span-6">
            <motion.figure
              className="relative aspect-[3/4] w-[82%] overflow-hidden bg-encre/40 sm:w-[70%] lg:w-[88%]"
              variants={revelationBas}
              initial="masque"
              whileInView="visible"
              viewport={auScrollImage}
            >
              {/* La photo hérite de l'état de la figure : un seul déclencheur pour les deux. */}
              <motion.img
                variants={zoomRepos}
                src={apropos.portrait.src}
                alt={apropos.portrait.alt}
                width={900}
                height={1200}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </motion.figure>

            <motion.figure
              className="absolute -bottom-12 right-0 aspect-square w-32 overflow-hidden bg-encre/40 sm:w-44 lg:right-4 lg:w-56"
              variants={revelationGauche}
              initial="masque"
              whileInView="visible"
              viewport={auScrollImage}
            >
              <img
                src={apropos.detail.src}
                alt={apropos.detail.alt}
                width={800}
                height={800}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </motion.figure>
          </div>

          {/* Colonne texte : décalée vers le bas et vers la droite, jamais alignée sur l'image. */}
          <div className="pt-14 lg:col-span-5 lg:col-start-8 lg:pt-40">
            <motion.h2
              className="display text-[clamp(2.5rem,6vw,4.5rem)]"
              variants={cascade(0.08)}
              initial="masque"
              whileInView="visible"
              viewport={auScroll}
            >
              {titre.map((ligne, index) => (
                <span
                  key={ligne}
                  className="ml-[-0.14em] block overflow-hidden pb-[0.34em] pl-[0.14em] -mb-[0.26em]"
                >
                  <motion.span
                    variants={ligneMasquee}
                    className={index === 1 ? 'block italic text-ocre' : 'block'}
                  >
                    {ligne}
                  </motion.span>
                </span>
              ))}
            </motion.h2>

            <div className="mt-10 space-y-6 text-[0.95rem] leading-[1.75] text-chaux/80 md:text-base">
              {apropos.paragraphes.map((texte, index) => (
                <TexteRevele key={index} texte={texte} attente={index * 0.12} />
              ))}
            </div>

            <motion.p
              className="mt-10 text-[0.72rem] font-medium uppercase tracking-[0.24em] text-lin"
              variants={monteeDouce}
              initial="masque"
              whileInView="visible"
              viewport={auScroll}
            >
              Solène Vaudray — {studio.metier}
            </motion.p>
          </div>
        </div>

        {/* Chiffres : trois colonnes séparées par des filets qui se tracent au scroll. */}
        <motion.dl
          className="mt-32 grid gap-y-10 border-t border-chaux/15 pt-10 sm:grid-cols-3 md:mt-40"
          variants={cascade(0.12)}
          initial="masque"
          whileInView="visible"
          viewport={auScroll}
        >
          {apropos.chiffres.map((chiffre) => (
            <motion.div
              key={chiffre.legende}
              variants={monteeDouce}
              className="sm:border-l sm:border-chaux/15 sm:pl-8 sm:first:border-l-0 sm:first:pl-0"
            >
              <dt className="display flex items-baseline gap-2 text-[clamp(3rem,7vw,5rem)] text-ocre">
                {chiffre.valeur}
                <span className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-chaux/60">
                  {chiffre.unite}
                </span>
              </dt>
              <dd className="mt-3 max-w-[16rem] text-sm text-chaux/70">{chiffre.legende}</dd>
            </motion.div>
          ))}
        </motion.dl>

        <motion.blockquote
          className="mt-28 max-w-4xl md:mt-36"
          variants={monteeDouce}
          initial="masque"
          whileInView="visible"
          viewport={auScroll}
        >
          <span aria-hidden className="display block text-6xl leading-none text-terracotta">
            «
          </span>
          <p className="display mt-4 text-[clamp(1.6rem,3.6vw,3rem)] italic leading-[1.15] text-chaux">
            {apropos.citation}
          </p>
        </motion.blockquote>
      </div>
    </section>
  )
}
