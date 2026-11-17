# IIE de México: píxeles y contexto compartido

Encargo P-ME-061, registrado el 2026-10-12. Figura independiente para valoración e inserción en una presentación; no modifica los PPTX v4/v5. Roles ilustrador y revisor conceptual ejercidos en la conversación actual, sin revisión independiente. La imagen ilustrativa previa aporta la idea de mapa/acercamiento, no datos ni límites geográficos.

## Productos y reconstrucción

- `img/iie-2018-pixeles-holdridge.svg`: composición editable (textos, cuadrícula y esquema vectoriales; mapas derivados incrustados como imágenes).
- `img/iie-2018-pixeles-holdridge.png`: 3240 × 1980 px para insertar.
- `img/iie-2018-pixeles-holdridge.json`: huellas SHA-256, CRS, transformaciones, versiones, ventana, valores y clases del detalle.
- `crear-figura-iie-pixeles.py`: lectura, composición y comprobaciones. No entrena ni aplica el modelo; representa su resultado aportado.

Desde la raíz del proyecto, con `.venv` restaurado desde `requirements.lock.txt`:

```powershell
.venv/Scripts/python.exe presentaciones/crear-figura-iie-pixeles.py
```

Los GeoTIFF deben estar en `presentaciones/img/`. Permanecen inmutables y excluidos de Git. La ejecución reemplaza solamente los tres derivados de esta figura. Las dependencias cartográficas se añadieron a `.venv`, `requirements.in` y `requirements.lock.txt`; no son bibliotecas de implementación del modelo IIE.

## Procedencia cartográfica y transformaciones

1. **IIE:** `ie_2018_st_v2.tif`, aportado por Miguel: 13200 × 8400 celdas, float32, Albers en metros, celda 250 × 250 m. Lectura completa: 30 971 405 celdas válidas, mínimo 0, máximo 1. Se conserva el cero como dato; NoData es el valor negativo extremo declarado por el archivo. Etiqueta temporal 2018 según nombre y contexto del usuario; no se auditó el proceso científico que produjo el raster.
2. **Holdridge:** `zvh-mx3qw-mexico-Albers.tif`, aportado por Miguel: 3732 × 2395 celdas, uint8, Albers, celda 849.927 × 849.950 m; NoData=0. Hay 29 códigos presentes, en el intervalo 1–31 con huecos. No se recibió un catálogo que permita rotularlos con nombres de zonas de vida. No se infieren nombres, fechas, umbrales ni orden ecológico de los códigos.
3. **Vista nacional:** reducción del IIE a 1320 × 840 por vecino más cercano, exclusivamente para visualización. No es un promedio ni una nueva estimación. La vista nacional no puede mostrar todas las celdas nativas. Paleta continua propuesta, con límites fijos 0–1, sin cortes de estado o umbrales. Blanco/fondo claro: ausencia de datos en la capa correspondiente.
4. **Detalle:** ventana de 8 × 8 celdas nativas, esquina superior izquierda columna 8536/fila 6300 (índices desde cero), ancho y alto 2000 m. Selección reproducible: ventana más próxima al punto de búsqueda −96.9°, 19.4° en una malla local de candidatos de cuatro celdas, con dos clases y al menos doce celdas de cada una. Es una selección didáctica de frontera, no una muestra representativa. Los 64 números son IIE observado en el archivo, redondeado a dos decimales solo para rotular.
5. **Cruce espacial:** Holdridge se consulta sobre los centros de las celdas IIE mediante vecino más cercano, respetando los CRS. La línea turquesa delimita el cambio de código en esa asignación; no es un ecotono levantado a 250 m. No se crean clases intermedias ni información independiente al remuestrear. Las 64 asignaciones se contrastan con consultas directas al raster original.
6. **Mapa auxiliar:** destaca las clases 18 y 22, deja otras clases en gris y conserva la máscara propia de Holdridge. Su cobertura no se fuerza a coincidir con la del IIE. Las clases pueden ocupar áreas desconectadas. La barra expresa 500 km en coordenadas de la cuadrícula Albers, no una escala de impresión fija ni una distancia geodésica exacta.

