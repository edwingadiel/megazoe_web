/**
 * Spanish book name → bolls.life book number mapping (RV1960)
 * Numbers follow standard Protestant canon order: 1–66
 */
export const BOOK_NUMBER: Record<string, number> = {
  // AT
  'Génesis': 1, 'Éxodo': 2, 'Levítico': 3, 'Números': 4, 'Deuteronomio': 5,
  'Josué': 6, 'Jueces': 7, 'Rut': 8,
  '1 Samuel': 9, '2 Samuel': 10, '1 Reyes': 11, '2 Reyes': 12,
  '1 Crónicas': 13, '2 Crónicas': 14,
  'Esdras': 15, 'Nehemías': 16, 'Ester': 17,
  'Job': 18, 'Salmos': 19, 'Proverbios': 20, 'Eclesiastés': 21, 'Cantares': 22,
  'Isaías': 23, 'Jeremías': 24, 'Lamentaciones': 25, 'Ezequiel': 26, 'Daniel': 27,
  'Oseas': 28, 'Joel': 29, 'Amós': 30, 'Abdías': 31, 'Jonás': 32,
  'Miqueas': 33, 'Nahúm': 34, 'Habacuc': 35, 'Sofonías': 36,
  'Hageo': 37, 'Zacarías': 38, 'Malaquías': 39,
  // NT
  'Mateo': 40, 'Marcos': 41, 'Lucas': 42, 'Juan': 43, 'Hechos': 44,
  'Romanos': 45, '1 Corintios': 46, '2 Corintios': 47,
  'Gálatas': 48, 'Efesios': 49, 'Filipenses': 50, 'Colosenses': 51,
  '1 Tesalonicenses': 52, '2 Tesalonicenses': 53,
  '1 Timoteo': 54, '2 Timoteo': 55, 'Tito': 56, 'Filemón': 57,
  'Hebreos': 58, 'Santiago': 59,
  '1 Pedro': 60, '2 Pedro': 61, '1 Juan': 62, '2 Juan': 63, '3 Juan': 64,
  'Judas': 65, 'Apocalipsis': 66,
};
