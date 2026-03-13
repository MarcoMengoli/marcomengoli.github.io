import type { Lang } from "@/i18n/utils";

export interface ExperienceEntry {
  company: string;
  role: Record<Lang, string>;
  period: string;
  description: Record<Lang, string>;
  highlights: Record<Lang, string[]>;
  technologies: string[];
  type: "engineering" | "live-systems" | "volunteer";
}

export const experiences: ExperienceEntry[] = [
  {
    company: "YOOX NET-A-PORTER GROUP",
    role: {
      en: "Senior Software Engineer",
      it: "Senior Software Engineer",
    },
    period: "2020 - Present",
    description: {
      en: "Distributed systems, event-driven architectures, and legacy modernization for luxury e-commerce at global scale.",
      it: "Sistemi distribuiti, architetture event-driven e modernizzazione legacy per e-commerce di lusso su scala globale.",
    },
    highlights: {
      en: [
        "Designed compatibility layer for critical inventory/catalog migration across tens of millions of records",
        "Building new Order Management System from the ground up",
        "Member of cross-domain technical councils and CTO-sponsored AI adoption task force",
        "Mentoring engineers from junior to senior level",
      ],
      it: [
        "Progettato layer di compatibilita' per migrazione critica inventario/catalogo su decine di milioni di record",
        "Costruzione del nuovo sistema di gestione ordini da zero",
        "Membro di consigli tecnici cross-dominio e task force AI sponsorizzata dal CTO",
        "Mentoring di ingegneri da junior a senior",
      ],
    },
    technologies: [
      "C#",
      ".NET",
      "AWS Lambda",
      "ECS",
      "RabbitMQ",
      "SQS/SNS",
      "PostgreSQL",
      "MongoDB",
      "DynamoDB",
      "Docker",
      "GraphQL",
    ],
    type: "engineering",
  },
  {
    company: "IMA S.p.A.",
    role: {
      en: "Software Engineer",
      it: "Software Engineer",
    },
    period: "2016 - 2020",
    description: {
      en: "Real-time SCADA systems and HMI software for pharmaceutical packaging machinery.",
      it: "Sistemi SCADA real-time e software HMI per macchinari di confezionamento farmaceutico.",
    },
    highlights: {
      en: [
        "Proactively redesigned SCADA visualization: replaced legacy COM stack with modern backend + D3 frontend",
        "Achieved ~10-20ms refresh with stable CPU/RAM via immutability and lock-free design",
        "Master thesis: designed PLC language superset compiler (IEC 61131-3), automating SCADA artifact generation",
        "On-site deployment and FAT/SAT testing in pharmaceutical plants internationally",
      ],
      it: [
        "Riprogettazione proattiva visualizzazione SCADA: sostituito stack COM legacy con backend moderno + frontend D3",
        "Raggiunto refresh ~10-20ms con CPU/RAM stabili tramite immutabilita' e design lock-free",
        "Tesi magistrale: compilatore per superset linguaggio PLC (IEC 61131-3), automazione generazione artefatti SCADA",
        "Deployment on-site e test FAT/SAT in stabilimenti farmaceutici a livello internazionale",
      ],
    },
    technologies: [
      "C#",
      ".NET",
      "WPF",
      "D3.js",
      "SQL Server",
      "OPC-UA",
      "Real-time Systems",
    ],
    type: "engineering",
  },
  {
    company: "Studio DM",
    role: {
      en: "Live Systems Engineer",
      it: "Tecnico Sistemi Live",
    },
    period: "Parallel",
    description: {
      en: "Broadcast graphics and lighting control systems for national TV, sports events, and concerts.",
      it: "Sistemi di grafica broadcast e controllo luci per TV nazionale, eventi sportivi e concerti.",
    },
    highlights: {
      en: [
        "Managed real-time broadcast systems where failure had to be invisible",
        "Developed redundancy-first mindset for production-critical environments",
      ],
      it: [
        "Gestione sistemi broadcast real-time dove il guasto doveva essere invisibile",
        "Sviluppato mentalita' redundancy-first per ambienti production-critical",
      ],
    },
    technologies: [
      "Video Engineering",
      "Live Broadcast",
      "Lighting Control",
    ],
    type: "live-systems",
  },
  {
    company: "University of Bologna",
    role: {
      en: "Volunteer Researcher",
      it: "Collaboratore Volontario",
    },
    period: "Volunteer",
    description: {
      en: "Structural monitoring systems for the Garisenda Tower and solar vehicle telemetry tools.",
      it: "Sistemi di monitoraggio strutturale per la Torre Garisenda e strumenti di telemetria per veicolo solare.",
    },
    highlights: {
      en: [
        "GPS-based structural monitoring for the leaning Garisenda Tower in Bologna",
        "Solar-powered vehicle routing optimization tools",
      ],
      it: [
        "Monitoraggio strutturale basato su GPS per la Torre Garisenda inclinata a Bologna",
        "Strumenti di ottimizzazione routing per veicolo solare",
      ],
    },
    technologies: [
      "Embedded Systems",
      "GPS",
      "Python",
      "Raspberry Pi",
    ],
    type: "volunteer",
  },
];
