// components/scenario-dashboard/ScenarioDashboardClient.tsx
"use client";

import React, { useState } from "react";

import { createInitialChecklistJson, createInitialScenarioJson } from "@/assets/initData";
import { ScenarioPannel } from "./ScenarioPannel";
import { ChecklistPannel } from "./ChecklistPannel";
import { VirtualPatient } from "@/utils/loadVirtualPatient";
import { ChecklistJson } from "@/types/dashboard";
import LiveCPXClient from "@/component/dashboard/LiveCPXClient";

type Props = {
    initialCategory?: string;
    initialCaseName?: string;
};

export const ScenarioDashboardClient: React.FC<Props> = ({
    initialCategory = "",
    initialCaseName = "",
}) => {
    const [scenarioJson, setScenarioJson] = useState<VirtualPatient>(
        createInitialScenarioJson()
    );
    const [checklistJson, setChecklistJson] = useState<ChecklistJson>(
        createInitialChecklistJson()
    );
    const [liveLocked, setLiveLocked] = useState(false);
    // 쿼리로 받은 카테고리/케이스를 표시용으로 고정 보관
    const [queryCategory] = useState(initialCategory);
    const [queryCase] = useState(initialCaseName);

    const derivedCategory = scenarioJson.title || "Scenario";
    const derivedCaseName =
        scenarioJson.properties.meta.chief_complaint ||
        scenarioJson.properties.meta.name ||
        scenarioJson.title;

    const liveCategory = queryCategory;
    const liveCaseName = queryCase;

    return (
        <div className="flex gap-4 lg:gap-6 mb-10">
            <ScenarioPannel
                scenarioJson={scenarioJson}
                onChange={setScenarioJson}
                disabled={liveLocked}
                contextLabel={
                    liveCategory && liveCaseName ? `${liveCategory} | ${liveCaseName}` : undefined
                }
                checklistJson={checklistJson}
            />
            <ChecklistPannel
                checklistJson={checklistJson}
                onChange={setChecklistJson}
                disabled={liveLocked}
            />
            <LiveCPXClient
                category={liveCategory}
                caseName={liveCaseName}
                virtualPatient={scenarioJson}
                variant="panel"
                onLockChange={setLiveLocked}
            />
        </div>
    );
};
