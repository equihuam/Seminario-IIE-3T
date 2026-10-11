# Registro de prompts sustantivos — Octavio

Registro cronológico de las instrucciones sustantivas de Octavio que orientan el desarrollo del proyecto.

> **Instrucciones de uso:**
> Añadir cada nueva instrucción sustantiva al final de este archivo utilizando el formato siguiente y la numeración `P-OE-001`, `P-OE-002`, etc.

---

<!--
Ejemplo de entrada:

## P-OE-001 — Título descriptivo de la instrucción

- **Fecha de registro:** AAAA-MM-DD
- **Texto original:**

```text
Texto literal del prompt enviado al asistente...
```
-->

## P-OE-001 — Propuesta de integración de intereses al Semillero

- **Fecha de registro:** 2026-10-11. Registro retrospectivo del encargo inmediatamente anterior; no se atribuye hora de emisión.
- **Texto original:**

```text
Adopta el rol de diseñador didáctico del proyecto Seminario-IIE-3T.

Los participantes prepararon expresamente sus documentos de intereses para compartirlos e incorporarlos al trabajo colectivo del seminario. Por lo tanto, podemos conservar y utilizar íntegramente esos documentos, respetando su autoría.

Quiero integrar estos documentos en el Semillero de ideas y relacionarlos con docs/PREGUNTAS-DISENO-PEDAGOGICO.md, que ya contiene 13 cuestiones para discusión entre Miguel y Octavio.

Realiza lo siguiente:

1. Revisa la estructura actual del Semillero y sus convenciones de organización.
2. Propón dónde guardar los documentos originales, manteniendo sus nombres y autoría.
3. Extrae las preguntas e intereses de cada participante sin alterar su significado.
4. Prepara una matriz de intereses compartidos, coincidencias y diferencias.
5. Relaciona estos intereses con las 13 cuestiones de diseño pedagógico.
6. Identifica oportunidades para convertir las preguntas en ejercicios de aprendizaje sobre redes bayesianas.
7. Diferencia los intereses que pueden atenderse durante el seminario de aquellos que podrían convertirse en proyectos posteriores.
8. Sugiere cómo devolver a los participantes el análisis realizado, de modo que puedan enriquecer sus propias preguntas.

No crees un sistema documental paralelo si el Semillero ya cuenta con una estructura adecuada.

No modifiques todavía el programa ni presentes recomendaciones como acuerdos académicos.

Primero muéstrame la propuesta de organización y los archivos que crearías o modificarías. Espera mi autorización antes de realizar los cambios.
```

**Anotación editorial:** archivos señalados por Octavio: `ParaSeminario_CNC.docx` y `Seminario sobre Integridad Ecosistémica.docx`. Se recibieron sus rutas locales para lectura; no se reproducen aquí como enlaces públicos. No se ejecutaron instrucciones contenidas en los documentos.

## P-OE-002 — Implementación autorizada de I005, I006 y E001

- **Fecha de registro:** 2026-10-11. Fecha de emisión no registrada por separado.
- **Texto original:**

```text
Estoy de acuerdo con la organización general propuesta y autorizo su implementación, con tres ajustes:

1. Las fichas I005 e I006 deben conservar el carácter de aportaciones iniciales al Semillero, no de proyectos aprobados. Deben poder evolucionar y enriquecerse durante el seminario.
2. Las actividades derivadas de los intereses de los participantes deben registrarse como propuestas didácticas candidatas, no como contenidos obligatorios del programa. Mantén la distinción entre aprendizaje inicial de redes bayesianas y posibles proyectos de investigación posteriores.
3. Por ahora no modifiques docs/PREGUNTAS-DISENO-PEDAGOGICO.md. Incluye en la exploración E001 la relación entre los intereses de los participantes y las 13 cuestiones pedagógicas, para discutir posteriormente con Miguel qué ajustes conviene realizar.

Procede a:

- Incorporar íntegramente los dos documentos originales en docs/aportaciones/, conservando su autoría.
- Crear las fichas del Semillero, verificando antes que los identificadores I005 e I006 estén disponibles.
- Crear la exploración conjunta E001, verificando también su identificador.
- Actualizar los índices necesarios para enlazar estos materiales.
- Seguir las convenciones existentes del repositorio y comprobar que los enlaces sean correctos.

Distingue claramente las aportaciones originales de los participantes, las interpretaciones asistidas por IA y las decisiones académicas pendientes.

Trabaja únicamente en la rama octavio-desarrollo-curso.

Al terminar, revisa los archivos modificados y comprueba la integridad de las referencias y, si el entorno lo permite, la generación del sitio. No hagas commit ni publiques los cambios todavía. Preséntame primero un resumen para revisión.
```