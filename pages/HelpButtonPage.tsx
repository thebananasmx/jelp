
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useBusinessData } from '../contexts/BusinessDataContext';
import { BusinessConfig, HelpOptionType } from '../types';
import { ICONS } from '../constants';

type Step = 'main' | 'size_exchange' | 'product_exchange';

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
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-24 w-24 border-b-2 border-primary-600"></div>
      </div>
    );
  }
  
  const handleOptionClick = (type: HelpOptionType) => {
    switch (type) {
        case HelpOptionType.CALL:
            // In a real app, this would initiate a call.
            alert('Calling for assistance...');
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
      // In a real app, this would send data to a backend for analytics.
      console.log('Form submitted:', { step, formState });
      alert('Your request has been submitted!');
      resetFlow();
  }

  const renderContent = () => {
      switch(step) {
          case 'size_exchange':
            return (
                <form onSubmit={handleSubmit}>
                    <h3 className="font-bold text-center">Size Exchange</h3>
                    <div className="mt-4 space-y-4">
                        <div>
                            <label className="text-sm font-medium text-gray-700">Size you have:</label>
                            <input type="text" name="currentSize" value={formState.currentSize} onChange={handleInputChange} className="w-full mt-1 p-2 border rounded" placeholder="e.g., M" required/>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700">Size you need:</label>
                            <input type="text" name="neededSize" value={formState.neededSize} onChange={handleInputChange} className="w-full mt-1 p-2 border rounded" placeholder="e.g., L" required/>
                        </div>
                    </div>
                    <button type="submit" className="w-full mt-6 p-2 rounded text-white" style={{ backgroundColor: config.buttonColor }}>Submit Request</button>
                    <button type="button" onClick={() => setStep('main')} className="w-full mt-2 text-sm text-gray-600 hover:underline">Back to menu</button>
                </form>
            );
          case 'product_exchange':
            return (
                <form onSubmit={handleSubmit}>
                    <h3 className="font-bold text-center">Product Exchange</h3>
                    <div className="mt-4 space-y-4">
                        <div>
                            <label className="text-sm font-medium text-gray-700">Product you have:</label>
                            <input type="text" name="currentProduct" value={formState.currentProduct} onChange={handleInputChange} className="w-full mt-1 p-2 border rounded" placeholder="e.g., Blue T-Shirt, size M" required/>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700">Product you want:</label>
                            <input type="text" name="neededProduct" value={formState.neededProduct} onChange={handleInputChange} className="w-full mt-1 p-2 border rounded" placeholder="e.g., Red T-Shirt" required/>
                        </div>
                         <div>
                            <label className="text-sm font-medium text-gray-700">Size you need:</label>
                            <input type="text" name="neededProductSize" value={formState.neededProductSize} onChange={handleInputChange} className="w-full mt-1 p-2 border rounded" placeholder="e.g., M" required/>
                        </div>
                    </div>
                    <button type="submit" className="w-full mt-6 p-2 rounded text-white" style={{ backgroundColor: config.buttonColor }}>Submit Request</button>
                    <button type="button" onClick={() => setStep('main')} className="w-full mt-2 text-sm text-gray-600 hover:underline">Back to menu</button>
                </form>
            );
          default:
            return (
                <div>
                    <h3 className="font-bold text-center">How can we help you?</h3>
                    <div className="mt-6 space-y-3">
                        {config.helpOptions.filter(o => o.enabled).map(option => (
                            <button key={option.id} onClick={() => handleOptionClick(option.type)} className="w-full text-left p-3 bg-gray-100 rounded-lg flex items-center transition hover:bg-gray-200">
                                {option.type === HelpOptionType.CALL && ICONS.phone}
                                {option.type !== HelpOptionType.CALL && ICONS.exchange}
                                {option.label}
                            </button>
                        ))}
                    </div>
                </div>
            );
      }
  };

  return (
    <div className="font-sans">
      {/* Mock Website Content */}
      <div className="p-8">
        <h1 className="text-3xl font-bold">Welcome to the store!</h1>
        <p className="mt-2 text-gray-600">This is a demo page for the help button.</p>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3].map(i => (
                <div key={i} className="bg-white rounded-lg shadow p-4">
                    <img src={`https://picsum.photos/400/300?random=${i}`} alt={`Product ${i}`} className="rounded-md w-full h-48 object-cover"/>
                    <h3 className="font-semibold mt-3">Product {i}</h3>
                    <p className="text-sm text-gray-500 mt-1">A great item you should buy.</p>
                </div>
            ))}
        </div>
      </div>
      
      {/* Floating Help Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-5 right-5 h-16 w-16 rounded-full text-white shadow-xl flex items-center justify-center transition-transform hover:scale-110"
        style={{ backgroundColor: config.buttonColor }}
      >
        {React.cloneElement(ICONS.help, { className: 'h-8 w-8' })}
      </button>

      {/* Modal */}
      <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div 
            className="relative rounded-lg shadow-2xl p-6 w-full max-w-sm m-4 transform transition-all duration-300"
            style={{ backgroundColor: config.panelColor, transform: isOpen ? 'translateY(0)' : 'translateY(20px)' }}
        >
          <button onClick={resetFlow} className="absolute top-3 right-3 text-2xl text-gray-500 hover:text-gray-800">&times;</button>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default HelpButtonPage;
