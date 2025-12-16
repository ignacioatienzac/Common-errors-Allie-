import { ErrorItem, PracticeText, TextToken } from './types';

export const ERROR_CATALOG: ErrorItem[] = [
  { id: '1', incorrect: 'Estioma', correct: 'Estimado', category: 'Léxico', explanation: 'Spelling error in formal greetings.' },
  { id: '2', incorrect: 'despuesto', correct: 'después', category: 'Léxico', explanation: 'Fossilized error. The correct form is "después".' },
  { id: '3', incorrect: 'caro', correct: 'calor', category: 'Léxico', explanation: 'Phonetic confusion. "Caro" means expensive, "Calor" means heat.' },
  { id: '4', incorrect: 'manayunda', correct: 'desayuno', category: 'Léxico', explanation: 'Phonetic invention. The morning meal is "desayuno".' },
  { id: '5', incorrect: 'comprender', correct: 'comprar', category: 'Léxico', explanation: 'Verb confusion. To buy = comprar.' },
  { id: '6', incorrect: 'gante', correct: 'grande', category: 'Léxico', explanation: 'Phonetic error, missing letters.' },
  { id: '7', incorrect: 'moneda', correct: 'dinero', category: 'Léxico', explanation: 'Incorrect usage. "Dinero" is the general term for money.' },
  { id: '8', incorrect: 'Voy escriber', correct: 'Voy a escribir', category: 'Gramática', explanation: 'Missing preposition "a" in the structure Ir + a + Infinitive.' },
  { id: '9', incorrect: 'escriber', correct: 'escribir', category: 'Gramática', explanation: 'Incorrect infinitive ending.' },
  { id: '10', incorrect: 'me lavanto', correct: 'me levanto', category: 'Gramática', explanation: 'Vowel conjugation error.' },
  { id: '11', incorrect: 'Dice es mi', correct: 'Digo que es / Esta es', category: 'Gramática', explanation: 'Incorrect subject conjugation (3rd person instead of 1st).' },
  { id: '12', incorrect: 'mi vacacion', correct: 'mis vacaciones', category: 'Concordancia', explanation: 'Generally used in plural "vacaciones".' },
  { id: '13', incorrect: 'del examenes', correct: 'de los exámenes', category: 'Concordancia', explanation: 'Number error in the article.' },
  { id: '14', incorrect: 'mi viaja', correct: 'mi viaje', category: 'Concordancia', explanation: 'Gender error. "Viaje" is masculine.' },
  { id: '15', incorrect: 'manga carto', correct: 'manga corta', category: 'Concordancia', explanation: 'Agreement error. "Manga" is feminine.' },
  { id: '16', incorrect: 'Dieciembre', correct: 'diciembre', category: 'Ortografía', explanation: 'Incorrect diphthong and unnecessary capitalization.' },
  { id: '17', incorrect: 'diá', correct: 'día', category: 'Ortografía', explanation: 'The accent mark must be on the i to break the hiatus.' },
  { id: '18', incorrect: 'anté', correct: 'antes', category: 'Ortografía', explanation: 'Spelling error.' },
  { id: '19', incorrect: 'camista', correct: 'camiseta', category: 'Ortografía', explanation: 'Letter omission.' },
  { id: '20', incorrect: 'Las siete', correct: 'A las siete', category: 'Preposiciones', explanation: 'Missing preposition "A" to indicate time.' },
  { id: '21', incorrect: 'de el', correct: 'del', category: 'Preposiciones', explanation: 'Missing mandatory contraction (de + el = del).' },
  { id: '22', incorrect: 'a el', correct: 'al', category: 'Preposiciones', explanation: 'Missing mandatory contraction (a + el = al).' },
  { id: '23', incorrect: 'gafa del sol', correct: 'gafas de sol', category: 'Preposiciones', explanation: 'Incorrect use of the article "del".' },
];

// Helper to create tokens easily
const t = (text: string, correct?: string): TextToken => ({
  id: Math.random().toString(36).substr(2, 9),
  text,
  isError: !!correct,
  correction: correct
});

export const PRACTICE_TEXTS: PracticeText[] = [
  {
    id: 1,
    title: "Texto 1: Una carta",
    tokens: [
      t("Estioma", "Estimado"), t(" profesor,"), t(" "), t("Voy", "Voy a"), t(" "), t("escriber", "escribir"), t(" esta carta en "), t("Dieciembre", "diciembre"), t(".")
    ]
  },
  {
    id: 2,
    title: "Texto 2: La Rutina",
    tokens: [
      t("Las siete y media", "A las siete y media"), t(" "), t("me lavanto", "me levanto"), t(" y "), t("despuesto", "después"), t(" tomo mi "), t("manayunda", "desayuno"), t(".")
    ]
  },
  {
    id: 3,
    title: "Texto 3: El Clima",
    tokens: [
      t("Hace mucho "), t("caro", "calor"), t(" hoy."), t(" "), t("Voy", "Voy a"), t(" "), t("llevar", "llevar"), t(" una "), t("camista", "camiseta"), t(" de "), t("manga carto", "manga corta"), t(".")
    ]
  },
  {
    id: 4,
    title: "Texto 4: De compras",
    tokens: [
      t("Quiero "), t("comprender", "comprar"), t(" un bolso "), t("gante", "grande"), t(" pero no tengo suficiente "), t("moneda", "dinero"), t(".")
    ]
  },
  {
    id: 5,
    title: "Texto 5: Planes",
    tokens: [
      t("Vamos ver", "Vamos a ver"), t(" qué pasa con "), t("mi viaja", "mi viaje"), t(" a España "), t("anté", "antes"), t(" del verano.")
    ]
  },
  {
    id: 6,
    title: "Texto 6: Vacaciones",
    tokens: [
      t("Durante "), t("mi vacacion", "mis vacaciones"), t(", descansaré "), t("despuesto", "después"), t(" "), t("del examenes", "de los exámenes"), t(" finales.")
    ]
  },
  {
    id: 7,
    title: "Texto 7: El Hotel",
    tokens: [
      t("Salimos "), t("de el hotel", "del hotel"), t(" muy temprano para ir "), t("a el hotel", "al hotel"), t(" de la playa.")
    ]
  },
  {
    id: 8,
    title: "Texto 8: Accesorios",
    tokens: [
      t("Olvidé mis "), t("gafa del sol", "gafas de sol"), t(" y ahora hace mucho sol en el "), t("diá", "día"), t(".")
    ]
  },
  {
    id: 9,
    title: "Texto 9: Horarios",
    tokens: [
      t("Las ocho y media", "A las ocho y media"), t(" tenemos clase, "), t("tambien", "también"), t(" necesito estudiar "), t("anté", "antes"), t(" de ir.")
    ]
  },
  {
    id: 10,
    title: "Texto 10: Conclusión",
    tokens: [
      t("Dice es mi", "Digo que es mi / Esta es mi"), t(" mejor amiga."), t(" "), t("Voy", "Voy a"), t(" "), t("escriber", "escribir"), t(" sobre ella "), t("despue to", "después"), t(".")
    ]
  }
];