# Seminario/taller de integridad ecosistémica: modelo de tres capas

## Propósito

Desarrollar un seminario/taller para conocer, comprender, analizar y construir modelos de redes bayesianas que permitan estimar el índice de integridad ecosistémica (IIE), con fundamento en el modelo de tres capas desarrollado por el equipo.

El proyecto integrará fundamentos conceptuales, explicaciones matemáticas y procedimientos computacionales de entrenamiento e inferencia. Ofrecerá apoyo didáctico progresivo, diseño gráfico académico y atractivo, y prácticas formales de ingeniería de software en R y Python. Cada script que se desarrolle deberá contar con criterios de cumplimiento técnico y verificaciones proporcionales a su función.

La **reproducibilidad científica** será un concepto que se estudia, una condición de diseño de los materiales y una ética de trabajo. Se buscará que otra persona pueda reconstruir los supuestos y procedimientos, regenerar los resultados y examinar críticamente su interpretación, con límites y contribuciones explícitos. Véase el [marco de reproducibilidad](docs/REPRODUCIBILIDAD.md).

## Marco conceptual inicial

El [SVG del equipo](img/Modelo%20de%20tres%20capas.svg) identifica tres capas:

| Capa | Descripción inicial basada en el SVG |
| --- | --- |
| Contextual | Condiciones fisicoquímicas dentro de las cuales se manifiestan los intervalos de valores de los atributos medidos. |
| Detección | Atributos medibles del ecosistema relacionados con estructura, composición y función. |
| Latente | Condición ecosistémica; expresa el nivel de integridad en relación con las capas de detección y contextual. |

Estructura, composición y función no son los nombres de las tres capas. El manuscrito `iie-teoria/iie-teoria.qmd` amplía el contexto a aspectos biogeográficos y distingue observaciones, estado biótico real y condición. Su formulación mínima expresa las observaciones como dependientes del contexto y de la condición; el diagnóstico infiere la condición a partir de esas observaciones y del contexto (secciones 3–5).

La sección 21 distingue el **IIE escalar operativo**, construido con anclaje experto y dependencias entre indicadores representadas mediante TAN, de una **ampliación multidimensional** cuya identificación requiere datos suficientes. El taller conservará esta distinción: no supondrá que la implementación existente estima primero todas las dimensiones y luego las agrega.

También distinguirá el valor esperado histórico de categorías expertas de las propuestas de probabilidad de integridad y de proyección de un vector latente. Cada ejercicio deberá declarar cuál calcula, con qué referencia y bajo qué supuestos. Se conservará la distribución posterior para evitar que un promedio oculte incertidumbre o multimodalidad. Véanse las fuentes y precisiones en [Fuentes y decisiones](docs/FUENTES-Y-DECISIONES.md).

## Resultados de aprendizaje propuestos

1. Explicar las tres capas y distinguir variables observadas, latentes y contextuales.
2. Traducir una pregunta ecológica a variables, supuestos y una estructura de red justificada.
3. Comprender la formulación probabilística, el aprendizaje de parámetros y la inferencia asociados al modelo adoptado.
4. Preparar datos, entrenar redes y evaluar sus resultados mediante procedimientos reproducibles en R y/o Python.
5. Interpretar estimaciones e incertidumbre del IIE y reconocer sus límites.
6. Entregar un proyecto documentado, con código verificable y comunicación gráfica clara.

## Desarrollo adaptativo y apertura común

Los temas se elegirán dinámicamente según el interés, la comprensión conceptual y la madurez técnica de los participantes. La primera aproximación partirá del modelo **iie-3t**, con lenguaje accesible:

1. Plantear una pregunta ecológica: cómo interpretar señales de condición en ecosistemas con contextos distintos.
2. Reconocer contexto, atributos detectables y condición latente mediante un ejemplo y el SVG del equipo.
3. Construir una representación de variables y relaciones, explicitando lo observado, lo inferido y lo supuesto.
4. Introducir la incertidumbre y mostrar cómo nuevas observaciones modifican el diagnóstico.
5. Nombrar y formalizar progresivamente la estructura que emerge: nodos, arcos, probabilidades condicionales y red bayesiana.

Esta representación motiva el estudio de las redes; no prueba por sí sola causalidad ni establece una arquitectura única. La factorización, separación-d, entrenamiento, TAN y validación se incorporarán cuando la progresión del grupo lo permita. Las ampliaciones multidimensionales, los servicios y la dinámica son opciones, no compromisos de cobertura.

El cierre de cada sesión recogerá preguntas, dificultades y una evidencia breve de aprendizaje para orientar la siguiente. Desde la primera actividad se identificarán fuentes, supuestos y versiones; la exigencia computacional crecerá junto con la autonomía del grupo.

## Productos previstos

- Programa del seminario/taller y secuencia de actividades.
- Material conceptual, derivaciones matemáticas y glosario con notación consistente.
- Diagramas y recursos didácticos editables, con fuentes identificadas.
- Ejercicios progresivos, datos documentados y ejemplos computacionales.
- Scripts de entrenamiento, inferencia y evaluación con sus pruebas.
- Una plantilla simplificada para los proyectos de participantes.

## Organización

- [Blog: fuentes de la portada](site/index.qmd): introducción común, sesiones y catálogo temático.
- [Entornos y ejecución](ENVIRONMENT.md): instalación, reproducción, vista previa y controles de Git.
- [Operación del blog](docs/OPERACION-BLOG.md): incorporación de sesiones y revisión editorial.

- [AGENTS.md](AGENTS.md): pautas para el trabajo asistido dentro de este proyecto.
- [Plan de trabajo](PLAN.md): estado y próximos entregables.
- [Fuentes y decisiones](docs/FUENTES-Y-DECISIONES.md): evidencia consultada y asuntos pendientes.
- [Criterios de calidad](docs/CRITERIOS-DE-CALIDAD.md): requisitos didácticos, gráficos y técnicos.
- [Reproducibilidad científica](docs/REPRODUCIBILIDAD.md): fundamento conceptual, diseño y ética de trabajo.
- [Bitácora del desarrollo](BITACORA.md): evolución sucinta de la propuesta formativa.
- Registro de prompts: `PROMPTS.md`, conservado solo localmente y excluido de Git y del blog por contener información interna.
- [Plantilla para participantes](plantilla-participantes/README.md): borrador copiable para iniciar un proyecto.

## Alcance y estado

Las copias locales de las dos fuentes ya fueron consultadas de forma selectiva para fundamentar esta configuración. El blog local contiene la propuesta de apertura y comprobaciones de ejecución R/Python. El programa detallado, la duración, el perfil de participantes, los datos, las bibliotecas de modelación y la variante operacional del IIE del primer ejercicio siguen pendientes. La plantilla para participantes continúa siendo documental; todavía no contiene una implementación de red bayesiana. La configuración de entornos actual pertenece al proyecto del seminario.

Todo el trabajo de este proyecto se mantiene en `Seminario-IIE-3T/`. Las carpetas hermanas pertenecen a otros proyectos.
