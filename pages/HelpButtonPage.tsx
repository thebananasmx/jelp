
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useBusinessData } from '../contexts/BusinessDataContext';
import { BusinessConfig, HelpOptionType } from '../types';
import { ICONS } from '../constants';

type Step = 'main' | 'size_exchange' | 'product_exchange' | 'success';

const RECOMMENDATIONS = [
  { id: 1, name: 'Cinturón Piel', price: '$45', img: 'https://images.unsplash.com/photo-1624222247344-550fb8050341?auto=format&fit=crop&w=400&q=80' },
  { id: 2, name: 'Calcetines Sport', price: '$12', img: 'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?auto=format&fit=crop&w=400&q=80' },
  { id: 3, name: 'Gorra Urban', price: '$25', img: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=400&q=80' },
];

const HelpButtonPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { getPublicConfig } = useBusinessData();
  const [config, setConfig] = useState<BusinessConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState<Step>('main');
  const [formState, setFormState] = useState({
      currentSize: '',
      neededSize: '',
      currentProduct: '',
      neededProduct: '',
  });

  useEffect(() => {
    const fetchConfig = async () => {
      if (slug) {
        setLoading(true);
        const fetchedConfig = await getPublicConfig(slug);
        setConfig(fetchedConfig);
        setLoading(false);
      }
    };
    fetchConfig();
  }, [slug]);

  if (loading || !config) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-900">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  const handleOptionClick = (type: HelpOptionType) => {
    switch (type) {
        case HelpOptionType.CALL:
            setStep('success');
            setTimeout(() => setStep('main'), 4000);
            break;
        case HelpOptionType.SIZE_EXCHANGE:
            setStep('size_exchange');
            break;
        case HelpOptionType.PRODUCT_EXCHANGE:
            setStep('product_exchange');
            break;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setStep('success');
      setTimeout(() => setStep('main'), 4000);
  }

  const renderContent = () => {
    if (step === 'success') {
        return (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-6 animate-in fade-in zoom-in duration-500">
                <div className="h-32 w-32 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shadow-inner">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h2 className="text-4xl font-black text-slate-900">¡En camino!</h2>
                <p className="text-xl text-slate-500 max-w-sm">Un asesor de nuestra tienda llegará a tu vestidor en unos instantes.</p>
            </div>
        );
    }

    switch(step) {
        case 'size_exchange':
            return (
                <form onSubmit={handleSubmit} className="space-y-8 animate-in slide-in-from-bottom-8 duration-500 h-full flex flex-col">
                    <div className="flex justify-between items-center">
                        <button type="button" onClick={() => setStep('main')} className="h-14 w-14 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-900 shadow-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                        </button>
                        <h3 className="text-2xl font-black text-slate-900">Cambio de Talla</h3>
                        <div className="w-14"></div>
                    </div>
                    <div className="space-y-6 flex-1">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest">Talla que tienes</label>
                                <input type="text" className="w-full p-6 bg-slate-50 border-2 border-slate-100 rounded-3xl text-xl font-bold focus:border-primary-500 outline-none transition-all" placeholder="e.g. M o 42" required/>
                            </div>
                            <div className="space-y-3">
                                <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest">Nueva talla</label>
                                <input type="text" className="w-full p-6 bg-slate-50 border-2 border-slate-100 rounded-3xl text-xl font-bold focus:border-primary-500 outline-none transition-all" placeholder="e.g. L o 43" required/>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="w-full p-8 rounded-[2.5rem] text-white text-2xl font-black shadow-2xl shadow-primary-200 active:scale-95 transition-transform" style={{ backgroundColor: config.buttonColor }}>
                        Pedir Nueva Talla
                    </button>
                </form>
            );
        case 'product_exchange':
            return (
                <form onSubmit={handleSubmit} className="space-y-8 animate-in slide-in-from-bottom-8 duration-500 h-full flex flex-col">
                    <div className="flex justify-between items-center">
                        <button type="button" onClick={() => setStep('main')} className="h-14 w-14 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-900 shadow-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                        </button>
                        <h3 className="text-2xl font-black text-slate-900">Cambio de Producto</h3>
                        <div className="w-14"></div>
                    </div>
                    <div className="space-y-6 flex-1">
                        <div className="space-y-3">
                            <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest">¿Qué producto quieres probar?</label>
                            <input type="text" className="w-full p-6 bg-slate-50 border-2 border-slate-100 rounded-3xl text-xl font-bold focus:border-primary-500 outline-none transition-all" placeholder="e.g. Camisa lino blanca" required/>
                        </div>
                    </div>
                    <button type="submit" className="w-full p-8 rounded-[2.5rem] text-white text-2xl font-black shadow-2xl shadow-primary-200 active:scale-95 transition-transform" style={{ backgroundColor: config.buttonColor }}>
                        Solicitar Producto
                    </button>
                </form>
            );
        default:
            return (
                <div className="h-full flex flex-col animate-in fade-in duration-700">
                    <div className="mb-12 flex justify-between items-start">
                        <div>
                            <p className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">Tu Asistente de Probador</p>
                            <h2 className="text-6xl font-black text-slate-900 leading-[0.9]">Probador<br/>Inteligente.</h2>
                        </div>
                        <div className="h-20 w-20 bg-slate-900 text-white rounded-[1.5rem] flex items-center justify-center text-2xl font-black shadow-2xl shadow-slate-200">
                            04
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
                        {/* High priority action */}
                        <button 
                            onClick={() => handleOptionClick(HelpOptionType.CALL)}
                            className="md:col-span-2 p-10 bg-slate-900 text-white rounded-[3rem] flex items-center shadow-2xl shadow-slate-300 group hover:scale-[1.01] transition-all active:scale-95"
                        >
                            <div className="h-24 w-24 bg-white/10 rounded-[2rem] flex items-center justify-center mr-8 group-hover:bg-white group-hover:text-slate-900 transition-colors">
                                {React.cloneElement(ICONS.phone as React.ReactElement, { className: 'h-10 w-10' })}
                            </div>
                            <div className="text-left">
                                <span className="text-3xl font-black block mb-1">Llamar a un Asesor</span>
                                <span className="text-lg text-slate-400 font-medium">Asistencia física inmediata en este vestidor</span>
                            </div>
                        </button>

                        <button 
                            onClick={() => handleOptionClick(HelpOptionType.SIZE_EXCHANGE)}
                            className="p-10 bg-white border-2 border-slate-50 rounded-[3rem] shadow-xl hover:shadow-2xl transition-all active:scale-95 text-left group"
                        >
                            <div className="h-16 w-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                {React.cloneElement(ICONS.exchange as React.ReactElement, { className: 'h-8 w-8' })}
                            </div>
                            <span className="text-2xl font-black text-slate-900 block">Cambio de Talla</span>
                        </button>

                        <button 
                            onClick={() => handleOptionClick(HelpOptionType.PRODUCT_EXCHANGE)}
                            className="p-10 bg-white border-2 border-slate-50 rounded-[3rem] shadow-xl hover:shadow-2xl transition-all active:scale-95 text-left group"
                        >
                            <div className="h-16 w-16 bg-violet-50 text-violet-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-violet-600 group-hover:text-white transition-colors">
                                {React.cloneElement(ICONS.exchange as React.ReactElement, { className: 'h-8 w-8' })}
                            </div>
                            <span className="text-2xl font-black text-slate-900 block">Cambio de Producto</span>
                        </button>
                    </div>

                    {/* Recommendations Kiosk Style */}
                    <div className="mt-16">
                        <div className="flex justify-between items-end mb-8">
                            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">Completa tu outfit ahora</h3>
                            <span className="text-xs font-bold text-primary-600">Desliza para ver más →</span>
                        </div>
                        <div className="flex gap-6 overflow-x-auto pb-8 no-scrollbar">
                            {RECOMMENDATIONS.map(item => (
                                <div key={item.id} className="min-w-[240px] bg-white rounded-[2.5rem] p-6 border-2 border-slate-50 shadow-lg hover:shadow-2xl transition-all">
                                    <img src={item.img} alt={item.name} className="w-full h-40 object-cover rounded-[1.5rem] mb-6 shadow-sm" />
                                    <p className="text-xl font-black text-slate-900 mb-1">{item.name}</p>
                                    <p className="text-lg text-primary-600 font-black">{item.price}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            );
    }
  }

  return (
    <div className="min-h-screen p-6 md:p-12 flex items-center justify-center" style={{ backgroundColor: config.panelColor }}>
        <div className="w-full max-w-6xl h-full min-h-[90vh] flex flex-col">
            {renderContent()}
        </div>
    </div>
  );
};

export default HelpButtonPage;
