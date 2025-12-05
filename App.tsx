import React, { useState, useMemo } from "react";
import { SimulationState } from "./types";
import { calculatePhysics } from "./utils/physics";
import ControlPanel from "./components/ControlPanel";
import SimulationCanvas from "./components/SimulationCanvas";
import StatusCard from "./components/StatusCard";

const App: React.FC = () => {
  const [state, setState] = useState<SimulationState>({
    velocity: 25, // 90 km/h (Classic Green Train speed)
    angle: 8, // Typical banking for conventional rail
    radius: 600, // 600m (Conventional mainline curve)
    mass: 1000,
    forceMode: "none", // Default to none
    showPlane: false, // Default to off
  });

  const physics = useMemo(() => {
    return calculatePhysics(state.velocity, state.angle, state.radius);
  }, [state.velocity, state.angle, state.radius]);

  const handleStateChange = (newState: Partial<SimulationState>) => {
    setState((prev) => ({ ...prev, ...newState }));
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-base">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-8 py-5 flex items-center justify-start shadow-sm z-10">
        <h1 className="text-3xl font-bold text-slate-800">火车转弯物理模型</h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8 overflow-hidden flex flex-col lg:flex-row gap-8">
        {/* Left Column: Controls & Feedback */}
        <div className="w-full lg:w-1/3 min-w-[360px] flex flex-col gap-6">
          {/* Feedback Section (Top) */}
          <div className="flex-shrink-0">
            <StatusCard
              status={physics.status}
              diff={state.velocity - physics.idealVelocity}
            />
          </div>

          {/* Control Panel Section (Bottom) */}
          <div className="flex-1 min-h-0">
            <ControlPanel
              state={state}
              physics={physics}
              onChange={handleStateChange}
            />
          </div>
        </div>

        {/* Right Column: Visualization */}
        <div className="w-full lg:w-2/3 flex flex-col gap-2">
          <SimulationCanvas state={state} physics={physics} />

          <div className="text-center text-slate-500 text-base mt-2">
            * 视图：火车尾部横截面 | 红色圆点：重心 (Center of Mass)
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
