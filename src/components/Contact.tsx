import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { contact, studio } from '../data/site'
import { auScroll, cascade, ligneMasquee, monteeDouce } from '../lib/motion'

const champ: Variants = {
  visible: { opacity: 1, y: 0 },
  sortie: { opacity: 0, y: -16, transition: { duration: 0.35, ease: [0.76, 0, 0.24, 1] } },
}

const formulaire: Variants = {
  visible: {},
  sortie: { transition: { staggerChildren: 0.07 } },
}

const styleChamp =
  'peer w-full border-0 border-b border-chaux/25 bg-transparent pb-3 pt-7 text-chaux placeholder-transparent outline-none transition-colors focus:border-transparent'

const styleLabel =
  'pointer-events-none absolute left-0 top-7 origin-left text-sm text-lin/70 transition-all duration-300 peer-focus:top-0 peer-focus:text-[0.68rem] peer-focus:uppercase peer-focus:tracking-[0.18em] peer-focus:text-ocre peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[0.68rem] peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-[0.18em] peer-[:not(:placeholder-shown)]:text-lin'

/** Filet qui se trace de gauche à droite quand le champ prend le focus. */
function FiletFocus() {
  return (
    <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-terracotta transition-transform duration-500 ease-out peer-focus:scale-x-100" />
  )
}

