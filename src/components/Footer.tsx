import { motion } from 'framer-motion'
import { auteur, mentionDemo, navigation, studio } from '../data/site'
import { auScroll } from '../lib/motion'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-chaux/10 bg-encre text-chaux">
      <div className="mx-auto max-w-[1600px] px-6 pb-10 pt-16 md:px-12 md:pb-12 md:pt-20">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[0.7rem] uppercase tracking-[0.2em] text-lin/60">
              {studio.metier} — {studio.ville}
            </p>
            <p className="display mt-3 text-[clamp(2rem,5vw,3.5rem)]">{studio.nom}</p>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-2">
            {navigation.map((lien) => (
              <a
                key={lien.ancre}
                href={lien.ancre}
                className="filet-anime text-[0.72rem] font-medium uppercase tracking-[0.18em] text-chaux/75"
              >
                {lien.libelle}
              </a>
            ))}
          </nav>
        </div>

        {/* Filet qui se trace au scroll : dernière respiration avant le pied de page. */}
        <motion.div
          className="my-10 h-px origin-left bg-chaux/15"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={auScroll}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        />

        <div className="flex flex-col gap-6 text-xs text-lin/60 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {studio.reseaux.map((reseau) => (
              <a key={reseau.nom} href={reseau.url} className="filet-anime">
                {reseau.nom}
              </a>
            ))}
          </div>

          <div className="max-w-lg space-y-1">
            <p className="text-lin/50">{mentionDemo}</p>
            {/* Crédit du vrai auteur : discret, mais joignable. */}
            <p className="text-lin/40">
              Réalisation{' '}
              <a
                href={auteur.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className="filet-anime text-lin/70"
              >
                {auteur.nom}
              </a>{' '}
              —{' '}
              <a href={`mailto:${auteur.email}`} className="filet-anime text-lin/70">
                {auteur.email}
              </a>
            </p>
          </div>

          <a href="#hero" className="filet-anime shrink-0 uppercase tracking-[0.18em]">
            Haut de page ↑
          </a>
        </div>
      </div>
    </footer>
  )
}
