"use client";

import { useSearchParams } from "next/navigation";
import { ScenarioDashboardClient } from "@/component/dashboard/ScenarioDashboardClient";
import Header from "@/component/Header";

export default function ScenarioGenPage() {
    const params = useSearchParams();
    const category = params.get("category") ?? "";
    const caseName = params.get("case") ?? "";

    return (
        <div className="flex flex-col min-h-screen bg-white">
            <Header />

            <main className="flex-1 px-6 pt-4 pb-10 space-y-4">
                <ScenarioDashboardClient
                    initialCategory={category}
                    initialCaseName={caseName}
                />
            </main>
        </div>
    );
}