export default function Contact() {
  const [envoye, setEnvoye] = useState(false)
  const [typeProjet, setTypeProjet] = useState(contact.typesProjet[0])
  const [budget, setBudget] = useState<string | null>(null)

  return (
    <section id="contact" className="grain relative overflow-hidden bg-encre text-chaux">
      <div className="mx-auto grid max-w-[1600px] gap-16 px-6 py-24 md:px-12 md:py-36 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <motion.p
            className="mb-8 flex items-center gap-5 text-[0.72rem] font-medium uppercase tracking-[0.28em] text-lin/70"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={auScroll}
            transition={{ duration: 0.8 }}
          >
            <span className="text-terracotta">05</span>
            <span className="h-px w-12 bg-chaux/20" />
            Contact
          </motion.p>

          <motion.h2
            className="display text-[clamp(2.4rem,5.5vw,4.5rem)]"
            variants={cascade(0.08)}
            initial="masque"
            whileInView="visible"
            viewport={auScroll}
          >
            {['Parlons de', 'votre lieu'].map((ligne, index) => (
              <span
                key={ligne}
                className="ml-[-0.14em] -mb-[0.26em] block overflow-hidden pb-[0.34em] pl-[0.14em]"
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

          <motion.div
            variants={monteeDouce}
            initial="masque"
            whileInView="visible"
            viewport={auScroll}
            className="mt-10 max-w-md"
          >
            <p className="text-sm leading-relaxed text-chaux/70">{contact.intro}</p>

            <dl className="mt-12 space-y-6 text-sm">
              <div>
                <dt className="text-[0.68rem] uppercase tracking-[0.2em] text-lin/60">Écrire</dt>
                <dd className="mt-1">
                  <a href={`mailto:${studio.email}`} className="filet-anime">
                    {studio.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-[0.68rem] uppercase tracking-[0.2em] text-lin/60">Appeler</dt>
                <dd className="mt-1">
                  <a href={`tel:${studio.telephone.replace(/\s/g, '')}`} className="filet-anime">
                    {studio.telephone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-[0.68rem] uppercase tracking-[0.2em] text-lin/60">
                  Passer à l'atelier
                </dt>
                <dd className="mt-1 text-chaux/80">
                  {studio.adresse.map((ligne) => (
                    <span key={ligne} className="block">
                      {ligne}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
          </motion.div>
        </div>

        <motion.div
          className="lg:col-span-6 lg:col-start-7"
          variants={monteeDouce}
          initial="masque"
          whileInView="visible"
          viewport={auScroll}
        >
          <AnimatePresence mode="wait">
            {envoye ? (
              <motion.div
                key="confirmation"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="flex min-h-[26rem] flex-col justify-center border-t border-chaux/20 pt-10"
              >
                <span className="display text-6xl leading-none text-terracotta" aria-hidden>
                  ✳
                </span>
                <h3 className="display mt-6 text-[clamp(1.8rem,3.5vw,2.8rem)]">
                  Message bien reçu.
                </h3>
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-chaux/70">
                  Solène vous répond sous 48 heures, depuis {studio.email}. En attendant, elle a
                  déjà noté : <span className="text-ocre">{typeProjet.toLowerCase()}</span>
                  {budget ? `, budget ${budget}` : ''}.
                </p>
                <button
                  type="button"
                  onClick={() => setEnvoye(false)}
                  className="filet-anime mt-10 self-start text-[0.7rem] font-medium uppercase tracking-[0.2em] text-lin"
                >
                  Envoyer un autre message
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="formulaire"
                variants={formulaire}
                initial="visible"
                animate="visible"
                exit="sortie"
                onSubmit={(evenement) => {
                  evenement.preventDefault()
                  setEnvoye(true)
                }}
                className="space-y-10"
              >
                <motion.div variants={champ} className="relative">
                  <input
                    id="nom"
                    name="nom"
                    type="text"
                    required
                    placeholder=" "
                    autoComplete="name"
                    className={styleChamp}
                  />
                  <label htmlFor="nom" className={styleLabel}>
                    Votre nom
                  </label>
                  <FiletFocus />
                </motion.div>

                <motion.div variants={champ} className="relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder=" "
                    autoComplete="email"
                    className={styleChamp}
                  />
                  <label htmlFor="email" className={styleLabel}>
                    Votre adresse e-mail
                  </label>
                  <FiletFocus />
                </motion.div>

                <motion.fieldset variants={champ}>
                  <legend className="text-[0.68rem] uppercase tracking-[0.2em] text-lin/60">
                    Votre projet
                  </legend>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {contact.typesProjet.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setTypeProjet(type)}
                        aria-pressed={typeProjet === type}
                        className={`rounded-full border px-4 py-2 text-[0.72rem] transition-colors duration-300 ${
                          typeProjet === type
                            ? 'border-terracotta bg-terracotta text-chaux'
                            : 'border-chaux/25 text-chaux/70 hover:border-chaux/60 hover:text-chaux'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </motion.fieldset>

                <motion.fieldset variants={champ}>
                  <legend className="text-[0.68rem] uppercase tracking-[0.2em] text-lin/60">
                    Budget travaux (optionnel)
                  </legend>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {contact.budgets.map((montant) => (
                      <button
                        key={montant}
                        type="button"
                        onClick={() => setBudget(budget === montant ? null : montant)}
                        aria-pressed={budget === montant}
                        className={`rounded-full border px-4 py-2 text-[0.72rem] transition-colors duration-300 ${
                          budget === montant
                            ? 'border-ocre bg-ocre text-encre'
                            : 'border-chaux/25 text-chaux/70 hover:border-chaux/60 hover:text-chaux'
                        }`}
                      >
                        {montant}
                      </button>
                    ))}
                  </div>
                </motion.fieldset>

                <motion.div variants={champ} className="relative">
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    required
                    placeholder=" "
                    className={`${styleChamp} resize-none`}
                  />
                  <label htmlFor="message" className={styleLabel}>
                    Votre lieu, en quelques lignes
                  </label>
                  <FiletFocus />
                </motion.div>

                <motion.div variants={champ}>
                  <button
                    type="submit"
                    className="group relative w-full overflow-hidden border border-chaux/30 px-8 py-5 text-[0.72rem] font-medium uppercase tracking-[0.22em] sm:w-auto"
                  >
                    {/* Remplissage qui monte au survol, sans changer la hauteur du bouton. */}
                    <span className="absolute inset-0 translate-y-full bg-terracotta transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-focus-visible:translate-y-0" />
                    <span className="relative">Envoyer le message</span>
                  </button>
                  <p className="mt-4 text-xs text-lin/50">
                    Démonstration : le formulaire n'envoie rien, il affiche seulement la
                    confirmation.
                  </p>
                </motion.div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
