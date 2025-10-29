import React from 'react';

export default function TankLevelGauge({ percent = 0, capacityLiters = 1000 }) {
  const clamped = Math.max(0, Math.min(100, percent));
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clamped / 100) * circumference;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="text-base font-medium text-gray-800">Tank Level</h3>
      <p className="text-sm text-gray-500 mb-4">Capacity: {capacityLiters.toLocaleString()} L</p>
      <div className="flex items-center justify-center">
        <svg width="180" height="180" viewBox="0 0 180 180" className="block">
          <defs>
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0ea5e9" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
          </defs>
          <circle
            cx="90"
            cy="90"
            r={radius}
            stroke="#e5e7eb"
            strokeWidth="14"
            fill="none"
          />
          <circle
            cx="90"
            cy="90"
            r={radius}
            stroke="url(#gaugeGradient)"
            strokeWidth="14"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            transform="rotate(-90 90 90)"
          />
          <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" className="fill-gray-800" fontSize="28" fontWeight="700">
            {clamped.toFixed(0)}%
          </text>
          <text x="50%" y="68%" dominantBaseline="middle" textAnchor="middle" className="fill-gray-500" fontSize="12">
            Tank
          </text>
        </svg>
      </div>
      <div className="mt-4">
        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-sky-500 to-emerald-500"
            style={{ width: `${clamped}%` }}
          />
        </div>
        <div className="mt-2 flex justify-between text-xs text-gray-500">
          <span>Empty</span>
          <span>Full</span>
        </div>
      </div>
    </div>
  );
}
