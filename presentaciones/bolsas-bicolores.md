# Mecánica de las bolsas bicolores

P-ME-186 · 19 de noviembre de 2026 · Borrador v0.1

Entrega local: `output/bolsas-bicolores/Dinamica-bolsas-bicolores-v1.pptx` (12 diapositivas, 16:9, 71 573 bytes). Fuente editable y generador: `presentaciones/crear-bolsas-bicolores.mjs`. Canicas y gráfico de intervalos son formas vectoriales editables; las tres tablas son tablas nativas. Cada diapositiva incluye notas para facilitar la dinámica y referencias. El anexo de recetas está al final, reservado a coordinación o a la revelación posterior.

Contenido derivado de `ejercicios/tres-bolsas/GUIA.md`, datos sintéticos y resultados de la corrida verificada. El gráfico de la diapositiva 8 reproduce C2_R2 y conserva el intervalo desfavorable a n=60. El PPTX histórico permanece intacto; su uso exitoso con propósito inductivo se atribuye al reporte de Miguel, sin equipararlo a prueba de esta nueva variante.

## Generación y verificación

Usar Node y paquetes de `load_workspace_dependencies`, con `PRESENTATIONS_RUNTIME` apuntando a su directorio dependencies y `PRESENTATIONS_SKILL_DIR` a la habilidad Presentations instalada. Ejecutar desde la raíz `node presentaciones/crear-bolsas-bicolores.mjs`. El generador no instala dependencias. Para una revisión, elegir un nombre de salida nuevo: el finalizador no sobrescribe el archivo entregado.

Verificaciones observadas: render de las 12 diapositivas y revisión visual individual a 1280 × 720; paquete y geometría sin hallazgos en el finalizador; importación por Artifact Tool; Arial declarado como elección de diseño; comprobación independiente de ZIP, 12 diapositivas, 12 notas y tres tablas. No se abrió en PowerPoint nativo. Vistas y recibo en `.local/slides-bolsas/`.

SHA256 del archivo final: `14d9baf9f93abd68850257a9611194c4c4b0f926a00a70311109eb2a46eb6669`.

Incidencias: la primera validación de importación requirió declarar RUNTIME_NODE_MODULES; después el entorno restringido impidió el enlace de archivo que usa el finalizador. Reejecución con elevación completó la entrega y generó el recibo satisfactorio; el proceso informó código de salida 1 al terminar, aunque escribió la ruta final. Se verificaron por separado el archivo y su huella contra el recibo; no se interpreta ese código como una ejecución global sin incidencias.

Borrador excluido de Git y fuera del blog, según las pautas de presentaciones. Pendiente revisión docente y prueba en clase; sin publicación, commit ni integración.


## Actualización v0.2 — P-ME-190

Entrega vigente: `output/bolsas-bicolores/Dinamica-bolsas-bicolores-v2.pptx`, 14 diapositivas, 81 535 bytes. Se conserva v1. Añadidas definición del evento íntegra y trayectoria de su probabilidad posterior; el grado Z y su intervalo permanecen como complemento. Valores de C1_R1 cotejados con resultado_principal.csv; caso desfavorable C2_R2 conservado.

Generación con el mismo runtime y generador actualizado. Revisadas visualmente las 14 vistas de 1280 × 720; sin recortes ni superposiciones. Recibo `.local/slides-bolsas-v2/validation.json`: integridad y geometría sin hallazgos, importación completada. ZIP, 14 diapositivas, tres tablas nativas y huella comprobados independientemente. SHA256: `bfe150d8eddeca1df962ec8cc04ea529b8fa56a4a037482f7f11928cdc9eb48b`.

El proceso de exportación volvió a terminar con código 1 después de escribir ruta final y recibo satisfactorio; las verificaciones independientes anteriores confirman el archivo, sin presentar ese proceso como ejecución sin incidencias. No se abrió en PowerPoint nativo. Borrador excluido de Git y fuera del blog; generador actualizado en la misma rama del PR #25, sin fusión. El correo previo contenía v1; no se envió otro correo en este encargo.
