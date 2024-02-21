export interface QuestionFilterTypes {
  state: string
  sort: string
  keyword: string
  page: number
}

export const QuestionFilterOptionGroups = {
  state: [
    {
      label: "유형 선택",
      options: [
        { value: "all", text: "모든 질문" },
        { value: "my", text: "나의 질문" },
      ],
    },
  ],
  sort: [
    {
      label: "정렬 선택",
      options: [
        { value: "latest", text: "최신순" },
        { value: "high", text: "답변 많은 순" },
        { value: "low", text: "답변 적은 순" },
      ],
    },
  ],
}
