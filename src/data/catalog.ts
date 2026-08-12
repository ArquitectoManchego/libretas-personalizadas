import { DesignItem } from '../types';

// High quality transparent SVG data URIs for Hello Kitty, My Melody, and Harry Potter Shields
export const CHARACTER_OPTIONS = [
  {
    id: 'hello_kitty_pink',
    name: 'Hello Kitty Moño Rojo',
    category: 'infantil',
    svg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><g transform="translate(20,20)"><ellipse cx="80" cy="80" rx="65" ry="50" fill="%23FFFFFF" stroke="%23333333" stroke-width="6"/><ellipse cx="50" cy="80" rx="7" ry="9" fill="%23333333"/><ellipse cx="110" cy="80" rx="7" ry="9" fill="%23333333"/><ellipse cx="80" cy="92" rx="8" ry="5" fill="%23FFD100"/><line x1="20" y1="75" x2="0" y2="70" stroke="%23333333" stroke-width="4" stroke-linecap="round"/><line x1="20" y1="85" x2="-5" y2="85" stroke="%23333333" stroke-width="4" stroke-linecap="round"/><line x1="20" y1="95" x2="0" y2="100" stroke="%23333333" stroke-width="4" stroke-linecap="round"/><line x1="140" y1="75" x2="160" y2="70" stroke="%23333333" stroke-width="4" stroke-linecap="round"/><line x1="140" y1="85" x2="165" y2="85" stroke="%23333333" stroke-width="4" stroke-linecap="round"/><line x1="140" y1="95" x2="160" y2="100" stroke="%23333333" stroke-width="4" stroke-linecap="round"/><path d="M 30,45 Q 25,15 45,25 Q 60,35 45,48 Z" fill="%23FFFFFF" stroke="%23333333" stroke-width="5"/><path d="M 130,45 Q 135,15 115,25 Q 100,35 115,48 Z" fill="%23FFFFFF" stroke="%23333333" stroke-width="5"/><g transform="translate(100, 20) rotate(-15)"><ellipse cx="15" cy="15" rx="14" ry="12" fill="%23FF2D55" stroke="%23333333" stroke-width="4"/><ellipse cx="-10" cy="15" rx="14" ry="12" fill="%23FF2D55" stroke="%23333333" stroke-width="4"/><circle cx="2.5" cy="15" r="7" fill="%23FF2D55" stroke="%23333333" stroke-width="4"/></g></g></svg>`
  },
  {
    id: 'my_melody_sweet',
    name: 'My Melody Capucha Rosa',
    category: 'infantil',
    svg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><g transform="translate(20,10)"><path d="M 25 80 C 10 0, 70 0, 60 70 Z" fill="%23FF85A2" stroke="%23333333" stroke-width="5"/><path d="M 135 80 C 150 0, 90 0, 100 70 Z" fill="%23FF85A2" stroke="%23333333" stroke-width="5"/><ellipse cx="80" cy="100" rx="60" ry="55" fill="%23FF85A2" stroke="%23333333" stroke-width="5"/><ellipse cx="80" cy="105" rx="42" ry="35" fill="%23FFFFFF" stroke="%23333333" stroke-width="4"/><ellipse cx="60" cy="102" rx="5" ry="7" fill="%23333333"/><ellipse cx="100" cy="102" rx="5" ry="7" fill="%23333333"/><ellipse cx="80" cy="112" rx="6" ry="4" fill="%23FFC000"/><circle cx="50" cy="112" r="6" fill="%23FFA0B4" opacity="0.6"/><circle cx="110" cy="112" r="6" fill="%23FFA0B4" opacity="0.6"/><g transform="translate(70, 70)"><path d="M 0 0 C -15 -10 -15 10 0 0 Z" fill="%23FFFFFF" stroke="%23333333" stroke-width="3"/><path d="M 20 0 C 35 -10 35 10 20 0 Z" fill="%23FFFFFF" stroke="%23333333" stroke-width="3"/><circle cx="10" cy="0" r="5" fill="%23FFD100" stroke="%23333333" stroke-width="3"/></g></g></svg>`
  },
  {
    id: 'hp_hogwarts_shield',
    name: 'Escudo Hogwarts Dorado',
    category: 'harry_potter',
    svg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><g transform="translate(25,15)"><path d="M 10 20 L 140 20 L 140 80 Q 140 150 75 170 Q 10 150 10 80 Z" fill="%231E2430" stroke="%23D4AF37" stroke-width="8"/><line x1="75" y1="20" x2="75" y2="168" stroke="%23D4AF37" stroke-width="4"/><line x1="10" y1="85" x2="140" y2="85" stroke="%23D4AF37" stroke-width="4"/><path d="M 20 30 L 65 30 L 65 75 L 20 75 Z" fill="%23740001"/><path d="M 85 30 L 130 30 L 130 75 L 85 75 Z" fill="%231A472A"/><path d="M 20 95 L 65 95 L 65 140 L 20 140 Z" fill="%230E1A40"/><path d="M 85 95 L 130 95 L 130 140 L 85 140 Z" fill="%23ECB939"/><circle cx="75" cy="85" r="22" fill="%23D4AF37" stroke="%231E2430" stroke-width="4"/><text x="75" y="93" font-family="Georgia, serif" font-size="24" font-weight="bold" fill="%231E2430" text-anchor="middle">H</text></g></svg>`
  },
  {
    id: 'hp_gryffindor',
    name: 'Escudo Gryffindor León',
    category: 'harry_potter',
    svg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><g transform="translate(25,15)"><path d="M 10 20 L 140 20 L 140 80 Q 140 150 75 170 Q 10 150 10 80 Z" fill="%23740001" stroke="%23D4AF37" stroke-width="8"/><path d="M 45 60 Q 75 35 105 60 Q 115 100 75 130 Q 35 100 45 60 Z" fill="%23D4AF37"/><text x="75" y="105" font-family="Georgia, serif" font-size="45" font-weight="bold" fill="%23740001" text-anchor="middle">G</text></g></svg>`
  },
  {
    id: 'hp_slytherin',
    name: 'Escudo Slytherin Serpiente',
    category: 'harry_potter',
    svg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><g transform="translate(25,15)"><path d="M 10 20 L 140 20 L 140 80 Q 140 150 75 170 Q 10 150 10 80 Z" fill="%231A472A" stroke="%23AAAAAA" stroke-width="8"/><path d="M 45 60 Q 75 35 105 60 Q 115 100 75 130 Q 35 100 45 60 Z" fill="%23AAAAAA"/><text x="75" y="105" font-family="Georgia, serif" font-size="45" font-weight="bold" fill="%231A472A" text-anchor="middle">S</text></g></svg>`
  }
];

export const CATALOG_DESIGNS: DesignItem[] = [
  // 8 Infantiles (Barbie / Hello Kitty / My Melody)
  {
    id: 'inf-1',
    title: 'Hello Kitty Rosa Pastel',
    category: 'infantil',
    characterName: 'Hello Kitty Moño Rojo',
    characterImg: CHARACTER_OPTIONS[0].svg,
    bgColor: '#FFB6C1', // Rosa suave escolar
    bgType: 'solid',
    defaultSubject: 'Matemáticas',
    defaultStudentName: 'Barbie Sofía Pérez',
    subjectFont: 'Bubblegum Sans',
    studentFont: 'Pacifico',
    subjectGraphicStyle: 'style-pop-pink',
    description: 'Fondo rosa pastel reglamentario escolar. Hello Kitty en centro con transparencia PNG, título en estilo gráfico 3D reluciente.',
    isPopular: true
  },
  {
    id: 'inf-2',
    title: 'My Melody Lila Mágico',
    category: 'infantil',
    characterName: 'My Melody Capucha Rosa',
    characterImg: CHARACTER_OPTIONS[1].svg,
    bgColor: '#E6E6FA', // Lila escolar
    bgType: 'solid',
    defaultSubject: 'Español',
    defaultStudentName: 'Barbie Sofía Pérez',
    subjectFont: 'Fredoka',
    studentFont: 'Caveat',
    subjectGraphicStyle: 'style-pop-purple',
    description: 'Fondo lila liso oficial. Personaje My Melody centrado sin fondo blanco, ideal para cuadernos de idioma.',
    isPopular: true
  },
  {
    id: 'inf-3',
    title: 'Hello Kitty Menta Fresco',
    category: 'infantil',
    characterName: 'Hello Kitty Moño Rojo',
    characterImg: CHARACTER_OPTIONS[0].svg,
    bgColor: '#B2FBA5', // Verde menta para Ciencias
    bgType: 'solid',
    defaultSubject: 'Ciencias Naturales',
    defaultStudentName: 'Barbie Sofía Pérez',
    subjectFont: 'Bangers',
    studentFont: 'Comfortaa',
    subjectGraphicStyle: 'style-pop-green',
    description: 'Fondo menta liso escolar para Ciencias. Contorno continuo completo con lomo rotulado.',
    isPopular: false
  },
  {
    id: 'inf-4',
    title: 'My Melody Fucsia Neón',
    category: 'infantil',
    characterName: 'My Melody Capucha Rosa',
    characterImg: CHARACTER_OPTIONS[1].svg,
    bgColor: '#FF69B4', // Fucsia
    bgType: 'solid',
    defaultSubject: 'Geografía',
    defaultStudentName: 'Barbie Sofía Pérez',
    subjectFont: 'Bubblegum Sans',
    studentFont: 'Pacifico',
    subjectGraphicStyle: 'style-pop-yellow',
    description: 'Color fucsia encendido liso. Tipografía decorativa premium en materia y nombre cursivo.',
    isPopular: true
  },
  {
    id: 'inf-5',
    title: 'Hello Kitty Sol Amarillo',
    category: 'infantil',
    characterName: 'Hello Kitty Moño Rojo',
    characterImg: CHARACTER_OPTIONS[0].svg,
    bgColor: '#FFF59D', // Amarillo escolar
    bgType: 'solid',
    defaultSubject: 'Historia',
    defaultStudentName: 'Barbie Sofía Pérez',
    subjectFont: 'Fredoka',
    studentFont: 'Caveat',
    subjectGraphicStyle: 'style-pop-orange',
    description: 'Fondo amarillo uniforme para Historia. Personaje transparente y títulos con sombras suaves.',
    isPopular: false
  },
  {
    id: 'inf-6',
    title: 'My Melody Cielo Azul',
    category: 'infantil',
    characterName: 'My Melody Capucha Rosa',
    characterImg: CHARACTER_OPTIONS[1].svg,
    bgColor: '#87CEEB', // Azul claro
    bgType: 'solid',
    defaultSubject: 'Inglés',
    defaultStudentName: 'Barbie Sofía Pérez',
    subjectFont: 'Outfit',
    studentFont: 'Pacifico',
    subjectGraphicStyle: 'style-pop-blue',
    description: 'Diseño en azul pastel impecable. Portada limpia con materias en grande y lomo coincidente.',
    isPopular: false
  },
  {
    id: 'inf-7',
    title: 'Hello Kitty Rojo Coral',
    category: 'infantil',
    characterName: 'Hello Kitty Moño Rojo',
    characterImg: CHARACTER_OPTIONS[0].svg,
    bgColor: '#FF6B6B', // Rojo escolar
    bgType: 'solid',
    defaultSubject: 'Formación Cívica',
    defaultStudentName: 'Barbie Sofía Pérez',
    subjectFont: 'Bangers',
    studentFont: 'Comfortaa',
    subjectGraphicStyle: 'style-pop-white',
    description: 'Rojo vivo institucional. Transparencia perfecta sin bordes pixelados.',
    isPopular: false
  },
  {
    id: 'inf-8',
    title: 'My Melody & Kitty Dúo Marino',
    category: 'infantil',
    characterName: 'My Melody Capucha Rosa',
    characterImg: CHARACTER_OPTIONS[1].svg,
    bgColor: '#4D96FF', // Azul Marino Vivo
    bgType: 'solid',
    defaultSubject: 'Arte y Música',
    defaultStudentName: 'Barbie Sofía Pérez',
    subjectFont: 'Bubblegum Sans',
    studentFont: 'Pacifico',
    subjectGraphicStyle: 'style-pop-pink',
    description: 'Ideal para libretas de arte. Color sólido liso azul eléctrico con letras estilo ilustrador.',
    isPopular: true
  },

  // 5 Harry Potter (Estilo Alex 11 años)
  {
    id: 'hp-1',
    title: 'Hogwarts Crest Gold',
    category: 'harry_potter',
    characterName: 'Escudo Hogwarts Dorado',
    characterImg: CHARACTER_OPTIONS[2].svg,
    bgColor: '#1E2430', // Azul marino oscuro / mágico
    bgType: 'solid',
    defaultSubject: 'Historia Universal',
    defaultStudentName: 'Alex Fernando G.',
    subjectFont: 'Cinzel',
    studentFont: 'Montserrat',
    subjectGraphicStyle: 'style-magic-gold',
    description: 'Escudo oficial de Hogwarts sobre fondo azul noche. Título dorado con efecto biselado y tipografía medieval.',
    isPopular: true
  },
  {
    id: 'hp-2',
    title: 'Gryffindor Crimson',
    category: 'harry_potter',
    characterName: 'Escudo Gryffindor León',
    characterImg: CHARACTER_OPTIONS[3].svg,
    bgColor: '#740001', // Rojo borgoña Gryffindor
    bgType: 'solid',
    defaultSubject: 'Matemáticas',
    defaultStudentName: 'Alex Fernando G.',
    subjectFont: 'Cinzel',
    studentFont: 'Montserrat',
    subjectGraphicStyle: 'style-magic-gold',
    description: 'Color borgoña de la casa Gryffindor. Escudo del león centrado con fondo liso y lomo continuo.',
    isPopular: true
  },
  {
    id: 'hp-3',
    title: 'Slytherin Emerald',
    category: 'harry_potter',
    characterName: 'Escudo Slytherin Serpiente',
    characterImg: CHARACTER_OPTIONS[4].svg,
    bgColor: '#1A472A', // Verde esmeralda Slytherin
    bgType: 'solid',
    defaultSubject: 'Biología y Química',
    defaultStudentName: 'Alex Fernando G.',
    subjectFont: 'Cinzel',
    studentFont: 'Montserrat',
    subjectGraphicStyle: 'style-magic-silver',
    description: 'Fondo verde esmeralda profundo con escudo plateado de serpiente. Elegante y sobrio.',
    isPopular: true
  },
  {
    id: 'hp-4',
    title: 'Ravenclaw Sapphire',
    category: 'harry_potter',
    characterName: 'Escudo Hogwarts Dorado',
    characterImg: CHARACTER_OPTIONS[2].svg,
    bgColor: '#0E1A40', // Azul zafiro Ravenclaw
    bgType: 'solid',
    defaultSubject: 'Lengua y Literatura',
    defaultStudentName: 'Alex Fernando G.',
    subjectFont: 'Cinzel',
    studentFont: 'Montserrat',
    subjectGraphicStyle: 'style-magic-gold',
    description: 'Azul zafiro Ravenclaw. Título de materia destacado en la parte superior y nombre del alumno en la inferior.',
    isPopular: false
  },
  {
    id: 'hp-5',
    title: 'Hufflepuff Amber',
    category: 'harry_potter',
    characterName: 'Escudo Hogwarts Dorado',
    characterImg: CHARACTER_OPTIONS[2].svg,
    bgColor: '#ECB939', // Amarillo ámbar Hufflepuff
    bgType: 'solid',
    defaultSubject: 'Geografía',
    defaultStudentName: 'Alex Fernando G.',
    subjectFont: 'Cinzel',
    studentFont: 'Montserrat',
    subjectGraphicStyle: 'style-magic-dark',
    description: 'Fondo amarillo canario ámbar para cumplir regla de color de la libreta. Emblema en el centro con transparencia.',
    isPopular: false
  }
];

export const FONT_OPTIONS_SUBJECT = [
  { name: 'Fredoka (Moderna / Infantil)', value: 'Fredoka' },
  { name: 'Bubblegum Sans (Divertida)', value: 'Bubblegum Sans' },
  { name: 'Bangers (Comic / Impacto)', value: 'Bangers' },
  { name: 'Cinzel (Elegante / Harry Potter)', value: 'Cinzel' },
  { name: 'Outfit (Limpia / Minimalista)', value: 'Outfit' },
  { name: 'Comfortaa (Redonda / Suave)', value: 'Comfortaa' }
];

export const FONT_OPTIONS_STUDENT = [
  { name: 'Pacifico (Cursiva Especial)', value: 'Pacifico' },
  { name: 'Caveat (Manuscrita Escolar)', value: 'Caveat' },
  { name: 'Montserrat (Formal / Limpia)', value: 'Montserrat' },
  { name: 'Lobster (Caligráfica)', value: 'Lobster' },
  { name: 'Comfortaa (Moderna)', value: 'Comfortaa' }
];

export const GRAPHIC_STYLES = [
  { id: 'style-pop-pink', name: 'Brillo Rosa 3D', class: 'style-pop-pink' },
  { id: 'style-pop-purple', name: 'Sombra Lila Glow', class: 'style-pop-purple' },
  { id: 'style-pop-green', name: 'Relieve Verde Menta', class: 'style-pop-green' },
  { id: 'style-pop-yellow', name: 'Contorno Amarillo Pop', class: 'style-pop-yellow' },
  { id: 'style-magic-gold', name: 'Oro Biselado Mágico', class: 'style-magic-gold' },
  { id: 'style-magic-silver', name: 'Plata Mística', class: 'style-magic-silver' },
  { id: 'style-magic-dark', name: 'Tinta Negra Trazo', class: 'style-magic-dark' }
];
