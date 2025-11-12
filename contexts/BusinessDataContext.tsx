
import React, { createContext, useState, useContext, useEffect } from 'react';
import { BusinessConfig, SizeChart, AnalyticsData, HelpOptionType, BusinessDataContextType, SizeCategory, FootwearSize, TopSize, BottomSize } from '../types';
import { useAuth } from './AuthContext';

const BusinessDataContext = createContext<BusinessDataContextType | undefined>(undefined);

const MOCK_INITIAL_CONFIG: BusinessConfig = {
  buttonColor: '#3b82f6',
  panelColor: '#ffffff',
  helpOptions: [
    { id: '1', type: HelpOptionType.CALL, label: 'Llamar para asistencia', enabled: true },
    { id: '2', type: HelpOptionType.SIZE_EXCHANGE, label: 'Cambio de talla', enabled: true },
    { id: '3', type: HelpOptionType.PRODUCT_EXCHANGE, label: 'Cambio de producto', enabled: true },
  ],
};

const MOCK_SIZES: SizeChart = {
    footwear: [
        { id: 's1', region: 'US', size: '9' },
        { id: 's2', region: 'EU', size: '42' },
    ],
    tops: [
        { id: 't1', size: 'M', chest: '38-40"', waist: '32-34"' },
        { id: 't2', size: 'L', chest: '41-43"', waist: '35-37"' },
    ],
    bottoms: [
        { id: 'b1', size: '32', waist: '32"', inseam: '32"' },
        { id: 'b2', size: '34', waist: '34"', inseam: '32"' },
    ],
};

const MOCK_ANALYTICS: AnalyticsData = {
    sizeChanges: [
        { name: 'M -> L', value: 40 },
        { name: 'S -> M', value: 30 },
        { name: '9 -> 9.5', value: 24 },
        { name: 'XL -> L', value: 18 },
    ],
    productChanges: [
        { name: 'Blue Shirt -> Red Shirt', value: 25 },
        { name: 'Jeans -> Chinos', value: 15 },
        { name: 'Sneakers -> Boots', value: 8 },
    ],
    mostSearchedSizes: [
        { name: 'M', value: 120 },
        { name: 'L', value: 95 },
        { name: '9.5', value: 80 },
        { name: '32', value: 75 },
    ],
};


export const BusinessDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [config, setConfig] = useState<BusinessConfig>(MOCK_INITIAL_CONFIG);
    const [sizes, setSizes] = useState<SizeChart>(MOCK_SIZES);
    const [analytics] = useState<AnalyticsData>(MOCK_ANALYTICS);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        // Simulate fetching data for the logged-in user
        if (user) {
            setLoading(true);
            setTimeout(() => {
                const savedConfig = localStorage.getItem(`config_${user.uid}`);
                if (savedConfig) {
                    setConfig(JSON.parse(savedConfig));
                }
                 const savedSizes = localStorage.getItem(`sizes_${user.uid}`);
                if (savedSizes) {
                    setSizes(JSON.parse(savedSizes));
                } else {
                    setSizes(MOCK_SIZES);
                }
                setLoading(false);
            }, 500);
        } else {
           setLoading(false);
        }
    }, [user]);
    
    const getPublicConfig = async (slug: string): Promise<BusinessConfig | null> => {
        // In a real app, this would query a public collection in Firebase by slug.
        // Here, we simulate by checking against the logged-in user's slug for demo purposes.
        console.log("Fetching config for slug:", slug);
        const mockedUserId = 'xyz-123'; // Hardcoded for demo
        const savedConfig = localStorage.getItem(`config_${mockedUserId}`);
        return savedConfig ? JSON.parse(savedConfig) : MOCK_INITIAL_CONFIG;
    };

    const updateConfig = async (newConfig: Partial<BusinessConfig>) => {
        if (!user) return;
        const updatedConfig = { ...config, ...newConfig };
        setConfig(updatedConfig);
        // Simulate saving to Firebase
        localStorage.setItem(`config_${user.uid}`, JSON.stringify(updatedConfig));
    };
    
    const addSize = async (category: SizeCategory, size: Omit<FootwearSize, 'id'> | Omit<TopSize, 'id'> | Omit<BottomSize, 'id'>) => {
        if(!user) return;
        const newSize = { ...size, id: `${category.charAt(0)}${Date.now()}` };
        
        const updatedSizes = {
            ...sizes,
            [category]: [...sizes[category], newSize]
        };
        
        setSizes(updatedSizes as SizeChart);
        localStorage.setItem(`sizes_${user.uid}`, JSON.stringify(updatedSizes));
    };

    const removeSize = async (category: SizeCategory, id: string) => {
        if(!user) return;
        const updatedSizes = {
            ...sizes,
            [category]: sizes[category].filter((s: any) => s.id !== id)
        };
        setSizes(updatedSizes);
        localStorage.setItem(`sizes_${user.uid}`, JSON.stringify(updatedSizes));
    };

    return (
        <BusinessDataContext.Provider value={{ config, sizes, analytics, loading, getPublicConfig, updateConfig, addSize, removeSize }}>
            {children}
        </BusinessDataContext.Provider>
    );
};


export const useBusinessData = () => {
    const context = useContext(BusinessDataContext);
    if (context === undefined) {
        throw new Error('useBusinessData must be used within a BusinessDataProvider');
    }
    return context;
};
