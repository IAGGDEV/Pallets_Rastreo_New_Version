import { useState } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import Footer from './components/Footer';

function App() {
  const [_trackingNumbers, setTrackingNumbers] = useState<string[]>([]);

  const handleTrack = (numbers: string[]) => {
    setTrackingNumbers(numbers);
    // Aquí se implementará la lógica de rastreo con n8n
    console.log('Rastreando:', numbers);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow">
        <HeroSection onTrack={handleTrack} />
      </main>
      <Footer />
    </div>
  );
}

export default App;

