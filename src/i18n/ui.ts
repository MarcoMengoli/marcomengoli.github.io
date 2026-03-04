export const languages = {
  en: "English",
  it: "Italiano",
} as const;

export const defaultLang = "en" as const;

export const ui = {
  en: {
    // Navigation
    "nav.about": "About",
    "nav.experience": "Experience",
    "nav.skills": "Skills",
    "nav.contact": "Contact",
    "nav.blog": "Blog",

    // Hero
    "hero.greeting": "Hi, I'm",
    "hero.name": "Marco Mengoli",
    "hero.title": "Senior Software Engineer",
    "hero.subtitle":
      "I design and build distributed systems, event-driven architectures, and real-time platforms.",
    "hero.cta.contact": "Get in touch",
    "hero.cta.cv": "Download CV",
    "hero.scroll": "Scroll down",

    // About
    "about.heading": "About Me",
    "about.p1":
      "Senior Software Engineer at YOOX NET-A-PORTER, where I design distributed microservices and event-driven architectures for luxury e-commerce at global scale.",
    "about.p2":
      "Previously at IMA S.p.A., I built real-time SCADA systems and HMI software for pharmaceutical production lines, achieving sub-20ms refresh rates through immutable, lock-free architectures.",
    "about.p3":
      "I also have a parallel career as a Live Systems Engineer for national TV broadcasts and events, and volunteer experience monitoring the Garisenda Tower in Bologna.",
    "about.p4":
      "Master's degree in Computer Engineering from the University of Bologna. I think in flows and boundaries, design integration patterns, and own systems end-to-end from architecture to production.",
    "about.interests.motorsport": "Motorsport",
    "about.interests.diving": "Diving",
    "about.interests.cooking": "Cooking",
    "about.interests.travel": "Travel",

    // Experience
    "experience.heading": "Experience",
    "experience.present": "Present",

    // Skills
    "skills.heading": "Skills & Technologies",

    // Contact
    "contact.heading": "Get In Touch",
    "contact.text":
      "I'm always open to discussing distributed systems, architecture challenges, or new opportunities. Feel free to reach out.",
    "contact.email": "Send an email",

    // Footer
    "footer.rights": "All rights reserved.",
    "footer.built": "Built with",

    // Theme
    "theme.light": "Switch to light mode",
    "theme.dark": "Switch to dark mode",

    // Language
    "lang.switch": "Cambia lingua",
  },
  it: {
    // Navigation
    "nav.about": "Chi Sono",
    "nav.experience": "Esperienza",
    "nav.skills": "Competenze",
    "nav.contact": "Contatti",
    "nav.blog": "Blog",

    // Hero
    "hero.greeting": "Ciao, sono",
    "hero.name": "Marco Mengoli",
    "hero.title": "Senior Software Engineer",
    "hero.subtitle":
      "Progetto e costruisco sistemi distribuiti, architetture event-driven e piattaforme real-time.",
    "hero.cta.contact": "Contattami",
    "hero.cta.cv": "Scarica CV",
    "hero.scroll": "Scorri verso il basso",

    // About
    "about.heading": "Chi Sono",
    "about.p1":
      "Senior Software Engineer presso YOOX NET-A-PORTER, dove progetto microservizi distribuiti e architetture event-driven per l'e-commerce di lusso su scala globale.",
    "about.p2":
      "In precedenza presso IMA S.p.A., ho realizzato sistemi SCADA real-time e software HMI per linee di produzione farmaceutiche, raggiungendo tempi di refresh inferiori ai 20ms grazie ad architetture immutabili e lock-free.",
    "about.p3":
      "Ho anche una carriera parallela come Tecnico Sistemi Live per trasmissioni TV nazionali ed eventi, e un'esperienza di volontariato nel monitoraggio della Torre Garisenda a Bologna.",
    "about.p4":
      "Laurea magistrale in Ingegneria Informatica all'Universita' di Bologna. Ragiono in flussi e confini, progetto pattern di integrazione e gestisco i sistemi end-to-end dall'architettura alla produzione.",
    "about.interests.motorsport": "Motorsport",
    "about.interests.diving": "Immersioni",
    "about.interests.cooking": "Cucina",
    "about.interests.travel": "Viaggi",

    // Experience
    "experience.heading": "Esperienza",
    "experience.present": "Presente",

    // Skills
    "skills.heading": "Competenze & Tecnologie",

    // Contact
    "contact.heading": "Contattami",
    "contact.text":
      "Sono sempre disponibile a discutere di sistemi distribuiti, sfide architetturali o nuove opportunita'. Non esitare a contattarmi.",
    "contact.email": "Invia un'email",

    // Footer
    "footer.rights": "Tutti i diritti riservati.",
    "footer.built": "Costruito con",

    // Theme
    "theme.light": "Passa alla modalita' chiara",
    "theme.dark": "Passa alla modalita' scura",

    // Language
    "lang.switch": "Switch language",
  },
} as const;

export type UIKey = keyof (typeof ui)[typeof defaultLang];
