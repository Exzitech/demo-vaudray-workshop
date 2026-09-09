/**
 * Tout le contenu du site vitrine, en dur : pas de CMS, pas de backend.
 * Cas fictif — voir la mention du pied de page.
 */

const UNSPLASH = 'https://images.unsplash.com/photo-'

/** Construit une URL Unsplash recadrée et compressée à la dimension exacte demandée. */
export function photo(id: string, largeur: number, hauteur: number, qualite = 72) {
  return `${UNSPLASH}${id}?auto=format&fit=crop&crop=entropy&w=${largeur}&h=${hauteur}&q=${qualite}`
}

export const studio = {
  nom: 'Atelier Solène Vaudray',
  nomCourt: 'Vaudray',
  metier: "Architecte d'intérieur",
  ville: 'Bordeaux',
  baseline: "L'espace comme on l'habite,\nplutôt que comme on le photographie.",
  intro:
    "Rénovation d'appartements anciens et de maisons de famille. Dix ans à travailler la chaux, le bois brut et le laiton patiné — huit projets par an, pas un de plus.",
  email: 'contact@atelier-vaudray.fr',
  telephone: '05 56 00 00 00',
  adresse: ['14 rue Notre-Dame', '33000 Bordeaux'],
  reseaux: [
    { nom: 'Instagram', url: '#' },
    { nom: 'Pinterest', url: '#' },
    { nom: 'LinkedIn', url: '#' },
  ],
}

export const navigation = [
  { libelle: 'Atelier', ancre: '#atelier' },
  { libelle: 'Prestations', ancre: '#prestations' },
  { libelle: 'Projets', ancre: '#projets' },
  { libelle: 'Contact', ancre: '#contact' },
]

export const heroImage = {
  src: photo('1625163865002-c3563a586b95', 1920, 1280, 76),
  srcPetit: photo('1625163865002-c3563a586b95', 900, 1400, 70),
  alt: "Grand séjour d'appartement ancien : parquet sombre, moulures et hautes fenêtres",
}

export const apropos = {
  portrait: {
    src: photo('1613483811981-56b07f3ec9e5', 900, 1200, 78),
    alt: "Solène Vaudray à sa table de travail, plans et échantillons étalés",
  },
  detail: {
    src: photo('1512119706465-5f60cf4d3e2d', 800, 800, 74),
    alt: 'Détail de matière : mur de terre cuite patinée',
  },
  chiffres: [
    { valeur: '10', unite: 'ans', legende: "d'exercice en indépendante" },
    { valeur: '62', unite: 'projets', legende: 'livrés depuis 2015' },
    { valeur: '8', unite: 'par an', legende: 'maximum, pour rester présente' },
  ],
  paragraphes: [
    "J'ai commencé par restaurer l'appartement de ma grand-mère, rue Bouffard. Les murs étaient recouverts de six couches de papier peint et, dessous, il y avait de la pierre. C'est resté ma méthode : enlever avant d'ajouter.",
    "Je travaille seule, avec un réseau d'artisans girondins que je connais depuis dix ans — un plâtrier, un ébéniste, un ferronnier. Vous ne passerez jamais par un chef de projet : c'est moi qui dessine, moi qui suis le chantier, moi qui décroche quand vous appelez.",
  ],
  citation:
    "Une pièce réussie, c'est une pièce dont on ne remarque rien le premier jour et tout au bout d'un mois.",
}

export const prestations = [
  {
    numero: '01',
    titre: 'Conception globale',
    resume:
      "Du relevé de l'existant à la remise des clés : plans, autorisations, choix des matières, coordination des artisans.",
    details: ["Relevé et diagnostic", 'Plans & perspectives', 'Suivi de chantier'],
    image: photo('1699631313586-c39575b83a97', 700, 900, 70),
  },
  {
    numero: '02',
    titre: "Rénovation d'ancien",
    resume:
      'Pierre, moulures, parquets à bâtons rompus : redonner de la lumière sans effacer ce qui fait la valeur du lieu.',
    details: ['Ouverture des volumes', 'Restauration des sols', 'Mise aux normes'],
    image: photo('1710762797203-707c26233cee', 700, 900, 70),
  },
  {
    numero: '03',
    titre: 'Mobilier sur-mesure',
    resume:
      "Bibliothèques, dressings, banquettes d'angle — dessinés pour vos murs et fabriqués à trente kilomètres d'ici.",
    details: ['Dessin technique', 'Essences & finitions', "Pose par l'ébéniste"],
    image: photo('1760533388345-8450d79751ca', 700, 900, 70),
  },
  {
    numero: '04',
    titre: 'Conseil couleur & matières',
    resume:
      'Une demi-journée sur place et un nuancier tenu : la formule courte, pour ceux qui posent eux-mêmes.',
    details: ['Visite de deux heures', 'Palette argumentée', 'Liste de fournisseurs'],
    image: photo('1768152859365-337f962fe1e3', 700, 900, 70),
  },
]

export type Projet = {
  id: string
  titre: string
  lieu: string
  annee: string
  surface: string
  categorie: string
  description: string
  image: string
  imageLarge: string
  alt: string
  format: 'haut' | 'bas'
}

