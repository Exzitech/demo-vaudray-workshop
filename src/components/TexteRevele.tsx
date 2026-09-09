import { motion, useReducedMotion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { auScroll } from '../lib/motion'

const mot: Variants = {
  masque: { opacity: 0.12, y: '0.35em' },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

type Props = {
  texte: string
  className?: string
  /** Décalage entre deux mots : plus il est court, plus la lecture est rapide. */
  cadence?: number
  attente?: number
}

/**
 * Révèle un paragraphe mot à mot au scroll — l'œil suit la ligne au lieu de
 * découvrir un bloc d'un coup. Se réduit à un simple fondu si le visiteur a
 * demandé moins d'animations.
 */
export default function TexteRevele({
  texte,
  className = '',
  cadence = 0.018,
  attente = 0,
}: Props) {
  const mouvementReduit = useReducedMotion()
  const mots = texte.split(' ')

  if (mouvementReduit) {
    return (
      <motion.p
        className={className}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={auScroll}
        transition={{ duration: 0.6 }}
      >
        {texte}
      </motion.p>
    )
  }

  return (
    <motion.p
      className={className}
      initial="masque"
      whileInView="visible"
      viewport={auScroll}
      transition={{ staggerChildren: cadence, delayChildren: attente }}
    >
      {/* whitespace-pre : sans ça, le navigateur supprime l'espace en fin de boîte inline-block. */}
      {mots.map((valeur, index) => (
        <motion.span
          key={`${valeur}-${index}`}
          variants={mot}
          className="inline-block whitespace-pre"
        >
          {valeur}
          {index < mots.length - 1 ? ' ' : ''}
        </motion.span>
      ))}
    </motion.p>
  )
}
