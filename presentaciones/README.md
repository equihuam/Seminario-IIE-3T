# Presentación introductoria iie-3t

`crear-introduccion.mjs` conserva la construcción inicial. La versión vigente es `output/Introduccion-iie3t-redes-bayesianas-v2.pptx`, producida al importar y editar v1 con `actualizar-arco-contexto.mjs`. Los PPTX permanecen excluidos de Git. No se incorporó al blog ni se publicó remotamente.

## Diseño didáctico

Público principiante. Duración orientativa: 20–25 minutos. Secuencia: capas contextual, detección y latente; representación generativa mínima; grafo y tablas; extensión progresiva del ejemplo climático; repetición por sitios; plate y leyenda; supuestos; comprobación. La respuesta esperada y las fuentes están en las notas del presentador.

Los roles de didacta, ilustrador y revisor conceptual se aplicaron en la conversación actual, conforme a AGENTS.md. No se realizó revisión por un agente independiente.

## Reconstrucción técnica

Utiliza el runtime suministrado con `@oai/artifact-tool`, Node.js y Python. Consultar la habilidad Presentations y localizar las dependencias con `load_workspace_dependencies`. No instalar bibliotecas alternativas ni añadir las dependencias empaquetadas a la biblioteca R/Python del seminario.

1. Crear `.local/slides-intro` y enlazar allí `node_modules` a los módulos del runtime.
2. Copiar `crear-introduccion.mjs` a esa carpeta privada.
3. Definir `PRESENTATIONS_SKILL_DIR`, `PRESENTATIONS_PYTHON` y `RUNTIME_NODE_MODULES` con las rutas proporcionadas por el runtime. Definir `DECK_FILENAME` con un nombre nuevo al reconstruir: el finalizador no sobrescribe entregables.
4. Ejecutar esa copia con el Node del runtime desde la raíz del proyecto. El finalizador inspecciona el PPTX y reimporta el archivo final para renderizar las diez páginas. Los PNG y recibos quedan en `.local/slides-intro`.
5. Copiar y ejecutar `actualizar-arco-contexto.mjs` desde el mismo directorio privado para obtener v2, manteniendo las variables del runtime. El script requiere v1 y conserva sus objetos nativos. No sobrescribe v2 si ya existe.
6. Ejecutar `.venv/Scripts/python.exe presentaciones/verificar-introduccion.py` para v2. El verificador acepta opcionalmente una ruta de PPTX relativa a la raíz. Revisar visualmente todas las diapositivas.

La exportación usa `tail` para colocar la punta en el destino del conector. Una primera exportación con `head` invirtió las puntas; la revisión visual lo detectó y se corrigió antes de la entrega. La comprobación del XML verifica veinte conectores nativos adheridos a sus nodos y dos tablas editables, sin diagramas rasterizados.

## Revisión conceptual

- La representación de X, Y y Z resume conjuntos de variables y sigue las secciones 3–5 del manuscrito; no se presenta como la implementación escalar/TAN.
- La inferencia de Z utiliza X e Y sin invertir las flechas generativas. El contexto no equivale a degradación.
- El ejemplo climático conserva probabilidades hipotéticas. El subgrafo de la diapositiva 6 corresponde al marginal sobre C,E,U,Eco, con p(U)=0.945.
- Las tablas normalizan correctamente. La inferencia distingue observación e intervención, con 0.9896 y 0.8396 redondeado.
- El plate repite variables por sitio. θ representa únicamente parámetros compartidos de observación, fijados en este ejercicio. No representa un parámetro nuevo por sitio ni una transición temporal.
- La independencia condicional entre sitios es un supuesto del modelo, no una consecuencia del rectángulo por sí solo.

Las comprobaciones de paquete y geometría no sustituyen la revisión conceptual y visual. La entrega no se probó en una sesión nativa de PowerPoint.

## Acuerdo sobre el arco contexto-condición — v2

X→Z se conserva con trazo discontinuo en las diapositivas 3, 7 y 8. La leyenda indica una relación en evaluación: existen argumentos conceptuales para omitirla, sin solución definitiva. Es una anotación de incertidumbre estructural y no un tipo adicional de arista probabilística. Cada modelo formal debe decidir su inclusión. La introducción solo menciona esta pregunta abierta; el [ejercicio posterior](ejercicio-posterior-arco-contexto-condicion.md) queda reservado para cuando el grupo haya trabajado separación-d, identificación y validación. La pregunta introductoria sobre plates se conserva.

## Extensión cartográfica v3 (P016)

Versión actual: `output/Introduccion-iie3t-redes-bayesianas-v3.pptx`, doce diapositivas. Añade antes de la comprobación el mapa de 2018 proporcionado en `img/Mapa_México_Página_3.png` y un esquema editable de plates anidados. La imagen cartográfica se preserva como raster original; diagramas y texto son nativos.

El PNG original (9 602 021 bytes) queda excluido de Git por superar el límite de 5 MiB, al igual que los PPTX. Para reconstruir v3 en otra máquina, proporcionar ese archivo localmente en la ruta indicada, respetando sus condiciones de uso. SHA-256: `F67C9D093B41A04D88D5129BD8D762AE11E6B7ABF95FADF2B271DA07825B56F3`. Clonar el repositorio por sí solo no recupera este insumo; no se asignó un almacén remoto para él.

Para reconstruir, después de v2 copiar `presentaciones/extender-plates-mexico.mjs` a `.local/slides-intro/` y ejecutarlo con el mismo Node y variables de entorno indicados arriba. El script importa v2, conserva las diapositivas y añade dos. Ejecutar luego `python presentaciones/verificar-introduccion.py` (v3 por defecto).

El esquema representa pertenencia de píxeles a zonas o clases, con un componente contextual compartido y señales locales. No reproduce el DAG operativo TAN ni impone continuidad geográfica, independencia espacial o efectos aleatorios. La escala 0–1 del mapa no se redefine como probabilidad.
