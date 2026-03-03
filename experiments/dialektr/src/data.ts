import type { DialektWord, AustriaState } from './types';

export const STATE_LABELS: Record<AustriaState, string> = {
  wien: 'Wien',
  niederoesterreich: 'Niederösterreich',
  oberoesterreich: 'Oberösterreich',
  salzburg: 'Salzburg',
  tirol: 'Tirol',
  vorarlberg: 'Vorarlberg',
  steiermark: 'Steiermark',
  kaernten: 'Kärnten',
  burgenland: 'Burgenland',
  allgemein: 'Österreich (allgemein)',
};

// Simplified SVG paths for Austria's 9 states (approximate outlines, viewBox 0 0 460 240)
export const AUSTRIA_SVG = {
  viewBox: '0 0 460 240',
  states: {
    vorarlberg:        'M 20,88 L 44,64 L 49,87 L 44,136 L 20,144 Z',
    tirol:             'M 44,64 L 96,36 L 108,18 L 130,25 L 170,50 L 182,57 L 182,83 L 174,97 L 158,119 L 140,129 L 116,137 L 88,141 L 63,141 L 44,136 L 49,87 Z',
    salzburg:          'M 170,50 L 200,42 L 215,53 L 221,67 L 222,91 L 216,108 L 198,118 L 182,117 L 174,97 L 182,83 L 182,57 Z',
    oberoesterreich:   'M 170,50 L 182,57 L 182,83 L 174,97 L 158,119 L 145,109 L 126,103 L 104,96 L 99,82 L 108,58 L 136,38 L 162,32 Z',
    niederoesterreich: 'M 162,32 L 136,38 L 108,58 L 99,82 L 104,96 L 126,103 L 145,109 L 158,119 L 174,97 L 198,118 L 216,108 L 236,113 L 263,109 L 296,113 L 328,109 L 357,89 L 373,73 L 380,53 L 361,33 L 329,23 L 291,17 L 261,17 L 226,20 L 196,23 Z',
    wien:              'M 357,68 L 370,60 L 378,68 L 372,81 L 360,83 Z',
    burgenland:        'M 372,81 L 378,68 L 391,68 L 403,82 L 407,101 L 406,141 L 395,156 L 377,149 L 367,129 L 368,104 Z',
    steiermark:        'M 158,119 L 174,97 L 198,118 L 216,108 L 236,113 L 263,109 L 296,113 L 328,109 L 357,89 L 367,104 L 368,129 L 354,151 L 330,166 L 299,169 L 269,166 L 241,163 L 219,159 L 200,155 L 185,149 Z',
    kaernten:          'M 99,141 L 116,137 L 140,129 L 158,119 L 185,149 L 200,155 L 219,159 L 216,176 L 200,183 L 175,186 L 147,183 L 117,173 L 94,161 L 81,149 Z',
  } as Record<string, string>,
};

