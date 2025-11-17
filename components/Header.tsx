
import React, { useState, useRef } from 'react';

const Header: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const streamUrl = "https://servidor40.brlogic.com:7054/live";

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().catch(error => {
          console.error("Error attempting to play audio:", error);
        });
        setIsPlaying(true);
      }
    }
  };

  return (
    <>
      <audio ref={audioRef} src={streamUrl} preload="none" aria-hidden="true" />
      <header className="bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50 shadow-lg shadow-cyan-500/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex-shrink-0">
              <a href="#" className="flex flex-col items-end leading-tight">
                <span className="text-white text-4xl font-montserrat font-extrabold tracking-wider">RADIO520</span>
                <span className="text-cyan-300 text-xl font-montserrat font-extrabold tracking-widest [text-shadow:0_0_8px_rgba(107,235,244,0.7)]">.COM.BR</span>
              </a>
            </div>
            
            <div className="flex items-center">
              <nav className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <a href="#" className="text-gray-300 hover:bg-slate-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Home</a>
                  <a href="#" className="text-gray-300 hover:bg-slate-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">FUTEBOL SHOW 520</a>
                  <a href="#" className="text-gray-300 hover:bg-slate-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">REPÓRTER 520</a>
                  <a href="#" className="text-gray-300 hover:bg-slate-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">LIGA 520</a>
                  <a href="#" className="text-gray-300 hover:bg-slate-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">SPORTS BUSINESS 520</a>
                </div>
              </nav>

              <div className="ml-6">
                 <button 
                    onClick={togglePlayPause}
                    className="flex items-center justify-center bg-cyan-500 hover:bg-cyan-400 text-white font-bold h-10 w-10 sm:w-auto sm:h-auto sm:py-2 sm:px-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-cyan-500/40 transform hover:scale-105"
                    aria-label={isPlaying ? "Pausar a Rádio 520" : "Ouvir a Rádio 520 ao vivo"}
                  >
                    {isPlaying ? (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                    ) : (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path></svg>
                    )}
                    <span className="hidden sm:inline sm:ml-2 font-semibold text-sm">{isPlaying ? 'PAUSAR' : 'OUVIR AO VIVO'}</span>
                  </button>
              </div>

              <div className="ml-4 md:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  type="button"
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  aria-controls="mobile-menu"
                  aria-expanded={isMenuOpen}
                >
                  <span className="sr-only">Abrir menu principal</span>
                  {!isMenuOpen ? (
                    <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  ) : (
                    <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

          </div>
        </div>
        
        <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`} id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#" className="text-gray-300 hover:bg-slate-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Home</a>
            <a href="#" className="text-gray-300 hover:bg-slate-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">FUTEBOL SHOW 520</a>
            <a href="#" className="text-gray-300 hover:bg-slate-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">REPÓRTER 520</a>
            <a href="#" className="text-gray-300 hover:bg-slate-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">LIGA 520</a>
            <a href="#" className="text-gray-300 hover:bg-slate-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">SPORTS BUSINESS 520</a>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
