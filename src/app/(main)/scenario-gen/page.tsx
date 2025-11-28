// app/scenario-gen/page.tsx (예시)

import { ScenarioDashboardClient } from "@/component/dashboard/ScenarioDashboardClient";
import Header from "@/component/Header";
import SmallHeader from "@/component/SmallHeader";

export default function ScenarioGenPage() {
    return (
        <div className="flex flex-col min-h-screen bg-white">
            <Header />
            {/* <SmallHeader title="시나리오 대시보드" onClick={} /> */}

            <main className="flex-1 px-6 pt-4 pb-10 space-y-4">
                {/* 위쪽 선택한 카테고리/케이스 영역은 네 기존 코드 그대로 두고 */}
                {/* 아래에 왼쪽 두 모듈 배치 */}
                <ScenarioDashboardClient />
            </main>
        </div>
    );
}
