import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

// Data for Line/Area Chart: Tren Review Dokumen
const trendData = [
  { year: '2022', count: 503 },
  { year: '2023', count: 857 },
  { year: '2024', count: 1035 },
  { year: '2025', count: 2081 },
];

// Data for Donut Chart: Sebaran Dokumen per Bidang (Bidang A - I)
const bidangData = [
  { name: 'Bidang A', value: 25, color: '#00A2B9' },
  { name: 'Bidang B', value: 18, color: '#006B7B' },
  { name: 'Bidang C', value: 15, color: '#E67E22' },
  { name: 'Bidang D', value: 12, color: '#3B82F6' },
  { name: 'Bidang E', value: 10, color: '#10B981' },
  { name: 'Bidang F', value: 8, color: '#8B5CF6' },
  { name: 'Bidang G', value: 5, color: '#EC4899' },
  { name: 'Bidang H', value: 4, color: '#F59E0B' },
  { name: 'Bidang I', value: 3, color: '#64748B' },
];

// Custom Label above data points
const CustomPointLabel = (props) => {
  const { x, y, value } = props;
  if (x === undefined || y === undefined) return null;

  return (
    <g transform={`translate(${x},${y - 12})`}>
      <rect
        x="-20"
        y="-14"
        width="40"
        height="20"
        rx="5"
        fill="#00A2B9"
        filter="drop-shadow(0px 2px 4px rgba(0,0,0,0.15))"
      />
      <text
        x="0"
        y="-2"
        fill="#FFFFFF"
        textAnchor="middle"
        fontSize="11"
        fontWeight="bold"
        dominantBaseline="middle"
      >
        {value}
      </text>
    </g>
  );
};

export default function ChartSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      {/* Kiri (2 Kolom): Area/Line Chart */}
      <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-5 shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-bold text-slate-800 text-lg">
              Tren Review Dokumen untuk Semua Standar
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Pertumbuhan jumlah review dokumen standar dari tahun 2022 hingga 2025
            </p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-[#00A2B9]/10 text-[#00A2B9] rounded-full">
            Tahunan
          </span>
        </div>

        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={trendData}
              margin={{ top: 25, right: 30, left: 10, bottom: 0 }}
            >
              <defs>
                <linearGradient id="tealGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00A2B9" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#00A2B9" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis
                dataKey="year"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#64748B', fontSize: 12, fontWeight: 500 }}
                dy={10}
              />
              <YAxis
                domain={[0, 2500]}
                ticks={[0, 500, 1000, 1500, 2000, 2500]}
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#64748B', fontSize: 12 }}
                dx={-5}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  borderColor: '#CBD5E1',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  fontSize: '12px',
                  fontWeight: 600
                }}
                formatter={(value) => [`${value} Dokumen`, 'Jumlah Review']}
                labelFormatter={(year) => `Tahun ${year}`}
              />
              <Area
                type="monotone"
                dataKey="count"
                stroke="#00A2B9"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#tealGradient)"
                dot={{ r: 5, fill: '#00A2B9', stroke: '#ffffff', strokeWidth: 2 }}
                activeDot={{ r: 7, fill: '#006B7B', stroke: '#ffffff', strokeWidth: 2 }}
                label={<CustomPointLabel />}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Kanan (1 Kolom): Donut Chart Sebaran Dokumen per Bidang */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs flex flex-col justify-between">
        <div>
          <h2 className="font-bold text-slate-800 text-lg">
            Sebaran Dokumen per Bidang
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Proporsi dokumen berdasarkan kategori bidang
          </p>
        </div>

        <div className="my-2 flex flex-col items-center">
          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={bidangData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {bidangData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="#ffffff" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [`${value} Dokumen`, name]}
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    borderRadius: '8px',
                    borderColor: '#cbd5e1',
                    fontSize: '12px',
                    fontWeight: 600,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Custom Legend Layout for Bidang A - I */}
          <div className="w-full grid grid-cols-2 gap-x-2 gap-y-1.5 mt-2 pt-3 border-t border-gray-100 max-h-36 overflow-y-auto pr-1">
            {bidangData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs py-0.5">
                <div className="flex items-center gap-1.5 truncate">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-slate-600 truncate font-medium">{item.name}</span>
                </div>
                <span className="font-bold text-slate-800 ml-1">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
