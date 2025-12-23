
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { AnalyticsData } from '../types';

interface AnalyticsChartsProps {
  data: AnalyticsData;
}

const COLORS = ['#8b5cf6', '#c4b5fd', '#4c1d95', '#a78bfa'];

const AnalyticsCharts: React.FC<AnalyticsChartsProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-6 grid-rows-2 gap-4 h-full">
      {/* Principal: Size Changes */}
      <div className="md:col-span-4 bg-white p-8 rounded-3xl shadow-sm border border-slate-100 bento-item flex flex-col">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-xl font-bold text-slate-900">Conversión de Tallas</h3>
            <p className="text-sm text-slate-500">Fluctuación de cambios solicitados por clientes</p>
          </div>
          <div className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-xs font-bold">+12% vs mes pasado</div>
        </div>
        <div className="flex-1">
          <ResponsiveContainer width="100%" height="100%" minHeight={250}>
            <BarChart data={data.sizeChanges} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 12}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 12}} />
              <Tooltip 
                contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}}
                cursor={{fill: '#F8FAFC'}}
              />
              <Bar dataKey="value" fill="#8b5cf6" radius={[6, 6, 0, 0]} barSize={32} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pie Chart: Searched Sizes */}
      <div className="md:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-slate-100 bento-item flex flex-col items-center">
        <h3 className="text-xl font-bold text-slate-900 w-full mb-2">Tallas Top</h3>
        <p className="text-sm text-slate-500 w-full mb-6 text-center">Tallas más consultadas</p>
        <div className="flex-1 w-full">
          <ResponsiveContainer width="100%" height="100%" minHeight={200}>
            <PieChart>
              <Pie
                data={data.mostSearchedSizes}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {data.mostSearchedSizes.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Product Changes - Full Width Bottom */}
      <div className="md:col-span-6 bg-slate-900 p-8 rounded-3xl shadow-xl bento-item text-white overflow-hidden relative">
        <div className="relative z-10 flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <h3 className="text-2xl font-bold mb-2 text-white">Top Cambios de Producto</h3>
            <p className="text-slate-400 text-sm mb-6">Identifica productos con problemas de expectativas para mejorar tu catálogo.</p>
            <div className="space-y-4">
              {data.productChanges.slice(0, 3).map((item, i) => (
                <div key={i} className="flex justify-between items-center border-b border-slate-800 pb-2">
                  <span className="text-sm text-slate-300 truncate mr-4">{item.name}</span>
                  <span className="text-sm font-bold text-primary-400">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="md:w-2/3 h-64">
             <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.productChanges} layout="vertical" margin={{ left: 20 }}>
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="name" width={120} axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 11}} />
                <Tooltip 
                  cursor={{fill: 'rgba(255,255,255,0.05)'}}
                  contentStyle={{backgroundColor: '#1E293B', border: 'none', borderRadius: '12px', color: '#fff'}}
                />
                <Bar dataKey="value" fill="#8b5cf6" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/20 blur-[100px] rounded-full -mr-20 -mt-20"></div>
      </div>
    </div>
  );
};

export default AnalyticsCharts;
