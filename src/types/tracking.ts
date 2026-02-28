/**
 * Tipos para el sistema de rastreo
 * Basado en la API de rastreo de paquetería
 */

// Estado maestro del paquete
export type StatusMaster =
  | 'RECEIVED'        // Recibido por paquetería
  | 'IN_TRANSIT'      // En tránsito
  | 'OUT_FOR_DELIVERY' // En proceso de entrega
  | 'DELIVERED';      // Entregado

// Evento individual en el historial
export interface TrackingEvent {
  date: string;           // ISO 8601 format
  status: string;         // Descripción del estado
  location?: string;      // Ubicación del evento
  note?: string;          // Nota adicional
}

export interface TrackingResponseFound {
  success: true;
  tracking_number: string;
  current_status: string;
  step_index: number; // 0 to 5
}

// Respuesta cuando no se encuentra el paquete
export interface TrackingResponseNotFound {
  success: false;
  error: string;
  message: string;
}

// Union type de las respuestas
export type TrackingResponse = TrackingResponseFound | TrackingResponseNotFound;

// Nombres de los pasos para mostrar en UI correspondientes de 0 a 5
export const STEP_NAMES = [
  'Solicitado',
  'En Camino',
  'A San Diego',
  'San Diego',
  'Cruzando',
  'Tijuana'
];

