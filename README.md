# 🏆 Mi Álbum - Mundial 2026 (PWA)

¡Organiza, colecciona e intercambia tus figuritas para el Mundial 2026 con facilidad! Esta aplicación web progresiva (PWA) móvil está diseñada específicamente para coleccionistas que buscan una experiencia de usuario fluida, interactiva y de alta calidad visual.

> 🚀 **¡Pruébala en vivo!** La aplicación está publicada y activa en GitHub Pages: [https://sarif-arg.github.io/mi-album-mundial-fc-2026](https://sarif-arg.github.io/mi-album-mundial-fc-2026)

![Ajustes de la aplicación](./src/assets/hero.png)

## ✨ Características Premium

### 1. 📊 Panel de Control y Estadísticas en Vivo
- **Progreso General**: Anillo interactivo con gradiente que te muestra el porcentaje exacto de completado del álbum.
- **Métricas Clave**: Conoce rápidamente cuántas figuritas únicas tienes, cuántas te faltan y el número de repetidas listas para canjear.
- **Exportación / Importación**: Copia de seguridad en archivos JSON para asegurar tu progreso o importarlo en otro dispositivo.

### 2. 📖 Álbum Digital Completo
- **Sección Especial**: Diseñada para figuritas FWC (Logotipo, Trofeo, Mascota, Pelota y Estadios) con estilo holográfico especial.
- **48 Selecciones**: Organizado en el orden físico oficial por grupos (A al L), incluyendo escudos holográficos y plantillas de formación.
- **Filtros Inteligentes**: Encuentra figuritas rápidamente buscando por código (`ARG-10`) o nombre del jugador, o filtrando por categorías: *Todas*, *Tengo*, *Faltan* y *Repetidas*.

### 3. 🤝 Intercambio Automático Avanzado (Lector de QR y Enlaces)
- **Generación de QR Dinámico**: Crea un código QR y enlace de intercambio personalizado con un compresor a nivel de bits de tu colección completa.
- **Comparación al Instante**: Cuando tu amigo escanee tu código QR o haga clic en tu enlace compartido, la aplicación comparará al instante las repetidas y faltantes de ambos para generar un plan de canje mutuo exacto (*Le pides* / *Le das*).
- **Intercambio Manual Tradicional**: Pega el texto de tus amigos (por ejemplo, copiado de mensajes de WhatsApp) y el motor inteligente parseará los códigos para compararlos de inmediato.

### 4. 🎨 Diseño y Sensaciones de App Nativa
- **Tema Visual World Cup**: Fondo interactivo y colorido con dinámicas marca de agua SVG que cambian según la selección nacional activa.
- **Menú Inferior Moderno**: Barra de navegación estilo nativo con un borde en gradiente de neón, alta legibilidad sin transparencias molestas y dígitos de fondo que forman el año `2-0-2-6` detrás de los iconos principales.
- **Icono QR Copa**: Un icono central de la Copa del Mundo un 50% más grande que brilla y se escala en los estados activo y hover.
- **Branding Oficial**: Botones con el logotipo vectorial de WhatsApp oficial para un aspecto súper premium.

---

## 🛠️ Tecnologías y Estructura

- **Frontend**: [React 19](https://react.dev/) y [Vite 8](https://vite.dev/)
- **Estilos**: Vanilla CSS altamente personalizado con variables del sistema de diseño moderno (`index.css`).
- **Offline / PWA**: Service Workers nativos (`sw.js`) y Manifest W3C (`manifest.json`) para instalación en pantalla de inicio.
- **Compresión**: Algoritmo de empaquetado de bits personalizado de 2 bits por figurita para serializar el álbum de 981 figuritas en tan solo ~330 caracteres Base64 seguros para la web.

---

## 🚀 Instalación y Desarrollo Local

### Requisitos previos
- [Node.js](https://nodejs.org/) (versión 18 o superior recomendada)

### Pasos para iniciar

1. Instalar las dependencias del proyecto:
   ```bash
   npm install
   ```

2. Ejecutar el servidor de desarrollo local:
   ```bash
   npm run dev
   ```

3. Compilar el bundle optimizado para producción:
   ```bash
   npm run build
   ```

4. Ejecutar el linter para comprobar estándares de calidad:
   ```bash
   npm run lint
   ```

---

## 📂 Estructura de Archivos del Proyecto

```
mi-album-mundial-fc-2026/
├── public/                 # Favicon, manifiesto PWA y Service Worker
├── src/
│   ├── assets/             # Vectores SVG (Logo oficial, Trofeo) e imágenes
│   ├── components/         # Componentes modulares (Dashboard, StickerCard, QRShare)
│   ├── data/               # Base de datos de las 981 figuritas del mundial
│   ├── utils/              # Funciones auxiliares de serialización y QR
│   ├── App.jsx             # Punto de entrada y gestión del estado principal
│   ├── index.css           # Hoja de estilo global y variables del tema
│   └── main.jsx            # Renderizado de React
├── package.json
└── README.md
```
