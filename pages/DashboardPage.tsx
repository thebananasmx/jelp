
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useBusinessData } from '../contexts/BusinessDataContext';
import { HelpOption, SizeCategory, HelpOptionType } from '../types';
import { GoogleGenAI, Type } from "@google/genai";

import DashboardNav from '../components/DashboardNav';
import MobilePreview from '../components/MobilePreview';
import AnalyticsCharts from '../components/AnalyticsCharts';
import { ICONS } from '../constants';

const ConfigPanel: React.FC = () => {
    const { config, updateConfig } = useBusinessData();
    const { user } = useAuth();
    const [buttonColor, setButtonColor] = useState(config.buttonColor);
    const [panelColor, setPanelColor] = useState(config.panelColor);
    const [isSaving, setIsSaving] = useState(false);
    const [isAiGenerating, setIsAiGenerating] = useState(false);
    
    const url = `${window.location.origin}${window.location.pathname}#/help-button/${user?.businessSlug}`;

    const handleSave = async () => {
        setIsSaving(true);
        await updateConfig({ buttonColor, panelColor });
        setTimeout(() => setIsSaving(false), 800);
    };

    const handleAiMagic = async () => {
        setIsAiGenerating(true);
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const response = await ai.models.generateContent({
                model: 'gemini-3-flash-preview',
                contents: `Sugiere un esquema de colores elegante (en hexadecimal) para una marca llamada "${user?.businessName}". 
                Responde en formato JSON con las llaves "buttonColor" y "panelColor". El panel debe ser claro o blanco suave.`,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.OBJECT,
                        properties: {
                            buttonColor: { type: Type.STRING },
                            panelColor: { type: Type.STRING }
                        },
                        required: ["buttonColor", "panelColor"]
                    }
                }
            });
            
            const result = JSON.parse(response.text || '{}');
            if (result.buttonColor) setButtonColor(result.buttonColor);
            if (result.panelColor) setPanelColor(result.panelColor);
        } catch (error) {
            console.error("AI Error:", error);
        } finally {
            setIsAiGenerating(false);
        }
    };

    return (
        <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Estilo & Identidad</h2>
                        <p className="text-slate-500 mt-2 font-medium">Define cómo se ve JapiJelp en tu tienda.</p>
                    </div>
                    <button 
                        onClick={handleAiMagic}
                        disabled={isAiGenerating}
                        className="flex items-center px-5 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-2xl shadow-xl shadow-indigo-100 hover:scale-105 transition-transform disabled:opacity-50 font-bold text-sm"
                    >
                        <span className="mr-2">✨</span>
                        {isAiGenerating ? 'Magia...' : 'IA Magic Style'}
                    </button>
                </div>

                <div className="space-y-8">
                    <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200/50">
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Tu URL Pública</label>
                        <div className="flex gap-2">
                            <input type="text" readOnly value={url} className="flex-1 px-4 py-3 bg-white border border-slate-200 rounded-xl font-mono text-sm text-slate-600 focus:outline-none" />
                            <button onClick={() => navigator.clipboard.writeText(url)} className="p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                            <label className="block text-sm font-bold text-slate-700">Botón Principal</label>
                            <div className="flex items-center gap-4">
                                <input type="color" value={buttonColor} onChange={(e) => setButtonColor(e.target.value)} className="h-14 w-14 rounded-2xl border-none cursor-pointer p-0 overflow-hidden shadow-inner"/>
                                <input type="text" value={buttonColor} onChange={(e) => setButtonColor(e.target.value)} className="flex-1 px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold uppercase" />
                            </div>
                        </div>
                        <div className="space-y-3">
                            <label className="block text-sm font-bold text-slate-700">Fondo del Panel</label>
                            <div className="flex items-center gap-4">
                                <input type="color" value={panelColor} onChange={(e) => setPanelColor(e.target.value)} className="h-14 w-14 rounded-2xl border-none cursor-pointer p-0 overflow-hidden shadow-inner"/>
                                <input type="text" value={panelColor} onChange={(e) => setPanelColor(e.target.value)} className="flex-1 px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold uppercase" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 flex justify-end">
                    <button 
                        onClick={handleSave} 
                        disabled={isSaving} 
                        className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-2xl shadow-slate-200 hover:bg-slate-800 transition-all disabled:bg-slate-300"
                    >
                        {isSaving ? 'Guardando...' : 'Aplicar Cambios'}
                    </button>
                </div>
            </div>
            
            <div className="hidden xl:flex justify-center items-start sticky top-10">
                <div className="p-4 bg-white rounded-[3rem] shadow-2xl shadow-slate-200 border border-slate-100 scale-90">
                    <MobilePreview config={{...config, buttonColor, panelColor}} />
                </div>
            </div>
        </div>
    );
};

