# Registro colaborativo de prompts sustantivos

Este directorio conserva por orden las instrucciones e intervenciones sustantivas de los integrantes del equipo que orientan el desarrollo del proyecto con la asistencia de IA.

## Estructura y convención de nombres

Para evitar conflictos de fusión (*merge conflicts*) en Git al trabajar en ramas concurrentes, cada colaborador mantiene su propio archivo de registro:

- [`miguel.md`](miguel.md): Prompts de Miguel Equihua (`P-ME-###` o histórico `P001`–`P038`).
- [`octavio.md`](octavio.md): Prompts de Octavio (`P-OE-###`).
- Si se incorporan nuevos participantes o subagentes con prompts específicos, se crea su respectivo archivo `prompts/<nombre>.md`.

## Directivas de registro

1. **Texto literal:** Registrar literalmente el texto disponible del prompt, incluidos errores tipográficos; separar cualquier anotación editorial.
2. **Confidencialidad:** Si se necesita ocultar un secreto, ruta privada o dato sensible, marcar la omisión expresamente (ej. `[REDACTADO: credencial]`).
3. **Identificadores estables:** Usar identificadores únicos por autor (`P-ME-001`, `P-OE-001`) para permitir citar los prompts de forma no ambigua en la bitácora (`BITACORA.md`) y en las decisiones (`docs/FUENTES-Y-DECISIONES.md`).
4. **Mantenimiento por adición:** No borrar prompts históricos; añadir nuevas entradas al final del archivo correspondiente.


## Continuidad revisada — 2026-10-09

El histórico llega a P039 en main y a P046 en miguel/actualizacion-presentacion (6556556); la mención anterior a P038 no describe todo el histórico disponible. P001–P028 siguen en el archivo local de la raíz, pendientes de migración con revisión de información privada. No eliminar ese archivo ni incorporarlo indiscriminadamente. Las entradas nuevas de Miguel usan P-ME-###; P-ME-001 registra la sincronización actual. Antes de numerar, revisar también las ramas colaborativas conocidas.
