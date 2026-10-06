import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

export default function FindingChartSection({ stats = {} }) {
  const byType = stats.byType || [];
  const byClause = stats.byClause || [];
  const byWorkArea = stats.byWorkArea || [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      {/* 1. Finding Type */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs flex flex-col justify-between">
        <div>
          <h2 className="font-bold text-slate-800 text-lg">Distribusi Jenis Temuan</h2>
          <p className="text-xs text-gray-500 mt-0.5">Proporsi Major, Minor, dan PI</p>
        </div>
        <div className="my-2 flex flex-col items-center">
          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={byType} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={3} dataKey="value">
                  {byType.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="#ffffff" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => [`${value} Temuan`, name]} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="w-full grid grid-cols-2 gap-x-2 gap-y-1.5 mt-2 pt-3 border-t border-gray-100 max-h-36 overflow-y-auto pr-1">
            {byType.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs py-0.5">
                <div className="flex items-center gap-1.5 truncate">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-slate-600 truncate font-medium">{item.name}</span>
                </div>
                <span className="font-bold text-slate-800 ml-1">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Klausul */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs flex flex-col justify-between">
        <div>
          <h2 className="font-bold text-slate-800 text-lg">Distribusi per Klausul</h2>
          <p className="text-xs text-gray-500 mt-0.5">Jumlah temuan berdasarkan klausul</p>
        </div>
        <div className="h-52 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={byClause} layout="vertical" margin={{ top: 0, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
              <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 11 }} />
              <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 11 }} width={80} />
              <Tooltip cursor={{fill: '#F1F5F9'}} contentStyle={{ borderRadius: '8px', fontSize: '12px' }} formatter={(value) => [`${value} Temuan`, 'Jumlah']} />
              <Bar dataKey="value" fill="#00A2B9" radius={[0, 4, 4, 0]}>
                {byClause.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 3. Bidang Kerja */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs flex flex-col justify-between">
        <div>
          <h2 className="font-bold text-slate-800 text-lg">Distribusi per Bidang</h2>
          <p className="text-xs text-gray-500 mt-0.5">Jumlah temuan di tiap area kerja</p>
        </div>
        <div className="my-2 flex flex-col items-center">
          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={byWorkArea} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={3} dataKey="value">
                  {byWorkArea.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="#ffffff" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => [`${value} Temuan`, name]} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-1.5 mt-2 pt-3 border-t border-gray-100 max-h-36 overflow-y-auto pr-1">
            {byWorkArea.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs py-0.5">
                <div className="flex items-center gap-1.5 truncate">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-slate-600 truncate font-medium">{item.name}</span>
                </div>
                <span className="font-bold text-slate-800 ml-1">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
