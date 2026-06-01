# Mi Album Mundial FC 2026

App web para llevar el control de un album de figuritas del Mundial 2026. Esta pensada primero para celular: permite marcar figuritas obtenidas, detectar repetidas, ver faltantes, preparar listas para compartir y comparar posibles canjes con amigos.

## Que hace

- Muestra el progreso total del album: figuritas unicas, faltantes y repetidas.
- Organiza el album por seccion especial FWC y por selecciones.
- Permite buscar figuritas por codigo, equipo o nombre.
- Usa filtros rapidos para ver todas, faltantes, obtenidas o repetidas.
- Suma o resta unidades tocando cada figurita.
- Permite cargar muchas figuritas juntas pegando codigos como `ARG-10, FWC-00, USA-12`.
- Genera texto de faltantes y repetidas para copiar o compartir por WhatsApp.
- Compara listas de otra persona para encontrar intercambios posibles.
- Guarda el progreso en `localStorage`.
- Permite exportar, importar y reiniciar el respaldo del album.
- Incluye manifest y service worker basicos para uso tipo PWA.

## Stack

- React 19
- Vite 8
- CSS propio en `src/index.css`
- ESLint
- Deploy opcional con `gh-pages`

## Instalar y ejecutar

```bash
npm install
npm run dev
```

Luego abrir la URL local que muestre Vite.

## Scripts disponibles

```bash
npm run dev       # servidor de desarrollo
npm run build     # build de produccion en dist/
npm run preview   # previsualiza el build
npm run lint      # corre ESLint
npm run deploy    # publica dist/ con gh-pages
```

## Estructura principal

```text
src/
  App.jsx                         # Estado global, navegacion, filtros y acciones principales
  main.jsx                        # Montaje de React
  index.css                       # Sistema visual y estilos de toda la app
  data/stickersData.js            # Grupos, selecciones, banderas y generador de figuritas
  components/
    Dashboard.jsx                 # Tarjeta de progreso y estadisticas
    StickerCard.jsx               # Tarjeta individual de figurita
    QuickAdd.jsx                  # Carga masiva por codigos
    SharePanel.jsx                # Texto para copiar/WhatsApp
    TradeMatcher.jsx              # Comparador de listas para canjes
    CountryBackground.jsx         # Fondo dinamico por seleccion
public/
  manifest.json                   # Configuracion PWA
  sw.js                           # Service worker simple
  icon.png, favicon.svg, icons.svg
```

## Datos y persistencia

El catalogo de figuritas se genera en `src/data/stickersData.js`. La funcion `generateStickersList()` crea:

- Figuritas especiales `FWC-00` a `FWC-20`.
- 20 figuritas por seleccion.
- Codigos normalizados con formato `EQUIPO-00`, por ejemplo `ARG-10`.

El progreso del usuario se guarda en el navegador con la clave:

```text
world_cup_2026_sticker_counts
```

El valor guardado es un objeto JSON con este formato:

```json
{
  "ARG-10": 2,
  "FWC-00": 1
}
```

Cada clave es un codigo de figurita y cada valor es la cantidad que tiene el usuario. Un valor mayor a `1` cuenta como repetida.

## Flujo de la app

La navegacion inferior tiene cuatro secciones:

- **Progreso**: resumen del album y panel para compartir listas.
- **Album**: busqueda, filtros, selector de seleccion y grilla de figuritas.
- **Canjes**: carga masiva y comparador de listas de intercambio.
- **Ajustes**: exportar, importar o borrar el progreso.

`App.jsx` concentra el estado compartido (`stickerCounts`, filtros, busqueda, tab activo y toasts) y pasa los handlers necesarios a los componentes.

## Notas para desarrollo

- Antes de tocar logica de figuritas, revisar `src/data/stickersData.js` y los calculos derivados en `src/App.jsx`.
- Antes de tocar estilos o layout, revisar `src/index.css`; casi todos los estilos viven ahi.
- La app usa varios textos e iconos inline dentro de componentes, especialmente en `App.jsx`, `QuickAdd.jsx`, `SharePanel.jsx` y `TradeMatcher.jsx`.
- El service worker cachea solo assets basicos. Si se agregan recursos importantes para offline, actualizar `public/sw.js`.
- El README describe la app actual; si cambia el flujo principal, actualizar tambien `AGENT.md`.
