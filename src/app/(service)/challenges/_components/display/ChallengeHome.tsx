"use client"

import { forwardRef, useMemo } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import styled from "styled-components"
import { PolymorphicComponentPropWithRef, PolymorphicRef } from "@/types/polymorphic"
import PageHeading from "@/components/display/PageHeading"
import ChallengeList from "@/components/display/ChallengeList"
import Pagination from "@/components/display/Pagination"
import Notice from "@/components/display/Notice"
import ChallengeFilter, { ChallengeFilterTypes, ChallengeFilterOptionGroups } from "@/components/form/ChallengeFilter"

const response = {
  challengeList: {
    totalPage: 12,
    totalCount: 120,
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
    challenges: [
      {
        id: 0,
        state: "unsolved" as const,
        title: "lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        type: "해시",
        level: "Lv. 0",
        pedigree: "2024 KAKAO WINTER INTERNSHIP",
        completeCount: 9,
        correctRate: 0,
      },
      {
        id: 1,
        state: "solving" as const,
        title: "lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        type: "해시",
        level: "Lv. 1",
        pedigree: "2024 KAKAO WINTER INTERNSHIP",
        completeCount: 99,
        correctRate: 3.14159,
      },
      {
        id: 2,
        state: "solved" as const,
        title: "lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        type: "해시",
        level: "Lv. 2",
        pedigree: "2024 KAKAO WINTER INTERNSHIP",
        completeCount: 999,
        correctRate: 50.5,
      },
      {
        id: 3,
        state: "solving" as const,
        title: "lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        type: "해시",
        level: "Lv. 3",
        pedigree: "2024 KAKAO WINTER INTERNSHIP",
        completeCount: 9999,
        correctRate: 3.14159,
      },
      {
        id: 4,
        state: "solved" as const,
        title: "lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        type: "해시",
        level: "Lv. 4",
        pedigree: "2024 KAKAO WINTER INTERNSHIP",
        completeCount: 99999,
        correctRate: 50.5,
      },
      {
        id: 5,
        state: "solved" as const,
        title: "lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        type: "해시",
        level: "Lv. 5",
        pedigree: "2024 KAKAO WINTER INTERNSHIP",
        completeCount: 99999999,
        correctRate: 50.5,
      },
    ],
  },
}

export type ChallengeHomeProps<C extends React.ElementType> = PolymorphicComponentPropWithRef<
  C,
  {
    searchParams: {
      [key in keyof ChallengeFilterTypes]?: string
    }
  }
>

export type ChallengeHomeComponent = <C extends React.ElementType = "section">(
  props: ChallengeHomeProps<C>,
) => React.ReactNode

