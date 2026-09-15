import React from 'react';
import {
  Users,
  FileText,
  Award,
  Grid,
  PieChart,
  ClipboardList,
  ArrowRight
} from 'lucide-react';

export default function MetricGrid() {
  const metrics = [
    {
      id: 1,
      title: 'Total User Aktif',
      value: '12',
      icon: Users,
      bgColor: 'bg-[#00A2B9]/10',
      iconColor: 'text-[#00A2B9]',
      borderColor: 'hover:border-[#00A2B9]/40',
      link: '#',
    },
    {
      id: 2,
      title: 'Jumlah Dokumen',
      value: '100',
      icon: FileText,
      bgColor: 'bg-emerald-500/10',
      iconColor: 'text-emerald-600',
      borderColor: 'hover:border-emerald-500/40',
      link: '#',
    },
    {
      id: 3,
      title: 'Jumlah Sertifikat',
      value: '24',
      icon: Award,
      bgColor: 'bg-emerald-500/10',
      iconColor: 'text-emerald-600',
      borderColor: 'hover:border-emerald-500/40',
      link: '#',
    },
    {
      id: 4,
      title: 'Total Bidang',
      value: '4',
      icon: Grid,
      bgColor: 'bg-[#00A2B9]/10',
      iconColor: 'text-[#00A2B9]',
      borderColor: 'hover:border-[#00A2B9]/40',
      link: '#',
    },
    {
      id: 5,
      title: 'Jumlah Standar',
      value: '4',
      icon: PieChart,
      bgColor: 'bg-blue-500/10',
      iconColor: 'text-blue-600',
      borderColor: 'hover:border-blue-500/40',
      link: '#',
    },
    {
      id: 6,
      title: 'Jumlah Review',
      value: '50',
      icon: ClipboardList,
      bgColor: 'bg-[#E67E22]/10',
      iconColor: 'text-[#E67E22]',
      borderColor: 'hover:border-[#E67E22]/40',
      link: '#',
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

            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
              <a
                href={card.link}
                className="text-xs font-semibold text-[#00A2B9] group-hover:text-[#006B7B] flex items-center gap-1.5 transition-colors"
              >
                <span>Lihat Semua</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
}
