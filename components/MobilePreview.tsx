
import React, { useState } from 'react';
import { BusinessConfig, HelpOptionType } from '../types';
import { ICONS } from '../constants';

interface MobilePreviewProps {
  config: BusinessConfig;
}

const RECOMMENDATIONS = [
  { id: 1, name: 'Air Max 270', price: '$150', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=100&q=80' },
  { id: 2, name: 'Jordan Retro', price: '$190', img: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=100&q=80' },
  { id: 3, name: 'Zoom Fly', price: '$130', img: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=100&q=80' },
];

const MobilePreview: React.FC<MobilePreviewProps> = ({ config }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-[340px] h-[680px] bg-slate-900 rounded-[3.5rem] shadow-2xl p-3 flex flex-col border-[8px] border-slate-800 relative ring-1 ring-slate-700">
      {/* Notch / Dynamic Island */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-6 bg-slate-800 rounded-full z-20"></div>
      
      <div className="relative flex-1 bg-white rounded-[2.5rem] overflow-hidden">
        {/* Mock Store Content */}
        <div className="p-6 pt-12">
          <div className="flex justify-between items-center mb-6">
            <div className="h-2 w-12 bg-slate-200 rounded-full"></div>
            <div className="h-6 w-6 bg-slate-100 rounded-full"></div>
          </div>
          
          <div className="space-y-4">
             <div className="h-8 w-3/4 bg-slate-900 rounded-xl"></div>
             <div className="h-4 w-full bg-slate-100 rounded-lg"></div>
             <div className="h-48 w-full bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden flex items-center justify-center">
                <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80" alt="Nike shoe" className="object-contain w-full h-full opacity-80" />
             </div>
             <div className="grid grid-cols-2 gap-3">
                <div className="h-10 bg-slate-900 rounded-xl"></div>
                <div className="h-10 bg-slate-100 rounded-xl"></div>
             </div>
          </div>
        </div>

        {/* Floating Help Button */}
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="absolute bottom-6 right-6 h-16 w-16 rounded-[2rem] text-white shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 z-30"
            style={{ backgroundColor: config.buttonColor, boxShadow: `0 20px 25px -5px ${config.buttonColor}44` }}
          >
            {React.cloneElement(ICONS.help as React.ReactElement, { className: 'h-8 w-8' })}
          </button>
        )}

        {/* Help Panel - Glassmorphism UI */}
        <div
          className={`absolute inset-0 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] z-40 flex flex-col ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'}`}
          style={{ backgroundColor: config.panelColor }}
        >
          <div className="p-6 pt-12 flex flex-col h-full overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-black text-slate-900 leading-tight">Centro de<br/>Asistencia</h2>
                </div>
                <button onClick={() => setIsOpen(false)} className="h-10 w-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 text-xl font-bold hover:bg-slate-200 transition-colors">&times;</button>
            </div>
            
            <div className="space-y-3">
                 {/* Main Options */}
                 <button className="w-full text-left p-4 bg-white border border-slate-100 rounded-2xl flex items-center shadow-sm hover:border-primary-200 transition-all group">
                    <div className="p-3 bg-emerald-50 rounded-xl mr-4 group-hover:bg-emerald-100 transition-colors">
                        {React.cloneElement(ICONS.phone as React.ReactElement, { className: 'h-5 w-5 text-emerald-600' })}
                    </div>
                    <div>
                      <span className="font-bold text-slate-800 block text-sm">Llamar para asistencia</span>
                      <span className="text-[10px] text-slate-400 font-medium italic">Habla con un experto ahora</span>
                    </div>
                 </button>

                 <div className="grid grid-cols-2 gap-3">
                    <button className="text-left p-4 bg-white border border-slate-100 rounded-2xl shadow-sm hover:border-primary-200 transition-all group">
                        <div className="p-3 bg-blue-50 rounded-xl mb-3 w-fit group-hover:bg-blue-100 transition-colors">
                            {React.cloneElement(ICONS.exchange as React.ReactElement, { className: 'h-5 w-5 text-blue-600' })}
                        </div>
                        <span className="font-bold text-slate-800 block text-xs">Cambio de talla</span>
                    </button>
                    <button className="text-left p-4 bg-white border border-slate-100 rounded-2xl shadow-sm hover:border-primary-200 transition-all group">
                        <div className="p-3 bg-violet-50 rounded-xl mb-3 w-fit group-hover:bg-violet-100 transition-colors">
                            {React.cloneElement(ICONS.exchange as React.ReactElement, { className: 'h-5 w-5 text-violet-600' })}
                        </div>
                        <span className="font-bold text-slate-800 block text-xs">Cambio de producto</span>
                    </button>
                 </div>
            </div>

            {/* Product Recommendations */}
            <div className="mt-8">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Te podría interesar</h3>
              <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                {RECOMMENDATIONS.map(item => (
                  <div key={item.id} className="min-w-[120px] bg-white rounded-2xl p-2 border border-slate-50 shadow-sm">
                    <img src={item.img} alt={item.name} className="w-full h-20 object-cover rounded-xl mb-2" />
                    <p className="text-[10px] font-bold text-slate-800 truncate">{item.name}</p>
                    <p className="text-[10px] text-primary-600 font-black">{item.price}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-auto pt-6 border-t border-slate-100/50">
                <p className="text-center text-[10px] font-bold text-slate-300 uppercase tracking-widest">Powered by JapiJelp</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobilePreview;
