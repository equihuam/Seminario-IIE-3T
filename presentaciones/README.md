# Presentación introductoria iie-3t

`crear-introduccion.mjs` conserva la construcción inicial. La propuesta más reciente para valoración es `output/Introduccion-iie3t-redes-bayesianas-v5.pptx`; no sustituye automáticamente la selección docente entre versiones. Las secciones siguientes conservan la trayectoria v1–v5. Los PPTX permanecen excluidos de Git. No se incorporó v5 al blog ni se publicó remotamente.

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

Versión previa: `output/Introduccion-iie3t-redes-bayesianas-v3.pptx`, doce diapositivas. Añade el mapa de 2018 y plates anidados.

## Versión v4: Salud ecosistémica, pensamiento sistémico, DBNs y plates (P040–P042)

Versión actual: `output/Introduccion-iie3t-redes-bayesianas-v4.pptx`, catorce diapositivas.

### Novedades didácticas y visuales
1. **Salud e integridad ecosistémica (Diapositivas 2 y 3):** Incorpora el enfoque de Ecosalud, Margulis y Equihua et al. (analogías del atleta/campo de golf y de la pecera / vivario vivo como equilibrio emergente de procesos acoplados).
2. **Pensamiento sistémico y DAGs (Diapositiva 6):** Formaliza el Grafo Acíclico Dirigido como la factorización de la distribución de probabilidad conjunta total del ecosistema $P(X, Y, Z) = P(X) P(Z|X) P(Y|X, Z)$.
3. **Retroalimentación y DBNs (Diapositiva 12):** Ilustra cómo los bucles dinámicos se desdoblan temporalmente en Redes Bayesianas Dinámicas ($t_0 \to t_1$).
4. **Ilustraciones científicas:** Generadas a la medida para la portada (trama viva y red), la pecera sistémica (diapositiva 3) y la transición temporal DBN (diapositiva 12).
5. **Reconstrucción nativa en Python:** `presentaciones/generar-presentacion-v4.py` genera el deck completo de 14 diapositivas en formato 16:9 utilizando `python-pptx`, tipografía Arial, paleta de colores institucional (turquesa, ocre, violeta) y notas del presentador completas.
6. **Verificación:** `presentaciones/verificar-v4.py` valida la integridad del XML, la presencia de figuras, la normalización de la tabla CPT (sumas = 1.0) y las 14 notas del presentador.

## Estado de ramas verificado — 2026-10-09

Las secciones anteriores describen la trayectoria v1–v3 en main. La v4 de catorce diapositivas se desarrolla en `miguel/actualizacion-presentacion`, commit `6556556`, y todavía no se ha integrado a main. Sus registros B025–B029 y P040–P046 deben consultarse en esa rama. Los dos scripts v4 y las ocho imágenes locales sin seguimiento coinciden con sus versiones remotas (comparación de scripts normalizando CRLF/LF; imágenes byte a byte).

Se ejecutó `.venv/Scripts/python.exe presentaciones/verificar-v4.py` sobre el PPTX local: 14 diapositivas, 4 imágenes, 88 formas, 11 conectores, 3 discontinuos, una CPT normalizada y 14 notas. Esta comprobación es estructural, no una revisión visual ni prueba de generación reproducible. El campo `attached_connectors` del informe cuenta conectores, pero no verifica anclajes a nodos. No se ejecutó el generador ni se reemplazó el PPTX.

Antes de integrar: inspección visual del archivo final; contraste de las notas que equiparan condición Z y estado biótico real; identificación explícita del mapa ilustrativo generado, distinguiéndolo del mapa original 2018 usado en v3; comprobación del entorno requerido por python-pptx. Las pruebas estructurales no resuelven esos pendientes.

## Propuesta v5 — 2026-10-09 (P-ME-003)

Interpretación propia del encargo original sobre v3, aplicando los roles didacta y revisor en esta conversación. Dieciséis diapositivas para principiantes, con duración orientativa de 30–40 minutos; el detalle de plates anidados es opcional. La portada reutiliza sin modificar `img/portada_integridad_redes_es.jpg` de esta carpeta. La cartografía recupera el mapa original 2018 de la carpeta `img/` del proyecto. No se generaron nuevas ilustraciones.

Secuencia: dos bosques con cobertura semejante → analogía diagnóstica → capas X/Y/Z → pensamiento sistémico y conjunta → red generativa e inferencia → tabla hipotética y actualización bayesiana → límites del diagnóstico para decidir acciones → repetición por sitios, mapa y plates → dinámica temporal → alcance operativo del IIE → actividad de comprobación → semillero. Las notas incluyen fuentes, supuestos, respuestas esperadas y recomendaciones de facilitación. El ejemplo numérico enseña una posterior sobre categorías, no una fórmula ni un porcentaje de integridad.

