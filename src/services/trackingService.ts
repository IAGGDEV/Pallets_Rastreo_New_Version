/**
 * Servicio de Rastreo de Paquetes
 * Conecta directamente con Google Sheets (Apps Script)
 */

// Tipo de datos del paquete
export interface PackageStatus {
  status: string;
  date: string;
  location?: string;
  note?: string;
}

export interface TrackingData {
  trackingNumber: string;
  currentStatus: string;
  customerName?: string;
  lastUpdate: string;
  estimatedDelivery?: string;
  statusHistory: PackageStatus[];
  externalTrackingLink?: string;
}

export interface TrackingResponse {
  success: boolean;
  data?: TrackingData;
  error?: string;
  message?: string;
}

/**
 * Buscar información de un paquete por número de rastreo
 * @param trackingNumber - Número de rastreo (ej: PP-12345)
 * @returns Promise con la información del paquete
 */
export const searchTracking = async (
  trackingNumber: string
): Promise<TrackingResponse> => {
  try {
    // URL del Web App de Google Apps Script
    const webhookUrl = (import.meta as any).env.VITE_API_URL;

    if (!webhookUrl) {
      throw new Error('URL del Backend no configurada');
    }

    // Petición GET al Web App con fetch
    const targetUrl = `${webhookUrl}?trackingNumber=${encodeURIComponent(trackingNumber.trim().toUpperCase())}`;
    const response = await fetch(targetUrl, {
      method: 'GET',
      redirect: 'follow', // IMPORTANTE para Google Apps Script
      headers: {
        'Accept': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Validar respuesta
    if (!data.success) {
      return {
        success: false,
        error: data.error || 'No se encontró el número de rastreo',
        message: 'Verifica que el número esté correcto',
      };
    }

    return data;
  } catch (error) {
    console.error('Error al buscar rastreo:', error);
    return {
      success: false,
      error: 'Error de conexión',
      message: 'No se pudo conectar con el servidor. Intenta nuevamente.',
    };
  }
};

/**
 * Buscar múltiples números de rastreo
 * @param trackingNumbers - Array de números de rastreo
 * @returns Promise con array de resultados
 */
export const searchMultipleTracking = async (
  trackingNumbers: string[]
): Promise<TrackingResponse[]> => {
  const promises = trackingNumbers.map((number) => searchTracking(number));
  return Promise.all(promises);
};

