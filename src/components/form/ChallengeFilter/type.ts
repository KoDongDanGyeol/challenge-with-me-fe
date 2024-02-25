export interface ChallengeFilterTypes {
  state: string[]
  type: string[]
  level: string[]
  pedigree: string[]
  keyword: string
  sort: string
  page: number
}

export const ChallengeFilterOptionGroups = {
  state: [
    {
      label: "상태 선택",
      options: [
        { value: "unsolved", text: "안 푼 문제" },
        { value: "solving", text: "풀고 있는 문제" },
        { value: "solved", text: "푼 문제" },
      ],
    },
  ],
  type: [
    {
      label: "유형 선택",
      options: [
        { value: "hash", text: "해시" },
        { value: "stack-queue", text: "스택/큐" },
        { value: "heap", text: "힙" },
        { value: "sorting", text: "정렬" },
        { value: "brute-force", text: "완전탐색" },
        { value: "greedy", text: "탐욕법" },
        { value: "dynamic", text: "동적계획법" },
        { value: "dfs-bfs", text: "깊이/너비 우선 탐색" },
        { value: "binary-search", text: "이분탐색" },
        { value: "graph", text: "그래프" },
        { value: "implement", text: "구현" },
      ],
    },
  ],
  level: [
    {
      label: "난이도 선택",
      options: [
        { value: "Lv. 0", text: "Lv. 0" },
        { value: "Lv. 1", text: "Lv. 1" },
        { value: "Lv. 2", text: "Lv. 2" },
        { value: "Lv. 3", text: "Lv. 3" },
        { value: "Lv. 4", text: "Lv. 4" },
        { value: "Lv. 5", text: "Lv. 5" },
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
