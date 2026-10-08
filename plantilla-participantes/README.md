# Mi proyecto de redes bayesianas e integridad ecosistémica

Plantilla documental inicial para copiar a una carpeta propia. No contiene todavía un modelo ejecutable ni un entorno configurado.

## Inicio

1. Dar nombre al proyecto y completar `PROYECTO.md`.
2. Elegir R, Python o ambos según el ejercicio. Registrar versiones y dependencias al preparar el entorno.
3. Documentar la procedencia y el significado de los datos antes de entrenar.
4. Definir un primer resultado pequeño y sus criterios de aceptación.
5. Implementar, verificar desde una sesión nueva y registrar evidencia en `BITACORA.md`.

## Estructura a crear conforme se necesite

```text
PROYECTO.md          pregunta, alcance, modelo y aceptación
BITACORA.md         decisiones y evidencia de ejecución
data/               datos originales y procesados, separados
src/                funciones reutilizables en R y/o Python
scripts/            preparación, entrenamiento, inferencia y evaluación
tests/              pruebas de cálculos, contratos y flujo completo
notebooks/          exploración y explicación didáctica
results/            resultados regenerables y figuras
```

Usar rutas relativas y mantener los datos originales inmutables. No versionar credenciales, entornos locales ni datos cuya distribución no esté autorizada. Al configurar el entorno, añadir un archivo de exclusiones adecuado y registrar las dependencias: por ejemplo, `renv.lock` para R o un manifiesto y bloqueo de dependencias para Python.

## Ejecución y verificación

**Pendiente de completar con el primer ejercicio.** Sustituir esta sección por comandos reales de instalación, ejecución y pruebas, e indicar salidas esperadas. Comprobarlos desde una sesión nueva antes de distribuir el proyecto como ejecutable. Una suite que descubre cero pruebas no demuestra cumplimiento.

## Entrega mínima

Pregunta ecológica, diagrama y supuestos; diccionario de datos; entorno reproducible; código; pruebas; resultados con incertidumbre cuando corresponda; interpretación y limitaciones. Si se estima el IIE, citar su definición y explicar cómo se obtiene a partir del modelo.

Inspirada en el enfoque de organización y verificación de [agentic-project-template-v4](https://github.com/equihuam/agentic-project-template-v4), simplificado para el taller.
