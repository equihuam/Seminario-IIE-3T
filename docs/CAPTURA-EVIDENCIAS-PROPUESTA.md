# Propuesta de captura de evidencias de aprendizaje

Borrador para revisión de Miguel y Octavio · Versión 0.1 · 14 de octubre de 2026.

La captura vincula cada objetivo de la [guía](GUIA-APRENDIZAJE-PROPUESTA.md) con un producto y una explicación del participante. Se propone empezar con archivos locales: una ficha breve por avance significativo y un índice del portafolio. Un formulario podría facilitar la recepción posterior usando los mismos campos, si el equipo acuerda el destino y acceso.

## Ficha para el participante

Copia este bloque en tu registro de aprendizaje. Usa una identificación estable para cada evidencia, por ejemplo EV-001, y conserva las entradas anteriores. Puedes registrar una explicación oral mediante una nota breve que confirmes al terminar.

```text
Evidencia:
Fecha y sesión:
Participante o código acordado:
Objetivo trabajado: O1 / O2 / O3 / O4 / O5 / O6

Ahora puedo… [una acción concreta, una o dos frases]

Mi autovaloración:
[ ] Necesito una explicación y un ejemplo.
[ ] Puedo hacerlo siguiendo una guía.
[ ] Puedo hacerlo sin guía en un caso trabajado.
[ ] Puedo aplicarlo a un caso nuevo y justificar mis decisiones.
[ ] Todavía no lo hemos trabajado.
[ ] No tengo evidencia suficiente para valorarlo.

Evidencia: [archivo y versión, sección, cálculo o explicación breve]
Lo que muestra: [cómo permite reconocer el logro; dos o tres frases]
Apoyos y aportación propia: [guía, compañero, docente o IA y qué hice/verifiqué]
Duda o dificultad:
Siguiente paso que propongo:
```

En el diagnóstico inicial puede faltar un producto: registra «sin evidencia todavía» y una explicación tentativa. Selecciona una sola autovaloración por objetivo; si el producto abarca dos objetivos con autonomía distinta, distingue ambas respuestas. Un archivo adjunto sin explicación no basta para valorar el aprendizaje.

## Datos adicionales para una ejecución computacional

Cuando el objetivo implique reproducir un cálculo, añade o referencia un registro que contenga: versión de datos y código, entorno, comando ejecutado desde una sesión nueva, salida esperada, criterio de concordancia y resultado observado. Indica qué falló y qué no se ejecutó. Las instrucciones completas pueden vivir junto al código; la ficha solo necesita una referencia precisa.

Una captura de pantalla puede ayudar a mostrar un error o resultado, pero debe acompañarse del código, los datos accesibles o sus instrucciones de acceso y el registro de ejecución pertinentes. La reproducción computacional y la validez ecológica se evalúan por separado.

## Devolución docente

El docente añade este bloque después de revisar el producto o escuchar la explicación. La autovaloración original se conserva.

```text
Fecha y persona que revisa:
Evidencia examinada y criterio del objetivo:
Estado observado:
[ ] Pendiente de revisión.
[ ] Evidencia insuficiente para valorar el criterio.
[ ] Logro parcial: [qué se demuestra y qué falta]
[ ] Criterio mostrado en el caso trabajado.
[ ] Criterio mostrado también en una tarea nueva: [cuál]

Lo que ya está logrado:
Aspecto por revisar y razón:
Siguiente paso acordado y momento de revisión:
```

Estos estados describen una evidencia y su contexto; no etiquetan la capacidad permanente de una persona. Para reconocer transferencia, debe observarse una tarea nueva. Si difieren autovaloración y devolución, se conversa sobre el criterio y se propone una comprobación breve, sin sustituir la respuesta del participante.

## Ejemplo hipotético de una ficha completada

Ejemplo inventado para mostrar el formato. No representa respuestas reales ni datos del IIE.

