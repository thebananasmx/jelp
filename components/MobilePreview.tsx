
import React, { useState } from 'react';
import { BusinessConfig } from '../types';
import { ICONS } from '../constants';

interface MobilePreviewProps {
  config: BusinessConfig;
}

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
          <div className="p-8 pt-16 flex flex-col h-full">
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h2 className="text-2xl font-black text-slate-900 leading-tight">¿En qué<br/>te ayudamos?</h2>
                </div>
                <button onClick={() => setIsOpen(false)} className="h-10 w-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 text-xl font-bold">&times;</button>
            </div>
            
            <div className="space-y-4">
                 {config.helpOptions.filter(o => o.enabled).map(option => (
                     <button key={option.id} className="w-full text-left p-5 bg-white border border-slate-100 rounded-3xl flex items-center shadow-sm hover:bg-slate-50 transition-colors group">
                        <div className="p-3 bg-slate-50 rounded-xl mr-4 group-hover:bg-slate-100 transition-colors">
                            {option.type === 'CALL' ? 
                                React.cloneElement(ICONS.phone as React.ReactElement, { className: 'h-5 w-5 text-slate-600' }) : 
                                React.cloneElement(ICONS.exchange as React.ReactElement, { className: 'h-5 w-5 text-slate-600' })
                            }
                        </div>
                        <span className="font-bold text-slate-700">{option.label}</span>
                     </button>
                 ))}
            </div>
            
            <div className="mt-auto pb-10">
                <p className="text-center text-xs font-bold text-slate-300 uppercase tracking-widest">Powered by JapiJelp</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobilePreview;
