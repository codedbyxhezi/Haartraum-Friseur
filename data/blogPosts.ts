export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  date: string;
  category: string;
  readTime: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "haarpflege-nach-dem-friseurbesuch",
    title: "Haarpflege nach dem Friseurbesuch",
    excerpt:
      "So bleibt dein neuer Look länger frisch, glänzend und gesund.",
    date: "12. März 2026",
    category: "Haarpflege",
    readTime: "4 Min.",
    content: [
      "Nach einem Friseurbesuch sehen die Haare oft besonders frisch, gepflegt und glänzend aus. Damit dieser Look möglichst lange hält, ist die richtige Pflege zuhause entscheidend.",
      "Verwende ein mildes Shampoo, das zu deinem Haartyp passt. Zu häufiges Waschen kann die Haare austrocknen und die Kopfhaut reizen.",
      "Eine passende Spülung oder Maske hilft, Feuchtigkeit zu speichern und die Haarstruktur zu schützen. Besonders bei gefärbtem Haar ist regelmäßige Pflege wichtig.",
      "Auch Hitze sollte reduziert werden. Nutze beim Föhnen, Glätten oder Locken immer einen Hitzeschutz.",
    ],
  },
  {
    slug: "balayage-oder-straehnen",
    title: "Balayage oder Strähnen?",
    excerpt:
      "Was passt besser zu dir? Wir erklären die wichtigsten Unterschiede.",
    date: "20. März 2026",
    category: "Farbe",
    readTime: "5 Min.",
    content: [
      "Balayage und klassische Strähnen gehören zu den beliebtesten Farbtechniken im Salon. Beide sorgen für mehr Tiefe und Dimension im Haar.",
      "Balayage wirkt meist natürlicher, weil die Farbe freihändig aufgetragen wird. Dadurch entstehen weiche Übergänge.",
      "Klassische Strähnen sind oft gleichmäßiger und können stärker sichtbar sein. Sie eignen sich gut, wenn ein klarer Blond-Effekt gewünscht ist.",
      "Welche Technik besser passt, hängt von deinem Haartyp, deiner Wunschfarbe und deinem Pflegeaufwand ab.",
    ],
  },
  {
    slug: "wie-oft-spitzen-schneiden",
    title: "Wie oft sollte man Spitzen schneiden?",
    excerpt:
      "Regelmäßiges Schneiden hilft, gesundes und gepflegtes Haar zu behalten.",
    date: "28. März 2026",
    category: "Tipps",
    readTime: "3 Min.",
    content: [
      "Viele fragen sich, wie oft die Spitzen geschnitten werden sollten. Die Antwort hängt stark von Haarlänge, Haarstruktur und Styling-Gewohnheiten ab.",
      "Bei kurzen Frisuren empfiehlt sich oft ein Termin alle vier bis sechs Wochen, damit die Form erhalten bleibt.",
      "Bei langen Haaren reicht häufig ein Schnitt alle acht bis zwölf Wochen, besonders wenn die Haare gesund sind.",
      "Wer häufig Hitze nutzt oder gefärbtes Haar hat, sollte die Spitzen regelmäßiger kontrollieren lassen.",
    ],
  },
];