# Git + IA: reglas y procedimiento de colaboración

Referencia para Miguel y Octavio · Seminario IIE-3T · v1.2 · 10 de octubre de 2026

Objetivo: pedir, revisar y entregar una contribución sin perder trabajo del otro. Se necesita una copia del repositorio y acceso a GitHub para compartir. La IA debe comprobar sus herramientas y permisos; un chat por sí solo no tiene acceso al repositorio.

[Ficha imprimible en carta](../output/pdf/git-ia-ficha.pdf) · [SVG editable](ficha-git/git-ia-ficha.svg) · [Generación y verificación](ficha-git/README.md)

Material de referencia fuera del *blog*. Versionarlo lo hace visible para quienes accedan al repositorio: «fuera del *blog*» no significa confidencial. No enlazarlo desde páginas públicas de Quarto.

## Lo mínimo para entender el flujo

| Término | Qué significa aquí |
| --- | --- |
| Copia local | Carpeta de trabajo en el equipo de cada colaborador. |
| Rama | Línea de trabajo identificada por un nombre; permite preparar cambios antes de integrarlos. |
| *Diff* | Diferencias concretas entre versiones: lo que debemos revisar. |
| Índice o *stage* | Selección de cambios que entrará en el próximo *commit*. |
| *Commit* | Versión registrada localmente con un identificador; no la comparte por sí solo. |
| *Push* | Envía *commits* al repositorio remoto en GitHub. |
| *Pull request* (*PR*) | Propuesta revisable de integración desde una rama de origen hacia una rama base. |
| *Merge* | Integra el trabajo en la rama de destino. |

Cualquier cambio inicia con una copia de *main* a una rama de trabajo nueva. Así, el recorrido usual es:

*main* vigente → nueva rama propia → cambios y pruebas → *commit* → *push* → *PR* a *main* → revisión y acuerdo → *merge* aprobado a *main* → comprobación y limpieza → *main* vigente

Aquí «copia» significa crear una rama desde la versión vigente de *main*; no duplicar manualmente la carpeta. Las revisiones de un encargo en curso continúan en su rama hasta integrarlo.

`origin/main` es la referencia local de *main* remoto, actualizada por `fetch`. `fetch` no modifica nuestros archivos; actualizar *main* por avance rápido (`--ff-only`) evita crear una integración inesperada y falla si hay divergencia.

## Reglas del equipo

1. ***main* debe quedar estable y lista para publicación.** Empezar cada encargo desde *main* actualizado. Usar `miguel/<tema>`, `octavio/<tema>` o `feature/<tema>`; evitar ramas encadenadas salvo necesidad explícita. Las ramas existentes se inspeccionan antes de renombrarlas o borrarlas.
2. **Un encargo acotado por rama.** Acordar objetivo y criterio de cierre. Si ambos tocarán los mismos archivos, coordinar el reparto; las ramas no evitan todos los conflictos. No usar dos agentes simultáneos sobre la misma copia sin coordinación.
3. **Conservar cambios ajenos.** Antes de editar: revisar rama, cambios, archivos sin seguimiento y *worktrees*. No añadir todo a ciegas ni borrar archivos para obtener un estado limpio. El histórico local `PROMPTS.md` no se incorpora automáticamente.
4. **La IA ejecuta exclusivamente lo autorizado.** «Revisa» solicita diagnóstico; «revisa y corrige» autoriza cambios. La IA no tiene permiso de fusionar nada al recibir un encargo de edición. El único camino a *main* es mediante un *PR* (P-ME-055). Si *commit*, *push*, apertura de *PR* o fusión del *PR* ya están autorizados para ese alcance, ejecutarlos sin pedir otra vez lo mismo.
5. **Registrar motivos y evidencia.** Prompt literal en `prompts/miguel.md` (P-ME) o `prompts/octavio.md` (P-OE); hito breve en `BITACORA.md`; estado vigente en `PLAN.md`. Leer los últimos IDs antes de asignar nuevos. Conservar el historial por adición.
6. **Revisar lo que se comparte.** Excluir credenciales, entornos, datos originales/restringidos y archivos mayores de 5 MiB (salvo presentaciones seleccionadas en `blog/presentaciones/` en formato `.pptx`, con límite de hasta 20 MiB). Los controles automáticos complementan la revisión humana. Preservar el SVG canónico del modelo.

