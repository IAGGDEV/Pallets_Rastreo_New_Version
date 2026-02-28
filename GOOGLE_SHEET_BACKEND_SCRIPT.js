// ==========================================
// GOOGLE APPS SCRIPT - CONEXIÓN DIRECTA CON FRONTEND
// ==========================================
// Instrucciones de despliegue:
// 1. Ve a tu Google Sheet.
// 2. Haz clic en Extensiones > Apps Script.
// 3. Borra el código existente y pega completamente este código.
// 4. Guarda el proyecto (ej: "API Rastreo Directo").
// 5. Haz clic en el botón azul "Implementar" (arriba a la derecha) > "Nueva implementación".
// 6. Configuración de la implementación:
//    - Selecciona tipo: "Aplicación web" (haciendo clic en la rueda dentada).
//    - Descripción: "API v2"
//    - Aplicación web:
//        Ejecutar como: "Yo" (tu email)
//        Quién tiene acceso: "Cualquier persona" (¡MUY IMPORTANTE PARA QUE FUNCIONE!)
// 7. Haz clic en el botón "Implementar" y autoriza los permisos si te los pide.
// 8. Copia la "URL de la aplicación web" generada (suele terminar en /exec).
// 9. Ve a tu proyecto en Vercel > Settings > Environment Variables y agrega:
//    - Key: VITE_API_URL
//    - Value: [La URL que copiaste en el paso 8]
// ==========================================
// ESTRUCTURA EXACTA SEGÚN TU IMAGEN
// ==========================================
// Nombre de la hoja (Pestaña abajo): "Hoja 1"
// Fila 1 (Encabezados): id | solicitado | en camino | a sandiego | san diego | cruzando | tijuana
// En las filas pones el ID del paquete en la columna A.
// Para marcar en qué estado va, pon una "x" (o "X") en la celda de la columna correspondiente.
// ==========================================

function doGet(e) {
    const SHEET_NAME = "Hoja 1"; // Nombre predeterminado según tu imagen
    const COLUMN_ID = 0; // Columna A es el ID (índice 0)

    // Nombres de los estados según las columnas B (1) a G (6)
    const STATUS_NAMES = [
        "solicitado",  // Columna B (índice 1)
        "en camino",   // Columna C (índice 2)
        "a sandiego",  // Columna D (índice 3)
        "san diego",   // Columna E (índice 4)
        "cruzando",    // Columna F (índice 5)
        "tijuana"      // Columna G (índice 6)
    ];

    let result = {
        success: false,
        message: "No se encontró el envío. Verifica que el número de rastreo esté correcto.",
        error: "Not Found",
        tracking_number: null
    };

    try {
        // 1. Obtener ID a buscar
        if (!e || !e.parameter || !e.parameter.trackingNumber) {
            throw new Error("Falta el parámetro 'trackingNumber'.");
        }
        const trackingId = String(e.parameter.trackingNumber).trim().toUpperCase();

        // 2. Conectar a la hoja (Spreadsheet)
        const ss = SpreadsheetApp.getActiveSpreadsheet();
        if (!ss) throw new Error("No se pudo acceder al documento activo. Verifica permisos.");
        const sheet = ss.getSheetByName(SHEET_NAME);
        if (!sheet) throw new Error(`La hoja nombrada '${SHEET_NAME}' no existe.`);

        // 3. Buscar datos
        const data = sheet.getDataRange().getValues();
        const rows = data.slice(1); // Ignorar la fila 1 (los encabezados)

        // Buscar la fila cuyo Columna A coincida
        const foundRow = rows.find(row =>
            String(row[COLUMN_ID] || '').trim().toUpperCase() === trackingId
        );

        if (foundRow) {
            // Encontrar en qué columna de la B a la G tiene la equis ("x" o "X")
            let currentStatus = "No hay status asignado - Falta X";
            let currentIndex = -1; // Nos ayuda en el frontend para armar la línea de progreso

            for (let i = 1; i <= 6; i++) {
                // En Google Sheets las celdas vacías son string vacios ''
                const cellValue = String(foundRow[i] || '').trim().toLowerCase();
                if (cellValue === 'x') {
                    currentStatus = STATUS_NAMES[i - 1];
                    currentIndex = i - 1;
                    break; // Detenernos apenas encontramos la X
                }
            }

            result = {
                success: true,
                tracking_number: foundRow[0] ? String(foundRow[0]) : trackingId, // A
                current_status: currentStatus,
                step_index: currentIndex, // Retornamos el número para la visualización (0 al 5)
            };
        }
    } catch (error) {
        result.success = false;
        result.message = error.message;
        result.error = error.toString();
    }

    // Retornar JSON para el Frontend resolviendo problemas de tipo/CORS
    return ContentService.createTextOutput(JSON.stringify(result))
        .setMimeType(ContentService.MimeType.JSON);
}

// Función exclusiva para hacer pruebas en local dentro de Apps Script
function probarFuncionamiento() {
    const eMock = { parameter: { trackingNumber: "PP5791" } };
    Logger.log("Probando backend simulando llamada GET...");
    const respuesta = doGet(eMock).getContent();
    Logger.log(respuesta);
}
