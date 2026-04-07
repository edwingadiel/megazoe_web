// Single source of truth for biblical book lists
// Safe to import from both server and client components (no Node.js deps)

export const BIBLICAL_ORDER: string[] = [
  // AT
  'Génesis', 'Éxodo', 'Levítico', 'Números', 'Deuteronomio',
  'Josué', 'Jueces', 'Rut',
  '1 Samuel', '2 Samuel', '1 Reyes', '2 Reyes', '1 Crónicas', '2 Crónicas',
  'Esdras', 'Nehemías', 'Ester',
  'Job', 'Salmos', 'Proverbios', 'Eclesiastés', 'Cantares',
  'Isaías', 'Jeremías', 'Lamentaciones', 'Ezequiel', 'Daniel',
  'Oseas', 'Amós', 'Jonás', 'Miqueas', 'Nahúm', 'Habacuc', 'Sofonías', 'Hageo', 'Zacarías', 'Malaquías',
  // NT
  'Mateo', 'Marcos', 'Lucas', 'Juan', 'Hechos',
  'Romanos', '1 Corintios', '2 Corintios', 'Gálatas', 'Efesios', 'Filipenses', 'Colosenses',
  '1 Tesalonicenses', '2 Tesalonicenses', '1 Timoteo', '2 Timoteo', 'Tito', 'Filemón',
  'Hebreos', 'Santiago', '1 Pedro', '2 Pedro', '1 Juan', '2 Juan', '3 Juan', 'Judas', 'Apocalipsis',
];

// AT books as a Set — everything before 'Mateo' (first NT book)
export const AT_BOOKS = new Set(BIBLICAL_ORDER.slice(0, BIBLICAL_ORDER.indexOf('Mateo')));
