# Introducción a la IA agéntica y Google Antigravity

**Recurso didáctico:** [antigravity-intro.netlify.app](https://antigravity-intro.netlify.app/)

**Propósito:** aprender a dirigir un proyecto con IA: especificar objetivos, definir roles o agentes, redactar prompts verificables, ejecutar tareas pequeñas y colaborar con otras personas sin perder trazabilidad.

> La fuente recibida está incorporada en [web/](web/README.md), con adaptaciones para el seminario. El sitio publicado es independiente: guardar estos archivos en Git no lo despliega. Consulta la [procedencia y las verificaciones](PROCEDENCIA.md).

## 1. Definir primero el proyecto

Antes del primer prompt, responder:

- ¿Qué problema queremos abordar y con qué alcance?
- ¿Cuáles son las fuentes y datos disponibles?
- ¿Qué archivos o resultados esperamos?
- ¿Qué decisiones necesitan autorización humana?
- ¿Qué pruebas permitirán aceptar cada entregable?

Escribir una ficha `PROYECTO.md` que contenga propósito, entradas, productos, restricciones y criterios de aceptación.

## 2. Roles y agentes

Un equipo didáctico mínimo puede distinguir:

| Rol | Responsabilidad | Evidencia de trabajo |
| --- | --- | --- |
| Dirección humana | Definir propósito, permisos y criterios | Aprobaciones y decisiones |
| Coordinación | Convertir el objetivo en tareas y dependencias | `PLAN.md` |
| Investigación | Examinar archivos y fuentes, sin inventar referencias | Inventario y citas |
| Análisis | Procesar datos y explicar métodos | Resultados y procedimiento |
| Revisión | Buscar errores, omisiones y afirmaciones sin sustento | Informe crítico |

**Un rol no exige un agente separado.** Al comenzar, un único agente puede asumir las responsabilidades secuencialmente. Los agentes necesitan autorizaciones concretas; autonomía no equivale a ausencia de supervisión.

## 3. Anatomía de un prompt útil

Incluir **contexto, objetivo, rol, materiales autorizados, restricciones, entregables y verificación**. Evitar encargos ilimitados como «resuelve todo el proyecto».

### Prompt para iniciar

```text
Actúa como coordinador de un proyecto de análisis ambiental.
Lee PROYECTO.md y úsalo como referencia.
Propón un equipo con coordinador, investigador, analista y revisor.
Para cada rol indica tareas, materiales, entregables, criterios
de calidad y decisiones que necesitan autorización humana.
Presenta primero un plan y espera mi revisión.
No modifiques originales, no inventes resultados y no accedas
a servicios externos sin autorización.
Tras la aprobación, guarda el plan en PLAN.md.
```

### Primera tarea comprobable

```text
Revisa los archivos disponibles en datos/.
Elabora un inventario con nombre, formato y contenido comprobable.
No modifiques los originales. Marca explícitamente cualquier
contenido que no hayas podido inspeccionar.
Guarda resultados/inventario.md y explica cómo lo verificaste.
```

### Revisión crítica

```text
Actúa como revisor del inventario generado.
Declara si revisas tu propio trabajo; cambiar de rol no constituye
una revisión independiente. Si se requiere, encárgala explícitamente
a otra persona o a un agente separado e identifica quién la realizó.
Compáralo con los archivos originales. Señala errores de nombre,
omisiones, interpretaciones sin evidencia y limitaciones.
Presenta observaciones antes de proponer cambios.
```

## 4. Secuencia de práctica

1. Preparar la carpeta del proyecto y escribir `PROYECTO.md`.
2. Identificar y registrar la variante y versión de Antigravity utilizada; abrir la carpeta como proyecto. La interfaz puede variar. No se ha ejecutado esta práctica dentro de Antigravity en la verificación de la entrega.
3. Entregar el prompt de coordinación y revisar el plan antes de ejecutarlo.
4. Ejecutar únicamente la tarea de inventario.
5. Revisar el inventario frente a fuentes reales.
6. Anotar lo realizado, lo que se comprobó y lo pendiente en una bitácora.

La utilidad de un agente depende de herramientas disponibles, permisos y revisión humana. No simular acciones ni evidencias.

## 5. Git y GitHub: colaborar entre personas

**Git** registra versiones locales; **GitHub** permite compartir un repositorio y revisar contribuciones. Flujo básico:

```text
main actualizada → rama de trabajo → cambios → pruebas → commit
→ push → pull request → revisión humana → merge autorizado
```

Para principiantes, GitHub Desktop ofrece una ruta visual. Para conocer la terminal: `git status`, `git switch -c`, `git add`, `git commit`, `git push` y `git pull --ff-only`. Si el avance rápido falla, detenerse y revisar la divergencia; no crear un merge local en main. Conservar los cambios locales antes de cambiar de rama. No ejecutar comandos destructivos para «limpiar» el proyecto sin revisar trabajos existentes.

**En este seminario rige la política concreta de** [Git + IA](../../docs/COLABORACION-GIT-IA.md); esa guía prevalece sobre ejemplos genéricos. No fusionar por cuenta del agente, no publicar secretos y no sobrescribir cambios ajenos.

## 6. Tres colaboraciones diferentes

### Entre personas
Acordar responsabilidades, compartir propuestas mediante ramas, discutir diferencias y aprobar integración. Un PR es una propuesta revisable, no una garantía automática de corrección.

### Entre agentes
Asignar objetivos limitados, recursos y productos distintos. Coordinar dependencias, evitar que agentes editen simultáneamente los mismos archivos sin control y revisar los resultados.

### Reproducibilidad
Conservar archivos fuente, versiones, decisiones, métodos y evidencias de prueba para que alguien pueda reconstruir el resultado. Una bitácora y Git son apoyos, pero también deben conocerse datos, parámetros, ambiente y supuestos.

### Ejercicio integrador (dos participantes)

Una persona inicia una rama y propone una mejora al tutorial; un agente revisa ortografía, enlaces y consistencia sin modificar archivos ajenos; la otra persona revisa el diff y el PR. Ambas comprueban que los pasos documentados pueden reproducirse. La fusión a `main` requiere acuerdo expreso.

## 7. Reglas y habilidades persistentes

- **Prompt:** encargo puntual.
- **Regla:** restricción que debe aplicarse al proyecto, por ejemplo, nunca alterar datos originales.
- **Skill:** procedimiento reusable y comprobable, por ejemplo, validar un CSV.
- **Bitácora:** registro de lo realizado, decisiones, resultados y pendientes.

`PROYECTO.md` y `PLAN.md` son nombres pedagógicos convencionales, no comandos propios de Antigravity.

## 8. Lecturas

- [Primeros pasos: codelab oficial de Google](https://codelabs.developers.google.com/getting-started-google-antigravity?hl=es-419)
- [Guía de inicio de Antigravity](https://antigravity.google/docs/get-started?hl=es-419)
- [Documentación de reglas](https://antigravity.google/docs/rules/)
- [Guía de Git + IA del seminario](../../docs/COLABORACION-GIT-IA.md)
- [Actividad Zotero + IA del seminario](../../blog/recursos/zotero.qmd)

## Fuente web y mantenimiento

Los seis archivos recibidos se mantienen en `web/`, separados del blog Quarto. El ZIP original se conserva localmente y sus huellas están en [PROCEDENCIA.md](PROCEDENCIA.md). Los cambios editoriales posteriores a la recepción se documentan allí.

Para revisar la interfaz, abrir `web/index.html` en el navegador o servir `web/` con un servidor local. Comprobar enlaces, escritorio y móvil, menú, tema y copia de prompts antes de preparar una publicación. La práctica con Antigravity y la aprobación docente siguen pendientes.

Para desplegar manualmente en el sitio independiente, usar únicamente la carpeta `web/`, que contiene su propio `netlify.toml`. No usar el `netlify.toml` raíz del seminario ni subir todo el repositorio. La publicación requiere encargo explícito; esta organización no despliega cambios automáticamente.

Git y Zotero conservan sus ubicaciones canónicas. Este catálogo no publica la guía interna Git + IA en el blog. No se ha asignado una licencia pública de reutilización.
