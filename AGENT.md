# AGENT.md

Guia rapida para ubicar codigo cuando haya que mejorar esta app.

## Resumen del proyecto

App React + Vite para gestionar un album de figuritas del Mundial 2026. El usuario marca figuritas, ve progreso, identifica faltantes/repetidas, comparte listas y compara canjes. El estado persistente vive en `localStorage`.

## Donde buscar segun el cambio

- Navegacion, estado global, persistencia, filtros, busqueda, export/import/reset:
  - `src/App.jsx`
- Catalogo de figuritas, equipos, grupos, nombres, codigos y banderas:
  - `src/data/stickersData.js`
- Estilos globales, layout mobile, cards, grillas, tabs, nav inferior, colores y animaciones:
  - `src/index.css`
- Estilos legacy o no usados directamente:
  - `src/App.css`
- Progreso general y estadisticas:
  - `src/components/Dashboard.jsx`
- Tarjeta individual de figurita, click para sumar, boton para restar, estados de obtenida/repetida/especial:
  - `src/components/StickerCard.jsx`
- Carga masiva de codigos:
  - `src/components/QuickAdd.jsx`
- Compartir faltantes y repetidas por texto/WhatsApp:
  - `src/components/SharePanel.jsx`
- Comparar listas de amigos y completar intercambios:
  - `src/components/TradeMatcher.jsx`
- Fondo dinamico con colores por seleccion:
  - `src/components/CountryBackground.jsx`
- PWA, iconos, manifest y cache offline:
  - `public/manifest.json`
  - `public/sw.js`
  - `public/icon.png`
  - `public/favicon.svg`
  - `public/icons.svg`
- Entrada HTML y metadatos:
  - `index.html`
- Configuracion de build:
  - `vite.config.js`
  - `package.json`
  - `eslint.config.js`

## Modelo de datos

`src/data/stickersData.js` exporta:

- `GROUPS`: grupos y selecciones.
- `TEAM_FLAGS`: emoji/indicador visual por seleccion.
- `generateStickersList()`: genera el array de figuritas.

Cada figurita tiene esta forma aproximada:

```js
{
  code: "ARG-10",
  teamId: "ARG",
  teamName: "Argentina",
  name: "Jugador 9",
  isSpecial: false
}
```

El progreso del usuario se guarda como un objeto:

```js
{
  "ARG-10": 2,
  "FWC-00": 1
}
```

La clave de `localStorage` es:

```text
world_cup_2026_sticker_counts
```

## Flujo de estado en App.jsx

Estados importantes:

- `activeTab`: pestaña visible (`dashboard`, `album`, `quickadd`, `settings`).
- `stickerCounts`: cantidades por codigo.
- `selectedTeam`: seleccion visible en el album.
- `albumFilter`: filtro de album (`all`, `missing`, `owned`, `repeats`).
- `searchQuery`: busqueda global.
- `toast`: mensaje temporal.

Derivados importantes:

- `stickersList`: catalogo generado con `generateStickersList()`.
- `stats`: total, unicas, repetidas y faltantes.
- `filteredStickers`: resultado visible en el album.
- `teamProgress`: progreso por seleccion.
- `teamList`: lista plana de selecciones para el selector horizontal.

Handlers importantes:

- `handleIncrement(code)`: suma una figurita.
- `handleDecrement(code)`: resta una figurita.
- `handleBulkAdd(codes)`: suma varias figuritas.
- `handleCompleteTrade(receives, gives)`: aplica un intercambio.
- `handleExportData()`: descarga JSON de respaldo.
- `handleImportData(e)`: importa JSON de respaldo.
- `handleResetData()`: borra el album.

## Convenciones actuales

- La app prioriza mobile y centra el contenido con un ancho maximo de 600px.
- La UI usa CSS global y muchas clases declaradas en `src/index.css`.
- Tambien hay estilos inline en componentes. Al mejorar algo, buscar primero si ya existe una clase reutilizable en `index.css`.
- Los codigos aceptan formato con guion (`ARG-10`) y, en carga rapida, tambien sin guion (`ARG10`).
- Una figurita con cantidad `0` o ausente falta; cantidad `1` esta obtenida; cantidad mayor a `1` tiene repetidas.
- Las figuritas especiales son `FWC-*` y los escudos de cada seleccion (`XX-01`).

## Recomendaciones para futuras tareas

- Si piden agregar equipos, grupos o cambiar el album completo, empezar por `src/data/stickersData.js`.
- Si piden cambiar como se calcula el progreso, revisar `stats` y `teamProgress` en `src/App.jsx`.
- Si piden mejorar canjes, revisar primero `TradeMatcher.jsx`; su parser esta dentro de `handleCompare`.
- Si piden mejorar el texto compartido, revisar `SharePanel.jsx`.
- Si piden mejorar instalacion/offline/PWA, revisar `public/manifest.json`, `public/sw.js` e `index.html`.
- Si piden mejorar apariencia, revisar `src/index.css` y luego los estilos inline del componente afectado.
- Despues de cambios de comportamiento, correr:

```bash
npm run lint
npm run build
```

## Riesgos conocidos

- No hay tests automatizados.
- El parser de `TradeMatcher.jsx` es manual y sensible al formato de mensajes reales.
- El service worker cachea pocos archivos y puede no cubrir todos los assets generados por Vite.
- Hay varios textos e iconos emoji inline; cambios de copy o accesibilidad pueden requerir tocar multiples componentes.
