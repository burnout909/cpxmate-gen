// components/scenario-dashboard/initialData.ts
import {
  HistoryEvidenceChecklist,
  PhysicalexamEvidenceChecklist,
  EducationEvidenceChecklist,
  PpiEvidenceChecklist,
  EvidenceChecklist,
} from "@/assets/evidenceChecklist/baseEvidenceChecklist"; // 네가 만든 파일 경로에 맞게 수정

import { ChecklistItemState, ChecklistJson, VirtualPatient } from "@/types/dashboard";

const withChecked = (items: EvidenceChecklist[]): ChecklistItemState[] =>
  items.map((item) => ({ ...item, checked: true })); // 기본은 전부 선택된 상태라고 가정

export const createInitialChecklistJson = (): ChecklistJson => ({
  history: withChecked(HistoryEvidenceChecklist),
  physicalExam: withChecked(PhysicalexamEvidenceChecklist),
  education: withChecked(EducationEvidenceChecklist),
  ppi: withChecked(PpiEvidenceChecklist),
});

// 아주 러프한 기본 시나리오 예시
export const createInitialScenarioJson = (): VirtualPatient => ({
  id: "default_001",
  title: "",
  description: "기본 값으로 생성된 가상환자 시나리오입니다.",
  type: "object",
  required: ["meta", "history", "additional_history", "physical_exam", "questions"],
  properties: {
    meta: {
      chief_complaint: "",
      name: "이춘배",
      mrn: 123456,
      age: 48,
      sex: "남성",
      vitals: {
        bp: "120/60",
        hr: 80,
        rr: 18,
        bt: 36.7,
      },
      attitude: "약간 불안해 보임",
      hybrid_skill: "없음",
    },
  },
  history: {},
  additional_history: {},
  physical_exam: "",
  questions: [],
});
