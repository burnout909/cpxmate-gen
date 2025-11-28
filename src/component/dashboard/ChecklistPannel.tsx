// components/scenario-dashboard/ChecklistLinkModule.tsx
"use client";

import { ChecklistItemState, ChecklistJson } from "@/types/dashboard";
import React from "react";

interface ChecklistLinkModuleProps {
  checklistJson: ChecklistJson;
  onChange: (next: ChecklistJson) => void;
}

const sectionTitleClass =
  "text-sm font-semibold text-[#210535] mb-2 mt-4 first:mt-0 border-b border-[#E0DAFA] pb-1";

const rowBase =
  "grid grid-cols-[64px,1fr,24px] items-start gap-2 px-2 py-1.5 rounded-lg hover:bg-[#F7F4FF]";

const checklistLabelClass = "text-xs font-medium text-[#4A3C85]";
const checklistCriteriaClass = "text-[11px] text-[#6F659C]";
const checklistExampleClass = "text-[11px] text-[#9A8FD4]";

const renderSection = (
  title: string,
  items: ChecklistItemState[],
  onToggle: (id: string) => void
) => (
  <div>
    <h3 className={sectionTitleClass}>{title}</h3>
    <div className="space-y-1">
      {items.map((item) => (
        <label key={item.id} className={rowBase}>
          <span className={`${checklistLabelClass} mt-[2px]`}>{item.id}</span>
          <div>
            <div className="text-xs font-semibold text-[#210535] mb-0.5">
              {item.title}
            </div>
            <div className={checklistCriteriaClass}>{item.criteria}</div>
            {/* {item.example?.length > 0 && (
              <div className={checklistExampleClass}>
                예시: {item.example[0]}
                {item.example.length > 1 && " 외 ..."}
              </div>
            )} */}
          </div>
          <input
            type="checkbox"
            className="mt-1 h-4 w-4 rounded border-[#C6BDF7] text-[#8A78FF] focus:ring-[#8A78FF]"
            checked={item.checked}
            onChange={() => onToggle(item.id)}
          />
        </label>
      ))}
    </div>
  </div>
);

export const ChecklistPannel: React.FC<ChecklistLinkModuleProps> = ({
  checklistJson,
  onChange,
}) => {
  const toggleInSection = (
    sectionKey: keyof ChecklistJson,
    id: string
  ) => {
    const section = checklistJson[sectionKey];
    const updated = section.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );

    onChange({
      ...checklistJson,
      [sectionKey]: updated,
    });
  };

  return (
    <section className="flex flex-col h-full rounded-2xl border border-[#D8D2F5] bg-white shadow-sm">
      {/* 헤더 */}
      <header className="border-b border-[#D8D2F5] px-4 py-3">
        <h2 className="text-lg font-semibold text-[#210535]">ChecklistLinkModule</h2>
        <p className="text-xs text-[#7D72B1] mt-1">
          병력청취 / 신체진찰 / 환자교육 / 환자-의사관계 체크리스트를 시나리오에 링크하는 영역
        </p>
      </header>

      {/* 내용 */}
      <div className="flex-1 overflow-y-auto px-4 py-3 text-sm">
        {renderSection("병력 청취 (History)", checklistJson.history, (id) =>
          toggleInSection("history", id)
        )}
        {renderSection(
          "신체 진찰 (Physical Exam)",
          checklistJson.physicalExam,
          (id) => toggleInSection("physicalExam", id)
        )}
        {renderSection("환자 교육 (Education)", checklistJson.education, (id) =>
          toggleInSection("education", id)
        )}
        {renderSection("환자-의사관계 (PPI)", checklistJson.ppi, (id) =>
          toggleInSection("ppi", id)
        )}
      </div>

      {/* 하단 - 저장 */}
      <footer className="border-t border-[#D8D2F5] px-4 py-3 flex justify-end">
        <button
          type="button"
          className="rounded-xl bg-[#C3B5FF] text-white text-sm font-semibold px-4 py-2"
          // TODO: checklistJson을 JSON 파일로 저장하거나 서버로 보내는 로직 연결
        >
          Checklist JSON 저장하기
        </button>
      </footer>
    </section>
  );
};
