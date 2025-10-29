import React from 'react';
import { Droplet, Gauge, Activity } from 'lucide-react';

function StatCard({ title, value, unit, icon: Icon, subtitle, accent = 'blue' }) {
  const accentClasses = {
    blue: 'bg-blue-50 text-blue-700',
    emerald: 'bg-emerald-50 text-emerald-700',
    amber: 'bg-amber-50 text-amber-700',
    rose: 'bg-rose-50 text-rose-700',
  };

  return (
    <div className="rounded-xl border border-gray-200 p-4 bg-white shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-2xl font-semibold">{value}</span>
            {unit && <span className="text-sm text-gray-400">{unit}</span>}
          </div>
          {subtitle && <p className="mt-1 text-xs text-gray-500">{subtitle}</p>}
        </div>
        <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${accentClasses[accent]}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}

export default function MetricsGrid({ waterInRate, waterOutRate, gapRate, tankPercent, totals }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      <StatCard
        title="Water In"
        value={waterInRate.toFixed(1)}
        unit="L/min"
        icon={Droplet}
        subtitle={`Total: ${totals.in.toFixed(0)} L`}
        accent="blue"
      />
      <StatCard
        title="Water Out"
        value={waterOutRate.toFixed(1)}
        unit="L/min"
        icon={Droplet}
        subtitle={`Total: ${totals.out.toFixed(0)} L`}
        accent="rose"
      />
      <StatCard
        title="Gap (Net Flow)"
        value={gapRate.toFixed(1)}
        unit="L/min"
        icon={Activity}
        subtitle={`${gapRate >= 0 ? 'Filling' : 'Draining'}`}
        accent={gapRate >= 0 ? 'emerald' : 'amber'}
      />
      <StatCard
        title="Tank Level"
        value={tankPercent.toFixed(0)}
        unit="%"
        icon={Gauge}
        subtitle={`Optimal range: 40% - 80%`}
        accent="amber"
      />
    </div>
  );
}
