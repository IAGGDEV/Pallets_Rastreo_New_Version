# 🔍 DEBUG: Workflow n8n no inicia

## ⚠️ ERROR ACTUAL:
```
Status: 500
Message: "Workflow Webhook Error: Workflow could not be started!"
```

---

## 🎯 PASOS DE DEBUGGING (Síguelos EN ORDEN):

### PASO 1: Verificar Activación

1. Abre n8n: https://devwebhook.palletsy.com
2. Ve a "Workflows" (menú izquierdo)
3. Busca tu workflow de rastreo
4. **Verifica el estado**:
   - ❌ Si dice "Inactive" (gris) → Clic en el toggle
   - ✅ Si dice "Active" (verde) → Continúa al paso 2

---

### PASO 2: Verificar el Nodo Webhook

1. Abre el workflow
2. Selecciona el **nodo Webhook** (el primero)
3. **Verifica la configuración**:
   - ✅ HTTP Method: `POST`
   - ✅ Path: `palletsrastreo`
   - ✅ Response Mode: `Using 'Respond to Webhook' Node`

4. **Clic en "Listen for Test Event"**
5. En otra pestaña, ejecuta: `node test-webhook.js`
6. **¿Qué pasa?**
   - ✅ Si llegan datos → El webhook funciona, error está después
   - ❌ Si no llegan datos → Hay problema con el webhook

---

### PASO 3: Verificar Google Sheets (Si usas)

1. Selecciona el **nodo Google Sheets**
2. **Verifica**:
   - ✅ ¿Está autorizado? (debe tener una cuenta conectada)
   - ✅ ¿Existe el documento seleccionado?
   - ✅ ¿El nombre de la hoja es correcto? (ej: "Hoja1")
   - ✅ ¿La columna "trackingNumber" existe?

3. **Si NO está autorizado**:
   - Clic en "Select Credential"
   - Clic en "Create New"
   - Autoriza Google Sheets

---

### PASO 4: Verificar Conexiones

1. **Verifica que TODOS los nodos estén conectados**:
   ```
   Webhook → Google Sheets → IF → Function → Respond to Webhook
                                  ↓
                               Function (error)
   ```

2. **CRÍTICO**: El nodo "Respond to Webhook" DEBE estar al final

---

### PASO 5: Ejecutar Workflow Manualmente

1. **Clic en el botón "Execute Workflow"** (arriba)
2. **Inyecta datos de prueba en el Webhook**:
   ```json
   {
     "body": {
       "trackingNumber": "PP-12345"
     }
   }
   ```
3. **¿Qué pasa?**
   - ✅ Si funciona → El problema es con el trigger
   - ❌ Si da error → Mira qué nodo falla (se pone rojo)

---

### PASO 6: Ver Logs de Error

1. **Clic en el nodo que falla** (aparece en rojo)
2. **Lee el error en la parte inferior**
3. **Errores comunes**:
   - `Missing credentials` → Autoriza Google Sheets
   - `Document not found` → El ID de Google Sheets es incorrecto
   - `Column not found` → La columna "trackingNumber" no existe
   - `Invalid JSON` → El statusHistory no es JSON válido

---

## 🚀 WORKFLOW MÍNIMO QUE FUNCIONA (SIN GOOGLE SHEETS):

Si quieres probar que el webhook funciona sin Google Sheets:

### PASO A: Crear Workflow Simple

1. **Nodo 1: Webhook**
   - HTTP Method: POST
   - Path: palletsrastreo
   - Response Mode: Using 'Respond to Webhook' Node

2. **Nodo 2: Code (Function)**
   ```javascript
   return {
     json: {
       success: true,
       data: {
         trackingNumber: $json.body.trackingNumber,
         currentStatus: "En tránsito",
         customerName: "Prueba",
         lastUpdate: new Date().toISOString(),
         estimatedDelivery: new Date(Date.now() + 7*24*60*60*1000).toISOString(),
         statusHistory: [
           {
             status: "Pedido recibido",
             date: new Date(Date.now() - 3*24*60*60*1000).toISOString(),
             location: "Los Ángeles, CA",
             note: "Paquete recolectado"
           },
           {
             status: "En tránsito a frontera",
             date: new Date(Date.now() - 1*24*60*60*1000).toISOString(),
             location: "En camino",
             note: "Transportando"
           }
         ],
         externalTrackingLink: null
       }
     }
   };
   ```

3. **Nodo 3: Respond to Webhook**
   - Respond With: JSON
   - (conectar desde el nodo Function)

4. **ACTIVAR** el workflow
5. **Guardar** (Ctrl + S)
6. **Probar**: `node test-webhook.js`

---

## ✅ RESPUESTA EXITOSA (Lo que deberías ver):

```json
{
  "success": true,
  "data": {
    "trackingNumber": "PP-12345",
    "currentStatus": "En tránsito",
    "customerName": "Prueba",
    "lastUpdate": "2024-11-14T...",
    "statusHistory": [...]
  }
}
```

---

## 🆘 SI NADA FUNCIONA:

### Opción 1: Crear Workflow desde Cero
1. Borra el workflow actual
2. Crea uno nuevo
3. Sigue los pasos del "Workflow Mínimo" arriba
4. Una vez que funcione, agrega Google Sheets

### Opción 2: Revisar Permisos
1. Settings → API
2. Verifica que el webhook esté habilitado
3. Verifica que no haya restricciones de IP

### Opción 3: Compartir Pantalla/Screenshot
1. Toma screenshot del workflow completo
2. Toma screenshot del error específico
3. Comparte para ver qué falla

---

## 📞 SIGUIENTE PASO:

1. ✅ Sigue estos pasos en n8n
2. ✅ Identifica qué nodo falla
3. ✅ Comparte el error específico
4. ✅ Te ayudo a solucionarlo

**El webhook DEBE funcionar, solo necesitamos encontrar el error.** 🔧

