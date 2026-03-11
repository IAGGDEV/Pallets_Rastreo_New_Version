/**
 * Servicio de Rastreo de Paquetes
 * Conecta directamente con Google Sheets (Apps Script)
 */

import { TrackingResponse } from '../types/tracking';

/**
 * Buscar información de un paquete por número de rastreo
 * @param trackingNumber - Número de rastreo (ej: PP-12345)
 * @returns Promise con la información del paquete
 */
export const searchTracking = async (
  trackingNumber: string
): Promise<TrackingResponse> => {
  try {
    // URL del Web App de Google Apps Script o n8n Webhook
    const webhookUrl = (import.meta as any).env.VITE_API_URL || (import.meta as any).env.VITE_N8N_WEBHOOK_URL || 'https://script.google.com/macros/s/AKfycbzBWO0rYb1pqvHwEDdV8yhLkvtjJnmbMjNGWfNuxSHsvynjtdCosHtIKrjP4GVMd65KRA/exec';

    if (!webhookUrl) {
      return {
        success: false,
        error: 'Servicio temporalmente no disponible',
        message: 'Estamos experimentando problemas técnicos. Por favor, intenta rastrear tu paquete más tarde.',
      };
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
        error: 'No se encontró el número de rastreo',
        message: 'Verifica que el número esté escrito correctamente e intenta de nuevo. Si fue enviado recientemente, la información puede tardar hasta 24 horas en aparecer.',
      };
    }

    return data;
  } catch (error: any) {
    console.error('Error al buscar rastreo:', error);

    return {
      success: false,
      error: 'Problema de conexión',
      message: 'Tuvimos un problema al comunicarnos con el sistema de rastreo. Por favor, verifica tu conexión a internet e intenta nuevamente.',
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

