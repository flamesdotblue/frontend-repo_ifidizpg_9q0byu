import React from 'react';
import { Droplet, Gauge } from 'lucide-react';

export default function DeviceControls({
  waterInRate,
  waterOutRate,
  onChangeIn,
  onChangeOut,
  simulating,
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-medium text-gray-800">Device Controls</h3>
        <span className={`text-xs font-medium px-2 py-1 rounded-md ${simulating ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-600'}`}>
          {simulating ? 'Simulation Active' : 'Manual Adjust'}
        </span>
      </div>

      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
                <Droplet className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-medium">Water In (to Tank)</p>
                <p className="text-xs text-gray-500">Flowmeter</p>
              </div>
            </div>
            <span className="text-sm text-gray-600 font-medium">{waterInRate.toFixed(1)} L/min</span>
          </div>
          <input
            type="range"
            min="0"
            max="60"
            step="0.5"
            value={waterInRate}
            onChange={(e) => onChangeIn(parseFloat(e.target.value))}
            className="w-full accent-blue-600"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center">
                <Droplet className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-medium">Water Out (to House)</p>
                <p className="text-xs text-gray-500">Flowmeter</p>
              </div>
            </div>
            <span className="text-sm text-gray-600 font-medium">{waterOutRate.toFixed(1)} L/min</span>
          </div>
          <input
            type="range"
            min="0"
            max="60"
            step="0.5"
            value={waterOutRate}
            onChange={(e) => onChangeOut(parseFloat(e.target.value))}
            className="w-full accent-rose-600"
          />
        </div>

        <div className="rounded-lg border border-gray-100 p-4 bg-gray-50">
          <div className="flex items-center gap-2 mb-1">
            <div className="h-8 w-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
              <Gauge className="h-4 w-4" />
            </div>
            <p className="text-sm font-medium">Tank Level Sensor</p>
          </div>
          <p className="text-xs text-gray-600">
            Tank level is calculated from net flow (Water In - Water Out). Adjust the flows above or start the
            simulation to see live changes.
          </p>
        </div>
      </div>
    </div>
  );
}