const ChallengeHome: ChallengeHomeComponent = forwardRef(function ChallengeHome<
  C extends React.ElementType = "section",
>(props: ChallengeHomeProps<C>, ref?: PolymorphicRef<C>): React.ReactNode {
  const { asTag, searchParams, className = "", ...restProps } = props

  const router = useRouter()

  const memoParams = useMemo(() => {
    const params = new URLSearchParams(searchParams)
    const state =
      ChallengeFilterOptionGroups.state
        .flatMap(({ options }) => options)
        .filter(({ value }) => (params?.get("state") ?? "")?.split(",")?.includes(value.toString()))
        .map(({ value }) => value) ?? []
    const type =
      ChallengeFilterOptionGroups.type
        .flatMap(({ options }) => options)
        .filter(({ value }) => (params?.get("type") ?? "")?.split(",")?.includes(value.toString()))
        .map(({ value }) => value) ?? []
    const level =
      ChallengeFilterOptionGroups.level
        .flatMap(({ options }) => options)
        .filter(({ value }) => (params?.get("level") ?? "")?.split(",")?.includes(value.toString()))
        .map(({ value }) => value) ?? []
    const pedigree =
      (response?.challengeList?.pedigree ?? [])
        .flatMap(({ options }) => options)
        .filter(({ value }) => (params?.get("pedigree") ?? "")?.split(",")?.includes(value.toString()))
        .map(({ value }) => value) ?? []
    const keyword = params?.get("keyword") ?? ""
    const sort =
      ChallengeFilterOptionGroups.sort
        .flatMap(({ options }) => options)
        .find(({ value }) => (params?.get("sort") ?? "").split(",")?.includes(value.toString()))?.value ?? "latest"
    const page = !isNaN(Number(params?.get("page")))
      ? Math.max(Math.min(Number(params?.get("page") ?? 1), response?.challengeList?.totalPage), 1)
      : 1
    const isSearched = [
      Boolean(state.length),
      Boolean(type.length),
      Boolean(level.length),
      Boolean(pedigree.length),
      Boolean(keyword.length),
      // Boolean(sort !== "latest"),
      // Boolean(page > 1),
    ].includes(true)
    return { state, type, level, pedigree, keyword, sort, page, isSearched }
  }, [searchParams])

  const filterForm = useForm<ChallengeFilterTypes>({
    defaultValues: {
      state: memoParams?.state ?? [],
      type: memoParams?.type ?? [],
      level: memoParams?.level ?? [],
      pedigree: memoParams?.pedigree ?? [],
      keyword: memoParams?.keyword ?? "",
      sort: memoParams?.sort ?? "latest",
      page: memoParams?.page ?? 1,
    },
  })

  const onPaging = (number: number) => {
    filterForm.setValue("page", number)
    filterForm.handleSubmit(onSubmit)()
  }

  const onSubmit = (data: ChallengeFilterTypes) => {
    const newParams = new URLSearchParams({
      ...(data?.state?.length ? { state: data?.state?.join(",") } : {}),
      ...(data?.type?.length ? { type: data?.type?.join(",") } : {}),
      ...(data?.level?.length ? { level: data?.level?.join(",") } : {}),
      ...(data?.pedigree?.length ? { pedigree: data?.pedigree?.join(",") } : {}),
      ...(data?.keyword ? { keyword: data?.keyword } : {}),
      ...(data?.sort ? { sort: data?.sort } : {}),
      ...(data?.page > 1 ? { page: data?.page?.toString() } : {}),
    })
    router.replace(`/challenges?${newParams?.toString()}`)
  }

  return (
    <ChallengeHomeContainer ref={ref} as={asTag ?? "section"} className={`${className}`} {...restProps}>
      {/* ChallengeHomeHeading */}
      <ChallengeHomeHeading>
        <PageHeading.Title asTag="h2">챌린지</PageHeading.Title>
      </ChallengeHomeHeading>
      {/* ChallengeHomeFilter */}
      <ChallengeHomeFilter
        formTitle={memoParams?.isSearched ? `검색된 문제 ${response?.challengeList?.totalCount}개` : `모든 문제`}
        formData={filterForm}
        formPlaceholder={{
          state: "상태",
          type: "유형",
          level: "난이도",
          sort: "정렬",
          pedigree: "기출",
          keyword: "문제 제목, 기출문제 검색",
        }}
        formOptionGroups={{
          state: ChallengeFilterOptionGroups?.state ?? [],
          type: ChallengeFilterOptionGroups?.type ?? [],
          level: ChallengeFilterOptionGroups?.level ?? [],
          sort: ChallengeFilterOptionGroups?.sort ?? [],
          pedigree: response?.challengeList?.pedigree ?? [],
        }}
        formAction={{
          submit: "검색",
        }}
        handleValid={onSubmit}
      />
      {/* ChallengeHomeResult */}
      <ChallengeHomeResult>
        {response?.challengeList?.challenges?.length ? (
          <>
            <ChallengeList data={response?.challengeList?.challenges ?? []} />
            <Pagination
              page={filterForm.getValues("page")}
              totalPage={response?.challengeList?.totalPage}
              onPaging={onPaging}
            />
          </>
        ) : memoParams && memoParams?.isSearched ? (
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
      </ChallengeHomeResult>
    </ChallengeHomeContainer>
  )
})

const ChallengeHomeHeading = styled(PageHeading)`
  /*  */
`

const ChallengeHomeFilter = styled(ChallengeFilter)`
  /*  */
`

const ChallengeHomeResult = styled.div`
  nav {
    margin-top: 24px;
  }
  @media ${(props) => props.theme.screen.device.md} {
    nav {
      margin-top: 16px;
    }
  }
`

const ChallengeHomeContainer = styled.section`
  padding-top: 40px;
  ${ChallengeHomeHeading} {
  }
  ${ChallengeHomeFilter} {
    margin-top: 24px;
  }
  ${ChallengeHomeResult} {
    margin-top: 24px;
  }
  @media ${(props) => props.theme.screen.device.md} {
    padding-top: 24px;
    ${ChallengeHomeHeading} {
    }
    ${ChallengeHomeFilter} {
      margin-top: 16px;
    }
    ${ChallengeHomeResult} {
      margin-top: 16px;
    }
  }
`

export default ChallengeHome
