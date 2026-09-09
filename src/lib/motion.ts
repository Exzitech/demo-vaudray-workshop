import { useEffect, useState } from 'react'
import type { Transition, Variants } from 'framer-motion'

/** Courbe unique du site : sortie longue, arrivée douce. */
export const doux: Transition = { duration: 0.9, ease: [0.22, 1, 0.36, 1] }

/** Réglage commun de whileInView : une seule lecture, déclenchement anticipé. */
export const auScroll = { once: true, amount: 0.25, margin: '0px 0px -10% 0px' } as const

/** Conteneur qui décale l'apparition de ses enfants. */
export const cascade = (decalage = 0.08, attente = 0): Variants => ({
  masque: {},
  visible: { transition: { staggerChildren: decalage, delayChildren: attente } },
})

/** Ligne de titre qui monte depuis un masque (le parent doit couper le débordement). */
export const ligneMasquee: Variants = {
  masque: { y: '110%' },
  visible: { y: '0%', transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] } },
}

/** Apparition sobre, utilisée pour les blocs de texte et les cartes. */
export const monteeDouce: Variants = {
  masque: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: doux },
}

export const fondu: Variants = {
  masque: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.2, ease: 'easeOut' } },
}

function useMediaQuery(requete: string) {
  const [actif, setActif] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia(requete)
    const suivre = () => setActif(mql.matches)
    suivre()
    mql.addEventListener('change', suivre)
    return () => mql.removeEventListener('change', suivre)
  }, [requete])

  return actif
}

/** Les effets coûteux (parallaxe, inclinaison au curseur) sont coupés sous cette largeur. */
export const useEstMobile = () => useMediaQuery('(max-width: 1023px)')

/** Un vrai pointeur : évite d'activer les effets de survol sur écran tactile. */
export const usePointeurFin = () => useMediaQuery('(hover: hover) and (pointer: fine)')

/**
 * Réglage dédié aux rideaux d'image. Le seuil DOIT rester à « some » (0 %) :
 * un clip-path initial ramène la surface visible de l'élément à zéro, donc
 * l'IntersectionObserver ne franchit jamais un seuil exprimé en pourcentage —
 * l'animation attendrait d'être visible pour se révéler, et resterait masquée.
 */
export const auScrollImage = { once: true, amount: 'some' } as const

/** Rideaux d'image, pilotés par variantes : le déclencheur en objet inline
 *  s'avérait capricieux sur les figures hautes. */
export const revelationBas: Variants = {
  masque: { clipPath: 'inset(0% 0% 100% 0%)' },
  visible: {
    clipPath: 'inset(0% 0% 0% 0%)',
    transition: { duration: 1.1, ease: [0.76, 0, 0.24, 1] },
  },
}

export const revelationGauche: Variants = {
  masque: { clipPath: 'inset(0% 100% 0% 0%)' },
  visible: {
    clipPath: 'inset(0% 0% 0% 0%)',
    transition: { duration: 1, delay: 0.35, ease: [0.76, 0, 0.24, 1] },
  },
}

/** Le zoom accompagne le rideau : la photo se pose au lieu d'apparaître à plat. */
export const zoomRepos: Variants = {
  masque: { scale: 1.18 },
  visible: { scale: 1, transition: { duration: 1.6, ease: [0.22, 1, 0.36, 1] } },
}
