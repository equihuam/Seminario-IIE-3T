# Ticket #16 · Prueba de Octavio en Fragaria

Issue: https://github.com/equihuam/Seminario-IIE-3T/issues/16

## Objetivo
Retomar en Fragaria la revisión documental de la prueba de acceso cruzado al adjunto privado del Semillero, usando el ZIP y los registros que están en esa laptop.

Miguel confirma que la prueba ya se realizó en Fragaria y que la respuesta de Octavio **cierra la batería de pruebas**. Este ticket conserva el contexto para revisar y conciliar la evidencia; no reabre la batería ni solicita repetirla.

## Protocolo comunicado por Miguel
1. Miguel subió una idea con un adjunto privado.
2. Envió a Octavio un ZIP con `Prueba-Octavio.html`.
3. Octavio extrajo el ZIP en su equipo, abrió el HTML y solicitó un código a su propia cuenta.
4. Introdujo el código en esa página y pulsó **Comprobar acceso al adjunto**.
5. Compartió únicamente el mensaje de resultado y el estado HTTP; el código de acceso no se debía divulgar.

El objeto de esta comprobación es el **adjunto privado de Miguel**, accedido con la identidad de Octavio. No equivale automáticamente a comprobar todos los registros, archivos o canales del Semillero.

## Evidencia recibida en este chat
La captura de la página «Prueba de acceso de Octavio» muestra:

> Sesión verificada. Descarga ajena denegada. HTTP 400 · Object not found

Miguel confirmó posteriormente: «Ya está hecho. Lo hice en fragaria. Es el cierre  de la batería de pruebas».

## Contraste observado directamente desde este equipo
Inspección de solo lectura del proyecto Supabase del seminario:
- Bucket `originales` privado.
- Un objeto existente; la política SELECT limita lectura a la carpeta cuyo primer componente coincide con `auth.uid()`.
- Sobre **el mismo objeto existente**, con cuentas distintas: el propietario ve un registro y Octavio ve cero.
- Transacción READ ONLY finalizada con ROLLBACK; sin modificar usuarios, archivos o permisos.

Esto respalda el aislamiento del metadato por RLS. La captura, por sí sola, no distingue una ruta incorrecta de un objeto oculto para el usuario. En este equipo no se revisó el ZIP ni se comprobó la descarga HTTP del propietario.

## Dónde retomar
- Repositorio: `equihuam/Seminario-IIE-3T`.
- Rama confirmada por Miguel: `miguel/semillero-v0`.
- PR relacionado: #15.
- El ZIP está en `private/` de la laptop Fragaria; su nombre exacto y huella aún no se han registrado aquí.
- `private/` está excluido de Git. El ZIP no llega por pull ni debe incorporarse al repositorio para resolver este ticket.
- Los pull ejecutados desde este equipo no aportaron cambios adicionales a `c014a24`.

## Revisión pendiente en Fragaria
- [ ] Localizar el ZIP y registrar localmente nombre, versión y SHA256, sin publicar datos privados.
- [ ] Leer `Prueba-Octavio.html` y comprobar la identidad usada, la ruta del objeto y el criterio que produce «descarga ajena denegada».
- [ ] Cotejar con la evidencia **ya obtenida** que el propietario descargó ese mismo adjunto y que Octavio recibió el rechazo; vincular estado HTTP y huella cuando estén disponibles.
- [ ] Conciliar el resultado con `PLAN.md` (T009) y `BITACORA.md`, manteniendo la batería cerrada según la confirmación de Miguel y distinguiendo ejecución observada de ejecución comunicada.
- [ ] Dejar una conclusión breve y cerrar este ticket documental; si falta alguna evidencia, precisar cuál antes de proponer nuevas pruebas.

No adjuntar códigos OTP, contraseñas, tokens, ZIPs privados ni documentos originales. No contactar a Octavio ni solicitar acceso a su cuenta como parte de esta revisión.

## Trazabilidad
`prompts/miguel.md`: P-ME-087–095. `BITACORA.md`: B101–B105. La captura y el protocolo provienen de Miguel; los contrastes SQL se describen en B101; el cierre confirmado, en B102; el alcance del protocolo, en B103. No hay autorización de fusión a main en este ticket.
