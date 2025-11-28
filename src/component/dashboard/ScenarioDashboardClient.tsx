// components/scenario-dashboard/ScenarioDashboardClient.tsx
"use client";

import React, { useState } from "react";

import { createInitialChecklistJson, createInitialScenarioJson } from "@/assets/initData";
import { ScenarioPannel } from "./ScenarioPannel";
import { ChecklistPannel } from "./ChecklistPannel";
import { VirtualPatient } from "@/utils/loadVirtualPatient";
import { ChecklistJson } from "@/types/dashboard";

export const ScenarioDashboardClient: React.FC = () => {
    const [scenarioJson, setScenarioJson] = useState<VirtualPatient>(
        createInitialScenarioJson()
    );
    const [checklistJson, setChecklistJson] = useState<ChecklistJson>(
        createInitialChecklistJson()
    );

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr,1.1fr] gap-4 lg:gap-6">
            <ScenarioPannel scenarioJson={scenarioJson} onChange={setScenarioJson} />
            <ChecklistPannel checklistJson={checklistJson} onChange={setChecklistJson} />
            {/* 오른쪽 SimulationModule 영역은 나중에 붙이면 됨 */}
        </div>
    );
};
