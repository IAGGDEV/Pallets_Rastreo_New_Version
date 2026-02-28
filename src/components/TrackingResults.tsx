import { Package, Truck, MapPin, Building, Navigation, Home } from 'lucide-react';
import type { TrackingResponseFound } from '../types/tracking';
import { STEP_NAMES } from '../types/tracking';

interface TrackingResultsProps {
  data: TrackingResponseFound;
}

const TrackingResults = ({ data }: TrackingResultsProps) => {
  // Determinar el paso actual basado en la nueva respuesta de Sheets (1-based para coincidir índice UI)
  const currentStep = (data.step_index !== undefined && data.step_index >= 0) ? data.step_index + 1 : 1;



  // Iconos para cada paso (ahora son 6)
  const stepIcons = [
    <Package className="w-5 h-5 md:w-7 md:h-7" />,       // Solicitado
    <Truck className="w-5 h-5 md:w-7 md:h-7" />,         // En Camino
    <Navigation className="w-5 h-5 md:w-7 md:h-7" />,    // A San Diego
    <Building className="w-5 h-5 md:w-7 md:h-7" />,      // San Diego
    <MapPin className="w-5 h-5 md:w-7 md:h-7" />,        // Cruzando
    <Home className="w-5 h-5 md:w-7 md:h-7" />           // Tijuana
  ];

  return (
    <div className="relative bg-gradient-to-b from-gray-50 to-white">
      {/* Fondo hexagonal */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: 'url(/images/background-hex.jpg)',
          backgroundSize: '400px',
          backgroundRepeat: 'repeat'
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        {/* Título Principal */}
        <h2 className="text-3xl md:text-4xl font-bold text-pallets-black text-center mb-8">
          Sigue el estatus de tu envío
        </h2>

        {/* Card Principal */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-t-4 border-pallets-yellow">
          {/* Información del Paquete */}
          <div className="p-6 md:p-8 border-b border-gray-200">
            <div className="flex flex-wrap gap-4 md:gap-6 text-sm md:text-base">
              <div>
                <span className="text-pallets-gray">Número de guía: </span>
                <span className="font-bold text-pallets-black">{data.tracking_number}</span>
              </div>

              {data.current_status && (
                <>
                  <span className="text-gray-300">|</span>
                  <div>
                    <span className="text-pallets-gray">Status actual: </span>
                    <span className="font-bold text-pallets-black uppercase">{data.current_status}</span>
                  </div>
                </>
              )}

            </div>
          </div>

          {/* Barra de Progreso con 6 Pasos */}
          <div className="p-4 md:p-8 bg-gray-50 border-b border-gray-200 overflow-x-auto">
            <div className="relative min-w-[700px] md:min-w-0">
              {/* Línea de conexión */}
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2" />
              <div
                className="absolute top-1/2 left-0 h-1 bg-green-500 -translate-y-1/2 transition-all duration-500"
                style={{ width: `${((currentStep - 1) / 5) * 100}%` }}
              />

              {/* Pasos */}
              <div className="relative grid grid-cols-6 gap-2">
                {STEP_NAMES.map((stepName, index) => {
                  const stepNumber = index + 1;
                  const isCurrent = stepNumber === currentStep;
                  const isActive = stepNumber <= currentStep;

                  return (
                    <div key={index} className="flex flex-col items-center">
                      <div
                        className={`
                          relative z-10 rounded-full p-3 md:p-4 transition-all duration-300 mx-auto
                          ${isActive ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-500'}
                          ${isCurrent ? 'ring-4 ring-green-200 scale-110 shadow-lg' : ''}
                        `}
                      >
                        {stepIcons[index]}
                      </div>

                      {/* Texto del paso */}
                      <p
                        className={`
                          mt-3 text-center text-xs md:text-sm font-semibold px-1
                          ${isActive ? 'text-pallets-black' : 'text-gray-400'}
                        `}
                      >
                        {stepName}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>

        {/* Botón para nueva búsqueda */}
        <div className="text-center mt-8">
          <button
            onClick={() => window.location.reload()}
            className="bg-white hover:bg-pallets-yellow text-pallets-black font-bold py-3 px-8 rounded-xl transition-all duration-200 shadow-lg border-2 border-pallets-yellow"
          >
            Nueva Consulta
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrackingResults;

