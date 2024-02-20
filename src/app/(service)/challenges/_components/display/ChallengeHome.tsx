"use client"

import { forwardRef, useMemo } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import styled from "styled-components"
import { PolymorphicComponentPropWithRef, PolymorphicRef } from "@/types/polymorphic"
import PageHeading from "@/components/display/PageHeading"
import ChallengeList from "@/components/display/ChallengeList"
import Pagination from "@/components/display/Pagination"
import Notice from "@/components/display/Notice"
import ChallengeFilter, { ChallengeFilterTypes } from "@/components/form/ChallengeFilter"

const challenges = {
  totalPage: 12,
  challenges: [
    {
      id: 0,
      state: "unsolved" as const,
      title: "lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      type: "해시",
      level: 0,
      pedigree: "2024 KAKAO WINTER INTERNSHIP",
      completeCount: 9,
      correctRate: 0,
    },
    {
      id: 1,
      state: "solving" as const,
      title: "lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      type: "해시",
      level: 1,
      pedigree: "2024 KAKAO WINTER INTERNSHIP",
      completeCount: 99,
      correctRate: 3.14159,
    },
    {
      id: 2,
      state: "solved" as const,
      title: "lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      type: "해시",
      level: 2,
      pedigree: "2024 KAKAO WINTER INTERNSHIP",
      completeCount: 999,
      correctRate: 50.5,
    },
    {
      id: 3,
      state: "solving" as const,
      title: "lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      type: "해시",
      level: 3,
      pedigree: "2024 KAKAO WINTER INTERNSHIP",
      completeCount: 9999,
      correctRate: 3.14159,
    },
    {
      id: 4,
      state: "solved" as const,
      title: "lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      type: "해시",
      level: 4,
      pedigree: "2024 KAKAO WINTER INTERNSHIP",
      completeCount: 99999,
      correctRate: 50.5,
    },
    {
      id: 5,
      state: "solved" as const,
      title: "lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      type: "해시",
      level: 5,
      pedigree: "2024 KAKAO WINTER INTERNSHIP",
      completeCount: 99999999,
      correctRate: 50.5,
    },
  ],
}

export type ChallengeHomeProps<C extends React.ElementType> = PolymorphicComponentPropWithRef<
  C,
  {
    //
  }
>

export type ChallengeHomeComponent = <C extends React.ElementType = "section">(
  props: ChallengeHomeProps<C>,
) => React.ReactNode

