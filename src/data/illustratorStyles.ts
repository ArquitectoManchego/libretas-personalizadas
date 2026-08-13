export interface IllustratorStyleItem {
  id: string;
  codeNumber: number;
  name: string;
  description: string;
  category: '3d' | 'script' | 'comic' | 'neon';
  image: string;
  badgeColor: string;
}

export const ILLUSTRATOR_STYLES: IllustratorStyleItem[] = [
  {
    id: 'style-01',
    codeNumber: 1,
    name: 'QUEST - 3D Bisel Amarillo y Azul',
    description: 'Estilo 3D brillante con relieve amarillo y sombra azul profunda.',
    category: '3d',
    image: '/images/styles/style-01.png',
    badgeColor: 'bg-amber-500'
  },
  {
    id: 'style-02',
    codeNumber: 2,
    name: 'INSIDE - Relieve Naranja Degradado',
    description: 'Letras en bloque con biselado interno naranja y contorno blanco.',
    category: '3d',
    image: '/images/styles/style-02.png',
    badgeColor: 'bg-orange-500'
  },
  {
    id: 'style-03',
    codeNumber: 3,
    name: 'Bestie - Cursiva Neón Pink Glossy',
    description: 'Caligrafía fluida neón rosa y morado con acabado de cristal.',
    category: 'script',
    image: '/images/styles/style-03.png',
    badgeColor: 'bg-pink-500'
  },
  {
    id: 'style-04',
    codeNumber: 4,
    name: 'Wishes - 3D Script Verde y Amarillo',
    description: 'Tipografía cursiva alegre en tonos verde lima y amarillo con sombra 3D.',
    category: 'script',
    image: '/images/styles/style-04.png',
    badgeColor: 'bg-lime-500'
  },
  {
    id: 'style-05',
    codeNumber: 5,
    name: 'HERO - Comic Borde Fuego Naranja',
    description: 'Estilo tipo historieta con bordes texturizados y gradiente encendido.',
    category: 'comic',
    image: '/images/styles/style-05.png',
    badgeColor: 'bg-red-500'
  },
  {
    id: 'style-06',
    codeNumber: 6,
    name: 'Creative - Cursiva Retro Vintage',
    description: 'Script caligráfico clásico en blanco con contorno negro retro.',
    category: 'script',
    image: '/images/styles/style-06.png',
    badgeColor: 'bg-slate-700'
  },
  {
    id: 'style-07',
    codeNumber: 7,
    name: 'Blue - Píldora 3D Cian y Rosa',
    description: 'Letras redondeadas infladas 3D cian con fondo contraste rosa.',
    category: '3d',
    image: '/images/styles/style-07.png',
    badgeColor: 'bg-cyan-500'
  },
  {
    id: 'style-08',
    codeNumber: 8,
    name: 'RUSH - Bloque 3D Extruido Naranja',
    description: 'Letras mayúsculas en bloque con extrusión 3D azul marino.',
    category: '3d',
    image: '/images/styles/style-08.png',
    badgeColor: 'bg-blue-600'
  },
  {
    id: 'style-09',
    codeNumber: 9,
    name: 'STYLE - Extrusión Verde Esmeralda 3D',
    description: 'Texto estilo videojuego 3D en gradiente naranja y azul.',
    category: '3d',
    image: '/images/styles/style-09.png',
    badgeColor: 'bg-emerald-500'
  },
  {
    id: 'style-10',
    codeNumber: 10,
    name: 'GOOD GIRL! - Glossy 3D Morado y Cian',
    description: 'Bisel 3D inflado super brillante en tonos violeta y turquesa.',
    category: 'neon',
    image: '/images/styles/style-10.png',
    badgeColor: 'bg-purple-600'
  },
  {
    id: 'style-11',
    codeNumber: 11,
    name: 'TRADE MARK - Bloque Neón Verde y Azul',
    description: 'Trazo neón brillante verde con contorno azul eléctrico.',
    category: 'neon',
    image: '/images/styles/style-11.png',
    badgeColor: 'bg-teal-500'
  },
  {
    id: 'style-12',
    codeNumber: 12,
    name: 'Bold - Cursiva Caligráfica Dorado Ámbar',
    description: 'Script moderno grueso en gradiente de fuego con brillo de cristal.',
    category: 'script',
    image: '/images/styles/style-12.png',
    badgeColor: 'bg-amber-600'
  }
];
