import React from 'react';
import { Activity, Play, Pause, Settings } from 'lucide-react';

export default function DashboardHeader({ simulating, onToggleSim }) {
  return (
    <header className="w-full flex items-center justify-between py-6">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md">
          <Activity className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Water Flow Control</h1>
          <p className="text-sm text-gray-500">Monitor and control Water In, Water Out, and Tank Level</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSim}
          className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium shadow-sm transition-colors ${
            simulating ? 'bg-rose-600 hover:bg-rose-700 text-white' : 'bg-emerald-600 hover:bg-emerald-700 text-white'
          }`}
        >
          {simulating ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          {simulating ? 'Pause simulation' : 'Start simulation'}
        </button>
        <button className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium border border-gray-200 hover:bg-gray-50">
          <Settings className="h-4 w-4" />
          Settings
        </button>
      </div>
    </header>
  );
}
