
import React, { useState } from 'react';
import { BusinessConfig } from '../types';
import { ICONS } from '../constants';

interface MobilePreviewProps {
  config: BusinessConfig;
}

const MobilePreview: React.FC<MobilePreviewProps> = ({ config }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-[375px] h-[667px] bg-gray-200 rounded-3xl shadow-2xl p-4 flex flex-col border-8 border-black overflow-hidden">
      <div className="relative flex-1 bg-white rounded-lg" style={{ backgroundColor: isOpen ? config.panelColor : '#fff' }}>
        {/* Mock phone content */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-lg"></div>
        <div className="p-4 pt-10">
          <h1 className="text-xl font-bold">Your Store</h1>
          <img src="https://picsum.photos/320/180" alt="Product" className="rounded-lg mt-4" />
          <p className="text-gray-600 mt-4 text-sm">
            This is a preview of your website. The help button will appear here.
          </p>
        </div>

        {/* Floating Help Button */}
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="absolute bottom-6 right-6 h-14 w-14 rounded-full text-white shadow-lg flex items-center justify-center transition-transform hover:scale-110"
            style={{ backgroundColor: config.buttonColor }}
          >
            {React.cloneElement(ICONS.help, { className: 'h-7 w-7' })}
          </button>
        )}

        {/* Help Panel */}
        <div
          className={`absolute inset-0 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          style={{ backgroundColor: config.panelColor }}
        >
          <div className="p-4 pt-10 flex flex-col h-full">
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold">How can we help?</h2>
                <button onClick={() => setIsOpen(false)} className="text-gray-500">&times;</button>
            </div>
            <div className="mt-6 space-y-3">
                 {config.helpOptions.filter(o => o.enabled).map(option => (
                     <button key={option.id} className="w-full text-left p-3 bg-gray-100 rounded-lg flex items-center">
                        {option.type === 'CALL' && ICONS.phone}
                        {option.type !== 'CALL' && ICONS.exchange}
                        {option.label}
                     </button>
                 ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobilePreview;