Se conserva X→Z discontinuo como pregunta estructural abierta. Los diagramas y tres tablas son objetos nativos editables; condición latente y estado biótico real permanecen diferenciados. El fragmento temporal es hipotético, no un modelo dinámico completo ni una validación causal. El IIE escalar/TAN se distingue de las ampliaciones vectoriales, dinámicas y de servicios.

Reconstrucción: copiar `crear-introduccion-v5.mjs` a `.local/slides-intro/`, usar el enlace de `node_modules` y las tres variables del runtime descritas arriba, y ejecutar con Node desde la raíz del proyecto. Definir `DECK_FILENAME` con otro nombre si ya existe el entregable final. El script exporta, finaliza y reimporta el PPTX, y renderiza las dieciséis diapositivas en `.local/slides-intro/v5/`. Ejecutar después `.venv/Scripts/python.exe presentaciones/verificar-v5.py` (admite otra ruta como argumento) y revisar los PNG.

Verificación realizada: revisión visual de las dieciséis diapositivas y nueva inspección de las cinco corregidas; paquete, geometría y fuente Arial sin hallazgos; reimportación correcta; verificador propio con código 0, que comprueba 13 conectores anclados, tres discontinuos, tres tablas, posterior [0.8, 0.2], imágenes originales y 16 notas. El proceso Node devolvió código 1 después de completar el recibo y todos los renders, sin diagnóstico adicional; no se interpreta ese cierre como ejecución con código 0. La comprobación independiente del entregable pasó. No se comprobó en PowerPoint nativo ni se realizó validación empírica.

### Revisión acordada para discutir con Octavio (P-ME-005)

El generador y verificador apuntan ahora a `output/Introduccion-iie3t-redes-bayesianas-v5-revisada.pptx`; se conserva el entregable anterior. Se precisan acumulaciones y demoras en la pecera, conjunta, causalidad, interpretación de evidencia, a priori/a posteriori y distribuciones de transición. Se retira resiliencia y se completan fuentes en notas. Mantiene 16 diapositivas, portada y mapa originales. Recibos y renders en `.local/slides-intro/v5-revisada/`. Cuatro diapositivas cambian visualmente (5, 7, 8, 13) y se inspeccionan; las otras doce coinciden byte a byte en sus PNG con los renders anteriores. Verificador independiente y finalizador pasan; persiste el cierre Node con código 1 después de completar los productos. No se probó en PowerPoint nativo.


### Conexión con Margulis (P-ME-007)

Entregable actual: `output/Introduccion-iie3t-redes-bayesianas-v5-revisada-margulis.pptx`. La diapositiva 3 conecta funciones y asociaciones simbióticas, con O’Malley (2017) y Koide (2023) y explicación en notas. El generador y verificador apuntan a esta revisión. Se conserva la anterior; renders y recibo en `.local/slides-intro/v5-revisada-margulis/`. Las otras quince diapositivas coinciden visualmente byte a byte con los PNG anteriores.


### Figuras en diapositivas 5 y 13 (P-ME-008)

Entregable actual: `output/Introduccion-iie3t-redes-bayesianas-v5-ilustrada-final.pptx`. Pecera en una de cuatro zonas en la diapositiva 5; esquema editable arriba y figura temporal completa abajo en la 13. Se preservan imágenes originales sin recortar. Los rótulos internos de las figuras son pequeños a esta escala. La figura DBN contiene inconsistencias de etiquetas/arcos: se identifica visiblemente como ilustración y se precisa en notas que el esquema nativo es la referencia conceptual. Pendiente corregir la ilustración si se desea usarla como DAG formal. Generador y verificador actualizados para cuatro imágenes; renders en `.local/slides-intro/v5-ilustrada/`.


### Nueva ilustración y composición temporal (P-ME-009)

Entregable actual: `output/Introduccion-iie3t-redes-bayesianas-v5-dbn-nueva.pptx`. Diapositiva 13 reorganizada: dos escenas del mismo bosque con suelo y raíces abajo; esquema temporal editable arriba. La nueva imagen `img/bosque-suelo-transicion-v5.png` contiene únicamente ilustración ecológica; símbolos y flechas son nativos. Prompt de generación conservado junto a la imagen. Se reemplaza en el deck la imagen temporal anterior, conservada en el repositorio. El nuevo esquema es un fragmento hipotético: no implica calibración, causalidad demostrada ni pronóstico visual. Quince renders coinciden byte a byte con la revisión anterior.


### Nombre consolidado de v5 (P-ME-011)

Miguel eliminó los archivos intermedios de v5 de `output/` y renombró la última entrega a `Introduccion-iie3t-redes-bayesianas-v5.pptx`. Este es el nombre actual para uso, generación y verificación. Las rutas anteriores se mantienen como historia; no indican archivos todavía disponibles. Los renders y recibos privados conservan sus nombres de construcción. Para reconstruir sin sobrescribir la copia vigente, usar `DECK_FILENAME` con otro nombre.
