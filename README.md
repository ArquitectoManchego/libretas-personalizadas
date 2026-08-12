# 📚 LibretasUnicas.mx - Catálogo Virtual & Personalizador de Forros Adhesivos

Página web interactiva y catálogo virtual para la venta de forros adhesivos escolares plastificados de portada, lomo y contraportada.

## 🚀 Características
- **Catálogo de Diseños Prediseñados ($80 c/u paquete 6 | $100 individual):**
  - **8 Diseños Infantiles:** Hello Kitty & My Melody con fondos lisos pastel (Rosa, Lila, Menta, Fucsia, Amarillo, Celeste, Rojo, Azul Marino).
  - **5 Diseños Harry Potter:** Escudos Hogwarts, Gryffindor, Slytherin, Ravenclaw y Hufflepuff.
- **Personalizador en Vivo 360° ($120 c/u paquete 6 | $150 individual):**
  - Simulación continua de Portada, Lomo y Contraportada.
  - Selección de **Color de Fondo Sólido/Liso** (cumplimiento reglamentario escolar por materia).
  - Elección de **Personaje PNG transparente** o **Imagen completa de fondo**.
  - Títulos de Materia en grande con **Estilos Gráficos 3D de Ilustrador** (Brillo Rosa, Oro Biselado Mágico, Plata Mística, etc.).
  - Nombre del alumno con **Tipografías Especiales** (Pacifico, Caveat, Comfortaa, Montserrat).
- **Calculadora de Presupuesto & Pedido por WhatsApp:**
  - Envío automático del pedido desglosado materia por materia directo a WhatsApp.
- **Base de Datos Firebase Firestore:**
  - Persistencia de pedidos y borradores guardados automáticamente en Firebase.

## 🛠️ Tecnologías
- **React 18** + **Vite** + **TypeScript**
- **Vanilla CSS** con Glassmorphism & Animaciones
- **Lucide Icons** + **Canvas Confetti**
- **Firebase Firestore**

## 💻 Ejecución en Desarrollo
```bash
npm install
npm run dev
```

## 📦 Construcción para Producción
```bash
npm run build
```

## 🌐 Despliegue en Vercel & GitHub
1. Inicializar Git y subir a tu cuenta de GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Catálogo Libretas Unicas"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/libretas-personalizadas.git
   git push -u origin main
   ```
2. Importar el repositorio en [Vercel](https://vercel.com) (Framework Preset: Vite).

## 🗄️ Configuración de Firebase
Reemplaza la configuración en `src/firebase.ts` con las credenciales de tu proyecto de Firebase Console para almacenar los pedidos directamente en tu colección de Firestore `pedidos`.
