// components/scenario-dashboard/ScenarioDevModule.tsx
"use client";

import { VirtualPatient } from "@/utils/loadVirtualPatient";
import React from "react";

interface ScenarioDevModuleProps {
  scenarioJson: VirtualPatient;
  onChange: (next: VirtualPatient) => void;
}

const inputBase =
  "w-full border border-[#E4DEF9] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#B9A8FF]";

export const ScenarioPannel: React.FC<ScenarioDevModuleProps> = ({
  scenarioJson,
  onChange,
}) => {
  const meta = scenarioJson.properties.meta;

  const updateMeta = (field: keyof typeof meta, value: any) => {
    onChange({
      ...scenarioJson,
      properties: {
        ...scenarioJson.properties,
        meta: {
          ...meta,
          [field]: value,
        },
      },
    });
  };

  const updateHistoryField = (key: string, value: string) => {
    onChange({
      ...scenarioJson,
      history: {
        ...scenarioJson.history,
        [key]: [value],
      },
    });
  };

  return (
    <section className="flex flex-col h-full rounded-2xl border border-[#D8D2F5] bg-white shadow-sm">
      {/* 헤더 */}
      <header className="border-b border-[#D8D2F5] px-4 py-3">
        <h2 className="text-lg font-semibold text-[#210535]">ScenarioDevModule</h2>
        <p className="text-xs text-[#7D72B1] mt-1">
          최소한의 Input을 넣으면 시나리오 초안 JSON이 생성되는 영역
        </p>
      </header>

      {/* 내용 */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4 text-sm">
        {/* 상단 – 이름/성별/나이/CC/Impression */}
        <div>
          <div className="grid grid-cols-12 gap-2 mb-2 text-[13px] font-semibold text-[#4A3C85]">
            <div className="col-span-3">이름</div>
            <div className="col-span-3">성별</div>
            <div className="col-span-2">나이</div>
            <div className="col-span-4">CC</div>
          </div>
          <div className="grid grid-cols-12 gap-2 mb-3">
            <input
              className={`${inputBase} col-span-3`}
              value={meta.name}
              onChange={(e) => updateMeta("name", e.target.value)}
              placeholder="예: 이춘배"
            />
            <input
              className={`${inputBase} col-span-3`}
              value={meta.sex}
              onChange={(e) => updateMeta("sex", e.target.value)}
              placeholder="예: 남 / 여"
            />
            <input
              className={`${inputBase} col-span-2`}
              type="number"
              value={meta.age}
              onChange={(e) => updateMeta("age", Number(e.target.value) || 0)}
              placeholder="예: 48"
            />
            <input
              className={`${inputBase} col-span-4`}
              value={meta.chief_complaint}
              onChange={(e) => updateMeta("chief_complaint", e.target.value)}
              placeholder="예: 윗배 통증"
            />
          </div>

          <div className="mb-3">
            <div className="text-[13px] font-semibold text-[#4A3C85] mb-1">Impression</div>
            <textarea
              className={`${inputBase} min-h-[60px]`}
              value={scenarioJson.title}
              onChange={(e) =>
                onChange({
                  ...scenarioJson,
                  title: e.target.value,
                })
              }
              placeholder="예: 충수돌기염이 급성 체장염인지 헷갈리는 moderate 중증도의 환자"
            />
          </div>

          <button
            type="button"
            className="w-full rounded-xl bg-[#F1EDFF] text-[#5A4D99] text-sm font-semibold py-2"
            // TODO: 여기에 AI 호출 붙이면 됨
          >
            시나리오 초안 생성하기
          </button>
        </div>

        {/* 기본 정보 - Present illness / Vitals */}
        <div className="pt-3 border-t border-dashed border-[#E0DAFA]">
          <h3 className="text-sm font-semibold text-[#210535] mb-2">기본 정보</h3>

          <label className="block mb-2">
            <span className="block text-xs font-medium text-[#6F659C] mb-1">
              Present illness
            </span>
            <textarea
              className={`${inputBase} min-h-[70px]`}
              value={scenarioJson.history?.Present_illness?.[0] ?? ""}
              onChange={(e) => updateHistoryField("Present_illness", e.target.value)}
              placeholder="예: 48세 남성 이춘배씨가 배가 아프다고 내원하였다..."
            />
          </label>

          <label className="block">
            <span className="block text-xs font-medium text-[#6F659C] mb-1">
              Vital sign
            </span>
            <div className="grid grid-cols-4 gap-2">
              <input
                className={inputBase}
                value={meta.vitals.bp}
                onChange={(e) =>
                  updateMeta("vitals", { ...meta.vitals, bp: e.target.value })
                }
                placeholder="BP 120/60"
              />
              <input
                className={inputBase}
                value={meta.vitals.hr}
                onChange={(e) =>
                  updateMeta("vitals", {
                    ...meta.vitals,
                    hr: Number(e.target.value) || 0,
                  })
                }
                placeholder="HR 80"
              />
              <input
                className={inputBase}
                value={meta.vitals.rr}
                onChange={(e) =>
                  updateMeta("vitals", {
                    ...meta.vitals,
                    rr: Number(e.target.value) || 0,
                  })
                }
                placeholder="RR 18"
              />
              <input
                className={inputBase}
                value={meta.vitals.bt}
                onChange={(e) =>
                  updateMeta("vitals", {
                    ...meta.vitals,
                    bt: Number(e.target.value) || 0,
                  })
                }
                placeholder="BT 36.7"
              />
            </div>
          </label>
        </div>

        {/* 병력 청취 / 신체 진찰은 간단한 placeholder 필드만 */}
        <div className="pt-3 border-t border-dashed border-[#E0DAFA] space-y-2">
          <h3 className="text-sm font-semibold text-[#210535]">병력 청취</h3>
          <textarea
            className={`${inputBase} min-h-[80px]`}
            value={scenarioJson.history?.free_text ?? ""}
            onChange={(e) => updateHistoryField("free_text", e.target.value)}
            placeholder="Onset / Location / Character / Associated symptom 등 자유롭게 메모"
          />
        </div>

        <div className="pt-3 border-t border-dashed border-[#E0DAFA] space-y-2">
          <h3 className="text-sm font-semibold text-[#210535]">신체 진찰</h3>
          <textarea
            className={`${inputBase} min-h-[80px]`}
            value={
              typeof scenarioJson.physical_exam === "string"
                ? scenarioJson.physical_exam
                : JSON.stringify(scenarioJson.physical_exam, null, 2)
            }
            onChange={(e) =>
              onChange({
                ...scenarioJson,
                physical_exam: e.target.value,
              })
            }
            placeholder="General / Chest / Abdomen 등 신체진찰 소견 요약"
          />
        </div>
      </div>

      {/* 하단 버튼 */}
      <footer className="border-t border-[#D8D2F5] px-4 py-3 flex justify-end">
        <button
          type="button"
          className="rounded-xl bg-[#C3B5FF] text-white text-sm font-semibold px-4 py-2"
          // TODO: 파일로 저장 로직은 나중에
        >
          시나리오 JSON 저장하기
        </button>
      </footer>
    </section>
  );
};
