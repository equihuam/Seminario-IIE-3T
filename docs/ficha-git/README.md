# Ficha Git + IA

Referencia para Miguel y Octavio, solicitada en P-ME-053. Versión 1.2, 2026-10-10. Hoja carta de una página con seis encargos y comprobaciones, acompañada de [guía ampliada](../COLABORACION-GIT-IA.md). Fuera del blog; no contiene información confidencial.

- Fuente de contenido y diseño: `generar.py`.
- Vector con texto editable: `git-ia-ficha.svg`.
- Imprimible: `../../output/pdf/git-ia-ficha.pdf`.
- Vista previa: `../../output/pdf/git-ia-ficha.png`.

Ejecutar `python docs/ficha-git/generar.py` desde la raíz, con ReportLab y pdfplumber (backend pypdfium2 para render). El script resuelve sus rutas desde su propia ubicación y no modifica `blog/`. Se utilizó el runtime incluido 26.1007.11041; no se agregaron dependencias a `.venv` ni se modificaron los bloqueos. Para regenerar con otro Python, comprobar primero esas dependencias.

Cambiar el generador para conservar concordancia entre PDF y SVG. Las ediciones manuales del SVG se sobrescriben al regenerar; guardar una variante si se desea conservarlas. El contenido comparte las reglas de la guía ampliada: mantener ambas al cambiar el procedimiento. Formato inspirado en la ficha Zotero v1.3; encargos redactados con asistencia de IA y conservados literalmente en estas fuentes.

El generador comprueba página única, dimensiones 612 × 792 puntos y límites del texto, y renderiza el PDF a PNG para revisión visual. No ejecuta los encargos de Git incluidos en la ficha. El SVG puede variar si el lector sustituye las fuentes. No se ha probado impresión física ni uso con los dos colaboradores.

Actualización P-ME-054: logo aprobado desde `img/identidad/` (vector en SVG y PNG en PDF), recorrido propuesto por Miguel con flechas vectoriales y términos ingleses en cursiva. Los nombres propios y las rutas conservan su función identificadora. Se redistribuyen espacios para conservar una página carta.

Actualización P-ME-055: correcciones de lenguaje de Miguel, nuevo título de reglas y aclaración de autorización: toda integración en main requiere PR. Pie ampliado con redistribución vertical y sin reducir tipografía.