export const projets: Projet[] = [
  {
    id: 'bouffard',
    titre: 'Appartement Bouffard',
    lieu: "Bordeaux, Triangle d'Or",
    annee: '2024',
    surface: '112 m²',
    categorie: 'Rénovation complète',
    description:
      "Six couches de papier peint retirées pour retrouver la pierre. Cuisine ouverte sur le séjour, verrière d'atelier en acier noirci, parquet d'origine poncé à la main.",
    image: photo('1552475157-a68a1826ddb3', 900, 1200, 72),
    imageLarge: photo('1552475157-a68a1826ddb3', 1600, 1100, 80),
    alt: 'Cheminée de marbre, moulures et parquet dans un appartement ancien',
    format: 'haut',
  },
  {
    id: 'aiguillon',
    titre: "Maison de l'Aiguillon",
    lieu: 'Arcachon',
    annee: '2023',
    surface: '186 m²',
    categorie: 'Maison de famille',
    description:
      'Une maison de bord de bassin transmise sur trois générations. Tout a été conservé sauf la circulation : un couloir supprimé, et la lumière traverse enfin.',
    image: photo('1783883079427-d4274ca2b269', 900, 700, 72),
    imageLarge: photo('1783883079427-d4274ca2b269', 1600, 1100, 80),
    alt: "Séjour traversé par une lumière dorée de fin de journée",
    format: 'bas',
  },
  {
    id: 'chartrons',
    titre: 'Loft des Chartrons',
    lieu: 'Bordeaux',
    annee: '2023',
    surface: '95 m²',
    categorie: 'Réhabilitation',
    description:
      'Un ancien chai converti en logement. Charpente laissée nue, chaux blanche, mezzanine posée comme un meuble plutôt que comme un étage.',
    image: photo('1773919697144-08d221ee78b1', 900, 1200, 72),
    imageLarge: photo('1773919697144-08d221ee78b1', 1600, 1100, 80),
    alt: 'Pièce rustique aux étagères chargées, sous charpente',
    format: 'haut',
  },
  {
    id: 'saint-pierre',
    titre: 'Duplex Saint-Pierre',
    lieu: 'Bordeaux, centre historique',
    annee: '2022',
    surface: '78 m²',
    categorie: 'Aménagement sur-mesure',
    description:
      'Petite surface, hauteur sous plafond de quatre mètres. Toute la vie est passée en bas, tout le rangement est monté en haut, en menuiserie pleine hauteur.',
    image: photo('1574971111599-e7b4aa98e156', 900, 700, 72),
    imageLarge: photo('1574971111599-e7b4aa98e156', 1600, 1100, 80),
    alt: 'Séjour en hauteur, canapé brun et menuiserie pleine hauteur',
    format: 'bas',
  },
  {
    id: 'medoc',
    titre: 'Chartreuse en Médoc',
    lieu: 'Margaux',
    annee: '2022',
    surface: '240 m²',
    categorie: 'Restauration',
    description:
      "Une chartreuse du XVIIIᵉ, humide et sombre. Sols en terre cuite reposés à l'ancienne, enduits respirants, et une seule couleur pour les huit pièces.",
    image: photo('1780573203487-21305d5ac98d', 900, 1200, 72),
    imageLarge: photo('1780573203487-21305d5ac98d', 1600, 1100, 80),
    alt: 'Lumière et ombres portées sur un sol de terre cuite ancien',
    format: 'haut',
  },
  {
    id: 'cauderan',
    titre: 'Atelier de Caudéran',
    lieu: 'Bordeaux, Caudéran',
    annee: '2021',
    surface: '54 m²',
    categorie: 'Extension',
    description:
      "Une extension d'atelier au fond du jardin, pour une céramiste. Ossature bois, grande baie au nord, et un sol qui ne craint ni l'eau ni l'argile.",
    image: photo('1774446931551-fc6c2a20721e', 900, 700, 72),
    imageLarge: photo('1774446931551-fc6c2a20721e', 1600, 1100, 80),
    alt: 'Pièce ouverte par une large baie sur un jardin',
    format: 'bas',
  },
]

export const temoignages = [
  {
    texte:
      "Nous avions peur qu'un architecte transforme la maison de mes parents en showroom. Solène a fait exactement l'inverse : on la reconnaît, en mieux.",
    auteur: 'Claire & Damien M.',
    projet: "Maison de l'Aiguillon, Arcachon",
  },
  {
    texte:
      "Elle a défendu le budget mieux que moi face aux entreprises. Aucun dépassement en sept mois de chantier, ce qui, paraît-il, n'arrive jamais.",
    auteur: 'Hélène P.',
    projet: 'Appartement Bouffard, Bordeaux',
  },
  {
    texte:
      "Une demi-journée de conseil couleur et j'ai arrêté de repeindre tous les six mois. C'est le meilleur achat que j'aie fait pour cet appartement.",
    auteur: 'Nicolas B.',
    projet: 'Duplex Saint-Pierre, Bordeaux',
  },
]

export const contact = {
  titre: 'Parlons de votre lieu',
  intro:
    'Décrivez-moi en quelques lignes ce que vous avez, ce que vous voulez, et sous quel délai. Je réponds sous 48 heures, toujours moi-même.',
  typesProjet: [
    'Rénovation complète',
    'Aménagement sur-mesure',
    'Conseil couleur & matières',
    'Autre / je ne sais pas encore',
  ],
  budgets: ['< 30 000 €', '30 000 – 80 000 €', '80 000 – 150 000 €', '> 150 000 €'],
}

/** Le vrai auteur de la démonstration — à ne pas confondre avec le studio fictif. */
export const auteur = {
  nom: 'Tom Rogiers',
  email: 'tom.exzitech@gmail.com',
  linkedin: 'https://www.linkedin.com/in/tom-rogiers-290655221/',
}

export const mentionDemo = `Projet de démonstration — ${studio.nom} n'est pas une entreprise réelle.`