// -----------------------------------------------------------------------
// WÖRTERLISTE — hier können neue Wörter leicht hinzugefügt werden
// -----------------------------------------------------------------------
export const WORDS: DialektWord[] = [
  {
    id: 'paradeiser',
    word: 'Paradeiser',
    translation: 'Tomate',
    alternates: ['Tomaten'],
    description:
      'Klassisch österreichisch für Tomate. Der Name leitet sich vom alten Ausdruck "Paradiesapfel" ab — die Frucht galt einst als Delikatesse aus dem Paradies. In ganz Österreich und Südtirol verwendet, während Deutschland "Tomate" sagt.',
    region: 'allgemein',
    dialectGroup: 'Österreichisch',
    example: 'Kannst du noch Paradeiser für den Salat kaufen?',
  },
  {
    id: 'erdaepfel',
    word: 'Erdäpfel',
    translation: 'Kartoffel',
    alternates: ['Kartoffeln'],
    description:
      'Wörtlich "Erdapfel" — die Knolle, die aus der Erde wächst. Dieser Ausdruck ist typisch für Österreich und die Schweiz. In Deutschland dominiert "Kartoffel", im Süden findet man auch "Erdbirne".',
    region: 'allgemein',
    dialectGroup: 'Österreichisch',
    example: 'Heute gibt es gebratene Erdäpfel mit Speck.',
  },
  {
    id: 'marille',
    word: 'Marille',
    translation: 'Aprikose',
    alternates: ['Aprikosen'],
    description:
      'Das österreichische Wort für Aprikose, vom Venezianischen "armellino". Die Wachauer Marille aus Niederösterreich ist besonders berühmt und hat eine geschützte Ursprungsbezeichnung. In Deutschland unbekannt — dort sagt man Aprikose.',
    region: 'niederoesterreich',
    dialectGroup: 'Österreichisch',
    example: 'Aus Marillen macht man in der Wachau den besten Schnaps.',
  },
  {
    id: 'topfen',
    word: 'Topfen',
    translation: 'Quark',
    alternates: ['Magerquark', 'Frischkäse'],
    description:
      'Österreichisches Wort für Quark/Frischkäse, kommt vom Drücken und Abtropfen des Käses. Topfen ist Grundzutat in der österreichischen Mehlspeisküche — für Topfenknödel, Topfenstrudel und Palatschinken.',
    region: 'allgemein',
    dialectGroup: 'Österreichisch',
    example: 'Für den Strudel brauchst du frischen Topfen.',
  },
  {
    id: 'schlagobers',
    word: 'Schlagobers',
    translation: 'Schlagsahne',
    alternates: ['Sahne', 'Rahm'],
    description:
      '"Obers" ist das österreichische Wort für Sahne. Im Wiener Kaffeehaus ist Schlagobers unverzichtbar — ein Einspänner oder eine Melange ohne Schlagobers wäre undenkbar. Das Wort "Obers" kommt von "obere Schicht der Milch".',
    region: 'wien',
    dialectGroup: 'Wienerisch',
    example: 'Zwei Melange und dazu Schlagobers, bitte!',
  },
  {
    id: 'kren',
    word: 'Kren',
    translation: 'Meerrettich',
    description:
      'Aus dem Slawischen entlehnt (tschech. "křen"). Kren ist eine wichtige Zutat der österreichischen Küche — besonders zu Tafelspitz, Beinschinken oder Liptauer. Man sagt, der Name der Stadt Krems an der Donau könnte damit zusammenhängen.',
    region: 'allgemein',
    dialectGroup: 'Österreichisch',
    example: 'Frischer Kren zum Tafelspitz — da wird mir ganz warm ums Herz.',
  },
  {
    id: 'hendl',
    word: 'Hendl',
    translation: 'Hähnchen',
    alternates: ['Huhn', 'Brathuhn', 'Grillhähnchen'],
    description:
      'Von mittelhochdeutsch "henne" — ein junges Huhn. Das gegrillte Hendl ist ein klassisches österreichisches Volksgericht. Am Wiener Prater und auf Volksfesten ist das "Hendl von der Stange" vom Drehspieß der Klassiker schlechthin.',
    region: 'allgemein',
    dialectGroup: 'Bairisch-Österreichisch',
    example: 'Ein halbes Hendl und ein großes Bier, bitte!',
  },
  {
    id: 'oida',
    word: 'Oida',
    translation: 'Alter',
    alternates: ['Hey', 'Mensch', 'Mann', 'Leute'],
    description:
      'Der wohl vielseitigste Ausdruck des Wienerischen — kommt von "alter". Je nach Betonung kann er Überraschung, Missbilligung, Begeisterung oder eine Anrede bedeuten. Die Wiener Linien haben sogar Ansagen damit gemacht.',
    region: 'wien',
    dialectGroup: 'Wienerisch',
    example: 'Oida, des hast du echt super gmacht!',
  },
  {
    id: 'hawara',
    word: 'Hawara',
    translation: 'Freund',
    alternates: ['Kumpel', 'Kollege'],
    description:
      'Wienerisch für einen guten Freund. Kommt aus dem Rotwelsch, möglicherweise über Jiddisch von hebräisch "chaver" (Kamerad). "Mein Hawara" ist eine herzliche Bezeichnung für einen engen Vertrauten.',
    region: 'wien',
    dialectGroup: 'Wienerisch',
    example: 'Das is mein bester Hawara, den kenn ich scho seit der Volksschule.',
  },
  {
    id: 'baba',
    word: 'Baba',
    translation: 'Tschüss',
    alternates: ['Auf Wiedersehen', 'Servus', 'Tschau'],
    description:
      'Lockerer Abschiedsgruß im Wienerischen und Niederösterreichischen. Von Babysprache für "Ade". "Baba und pfiat di!" (Tschüss und behüt dich Gott) ist eine beliebte Abschiedsformel auf dem Land.',
    region: 'wien',
    dialectGroup: 'Wienerisch',
    example: 'So, ich muss jetzt — baba und bis nächste Woche!',
  },
  {
    id: 'watschn',
    word: 'Watschn',
    translation: 'Ohrfeige',
    alternates: ['Schlag', 'Klaps', 'Klatsche'],
    description:
      'Bezeichnet eine Ohrfeige oder einen kräftigen Schlag ins Gesicht. Auch metaphorisch: "Das war eine Watschn für ihn" bedeutet eine empfindliche Niederlage. Als Verb: "jemanden watschn".',
    region: 'allgemein',
    dialectGroup: 'Österreichisch',
    example: 'Wenn du das noch einmal machst, kriegst eine Watschn!',
  },
  {
    id: 'tschik',
    word: 'Tschik',
    translation: 'Zigarette',
    alternates: ['Kippe', 'Glimmstängel', 'Zigarettenstummel'],
    description:
      'Wienerischer Slangausdruck für Zigarette, besonders auch für den Stummel. Herkunft unsicher — möglicherweise aus dem Türkischen oder Rotwelsch. "Hast a Tschik?" ist ein klassischer Wiener Gesprächseinstieg.',
    region: 'wien',
    dialectGroup: 'Wienerisch',
    example: 'Hast du vielleicht eine Tschik für mich?',
  },
  {
    id: 'semmel',
    word: 'Semmel',
    translation: 'Brötchen',
    alternates: ['Brötchen', 'Schrippe', 'Wecken'],
    description:
      'In Österreich und Bayern sagt man Semmel, in Norddeutschland Brötchen, in Berlin Schrippe. Das Wort kommt vom Lateinischen "simila" (feines Weizenmehl). Die Kaisersemmel mit ihren vier Einschnitten ist das bekannteste österreichische Backwerk.',
    region: 'allgemein',
    dialectGroup: 'Österreichisch',
    example: 'Kannst du beim Bäcker vier Semmeln holen?',
  },
  {
    id: 'powidl',
    word: 'Powidl',
    translation: 'Pflaumenmus',
    alternates: ['Zwetschkenmus', 'Zwetschgenmus'],
    description:
      'Aus dem Tschechischen "povidla". Dunkles, dickflüssiges Zwetschkenmus — unverzichtbar für Buchteln, Palatschinken und Powidltascherln. Als Ausdruck: "Des ist mir Powidl!" bedeutet "Das ist mir egal!" — wie ein Schulterzucken.',
    region: 'niederoesterreich',
    dialectGroup: 'Niederösterreichisch',
    example: 'Die Palatschinken schmecken am besten mit Powidl.',
  },
  {
    id: 'palatschinken',
    word: 'Palatschinken',
    translation: 'Pfannkuchen',
    alternates: ['Crêpe', 'Eierkuchen'],
    description:
      'Aus dem Ungarischen "palacsinta", das vom Lateinischen "placenta" (Kuchen) kommt. Dünne, gefüllte Pfannkuchen mit Marmelade, Nussfülle oder Topfen — ein Klassiker der österreichischen Mehlspeisküche.',
    region: 'allgemein',
    dialectGroup: 'Österreichisch',
    example: 'Palatschinken mit Marillenmarmelade — das ist Sonntag!',
  },
  {
    id: 'jause',
    word: 'Jause',
    translation: 'Imbiss',
    alternates: ['Snack', 'Zwischenmahlzeit', 'Brotzeit'],
    description:
      'Eine kleine Mahlzeit zwischen den Hauptmahlzeiten, aus dem Slawischen. Die klassische Jause: Brot, Käse, Wurst und ein Glas Wein. Eine "Almjause" ist der rustikale Snack auf der Almhütte — Speck, Käse, Schwarzbrot.',
    region: 'allgemein',
    dialectGroup: 'Österreichisch',
    example: 'Um drei machen wir kurz Jausenpause.',
  },
  {
    id: 'sackerl',
    word: 'Sackerl',
    translation: 'Tüte',
    alternates: ['Beutel', 'Plastiktüte'],
    description:
      'Verkleinerungsform von "Sack". In Österreich ist die Tüte beim Bäcker oder Supermarkt immer ein Sackerl. "Sackerl für Sackerl" bedeutet nach und nach. Ein "Kotzsackerl" ist eine Spucktüte.',
    region: 'allgemein',
    dialectGroup: 'Österreichisch',
    example: 'Brauchst du ein Sackerl für die Einkäufe?',
  },
  {
    id: 'nockerln',
    word: 'Nockerln',
    translation: 'Klößchen',
    alternates: ['Knödel', 'Spätzle', 'Gnocchi'],
    description:
      'Kleine Teigklöße. Die "Salzburger Nockerln" sind ein berühmtes Dessert — zarte, aufgebackene Eiweißnocken, die die drei Salzburger Stadtberge (Mönchsberg, Kapuzinerberg, Gaisberg) symbolisieren sollen.',
    region: 'salzburg',
    dialectGroup: 'Salzburgerisch',
    example: 'Die Salzburger Nockerln muss man gleich essen, sonst fallen sie zusammen.',
  },
  {
    id: 'sturm',
    word: 'Sturm',
    translation: 'Federweißer',
    alternates: ['Neuer Wein', 'Jungwein', 'Traubenmost'],
    description:
      'Der noch gärende Traubenmost kurz bevor er zu Wein wird — trüb, leicht alkoholisch, süß. Beim Wiener Heurigen im Herbst ein Pflichtgetränk. Die "Sturm-Saison" dauert nur wenige Wochen, da er sehr verderblich ist.',
    region: 'niederoesterreich',
    dialectGroup: 'Niederösterreichisch',
    example: 'Beim Heurigen trinken wir Sturm und essen Laugenbrezeln.',
  },
  {
    id: 'foehn',
    word: 'Föhn',
    translation: 'Warmwind',
    alternates: ['Fallwind', 'Südwind', 'Alpenwind'],
    description:
      'Warmer Fallwind aus den Alpen, in Tirol und Salzburg wohlbekannt. Er bringt klare Fernsicht und plötzliche Wärme, aber auch "Föhnkopfweh". Der Name kommt vom Lateinischen "Favonius". Im Hochdeutschen ist "Föhn" auch das Wort für Haartrockner.',
    region: 'tirol',
    dialectGroup: 'Tirolerisch',
    example: 'Heute ist Föhn — man sieht die Berge so klar wie selten.',
  },
  {
    id: 'heurigen',
    word: 'Heurigen',
    translation: 'Straußwirtschaft',
    alternates: ['Winzerlokal', 'Weinstube', 'Weinlokal'],
    description:
      'Ein Weinlokal beim Weinbauern, der seinen eigenen Wein ausschenkt. "Heurig" bedeutet "von diesem Jahr". Kaiser Joseph II. erlaubte 1784 Winzern, ihren Wein selbst auszuschenken. Erkennbar am Tannenzweig über der Tür.',
    region: 'wien',
    dialectGroup: 'Wienerisch',
    example: 'Wir gehen am Samstag auf den Heurigen nach Grinzing.',
  },
  {
    id: 'feschak',
    word: 'Feschak',
    translation: 'Schönling',
    alternates: ['Frauenschwarm', 'Charmeur', 'Sunnyboy'],
    description:
      'Von "fesch" (attraktiv, schick) + Suffix "-ak". Ein Feschak ist ein gutaussehender, charmanter Mann, der sich seiner Wirkung bewusst ist. Der Ausdruck hat einen leicht ironischen Unterton.',
    region: 'wien',
    dialectGroup: 'Wienerisch',
    example: 'Der neue Nachbar ist ein richtiger Feschak.',
  },
  {
    id: 'zwicken',
    word: 'Zwicken',
    translation: 'Kneifen',
    alternates: ['Klemmen', 'Zwacken'],
    description:
      'Jemanden mit den Fingern kneifen. Als Substantiv: "ein Zwicken im Bauch" ist ein stechender Schmerz. In der Architektur ist der "Zwickel" ein dreieckiges Füllstück — dasselbe Grundwort.',
    region: 'allgemein',
    dialectGroup: 'Österreichisch',
    example: 'Hör auf, mich zu zwicken — das tut weh!',
  },
  {
    id: 'pfuetze',
    word: 'Pfütze',
    translation: 'Lache',
    alternates: ['Wasserpfütze', 'Regenpfütze'],
    description:
      'Interessant umgekehrt: In Österreich sagt man für eine Wasserlache "Lacke" (nicht Pfütze wie in Deutschland). "Lacke" kommt vom Lateinischen "lacus" (See). Wer in eine Lacke tritt, wird nass.',
    region: 'allgemein',
    dialectGroup: 'Österreichisch',
    example: 'Pass auf, da ist eine Lacke — du wirst nass!',
  },
];

export function getRandomWord(excludeId?: string): DialektWord {
  const pool = excludeId ? WORDS.filter((w) => w.id !== excludeId) : WORDS;
  const available = pool.length > 0 ? pool : WORDS;
  return available[Math.floor(Math.random() * available.length)];
}
