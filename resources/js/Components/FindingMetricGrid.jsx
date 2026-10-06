import React from 'react';
import { FileCheck, AlertTriangle, AlertCircle, ArrowUpCircle, Globe, Lock } from 'lucide-react';

export default function FindingMetricGrid({ stats = {} }) {
  const metrics = [
    {
      id: 1,
      title: 'Total Temuan',
      value: stats.total || 0,
      icon: FileCheck,
      bgColor: 'bg-blue-500/10',
      iconColor: 'text-blue-600',
      borderColor: 'hover:border-blue-500/40',
    },
    {
      id: 2,
      title: 'Temuan Major',
      value: stats.major || 0,
      icon: AlertTriangle,
      bgColor: 'bg-red-500/10',
      iconColor: 'text-red-600',
      borderColor: 'hover:border-red-500/40',
    },
    {
      id: 3,
      title: 'Temuan Minor',
      value: stats.minor || 0,
      icon: AlertCircle,
      bgColor: 'bg-orange-500/10',
      iconColor: 'text-orange-600',
      borderColor: 'hover:border-orange-500/40',
    },
    {
      id: 4,
      title: 'Temuan PI',
      value: stats.pi || 0,
      icon: ArrowUpCircle,
      bgColor: 'bg-[#00A2B9]/10',
      iconColor: 'text-[#00A2B9]',
      borderColor: 'hover:border-[#00A2B9]/40',
    },
    {
      id: 5,
      title: 'Published',
      value: stats.published || 0,
      icon: Globe,
      bgColor: 'bg-emerald-500/10',
      iconColor: 'text-emerald-600',
      borderColor: 'hover:border-emerald-500/40',
    },
    {
      id: 6,
      title: 'Draft / Unpublished',
      value: stats.draft || 0,
      icon: Lock,
      bgColor: 'bg-gray-500/10',
      iconColor: 'text-gray-600',
      borderColor: 'hover:border-gray-500/40',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      {metrics.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            className={`bg-white rounded-xl border border-gray-200 p-4 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group ${card.borderColor}`}
          >
            <div className="flex items-center gap-4">
              <div className={`p-3.5 rounded-xl shrink-0 ${card.bgColor} ${card.iconColor} transition-transform group-hover:scale-105 duration-200`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-gray-500 text-sm font-medium">{card.title}</p>
                <p className="text-2xl font-bold text-slate-800 tracking-tight mt-0.5">{card.value}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