## Encargos listos para adaptar

### 1. Iniciar o retomar

> En este repositorio, lee las pautas y revisa rama, estado local, remoto y *worktrees*. Quiero [objetivo], terminado cuando [criterio]. Si es nuevo, parte de *main* actualizado y crea [autor/tema]. Si retomamos una rama, comprueba sus cambios y *PR* antes de continuar. Conserva el trabajo ajeno y registra mi instrucción.

**Comprobar:** nombre de rama, base y archivos pendientes identificados. Con cambios locales, la IA debe averiguar a qué trabajo pertenecen antes de cambiar de rama; no hacer *stash* ni descartar automáticamente. Con *main* divergente, detener la actualización y explicar qué *commits* difieren.

### 2. Preparar y revisar

> Implementa [cambio] en la rama acordada. Revisa las diferencias, ejecuta las comprobaciones pertinentes y registra resultados y pendientes. Entrega un resumen de qué cambió y qué falta para integrar.

**Comprobar:** cambios limitados al objetivo y pruebas observadas. Si cambia el *blog*, modificar fuentes, regenerar y revisar `blog/_site/`; no corregir HTML a mano. Antes de una entrega editorial ejecutar `scripts/site.py check`, más las pruebas pertinentes. Para documentos internos sin cambios del sitio, declarar ese alcance y verificar archivos y enlaces; no atribuir un render que no se ejecutó.

### 3. Guardar y proponer integración

> Haz *commit* y *push* de esta entrega revisada y abre un *PR* hacia *main*. Selecciona solo sus archivos, revisa el índice con scripts/check_repo.py y explica en el *PR* el cambio, las verificaciones y los pendientes. No lo fusiones todavía.

**Comprobar:** identificador del *commit*, rama remota y enlace al *PR*; **base *main***, origen correcto y *diff* sin archivos ajenos. Una rama subida no implica un *PR*; un *PR* abierto no implica integración ni publicación.

### 4. Revisar la contribución del otro

> Revisa el *PR* [número] sin editar: base, diferencias, pruebas y conflictos. Separa problemas que impiden integración de sugerencias.

**Comprobar:** hallazgos con archivo y motivo. Leer el *diff* no equivale a ejecutar pruebas. Un cambio científico o didáctico exige revisar su contenido además de sus controles técnicos. Solo hay revisión independiente si se encargó y ejecutó por otra persona o agente.

### 5. Integrar y cerrar

> Integra el *PR* [número] en *main* si conserva el alcance acordado y las verificaciones siguen vigentes. Comprueba la base y, si afecta al *blog*, la publicación. Actualiza *main* local por avance rápido y aplica la rutina de limpieza de ramas integradas, conservando las activas.

