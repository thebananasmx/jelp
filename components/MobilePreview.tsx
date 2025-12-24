
import React from 'react';
import { BusinessConfig, HelpOptionType } from '../types';
import { ICONS } from '../constants';

interface MobilePreviewProps {
  config: BusinessConfig;
}

const RECOMMENDATIONS = [
  { id: 1, name: 'Cinturón Piel', price: '$45', img: 'https://images.unsplash.com/photo-1624222247344-550fb8050341?auto=format&fit=crop&w=150&q=80' },
  { id: 2, name: 'Calcetines Sport', price: '$12', img: 'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?auto=format&fit=crop&w=150&q=80' },
  { id: 3, name: 'Gorra Urban', price: '$25', img: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=150&q=80' },
];

const MobilePreview: React.FC<MobilePreviewProps> = ({ config }) => {
  return (
    <div className="w-[340px] h-[680px] bg-slate-900 rounded-[3.5rem] shadow-2xl p-3 flex flex-col border-[8px] border-slate-800 relative ring-1 ring-slate-700">
      {/* Notch / Dynamic Island */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-6 bg-slate-800 rounded-full z-20"></div>
      
      <div className="relative flex-1 rounded-[2.5rem] overflow-hidden flex flex-col" style={{ backgroundColor: config.panelColor }}>
        {/* Kiosk Header */}
        <div className="p-8 pt-12 pb-6">
          <div className="flex justify-between items-start mb-6">
            <div className="h-10 w-10 bg-white shadow-sm rounded-xl flex items-center justify-center">
               <span className="text-xs font-black text-slate-800">VIP</span>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Vestidor</p>
              <p className="text-sm font-black text-slate-800">Sala 04</p>
            </div>
          </div>
          <h2 className="text-2xl font-black text-slate-900 leading-tight">¿Necesitas algo<br/>para tu outfit?</h2>
        </div>

        {/* Assistance Options Grid */}
        <div className="px-6 space-y-3 overflow-y-auto no-scrollbar flex-1">
          {/* Main Action: Call Staff */}
          <button className="w-full p-5 bg-slate-900 text-white rounded-[2rem] flex items-center shadow-xl shadow-slate-200 transition-transform active:scale-95">
            <div className="p-3 bg-white/10 rounded-2xl mr-4">
               {React.cloneElement(ICONS.phone as React.ReactElement, { className: 'h-6 w-6 text-white' })}
            </div>
            <div className="text-left">
              <span className="font-bold block text-sm">Llamar a un asesor</span>
              <span className="text-[10px] text-slate-400 font-medium italic">Asistencia física inmediata</span>
            </div>
          </button>

          <div className="grid grid-cols-2 gap-3">
            <button className="text-left p-5 bg-white border border-slate-100 rounded-[2rem] shadow-sm active:bg-slate-50 transition-all">
                <div className="p-3 bg-blue-50 rounded-2xl mb-4 w-fit">
                    {React.cloneElement(ICONS.exchange as React.ReactElement, { className: 'h-5 w-5 text-blue-600' })}
                </div>
                <span className="font-bold text-slate-800 block text-xs">Cambio<br/>de talla</span>
            </button>
            <button className="text-left p-5 bg-white border border-slate-100 rounded-[2rem] shadow-sm active:bg-slate-50 transition-all">
                <div className="p-3 bg-violet-50 rounded-2xl mb-4 w-fit">
                    {React.cloneElement(ICONS.exchange as React.ReactElement, { className: 'h-5 w-5 text-violet-600' })}
                </div>
                <span className="font-bold text-slate-800 block text-xs">Cambio de<br/>producto</span>
            </button>
          </div>

          {/* Cross-selling Recommendations */}
          <div className="pt-6">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Completa tu look</h3>
            <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
              {RECOMMENDATIONS.map(item => (
                <div key={item.id} className="min-w-[120px] bg-white rounded-3xl p-3 border border-slate-50 shadow-sm">
                  <img src={item.img} alt={item.name} className="w-full h-20 object-cover rounded-2xl mb-2" />
                  <p className="text-[10px] font-bold text-slate-800 truncate">{item.name}</p>
                  <p className="text-[10px] text-primary-600 font-black">{item.price}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="p-6 bg-white/50 border-t border-slate-100 mt-auto">
           <div className="flex justify-between items-center opacity-40">
              <span className="text-[8px] font-bold uppercase tracking-tighter">Powered by JapiJelp Kiosk</span>
              <div className="flex gap-1">
                 <div className="w-1 h-1 rounded-full bg-slate-900"></div>
                 <div className="w-1 h-1 rounded-full bg-slate-900"></div>
                 <div className="w-1 h-1 rounded-full bg-slate-300"></div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default MobilePreview;