- **Evidencia:** EV-001; sesión inicial, fecha de ejemplo 14 de octubre de 2026; participante Ejemplo A.
- **Objetivo:** O1.
- **Ahora puedo:** distinguir el contexto de una señal observada y de la condición inferida en un bosque.
- **Autovaloración:** puedo hacerlo siguiendo una guía.
- **Evidencia:** `evidencias/EV-001-capas-v1.md`, sección «Clasificación». Clasifiqué el régimen de precipitación como contexto, la cobertura de dosel medida como detección y la condición ecosistémica como latente.
- **Lo que muestra:** la cobertura observada aporta una señal, pero no determina por sí sola la condición. Para interpretarla necesito considerar el contexto y explicitar el modelo que relaciona ambos con la condición.
- **Apoyos y aportación propia:** consulté el diagrama de las tres capas; elegí los elementos y escribí la explicación. No utilicé IA en este ejemplo hipotético.
- **Duda:** cómo distinguir una variación natural de una alteración al comparar dos bosques.
- **Siguiente paso:** clasificar un segundo caso y explicar por qué no conviene comparar sus señales sin considerar el contexto.

**Devolución docente hipotética:** criterio mostrado en el caso trabajado: hay un elemento por capa y se reconoce la limitación de una señal. Pendiente observar la explicación en otro caso; la duda sobre variación natural orientará la siguiente actividad. Fecha y revisor: ejemplo de devolución del 14 de octubre de 2026, Docente de ejemplo.

## Conservación y recepción

Propuesta de estructura dentro de la carpeta documental de cada participante:

```text
aprendizaje/
  REGISTRO.md
  PORTAFOLIO.md
  evidencias/
    EV-001-capas-v1.md
    EV-001-capas-v2.md
```

`REGISTRO.md` conserva fichas y devoluciones por adición. `PORTAFOLIO.md` contiene una selección con objetivo, referencia y motivo de selección. Los scripts y datos permanecen en sus carpetas de trabajo y se referencian desde aquí. Las revisiones crean una nueva versión enlazada a la anterior, con el motivo del cambio. Este registro de aprendizaje complementa la bitácora científica del proyecto del participante; no la reemplaza ni se mezcla con la bitácora de desarrollo del seminario.

Para recibir una evidencia, el participante comparte únicamente el archivo o fragmento pertinente y la ficha con el docente por un medio acordado. Git local puede conservar versiones; GitHub, un blog o una cuenta en la nube no son requisitos. No incluir datos sensibles en archivos compartidos o repositorios públicos. La ubicación de recepción y las personas con acceso deben acordarse antes de recopilar registros individuales.

Si se adopta un formulario, tendrá estos mismos campos, enviará una entrada nueva en cada revisión y conservará el historial. Bastará una referencia al producto o una explicación breve; no será obligatorio subir todos los archivos. La recepción de una respuesta y la revisión de su evidencia serán estados distintos. La persona debe poder consultar su historial y devolución por el medio acordado. El formulario aún no está creado.

## Síntesis de cada sesión para el equipo docente

Registrar de forma agregada: objetivos trabajados, evidencias revisadas, dificultades compartidas, preguntas emergentes y siguiente actividad con su justificación. Distinguir entre evidencia no recibida, pendiente de revisión y dificultad observada; la ausencia de respuesta no demuestra falta de aprendizaje. No publicar nombres, productos o citas identificables sin acuerdo de sus autores.

Se propone revisar una evidencia breve por persona en cada hito; en sesiones intermedias, seleccionar según dudas y necesidades de apoyo, registrando qué quedó pendiente. Si la carga supera el tiempo docente disponible, reducir campos o frecuencia antes de acumular devoluciones sin atender.

## Prueba de uso propuesta

En una sesión, probar una ficha para O1 o el objetivo pertinente. Estimar tres minutos para llenarla y comprobar si el docente puede localizar el producto, interpretar el apoyo utilizado y dar una devolución concreta. Preguntar qué campo resulta confuso o redundante. Conservar dificultades y ajustar el instrumento con el equipo; estos tiempos no han sido medidos con participantes.

Para la revisión actual se propone acordar: alcance de las evidencias, claridad de descriptores, medio de recepción y responsable de devolución. No hay calificación ni ponderaciones definidas.

## Procedencia

Preparado con asistencia de IA, con perspectivas didáctica y pedagógica, para revisión docente (P-ME-077). Basado en la guía propuesta, las cuestiones 1, 4 y 11 de [diseño pedagógico](PREGUNTAS-DISENO-PEDAGOGICO.md), v0.1, y [reproducibilidad](REPRODUCIBILIDAD.md), «Como criterio de diseño». Es un instrumento candidato; su aplicación todavía no constituye evidencia de eficacia educativa.
