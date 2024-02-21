export interface SolutionFilterTypes {
  language: string
  type: string
  size: number
  page: number
}

export const SolutionFilterOptionGroups = {
  language: [
    {
      label: "언어 선택",
      options: [{ value: "java", text: "java" }],
    },
  ],
  type: [
    {
      label: "풀이 유형 선택",
      options: [
        { value: "all", text: "전체 풀이" },
        { value: "my", text: "나의 풀이" },
      ],
    },
  ],
}
