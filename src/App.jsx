import React, { useEffect, useMemo, useState } from 'react';
import DashboardHeader from './components/DashboardHeader.jsx';
import MetricsGrid from './components/MetricsGrid.jsx';
import TankLevelGauge from './components/TankLevelGauge.jsx';
import DeviceControls from './components/DeviceControls.jsx';

export default function App() {
  // Tank configuration
  const TANK_CAPACITY_L = 1500; // liters

  // Live state
  const [simulating, setSimulating] = useState(false);
  const [waterInRate, setWaterInRate] = useState(20); // L/min
  const [waterOutRate, setWaterOutRate] = useState(12); // L/min
  const [tankVolume, setTankVolume] = useState(800); // L
  const [totalIn, setTotalIn] = useState(0); // L
  const [totalOut, setTotalOut] = useState(0); // L

  const tankPercent = useMemo(() => (tankVolume / TANK_CAPACITY_L) * 100, [tankVolume]);
  const gapRate = useMemo(() => waterInRate - waterOutRate, [waterInRate, waterOutRate]);

  // Simulation loop
  useEffect(() => {
    if (!simulating) return;

    const interval = setInterval(() => {
      // Add slight randomness to simulate sensor jitter
      const jitterIn = (Math.random() - 0.5) * 2; // -1..1
      const jitterOut = (Math.random() - 0.5) * 2; // -1..1

      setWaterInRate((r) => Math.max(0, Math.min(60, r + jitterIn)));
      setWaterOutRate((r) => Math.max(0, Math.min(60, r + jitterOut)));

      setTankVolume((prev) => {
        const netPerSecond = (waterInRate - waterOutRate) / 60; // L/s using current displayed rates
        let next = prev + netPerSecond;
        if (next > TANK_CAPACITY_L) next = TANK_CAPACITY_L;
        if (next < 0) next = 0;
        return next;
      });

      setTotalIn((t) => t + waterInRate / 60);
      setTotalOut((t) => t + waterOutRate / 60);
    }, 1000);

    return () => clearInterval(interval);
  }, [simulating, waterInRate, waterOutRate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900">
      <div className="mx-auto max-w-6xl px-4">
        <DashboardHeader
          simulating={simulating}
          onToggleSim={() => setSimulating((s) => !s)}
        />

        <MetricsGrid
          waterInRate={waterInRate}
          waterOutRate={waterOutRate}
          gapRate={gapRate}
          tankPercent={tankPercent}
          totals={{ in: totalIn, out: totalOut }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2">
            <TankLevelGauge percent={tankPercent} capacityLiters={TANK_CAPACITY_L} />
          </div>
          <div className="lg:col-span-1">
            <DeviceControls
              waterInRate={waterInRate}
              waterOutRate={waterOutRate}
              onChangeIn={(v) => {
                setWaterInRate(v);
              }}
              onChangeOut={(v) => {
                setWaterOutRate(v);
              }}
              simulating={simulating}
            />
          </div>
        </div>

        <div className="mt-8 mb-12 rounded-xl border border-dashed border-gray-300 p-6 text-sm text-gray-600 bg-white/60">
          <p>
            Definitions — Water Source is "Water In", House Usage is "Water Out", and "Gap" is Net Flow (Water In - Water Out).
            Adjust the sliders or start the simulation to see the system update in real time.
          </p>
        </div>
      </div>
    </div>
  );
}
