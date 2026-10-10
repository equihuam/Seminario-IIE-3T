# Registro bibliográfico con Zotero

Zotero será el catálogo de referencias del seminario. Este directorio conserva las exportaciones bibliográficas seleccionadas y revisadas; no es una copia de la biblioteca personal ni de sus adjuntos.

## Organización acordada

- Destino acordado por Miguel: **biblioteca de grupo compartida con Octavio**. Grupo creado: [**Seminario IIE-3T**](https://www.zotero.org/groups/6712171/seminario_iie-3t), ID `6712171`, propiedad de Miguel Equihua. Privado, metadatos editables por miembros y sin almacenamiento de adjuntos al inicio. Colección creada: `Seminario`, clave `JGFMANF9`. Grupo y colección sincronizados y comprobados mediante API local. No reutilizar otro grupo solo porque su nombre coincida con el de un colaborador.
- Cada participante prepara una colección propia para su proyecto. Etiquetas sugeridas: `por-revisar`, `verificada`, `usada`. La clasificación temática puede crecer cuando haga falta.
- Mantener un solo registro por obra y versión pertinente; buscar DOI y título antes de agregar. Corregir metadatos en Zotero y volver a exportar.
- Mantener en `docs/FUENTES-Y-DECISIONES.md` la relación entre referencia, afirmación, sección/página consultada y límites. El estado «verificada» significa metadatos cotejados, no lectura completa.

## Primera práctica

Seguir [Zotero y tu bibliografía](../blog/recursos/zotero.qmd). Con una referencia ya elegida, comparar la ficha visible en Zotero y la consulta del asistente. Registrar qué se consultó realmente. No importar referencias históricas en bloque ni escoger por defecto una biblioteca personal como destino del equipo.

## Herramienta de lectura del proyecto

`scripts/zotero_bibliografia.py` usa la biblioteca estándar de Python, solo consultas HTTP GET y la biblioteca elegida del Zotero de este equipo. Exige `--grupo ID` o `--personal` para no consultar por accidente otra biblioteca. No necesita el plugin de Codex. No instala dependencias ni modifica Zotero. Omite proxies para el tráfico de loopback. Para la preparación inicial, el participante puede usar un asistente local compatible sin instalar Python; estos comandos son una alternativa para quien ya lo tiene.

Desde la raíz, en el entorno existente de Windows:

```powershell
.\.venv\Scripts\python.exe scripts/zotero_bibliografia.py estado
.\.venv\Scripts\python.exe scripts/zotero_bibliografia.py grupos
```

Los comandos de colección y búsqueda usan el grupo y la colección comprobados. En la exportación, `IJKLMNOP` es un marcador: sustituirlo por la clave de una referencia seleccionada real; la biblioteca todavía está vacía:

```powershell
.\.venv\Scripts\python.exe scripts/zotero_bibliografia.py colecciones --grupo 6712171
.\.venv\Scripts\python.exe scripts/zotero_bibliografia.py buscar --grupo 6712171 --coleccion JGFMANF9 --consulta "integridad"
.\.venv\Scripts\python.exe scripts/zotero_bibliografia.py exportar --grupo 6712171 --item IJKLMNOP --salida bibliografia/referencias.bib
```

Se puede repetir `--item` para seleccionar varias referencias. La exportación rechaza notas/adjuntos y archivos existentes. Para actualizar, exportar a un nombre nuevo, revisar las diferencias y reemplazar deliberadamente la versión anterior. El listado y la búsqueda devuelven como máximo 20 resultados: usar `--inicio 20`, `--inicio 40`, etc. La biblioteca de grupo debe estar sincronizada en el cliente local. La herramienta no implementa la API web ni envía invitaciones.

## Entrega bibliográfica

Cuando haya selección acordada, generar `referencias.bib` y registrar aquí fecha, colección/biblioteca, claves Zotero exportadas, claves BibTeX resultantes y responsable de revisión. Versionar solo metadatos autorizados. El archivo no se crea vacío para simular una exportación; tampoco se activa todavía como bibliografía global de Quarto. La migración de citas del blog será un paso posterior, con revisión de claves.

## Estado de preparación

Directiva, guía y cliente de lectura preparados. Biblioteca de grupo y colección creadas y sincronizadas. Pendientes: membresía de Octavio, selección inicial e importación. Miguel informa el 9 de octubre de 2026 que ya envió la invitación al correo de Octavio (P-ME-016). Su aceptación y acceso siguen pendientes de confirmación. Las verificaciones técnicas y sus límites se registran en la bitácora del proyecto.

Referencia técnica: [API local de Zotero](https://www.zotero.org/support/dev/web_api/v3/local_api), consultada el 9 de octubre de 2026. Las capacidades de escritura dependen de la versión; esta práctica usa exclusivamente lectura.

## Secuencia de configuración y estado

1. Completado: en Zotero web, crear `Seminario IIE-3T` como grupo privado. Registrar aquí su URL e ID numérico; confirmar nombre y propiedad en la pantalla resultante.
2. Completado: en Library Settings, permitir edición de metadatos a los miembros. Mantener sin almacenamiento de adjuntos durante esta primera práctica.
3. Invitación enviada por Miguel al correo de Octavio, según P-ME-016. Pendiente confirmar aceptación y acceso. No volver a enviar la invitación por defecto.
4. Completado: sincronizar Zotero de escritorio y comprobar que `grupos` devuelve el nuevo ID. Crear dentro del grupo la colección `Seminario` y verificar su clave con `colecciones --grupo ID`.
5. Seleccionar una referencia ya utilizada en el blog, cotejarla, incorporarla al destino confirmado y comprobar la consulta. Después exportar solo esa selección a BibTeX y registrar su procedencia.

La configuración privada inicial quedó guardada y comprobada al volver a abrir los ajustes. En la última comprobación directa, el grupo tenía un miembro (Miguel); después Miguel informó el envío de la invitación a Octavio, sin confirmación aún de aceptación. Los participantes pueden practicar antes en sus bibliotecas personales; la coordinación decidirá el acceso al catálogo compartido. Fuente: [grupos de Zotero](https://www.zotero.org/support/groups).

## Prueba de acceso web — 2026-10-09

Credencial guardada en el Administrador de credenciales de Windows bajo `zotero/seminario-iie3t`. Prueba puntual autorizada por P-ME-018: autenticación, grupo `6712171`, colección `JGFMANF9` y listado de ítems responden HTTP 200; colección vacía. Clave utilizada solo en memoria, sin copiarla a archivos ni mostrarla.

**Pendiente ajustar permisos:** Zotero devuelve acceso a la biblioteca personal y a todos los grupos, con escritura. El permiso individual adicional apunta a `6712174`, que no es el grupo creado para este proyecto (`6712171`). Para la práctica actual basta lectura del grupo del seminario. Los permisos no fueron modificados. El cliente `zotero_bibliografia.py` sigue usando la API local; la prueba web fue independiente.

### Nueva comprobación tras el ajuste — P-ME-019

El alcance amplio descrito arriba queda superado: la clave permite únicamente el grupo `6712171`, con lectura y escritura. Cinco consultas GET devolvieron HTTP 200. Existe una referencia en la biblioteca: *La academia movilizada en defensa de la vida (Una experiencia mexicana)*, clave `2YDDZ2NC`. Aún no pertenece a ninguna colección; `Seminario` (`JGFMANF9`) sigue vacía. No se modificó el registro ni se probaron escrituras. Esta constatación de metadatos no equivale a lectura del libro ni a validación bibliográfica completa.

## Referencias de «Empieza aquí» — 2026-10-10

Incorporación autorizada en P-ME-022 al grupo `6712171`, colección `Seminario` (`JGFMANF9`). Se desglosaron en dos registros el esquema y el manuscrito que aparecen juntos en la lista de procedencia. Resultado: siete registros creados y uno existente reutilizado; los ocho comprobados mediante GET individual y pertenencia a la colección. No se adjuntaron documentos. Las menciones generales a Forrester, Sterman y Senge no identifican obras concretas; no se inventaron referencias para ellas.

| Fuente | Clave Zotero | Cotejo y pendientes |
| --- | --- | --- |
| Equihua Zamora, Pérez-Maqueo y Equihua Benítez, Integridad ecosistémica. El tejido de la vida y la salud | EVEQAYRN | Registro existente, añadido a la colección conservando sus metadatos. Título y autores cotejados con el manuscrito aportado y catálogo UNAM. La ficha existente corresponde al libro electrónico (ISBN 9786075871615, 2025); el catálogo impreso describe 2024, 231 páginas e ISBN 9786073096843. No mezclar ediciones ni equiparar su paginación con el manuscrito usado en la página. |
| O’Malley, From endosymbiosis to holobionts (2017) | 6MWQ9EI4 | Autoría, título, revista, volumen, páginas y DOI cotejados con el depósito editorial de Crossref. |
| Koide, On Holobionts, Holospecies, and Holoniches (2023) | 3EVAMBAP | Metadatos cotejados con Crossref. Fecha del volumen: mayo de 2023; publicación en línea: 8 de abril de 2022, conservada en Extra. |
| Eguiarte, reseña de Integridad ecosistémica (2025) | PQEHRDK5 | Título, autoría y fecha 17-12-2025 comprobados en Oikos; registro de página web de reseña, distinto del libro. |
| The Donella Meadows Project, Systems Thinking Resources | ENKN7PP2 | Página institucional consultada. Autor corporativo; sin fecha identificada. |
| Murphy, Dynamic Bayesian Networks (2002) | QZWCM56T | Título, autor y fecha 12-11-2002 cotejados en la portada del PDF. Borrador de capítulo; no se atribuye una edición final. |
| Modelo de tres capas para la integridad ecosistémica | D5M9S6GI | Manuscrito de trabajo; título descriptivo de la página. Autoría formal y título de portada pendientes; procedencia y versión documentadas en Extra. Etiqueta por-revisar. |
| Modelo de tres capas | 5BBEQ4DV | Diagrama SVG del equipo, enlazado a su fuente del repositorio. Fecha y autoría individual pendientes. Etiqueta por-revisar. |

Fuentes de cotejo: [catálogo UNAM del libro impreso](https://www.dgdc.unam.mx/libros/libros/libro/9786073096843), [Crossref O’Malley](https://api.crossref.org/works/10.1016/j.jtbi.2017.03.008), [Crossref Koide](https://api.crossref.org/works/10.1007/s00248-022-02005-9), páginas y PDF enlazados en `blog/empieza-aqui.qmd`, encabezado del manuscrito DOCX proporcionado y registro de fuentes del proyecto. Los DOI no pudieron abrirse mediante la herramienta web; sus metadatos sí se recuperaron de Crossref. El manuscrito iie-teoria no se volvió a localizar en la ruta relativa intentada: su procedencia se tomó del registro previo, sin declarar lectura nueva.

No se exportó aún un archivo BibTeX ni se cambiaron las citas del blog. Estas son claves de ítem Zotero, no claves de cita BibTeX. La siguiente revisión podrá resolver los datos pendientes y elegir las versiones documentales que se citarán formalmente.


## Prueba de anotaciones del grupo — 2026-10-10

P-ME-030 / B056: API web recupera dos anotaciones del PDF UUYYWPBE y permite crear el resaltado rojo solicitado, V79697SC, verificado después mediante GET. La API local de Zotero 9.0.3 devolvió una lista de hijos vacía para ese adjunto; no usar esa respuesta como prueba de ausencia de anotaciones web. Pendiente visualizar el nuevo resaltado en el lector tras sincronización. El PDF contiene O’Malley (2017), pero está asociado al registro Koide 3EVAMBAP; discrepancia comunicada y no corregida automáticamente. La carga del adjunto fue realizada por Miguel; no se verificó nuevamente toda la configuración del grupo.
