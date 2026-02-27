// ==========================================
// GOOGLE APPS SCRIPT - BACKEND CÓDIGO
// ==========================================
// Instrucciones:
// 1. Ve a tu Google Sheet.
// 2. Haz clic en Extensiones > Apps Script.
// 3. Borra cualquier código que haya y pega esto.
// 4. Guarda el proyecto (ej: "API Rastreo").
// 5. Haz clic en el botón azul "Implementar" > "Nueva implementación".
// 6. Selecciona tipo: "Aplicación web".
// 7. Configuración:
//    - Descripción: "API v1"
//    - Ejecutar como: "Yo" (tu email)
//    - Quién tiene acceso: "Cualquier persona" (IMPORTANTE)
// 8. Copia la "URL de la aplicación web" generada.

function doGet(e) {
  // Configuración de la hoja
  const SHEET_NAME = "Envios"; // Asegúrate de que tu hoja se llame así
  const COLUMN_ID = 0; // Columna A (índice 0) es el Tracking ID
  
  // Obtener parámetros
  const params = e.parameter;
  const trackingId = params.id;
  
  // Respuesta base
  let result = {
    success: false,
    message: "No se encontró el envío",
    data: null
  };
  
  try {
    if (!trackingId) {
      throw new Error("Falta el parámetro 'id'");
    }

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    if (!sheet) {
      throw new Error(`La hoja '${SHEET_NAME}' no existe`);
    }

    // Obtener todos los datos (asume que la fila 1 son encabezados)
    const data = sheet.getDataRange().getValues();
    const headers = data[0]; // Fila 1
    const rows = data.slice(1); // Resto de filas

    // Buscar el ID (ignorando mayúsculas/minúsculas)
    const foundRow = rows.find(row => 
      String(row[COLUMN_ID]).trim().toUpperCase() === String(trackingId).trim().toUpperCase()
    );

    if (foundRow) {
      // Mapear datos a objeto JSON basado en índices de columna
      // Ajusta estos índices según tu hoja real:
      // A=0, B=1, C=2, D=3, E=4...
      result.success = true;
      result.message = "Envío encontrado";
      result.data = {
        trackingId: foundRow[0],      // Columna A
        status: foundRow[1],          // Columna B (Estado)
        location: foundRow[2],        // Columna C (Ubicación Actual)
        lastUpdate: foundRow[3],      // Columna D (Fecha/Hora)
        details: foundRow[4],         // Columna E (Detalles/Notas)
        estimatedDelivery: foundRow[5] // Columna F (Estimado)
      };
    }

  } catch (error) {
    result.error = error.toString();
  }

  // Retornar JSON
  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

// Función de prueba para ejecutar en el editor de Apps Script
function testDoGet() {
  const e = { parameter: { id: "PP-12345" } }; // Cambia esto por un ID real de tu hoja
  Logger.log(doGet(e).getContent());
}
