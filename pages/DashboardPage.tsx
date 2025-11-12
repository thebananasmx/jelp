
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useBusinessData } from '../contexts/BusinessDataContext';
import { HelpOption, SizeCategory } from '../types';

import DashboardNav from '../components/DashboardNav';
import MobilePreview from '../components/MobilePreview';
import AnalyticsCharts from '../components/AnalyticsCharts';
import { ICONS } from '../constants';

// Sub-components defined outside the main component to prevent re-rendering issues

const ConfigPanel: React.FC = () => {
    const { config, updateConfig } = useBusinessData();
    const { user } = useAuth();
    const [buttonColor, setButtonColor] = useState(config.buttonColor);
    const [panelColor, setPanelColor] = useState(config.panelColor);
    const [isSaving, setIsSaving] = useState(false);
    
    const url = `${window.location.origin}${window.location.pathname}#/help-button/${user?.businessSlug}`;

    const handleSave = async () => {
        setIsSaving(true);
        await updateConfig({ buttonColor, panelColor });
        setTimeout(() => setIsSaving(false), 1000);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-bold text-gray-800">Button Configuration</h2>
                <p className="text-gray-500 mt-1">Customize the appearance of your help button.</p>
                <div className="mt-6 space-y-6">
                    <div>
                        <label htmlFor="button-url" className="block text-sm font-medium text-gray-700">Your Help Button URL</label>
                        <input type="text" id="button-url" readOnly value={url} className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm sm:text-sm" />
                    </div>
                    <div>
                        <label htmlFor="button-color" className="block text-sm font-medium text-gray-700">Button Color</label>
                        <input type="color" id="button-color" value={buttonColor} onChange={(e) => setButtonColor(e.target.value)} className="mt-1 h-10 w-full rounded-md border border-gray-300 cursor-pointer"/>
                    </div>
                    <div>
                        <label htmlFor="panel-color" className="block text-sm font-medium text-gray-700">Panel Background Color</label>
                        <input type="color" id="panel-color" value={panelColor} onChange={(e) => setPanelColor(e.target.value)} className="mt-1 h-10 w-full rounded-md border border-gray-300 cursor-pointer"/>
                    </div>
                </div>
                <div className="mt-8 text-right">
                    <button onClick={handleSave} disabled={isSaving} className="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:bg-primary-300">
                        {isSaving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </div>
            <div className="hidden lg:flex justify-center items-center">
                <MobilePreview config={{...config, buttonColor, panelColor}} />
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
        setTimeout(() => setIsSaving(false), 1000);
    };

    return (
         <div className="bg-white p-6 rounded-lg shadow max-w-2xl mx-auto">
            <h2 className="text-xl font-bold text-gray-800">Help Options</h2>
            <p className="text-gray-500 mt-1">Configure the options available when a customer clicks the help button.</p>
            <div className="mt-6 space-y-4">
                {options.map(option => (
                    <div key={option.id} className="flex items-center justify-between p-3 border rounded-md">
                        <span className="text-gray-800">{option.label}</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" checked={option.enabled} onChange={() => toggleOption(option.id)} className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-primary-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        </label>
                    </div>
                ))}
            </div>
             <div className="mt-8 text-right">
                <button onClick={handleSave} disabled={isSaving} className="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:bg-primary-300">
                    {isSaving ? 'Saving...' : 'Save Options'}
                </button>
            </div>
        </div>
    );
};

const SizesPanel: React.FC = () => {
    const { sizes, addSize, removeSize } = useBusinessData();
    const [activeTab, setActiveTab] = useState<SizeCategory>('footwear');

    const [footwearForm, setFootwearForm] = useState({ region: '', size: '' });
    const [topsForm, setTopsForm] = useState({ size: '', chest: '', waist: '' });
    const [bottomsForm, setBottomsForm] = useState({ size: '', waist: '', inseam: '' });

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        switch(activeTab) {
            case 'footwear':
                if (footwearForm.region && footwearForm.size) {
                    addSize('footwear', footwearForm);
                    setFootwearForm({ region: '', size: '' });
                }
                break;
            case 'tops':
                 if (topsForm.size && topsForm.chest) {
                    addSize('tops', topsForm);
                    setTopsForm({ size: '', chest: '', waist: '' });
                }
                break;
            case 'bottoms':
                if (bottomsForm.size && bottomsForm.waist) {
                    addSize('bottoms', bottomsForm);
                    setBottomsForm({ size: '', waist: '', inseam: '' });
                }
                break;
        }
    };
    
    const renderForm = () => {
        switch(activeTab) {
            case 'footwear': return (
                <form onSubmit={handleAdd} className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                    <input value={footwearForm.region} onChange={e => setFootwearForm({...footwearForm, region: e.target.value})} placeholder="Region (e.g., US)" className="input-field" />
                    <input value={footwearForm.size} onChange={e => setFootwearForm({...footwearForm, size: e.target.value})} placeholder="Size (e.g., 9)" className="input-field" />
                    <button type="submit" className="add-button">{ICONS.plus} <span className="ml-2">Add Footwear Size</span></button>
                </form>
            );
            case 'tops': return (
                 <form onSubmit={handleAdd} className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                    <input value={topsForm.size} onChange={e => setTopsForm({...topsForm, size: e.target.value})} placeholder="Size (e.g., M)" className="input-field" />
                    <input value={topsForm.chest} onChange={e => setTopsForm({...topsForm, chest: e.target.value})} placeholder="Chest (e.g., 38-40&quot;)" className="input-field" />
                    <input value={topsForm.waist} onChange={e => setTopsForm({...topsForm, waist: e.target.value})} placeholder="Waist (e.g., 32-34&quot;)" className="input-field" />
                    <button type="submit" className="add-button">{ICONS.plus} <span className="ml-2">Add Top Size</span></button>
                </form>
            );
            case 'bottoms': return (
                <form onSubmit={handleAdd} className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                    <input value={bottomsForm.size} onChange={e => setBottomsForm({...bottomsForm, size: e.target.value})} placeholder="Size (e.g., 32)" className="input-field" />
                    <input value={bottomsForm.waist} onChange={e => setBottomsForm({...bottomsForm, waist: e.target.value})} placeholder="Waist (e.g., 32&quot;)" className="input-field" />
                    <input value={bottomsForm.inseam} onChange={e => setBottomsForm({...bottomsForm, inseam: e.target.value})} placeholder="Inseam (e.g., 32&quot;)" className="input-field" />
                    <button type="submit" className="add-button">{ICONS.plus} <span className="ml-2">Add Bottom Size</span></button>
                </form>
            );
        }
    }

    const renderTable = () => {
        const currentData = sizes[activeTab] || [];
        const headers = activeTab === 'footwear' ? ['Region', 'Size'] 
                        : activeTab === 'tops' ? ['Size', 'Chest', 'Waist'] 
                        : ['Size', 'Waist', 'Inseam'];
        
        return (
             <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead>
                                <tr>
                                    {headers.map(h => <th key={h} scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">{h}</th>)}
                                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0"><span className="sr-only">Delete</span></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {currentData.map((item: any) => (
                                    <tr key={item.id}>
                                        {headers.map(h => <td key={`${item.id}-${h}`} className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item[h.toLowerCase()]}</td>)}
                                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                            <button onClick={() => removeSize(activeTab, item.id)} className="text-red-600 hover:text-red-900">{ICONS.trash}</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
    
    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold text-gray-800">Size Charts</h2>
            <p className="text-gray-500 mt-1">Manage the sizes available in your store.</p>
            
            <div className="border-b border-gray-200 mt-4">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                    {(['footwear', 'tops', 'bottoms'] as SizeCategory[]).map(tab => (
                        <button key={tab} onClick={() => setActiveTab(tab)}
                            className={`${activeTab === tab ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                                capitalize whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}>
                            {tab}
                        </button>
                    ))}
                </nav>
            </div>
            
            <style>{`.input-field { margin-top: 0.25rem; display: block; width: 100%; padding: 0.5rem 0.75rem; background-color: white; border: 1px solid #d1d5db; border-radius: 0.375rem; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); } .add-button { display: flex; align-items: center; justify-content: center; padding: 0.5rem 1rem; background-color: #2563eb; color: white; border-radius: 0.375rem; } .add-button:hover { background-color: #1d4ed8; }`}</style>

            {renderForm()}
            {renderTable()}
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
        case 'sizes':
            return <SizesPanel />;
        case 'analytics':
            return <AnalyticsCharts data={analytics} />;
        default:
            return <ConfigPanel />;
    }
};

const DashboardPage: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <DashboardNav />
      <main className="flex-1 p-8 overflow-y-auto">
        <DashboardContent />
      </main>
    </div>
  );
};

export default DashboardPage;
