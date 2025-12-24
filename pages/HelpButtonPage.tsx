
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useBusinessData } from '../contexts/BusinessDataContext';
import { BusinessConfig, HelpOptionType } from '../types';
import { ICONS } from '../constants';

type Step = 'main' | 'size_exchange' | 'product_exchange';

const RECOMMENDATIONS = [
  { id: 1, name: 'Air Max 270', price: '$150', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=200&q=80' },
  { id: 2, name: 'Jordan Retro', price: '$190', img: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=200&q=80' },
  { id: 3, name: 'Zoom Fly', price: '$130', img: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=200&q=80' },
];

const HelpButtonPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { getPublicConfig } = useBusinessData();
  const [config, setConfig] = useState<BusinessConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<Step>('main');
  const [formState, setFormState] = useState({
      currentSize: '',
      neededSize: '',
      currentProduct: '',
      neededProduct: '',
      neededProductSize: '',
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormState(prev => ({ ...prev, [name]: value }));
  }

  if (loading || !config) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-50">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600"></div>
      </div>
    );
  }
  
  const handleOptionClick = (type: HelpOptionType) => {
    switch (type) {
        case HelpOptionType.CALL:
            alert('Llamando a soporte técnico...');
            resetFlow();
            break;
        case HelpOptionType.SIZE_EXCHANGE:
            setStep('size_exchange');
            break;
        case HelpOptionType.PRODUCT_EXCHANGE:
            setStep('product_exchange');
            break;
    }
  };
  
  const resetFlow = () => {
      setStep('main');
      setIsOpen(false);
      setFormState({
        currentSize: '',
        neededSize: '',
        currentProduct: '',
        neededProduct: '',
        neededProductSize: '',
      });
  }
  
  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      alert('¡Solicitud enviada correctamente!');
      resetFlow();
  }

  const renderContent = () => {
      switch(step) {
          case 'size_exchange':
            return (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="text-center">
                        <h3 className="text-xl font-bold text-slate-900">Cambio de Talla</h3>
                        <p className="text-sm text-slate-500 mt-1">Dinos qué necesitas para que te quede perfecto.</p>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Talla actual</label>
                            <input type="text" name="currentSize" value={formState.currentSize} onChange={handleInputChange} className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none" placeholder="e.g., US 9" required/>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Nueva talla deseada</label>
                            <input type="text" name="neededSize" value={formState.neededSize} onChange={handleInputChange} className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none" placeholder="e.g., US 9.5" required/>
                        </div>
                    </div>
                    <button type="submit" className="w-full p-4 rounded-2xl text-white font-bold shadow-lg shadow-primary-200" style={{ backgroundColor: config.buttonColor }}>Enviar Solicitud</button>
                    <button type="button" onClick={() => setStep('main')} className="w-full text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors">Volver al menú</button>
                </form>
            );
          case 'product_exchange':
            return (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="text-center">
                        <h3 className="text-xl font-bold text-slate-900">Cambio de Producto</h3>
                        <p className="text-sm text-slate-500 mt-1">¿Quieres otro modelo o color?</p>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Producto que tienes</label>
                            <input type="text" name="currentProduct" value={formState.currentProduct} onChange={handleInputChange} className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none" placeholder="e.g., Camiseta Azul, Talla M" required/>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Producto que quieres</label>
                            <input type="text" name="neededProduct" value={formState.neededProduct} onChange={handleInputChange} className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none" placeholder="e.g., Camiseta Roja" required/>
                        </div>
                    </div>
                    <button type="submit" className="w-full p-4 rounded-2xl text-white font-bold shadow-lg shadow-primary-200" style={{ backgroundColor: config.buttonColor }}>Enviar Solicitud</button>
                    <button type="button" onClick={() => setStep('main')} className="w-full text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors">Volver al menú</button>
                </form>
            );
          default:
            return (
                <div className="flex flex-col h-full max-h-[80vh]">
                    <div className="mb-8">
                        <h2 className="text-2xl font-black text-slate-900 leading-tight">¿En qué podemos<br/>ayudarte hoy?</h2>
                    </div>

                    <div className="space-y-3">
                         {/* Assist call */}
                         <button 
                            onClick={() => handleOptionClick(HelpOptionType.CALL)} 
                            className="w-full text-left p-5 bg-emerald-50 border border-emerald-100 rounded-3xl flex items-center shadow-sm hover:scale-[1.02] transition-all group"
                         >
                            <div className="p-3 bg-white rounded-2xl mr-4 shadow-sm">
                                {React.cloneElement(ICONS.phone as React.ReactElement, { className: 'h-6 w-6 text-emerald-600' })}
                            </div>
                            <div>
                                <span className="font-bold text-emerald-900 block">Llamar para asistencia</span>
                                <span className="text-xs text-emerald-600/70 font-medium italic">Hablar con un experto</span>
                            </div>
                         </button>

                         <div className="grid grid-cols-2 gap-3">
                            <button 
                                onClick={() => handleOptionClick(HelpOptionType.SIZE_EXCHANGE)} 
                                className="text-left p-5 bg-white border border-slate-100 rounded-3xl shadow-sm hover:border-primary-300 hover:shadow-md transition-all group"
                            >
                                <div className="p-3 bg-blue-50 rounded-2xl mb-4 w-fit group-hover:bg-blue-100 transition-colors">
                                    {React.cloneElement(ICONS.exchange as React.ReactElement, { className: 'h-6 w-6 text-blue-600' })}
                                </div>
                                <span className="font-bold text-slate-800">Cambio de talla</span>
                            </button>
                            <button 
                                onClick={() => handleOptionClick(HelpOptionType.PRODUCT_EXCHANGE)} 
                                className="text-left p-5 bg-white border border-slate-100 rounded-3xl shadow-sm hover:border-primary-300 hover:shadow-md transition-all group"
                            >
                                <div className="p-3 bg-violet-50 rounded-2xl mb-4 w-fit group-hover:bg-violet-100 transition-colors">
                                    {React.cloneElement(ICONS.exchange as React.ReactElement, { className: 'h-6 w-6 text-violet-600' })}
                                </div>
                                <span className="font-bold text-slate-800">Cambio de producto</span>
                            </button>
                         </div>
                    </div>

                    {/* Recommendations Section */}
                    <div className="mt-10 mb-4 overflow-hidden">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Recomendados para ti</h3>
                        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                            {RECOMMENDATIONS.map(item => (
                                <div key={item.id} className="min-w-[160px] bg-white rounded-3xl p-3 border border-slate-50 shadow-sm hover:shadow-md transition-shadow">
                                    <img src={item.img} alt={item.name} className="w-full h-24 object-cover rounded-2xl mb-3" />
                                    <p className="text-xs font-bold text-slate-800 truncate">{item.name}</p>
                                    <p className="text-sm text-primary-600 font-black mt-1">{item.price}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            );
      }
  };

  return (
    <div className="min-h-screen bg-white relative font-sans text-slate-900">
      {/* Mock Website Content */}
      <div className="max-w-6xl mx-auto p-10">
        <header className="flex justify-between items-center mb-16">
            <div className="h-10 w-32 bg-slate-900 rounded-xl"></div>
            <nav className="flex gap-8 text-sm font-bold text-slate-500">
                <span>Colección</span>
                <span>Hombre</span>
                <span>Mujer</span>
                <span>Outlet</span>
            </nav>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
                <h1 className="text-7xl font-black tracking-tighter leading-none text-slate-900">Nuevos<br/>Nike Air</h1>
                <p className="text-xl text-slate-500 font-medium leading-relaxed">Siente la evolución en cada paso. Diseñadas para el rendimiento, perfeccionadas para el estilo urbano.</p>
                <div className="flex gap-4">
                    <button className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-2xl shadow-slate-200">Comprar ahora</button>
                    <button className="px-8 py-4 bg-white border border-slate-200 rounded-2xl font-bold">Ver catálogo</button>
                </div>
            </div>
            <div className="relative">
                <div className="aspect-square bg-slate-50 rounded-[4rem] overflow-hidden flex items-center justify-center">
                    <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80" alt="Hero Product" className="object-contain w-3/4 hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-3xl shadow-xl border border-slate-50 max-w-[200px]">
                    <div className="flex gap-1 mb-2">
                        {[1,2,3,4,5].map(i => <span key={i} className="text-amber-400">★</span>)}
                    </div>
                    <p className="text-xs font-bold text-slate-800 italic">"Las mejores zapatillas que he tenido nunca. Comodidad 10/10."</p>
                </div>
            </div>
        </div>
      </div>
      
      {/* Floating Help Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 h-20 w-20 rounded-[2.2rem] text-white shadow-2xl flex items-center justify-center transition-all hover:scale-110 hover:rotate-6 active:scale-95 z-50"
        style={{ backgroundColor: config.buttonColor, boxShadow: `0 20px 40px -10px ${config.buttonColor}66` }}
      >
        {React.cloneElement(ICONS.help, { className: 'h-10 w-10' })}
      </button>

      {/* Modal / Sidebar UI */}
      <div className={`fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-end md:items-center justify-center transition-all duration-500 z-[100] ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div 
            className="relative rounded-t-[3rem] md:rounded-[3.5rem] p-10 w-full max-w-lg shadow-2xl transform transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
            style={{ backgroundColor: config.panelColor, transform: isOpen ? 'translateY(0)' : 'translateY(100px)' }}
        >
          <button onClick={resetFlow} className="absolute top-8 right-8 h-12 w-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 text-2xl font-bold hover:bg-slate-200 transition-colors">&times;</button>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default HelpButtonPage;
