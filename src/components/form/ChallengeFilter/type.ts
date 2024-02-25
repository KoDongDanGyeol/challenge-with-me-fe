export interface ChallengeFilterTypes {
  state: string[]
  type: string[]
  level: string[]
  past: string[]
  keyword: string
  sort: string
  page: number
}

export const ChallengeFilterOptionGroups = {
  state: [
    {
      label: "상태 선택",
      options: [
        { value: "안 푼 문제", text: "안 푼 문제" },
        { value: "풀고 있는 문제", text: "풀고 있는 문제" },
        { value: "푼 문제", text: "푼 문제" },
      ],
    },
  ],
  type: [
    {
      label: "유형 선택",
      options: [
        { value: "해시", text: "해시" },
        { value: "스택/큐", text: "스택/큐" },
        { value: "힙", text: "힙" },
        { value: "정렬", text: "정렬" },
        { value: "완전탐색", text: "완전탐색" },
        { value: "탐욕법", text: "탐욕법" },
        { value: "동적계획법", text: "동적계획법" },
        { value: "깊이/너비 우선 탐색", text: "깊이/너비 우선 탐색" },
        { value: "이분탐색", text: "이분탐색" },
        { value: "그래프", text: "그래프" },
        { value: "구현", text: "구현" },
      ],
    },
  ],
  level: [
    {
      label: "난이도 선택",
      options: [
        { value: "Lv.0", text: "Lv.0" },
        { value: "Lv.1", text: "Lv.1" },
        { value: "Lv.2", text: "Lv.2" },
        { value: "Lv.3", text: "Lv.3" },
        { value: "Lv.4", text: "Lv.4" },
        { value: "Lv.5", text: "Lv.5" },
      ],
    },
  ],
  sort: [
    {
      label: "정렬 선택",
      options: [
        { value: "latest", text: "최신순" },
        { value: "high", text: "정답률 높은 순" },
        { value: "low", text: "정답률 낮은 순" },
      ],
    },
  ],
}
