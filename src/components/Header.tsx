import { Phone, Mail } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-pallets-yellow border-b-4 border-pallets-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2">
          {/* Logo de Pallets Premium */}
          <div className="flex items-center">
            <img 
              src="/images/logo-pallets.png" 
              alt="Pallets Premium" 
              className="h-20 md:h-24 w-auto object-contain"
            />
          </div>

          {/* Información de Contacto */}
          <div className="hidden md:flex items-center gap-4">
            <a 
              href="tel:+1234567890" 
              className="flex items-center text-pallets-black hover:text-pallets-black/80 transition-colors bg-pallets-black/10 px-3 py-1.5 rounded-lg"
            >
              <Phone className="w-4 h-4 mr-2" />
              <span className="font-semibold text-sm">+1 (234) 567-890</span>
            </a>
            <a 
              href="mailto:contacto@palletspremium.com" 
              className="flex items-center text-pallets-black hover:text-pallets-black/80 transition-colors bg-pallets-black/10 px-3 py-1.5 rounded-lg"
            >
              <Mail className="w-4 h-4 mr-2" />
              <span className="font-semibold text-sm">contacto@palletspremium.com</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

