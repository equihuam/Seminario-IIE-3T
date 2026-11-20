# Revisar el ejercicio en otro equipo

P-ME-187 · 19 de noviembre de 2026

El ejercicio está en **miguel/ejercicio-canicas**, con destino futuro a **main** mediante PR. Mantener el PR abierto y en borrador hasta resolver la dinámica con Octavio. Obtener esta rama no fusiona ni modifica main.

## Obtener la rama

En una copia existente, desde Terminal:

```sh
git status --short --branch
git fetch origin
```

Si hay trabajo local pendiente, conservarlo y resolver cómo separarlo antes de cambiar de rama. No hacer reset ni stash automáticamente.

Si todavía no existe la rama local:

```sh
git switch --track origin/miguel/ejercicio-canicas
```

Si ya existe, usar en su lugar:

```sh
git switch miguel/ejercicio-canicas
git pull --ff-only origin miguel/ejercicio-canicas
```

Comprobar `git branch --show-current`: debe devolver `miguel/ejercicio-canicas`. Si el avance rápido falla, revisar la divergencia con Miguel; no forzar el push.

Para una primera copia, elegir una ubicación propia y clonar la rama:

```sh
git clone --branch miguel/ejercicio-canicas https://github.com/equihuam/Seminario-IIE-3T.git
cd Seminario-IIE-3T
```

## Revisar y ejecutar

1. Abrir `Seminario-IIE-3T.Rproj` en RStudio y leer [GUIA.md](GUIA.md).
2. Examinar `datos/contextos.csv` y `datos/recetas.csv`: son datos sintéticos incluidos, suficientes para ejecutar la práctica.
3. Desde Terminal, en la raíz, ejecutar:

```sh
Rscript --vanilla ejercicios/tres-bolsas/tests/test-modelo.R
Rscript --vanilla ejercicios/tres-bolsas/simular.R ejercicios/tres-bolsas/resultados-octavio-01
```

La versión comprobada es R 4.6.0. Si Rscript no está en PATH, usar la ruta de la instalación propia. Solo requiere bibliotecas incluidas en R. La salida debe ser una carpeta nueva; conservar las corridas anteriores. No ejecutar instaladores por defecto ni modificar preferencias globales. Si el inicio del perfil se demora, la ruta `--vanilla` es la comprobada; véase [VERIFICACION.md](VERIFICACION.md).

4. Empezar por `resultado_principal.csv` y `probabilidad_integridad.png`: probabilidad de integridad frente al indicador real. Conservar el análisis del grado Z en `comparacion.csv`, `posterior_condicion.csv`, `sensibilidad_previas.csv` y `condicion.png`.
5. Comentar en el PR si la mecánica conserva las distinciones conceptuales, si la escala y previas sirven al propósito y si las instrucciones son realizables en clase. Registrar desacuerdos antes de integrar.

## Qué llega con Git y qué no

Git incluye guía, código, recetas sintéticas, pruebas, manifiesto y generador de diapositivas. Los resultados se regeneran localmente. Los originales de Dropbox tampoco viajan con Git: no son necesarios para ejecutar la nueva variante; ubicación y huellas en el [README](README.md).

El PPTX de trabajo permanece excluido de Git según la política del proyecto. Miguel conserva `output/bolsas-bicolores/Dinamica-bolsas-bicolores-v2.pptx` para compartirlo por separado si se acuerda. No aparecerá al clonar. El generador `presentaciones/crear-bolsas-bicolores.mjs` requiere el runtime de presentaciones de Codex; R por sí solo no genera ese PPTX.

## Continuar sin integrar todavía

Preferir comentarios en el PR para la revisión conceptual. Antes de editar en la rama compartida, acordar con Miguel quién modifica cada material y actualizar mediante avance rápido. Octavio registra sus instrucciones en `prompts/octavio.md`. Los commits y push adicionales a esta rama actualizan el PR abierto. No fusionar a main, activar auto-merge ni publicar hasta el acuerdo docente.