## Lectura conceptual

El encargo P-ME-061 y `docs/FUENTES-Y-DECISIONES.md`, D15, sustentan el uso de parámetros globales θ y la pertenencia de píxeles a clases. Se usa j para clase, i para píxel dentro de j y nⱼ para el número de píxeles asignados; Hⱼ identifica la clase compartida. Xᵢⱼ reúne contexto —incluye Hⱼ y covariables locales—, Yᵢⱼ detección. Sus componentes adicionales no se han medido ni reconstruido en este encargo: solo se recibieron IIE y Holdridge.

El esquema de rectángulos explica índices y repetición; no es un DAG ni la especificación de una distribución conjunta. Una zona de vida es una variable contextual; el *plate* representa la repetición de clases o píxeles, no convierte la región geográfica en una relación probabilística. θ queda fuera porque no se reentrena por píxel, según la descripción del usuario. Compartir Hⱼ no obliga a compartir todo Xᵢⱼ, las detecciones o el IIE; tampoco demuestra independencia espacial ni introduce efectos aleatorios.

La figura representa un índice sintético, sin atribuirle una fórmula no aportada. El rango 0–1 no significa porcentaje determinista ni probabilidad escalar pura. La posterior y su incertidumbre no están disponibles en estos archivos: no pueden recuperarse a partir del raster escalar. Una dimensión no observada no se interpreta como degradación. No se reconstruye la red TAN ni se valida el diagnóstico ecológico.

**Comprobación didáctica:** dos celdas de clase 22 muestran valores distintos del IIE. ¿Contradice que compartan θ y Hⱼ? Respuesta esperada: no; compartir parámetros y una variable contextual no hace iguales todas las entradas ni todos los diagnósticos. El mapa por sí solo no permite atribuir la diferencia a una variable concreta.

## Aceptación y límites

La aceptación técnica exige rango y máscaras correctos, 64 valores nativos exactos, 64 clases coincidentes con consultas directas, XML SVG válido, salidas menores de 5 MiB y revisión visual sin recortes ni superposiciones. Estas comprobaciones se ejecutan en el generador; la revisión visual se realiza sobre el PNG exportado. La primera ejecución produjo una advertencia al colorear el NoData extremo; se sustituyó por NaN únicamente en la copia de visualización antes de la exportación final.

La inspección de los originales no acredita su validación científica ni sus condiciones de redistribución. No se publicó la figura, no se incorporó al blog y no se alteró el SVG canónico. Pendientes para un uso que requiera nombres de zonas: catálogo de códigos; para reconstruir la inferencia: entradas y modelo entrenado. La incorporación a v5 queda como decisión posterior.

## Ajuste gráfico de Miguel e incorporación a v5 — P-ME-062

Miguel modificó el SVG y exportó el PNG (5400 × 3300): eliminó la palabra «Detalle» y su línea, y añadió una cuña amarilla para sugerir la ampliación. Se conservan ambos archivos tal como se recibieron. El JSON previo describe datos y operaciones cartográficas de la base, no acredita regeneración automática de ese ajuste manual. El generador cartográfico escribe ahora con sufijo `-base` para preservar los archivos aprobados sin sufijo.

La revisión de v5 incorpora el PNG completo, sin recorte ni deformación, como diapositiva 12 entre el mapa nacional y la explicación de plates anidados. El PNG incrustado se coteja byte a byte con el aprobado; el SVG sigue disponible como fuente editable externa. La figura dentro del PPTX es una imagen. La cuña es un recurso de ampliación, no una región ecológica: se aclara en notas. Los rótulos menores requieren acercamiento para lectura fina durante la exposición.


## Estado consolidado el 2026-11-17

Los P-ME-061–063 de este documento corresponden a prompts/miguel-mapa-iie-pixeles.md. La decisión cartográfica está en D31 de FUENTES-Y-DECISIONES. Las menciones anteriores de incorporación pendiente describen etapas históricas. La versión consolidada de 17 diapositivas está publicada y versionada en blog/presentaciones/Introduccion-iie3t-redes-bayesianas-v5.pptx.
