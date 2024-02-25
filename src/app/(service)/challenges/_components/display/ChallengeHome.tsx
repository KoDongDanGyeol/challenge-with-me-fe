"use client"

import { forwardRef, useMemo } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { useQuery } from "@tanstack/react-query"
import styled from "styled-components"
import { PolymorphicComponentPropWithRef, PolymorphicRef } from "@/types/polymorphic"
import { ChallengeListParams, getChallengeList } from "@/app/(service)/challenges/_libs/getChallengeList"
import PageHeading from "@/components/display/PageHeading"
import ChallengeList from "@/components/display/ChallengeList"
import Pagination from "@/components/display/Pagination"
import Notice from "@/components/display/Notice"
import ChallengeFilter, { ChallengeFilterTypes, ChallengeFilterOptionGroups } from "@/components/form/ChallengeFilter"

export type ChallengeHomeProps<C extends React.ElementType> = PolymorphicComponentPropWithRef<
  C,
  {
    searchParams: ChallengeListParams
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
  const { data: challengeListData } = useQuery({
    queryKey: ["challengeList", searchParams],
    queryFn: getChallengeList,
    staleTime: 60 * 1000,
  })

  const memoParams = useMemo(() => {
    const params = new URLSearchParams(searchParams)
    const state =
      ((challengeListData?.content ?? [])?.find((challenge) => challenge?.state) &&
        ChallengeFilterOptionGroups.state
          .flatMap(({ options }) => options)
          .filter(({ value }) => (params?.get("state") ?? "")?.split(",")?.includes(value.toString()))
          .map(({ value }) => value)) ??
      []
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
    const past =
      (challengeListData?.past ?? []).filter((value) =>
        (params?.get("past") ?? "")?.split(",")?.includes(value.toString()),
      ) ?? []
    const keyword = params?.get("keyword") ?? ""
    const sort =
      ChallengeFilterOptionGroups.sort
        .flatMap(({ options }) => options)
        .find(({ value }) => (params?.get("sort") ?? "").split(",")?.includes(value.toString()))?.value ?? "createdAt"
    const page = !isNaN(Number(params?.get("page")))
      ? Math.max(Math.min(Number(params?.get("page") ?? 1), challengeListData?.totalPages ?? 0), 1)
      : 1
    const isSearched = [
      Boolean(state.length),
      Boolean(type.length),
      Boolean(level.length),
      Boolean(past.length),
      Boolean(keyword.length),
      // Boolean(sort !== "createdAt"),
      // Boolean(page > 1),
    ].includes(true)
    return { state, type, level, past, keyword, sort, page, isSearched }
  }, [searchParams, challengeListData?.content, challengeListData?.past, challengeListData?.totalPages])

  const filterForm = useForm<ChallengeFilterTypes>({
    defaultValues: {
      state: memoParams?.state ?? [],
      type: memoParams?.type ?? [],
      level: memoParams?.level ?? [],
      past: memoParams?.past ?? [],
      keyword: memoParams?.keyword ?? "",
      sort: memoParams?.sort ?? "createdAt",
      page: memoParams?.page ?? 1,
    },
  })

  const onPaging = (number: number) => {
    filterForm.setValue("page", number)
    filterForm.handleSubmit(onSubmit)()
  }

  const onSubmit = (data: ChallengeFilterTypes) => {
    const params = new URLSearchParams({
      ...(data?.state?.length ? { state: data?.state?.join(",") } : {}),
      ...(data?.type?.length ? { type: data?.type?.join(",") } : {}),
      ...(data?.level?.length ? { level: data?.level?.join(",") } : {}),
      ...(data?.past?.length ? { past: data?.past?.join(",") } : {}),
      ...(data?.keyword ? { keyword: data?.keyword } : {}),
      ...(data?.sort ? { sort: data?.sort } : {}),
      ...(data?.page > 1 ? { page: data?.page?.toString() } : {}),
    })
    router.replace(`/challenges?${params?.toString()}`)
  }

  return (
    <ChallengeHomeContainer ref={ref} as={asTag ?? "section"} className={`${className}`} {...restProps}>
      {/* ChallengeHomeHeading */}
      <ChallengeHomeHeading>
        <PageHeading.Title asTag="h2">챌린지</PageHeading.Title>
      </ChallengeHomeHeading>
      {/* ChallengeHomeFilter */}
      <ChallengeHomeFilter
        formTitle={memoParams?.isSearched ? `검색된 문제 ${challengeListData?.totalElements ?? 0}개` : `모든 문제`}
        formData={filterForm}
        formPlaceholder={{
          state: "상태",
          type: "유형",
          level: "난이도",
          sort: "정렬",
          past: "기출",
          keyword: "문제 제목, 기출문제 검색",
        }}
        formOptionGroups={{
          state: (challengeListData?.content ?? [])?.find((challenge) => challenge?.state)
            ? ChallengeFilterOptionGroups?.state
            : [] ?? [],
          type: ChallengeFilterOptionGroups?.type ?? [],
          level: ChallengeFilterOptionGroups?.level ?? [],
          sort: ChallengeFilterOptionGroups?.sort ?? [],
          past: [
            { label: "기출 선택", options: (challengeListData?.past ?? []).map((value) => ({ value, text: value })) },
          ],
        }}
        formAction={{
          submit: "검색",
        }}
        handleValid={onSubmit}
      />
      {/* ChallengeHomeResult */}
      <ChallengeHomeResult>
        {(challengeListData?.content ?? [])?.length ? (
          <>
            <ChallengeList data={challengeListData?.content ?? []} />
            <Pagination
              page={filterForm.getValues("page")}
              totalPages={challengeListData?.totalPages ?? 0}
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