const OptionsPanel: React.FC = () => {
    const { config, updateConfig } = useBusinessData();
    const [options, setOptions] = useState<HelpOption[]>(config.helpOptions);
    const [isSaving, setIsSaving] = useState(false);

    const toggleOption = (id: string) => {
        setOptions(options.map(o => o.id === id ? { ...o, enabled: !o.enabled } : o));
    };

    const handleSave = async () => {
        setIsSaving(true);
        await updateConfig({ helpOptions: options });
        setTimeout(() => setIsSaving(false), 800);
    };

    return (
         <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 max-w-4xl">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">Funciones de Ayuda</h2>
            <p className="text-slate-500 mb-10 font-medium">Activa o desactiva las capacidades de tu botón inteligente.</p>
            
            <div className="grid gap-4">
                {options.map(option => (
                    <div key={option.id} className="group flex items-center justify-between p-6 bg-slate-50 border border-transparent hover:border-primary-200 rounded-3xl transition-all cursor-pointer" onClick={() => toggleOption(option.id)}>
                        <div className="flex items-center">
                            <div className={`p-4 rounded-2xl mr-5 transition-colors ${option.enabled ? 'bg-primary-100 text-primary-600' : 'bg-slate-200 text-slate-400'}`}>
                                {option.type === HelpOptionType.CALL ? ICONS.phone : ICONS.exchange}
                            </div>
                            <div>
                                <span className={`text-lg font-bold block ${option.enabled ? 'text-slate-800' : 'text-slate-400'}`}>{option.label}</span>
                                <span className="text-sm text-slate-400 font-medium">
                                    {option.type === HelpOptionType.CALL ? 'Atención telefónica directa' : 'Gestión de devoluciones automatizada'}
                                </span>
                            </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer" onClick={(e) => e.stopPropagation()}>
                          <input type="checkbox" checked={option.enabled} onChange={() => toggleOption(option.id)} className="sr-only peer" />
                          <div className="w-14 h-8 bg-slate-200 rounded-full peer peer-checked:bg-primary-600 after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:after:translate-x-6"></div>
                        </label>
                    </div>
                ))}
            </div>
             <div className="mt-12 flex justify-end">
                <button 
                    onClick={handleSave} 
                    disabled={isSaving} 
                    className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-2xl shadow-slate-200 hover:bg-slate-800 transition-all disabled:bg-slate-300"
                >
                    {isSaving ? 'Guardando...' : 'Guardar Opciones'}
                </button>
            </div>
        </div>
    );
};

const DashboardContent: React.FC = () => {
    const { section } = useParams<{ section: string }>();
    const { analytics } = useBusinessData();

    switch (section) {
        case 'config':
            return <ConfigPanel />;
        case 'options':
            return <OptionsPanel />;
        case 'analytics':
            return <AnalyticsCharts data={analytics} />;
        default:
            return <ConfigPanel />;
    }
};

const DashboardPage: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <DashboardNav />
      <main className="flex-1 p-10 overflow-y-auto">
        <div className="max-w-[1400px] mx-auto">
            <DashboardContent />
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