**Comprobar:** *commit* en *main*; cuando cambie el *blog*, contenido esperado en la URL de producción. Después revisar *PR* abiertos, *worktrees* y ascendencia de cada rama antes de borrar. Usar `git branch -d` para la local y terminar con `git fetch --prune origin`. Si hubo *squash*/*rebase*, comprobar equivalencia y trabajo pendiente; no forzar para eludir una discrepancia. Véase la [rutina completa](OPERACION-BLOG.md#rutina-de-cierre-y-limpieza-de-ramas--p-me-050).

La integración en *main* puede publicar el *blog*: Te corresponde comprobar Netlify cuando sea el caso. La IA ejecuta exclusivamente lo autorizado; no tiene permiso de fusionar nada al recibir un encargo de edición. El único camino a *main* es mediante un *PR*.

Destino confirmado por Miguel (P-ME-056): [blog en producción](https://seminario-iie.netlify.app/). Aplicar el [procedimiento de verificación remota](OPERACION-BLOG.md#verificación-en-producción): comprobar portada y páginas afectadas, contenido esperado y funcionamiento pertinente, y registrar evidencia y límites.

## Si aparece un problema

| Situación | Encargo y criterio de resolución |
| --- | --- |
| Git avisa de conflicto | «Identifica los archivos, compara ambas aportaciones y propón una combinación que conserve su intención». No elegir todo “nuestro” o “suyo” automáticamente. Resolver fuentes; regenerar derivados del *blog* y volver a verificar. Consultar al equipo si hay decisiones incompatibles. |
| *Push* rechazado | «Actualiza la información remota y explica qué cambió antes de integrar». No usar *push* forzado para saltarse el trabajo del otro. |
| Archivo equivocado en *stage* | «Retíralo del índice conservando el archivo y sus cambios». Revisar otra vez el *diff* preparado antes del *commit*. |
| Error ya compartido | «Prepara una corrección o un *revert* revisable en una rama». Un *revert* crea otro *commit* que revierte cambios; puede generar conflictos. Evitar reescribir la historia compartida. |
| *PR* fusionado pero *blog* antiguo | «Comprueba la base del *merge*, el contenido de *main*, la salida versionada y el despliegue». Fusionar en otra rama no publica en *main*; un *merge* correcto tampoco acredita que Netlify terminó. |
| Rama parece sobrante | «Comprueba integración completa, *PR* dependientes y *worktrees*». Si hay dudas o trabajo activo, conservarla. |

`reset --hard`, `clean -fd`, `push --force` y `branch -D` no son soluciones rutinarias. Si una recuperación excepcional los requiriera, explicar primero alcance y alternativa que conserve el trabajo y obtener acuerdo específico.

## Comandos de consulta y comprobación

La IA puede ejecutarlos; no hace falta memorizarlos. En RStudio, usar la pestaña **Terminal** para Git y Python, y abrir siempre `Seminario-IIE-3T.Rproj`. La pestaña Git permite revisar el *diff* y elegir archivos para *stage*.

```powershell
git status --short --branch
git fetch origin
git branch -vv
git worktree list
git diff
git diff --cached
git log --oneline --decorate -8
```

Para actualizar la base y abrir un encargo nuevo, **solo tras revisar y resolver el estado local** (sustituir `tema` y autor):

```powershell
git switch main
git merge --ff-only origin/main
git switch -c miguel/tema
```

Para comprobar una entrega desde la raíz:

```powershell
.\.venv\Scripts\python.exe scripts/site.py check
# Seleccionar antes los archivos revisados para stage.
.\.venv\Scripts\python.exe scripts/check_repo.py
```

El primer comando reconstruye el *blog*; en la consola R equivale a `blog("check")`. El segundo examina **el índice**, no todos los cambios sin seleccionar. Al clonar, activar el *hook* local con `git config core.hooksPath .githooks`; consultar [ENVIRONMENT.md](../ENVIRONMENT.md) para preparar los entornos. Nunca saltarse un control fallido sin diagnosticarlo.

## Comprobación rápida de comprensión

«La IA hizo *commit* y *push*; ¿ya aparece la modificación en el *blog*?» **No necesariamente:** falta comprobar integración en *main*, salida generada y despliegue. «¿Borrar una rama integrada borra sus *commits* de *main*?» **No:** elimina ese nombre de rama; *main* conserva la historia integrada.

## Procedencia y alcance

Propuesta de Miguel (P-ME-053), desarrollada con asistencia de IA. Síntesis de las reglas existentes, precisada en P-ME-055: toda integración en *main* requiere un *PR*. Fuentes locales consultadas el 2026-10-10 sobre la base `ea0a0c9`: [AGENTS.md](../AGENTS.md), secciones «Flujo de trabajo colaborativo y ramas de Git», «Cierre y limpieza» y «Bitácora»; [ENVIRONMENT.md](../ENVIRONMENT.md), «Git y primera contribución»; [OPERACION-BLOG.md](OPERACION-BLOG.md), «Comprobación de la rama de publicación» y «Rutina de cierre»; [REPRODUCIBILIDAD.md](REPRODUCIBILIDAD.md), «Como ética de trabajo». Formato inspirado en la [ficha Zotero + IA](../bibliografia/ficha-zotero/README.md), v1.3.

Revisión didáctica y operativa propia: encargos con resultados comprobables; distinción entre local, remoto, integración y publicación; conservación del trabajo compartido. No se ensayaron aquí conflictos, recuperación de historia ni un ciclo nuevo de *PR*/*merge*; no se presenta como prueba independiente ni como validación científica.