const ChallengeHome: ChallengeHomeComponent = forwardRef(function ChallengeHome<
  C extends React.ElementType = "section",
>(props: ChallengeHomeProps<C>, ref?: PolymorphicRef<C>): React.ReactNode {
  const { asTag, className = "", ...restProps } = props

  const router = useRouter()
  const searchParams = useSearchParams()

  const filterForm = useForm<ChallengeFilterTypes>({
    defaultValues: {
      state: searchParams?.get("state")?.split(",") ?? [],
      type: searchParams?.get("type")?.split(",") ?? [],
      level: searchParams?.get("level")?.split(",")?.map(Number) ?? [],
      pedigree: searchParams?.get("pedigree")?.split(",") ?? [],
      keyword: searchParams?.get("keyword") ?? "",
      sort: searchParams?.get("sort") ?? "latest",
      page: Math.max(Math.min(Number(searchParams?.get("page") ?? 1), challenges.totalPage), 1),
    },
  })

  const isSearched = useMemo(() => {
    if ((searchParams?.get("state")?.split(",") ?? []).length) return true
    if ((searchParams?.get("type")?.split(",") ?? []).length) return true
    if ((searchParams?.get("level")?.split(",")?.map(Number) ?? []).length) return true
    if ((searchParams?.get("pedigree")?.split(",") ?? []).length) return true
    if (searchParams?.get("keyword")?.length) return true
    if (Number(searchParams?.get("page") ?? 1) > 1) return true
    return false
  }, [searchParams])

  const onPaging = (number: number) => {
    filterForm.setValue("page", number)
    filterForm.handleSubmit(onSubmit)()
  }

  const onSubmit = (data: ChallengeFilterTypes) => {
    const params = new URLSearchParams({
      ...(data?.state?.length ? { state: data?.state?.join(",") } : {}),
      ...(data?.type?.length ? { type: data?.type?.join(",") } : {}),
      ...(data?.level?.length ? { level: data?.level?.join(",") } : {}),
      ...(data?.pedigree?.length ? { pedigree: data?.pedigree?.join(",") } : {}),
      ...(data?.keyword ? { keyword: data?.keyword } : {}),
      ...(data?.sort ? { sort: data?.sort } : {}),
      ...(data?.page > 1 ? { page: data?.page?.toString() } : {}),
    })
    router.replace(`/challenges?${params?.toString()}`)
  }

  return (
    <ChallengeHomeContainer ref={ref} as={asTag} className={`${className}`} {...restProps}>
      <PageHeading>
        <PageHeading.Title asTag="h2">챌린지</PageHeading.Title>
      </PageHeading>

      <ChallengeFilter
        formTitle={"전체 문제"}
        formData={filterForm}
        formPlaceholder={{
          state: "상태",
          type: "유형",
          keyword: "문제 제목, 기출문제 검색",
        }}
        formOptionGroups={{
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
                { value: "heap", text: "힙(Heap)" },
                { value: "sorting", text: "정렬" },
                { value: "brute-force", text: "완전탐색" },
                { value: "greedy", text: "탐욕법(Greedy)" },
                { value: "dynamic", text: "동적계획법(Dynamic Programming)" },
                { value: "dfs-bfs", text: "깊이/너비 우선 탐색(DFS/BFS)" },
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
                { value: 0, text: "Lv. 0" },
                { value: 1, text: "Lv. 1" },
                { value: 2, text: "Lv. 2" },
                { value: 3, text: "Lv. 3" },
                { value: 4, text: "Lv. 4" },
                { value: 5, text: "Lv. 5" },
              ],
            },
          ],
          pedigree: [
            {
              label: "기출 선택",
              options: [
                { value: "2024-KAKAO-WINTER-INTERNSHIP", text: "2024 KAKAO WINTER INTERNSHIP" },
                { value: "2023-KAKAO-BLIND-RECRUITMENT", text: "2023 KAKAO BLIND RECRUITMENT" },
                { value: "2022-KAKAO-TECH-INTERNSHIP", text: "2022 KAKAO TECH INTERNSHIP" },
                { value: "2022-KAKAO-BLIND-RECRUITMENT", text: "2022 KAKAO BLIND RECRUITMENT" },
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
        }}
        formAction={{
          submit: "검색",
        }}
        handleValid={onSubmit}
      />

      {challenges?.challenges?.length ? (
        <>
          <ChallengeList data={challenges?.challenges ?? []} />
          <Pagination page={filterForm.getValues("page")} totalPage={challenges?.totalPage} onPaging={onPaging} />
        </>
      ) : isSearched ? (
        <Notice type="block">
          <Notice.Icon status="success" name="MagnifyingGlass" />
          <Notice.Title>일치하는 문제가 없습니다</Notice.Title>
          <Notice.Description>조건을 변경하시거나 다른 문제를 검색해보세요</Notice.Description>
        </Notice>
      ) : (
        <Notice type="block">
          <Notice.Icon status="success" name="MagnifyingGlass" />
          <Notice.Title>등록된 문제가 없습니다</Notice.Title>
        </Notice>
      )}
    </ChallengeHomeContainer>
  )
})

const ChallengeHomeContainer = styled.article`
  padding-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  @media ${(props) => props.theme.screen.device.md} {
    padding-top: 24px;
    gap: 16px;
  }
`

export default ChallengeHome
