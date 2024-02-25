"use client"

import { forwardRef, useMemo } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { useQuery } from "@tanstack/react-query"
import styled from "styled-components"
import { PolymorphicComponentPropWithRef, PolymorphicRef } from "@/types/polymorphic"
import { ChallengeDetailParams, getChallengeDetail } from "@/app/(challenge)/challenges/_libs/getChallengeDetail"
import {
  ChallengeQuestionListParams,
  ChallengeQuestionListSearchParams,
  getChallengeQuestionList,
} from "@/app/(service)/challenges/_libs/getChallengeQuestionList"
import PageHeading from "@/components/display/PageHeading"
import Pagination from "@/components/display/Pagination"
import Notice from "@/components/display/Notice"
import QuestionList from "@/components/display/QuestionList"
import QuestionFilter, { QuestionFilterTypes, QuestionFilterOptionGroups } from "@/components/form/QuestionFilter"

export type ChallengeQuestionHomeProps<C extends React.ElementType> = PolymorphicComponentPropWithRef<
  C,
  {
    params: ChallengeDetailParams & ChallengeQuestionListParams
    searchParams: ChallengeQuestionListSearchParams
  }
>

export type ChallengeQuestionHomeComponent = <C extends React.ElementType = "section">(
  props: ChallengeQuestionHomeProps<C>,
) => React.ReactNode

const ChallengeQuestionHome: ChallengeQuestionHomeComponent = forwardRef(function ChallengeQuestionHome<
  C extends React.ElementType = "section",
>(props: ChallengeQuestionHomeProps<C>, ref?: PolymorphicRef<C>): React.ReactNode {
  const { asTag, params, searchParams, className = "", ...restProps } = props

  const router = useRouter()

  const { data: challengeDetailData } = useQuery({
    queryKey: ["challengeDetail", params],
    queryFn: getChallengeDetail,
    staleTime: 60 * 1000,
  })

  const { data: challengeQuestionListData } = useQuery({
    queryKey: ["challengeQuestionList", params, searchParams],
    queryFn: getChallengeQuestionList,
    staleTime: 60 * 1000,
  })

  const memoParams = useMemo(() => {
    const params = new URLSearchParams(searchParams)
    const state =
      QuestionFilterOptionGroups.state
        .flatMap(({ options }) => options)
        .find(({ value }) => (params?.get("state") ?? "").split(",")?.includes(value.toString()))?.value ?? "all"
    const keyword = params?.get("keyword") ?? ""
    const sort =
      QuestionFilterOptionGroups.sort
        .flatMap(({ options }) => options)
        .find(({ value }) => (params?.get("sort") ?? "").split(",")?.includes(value.toString()))?.value ?? "latest"
    const page = !isNaN(Number(params?.get("page")))
      ? Math.max(Math.min(Number(params?.get("page") ?? 1), challengeQuestionListData?.totalPages ?? 0), 1)
      : 1
    const isSearched = [
      Boolean(keyword.length),
      // Boolean(state === "all"),
      // Boolean(sort !== "latest"),
      // Boolean(page > 1),
    ].includes(true)
    return { state, keyword, sort, page, isSearched }
  }, [searchParams])

  const filterForm = useForm<QuestionFilterTypes>({
    defaultValues: {
      state: memoParams?.state ?? "all",
      keyword: memoParams?.keyword ?? "",
      sort: memoParams?.sort ?? "latest",
      page: memoParams?.page ?? 1,
    },
  })

  const onPaging = (number: number) => {
    filterForm.setValue("page", number)
    filterForm.handleSubmit(onSubmit)()
  }

  const onSubmit = (data: QuestionFilterTypes) => {
    const newParams = new URLSearchParams({
      ...(data?.state ? { state: data?.state } : {}),
      ...(data?.keyword ? { keyword: data?.keyword } : {}),
      ...(data?.sort ? { sort: data?.sort } : {}),
      ...(data?.page > 1 ? { page: data?.page?.toString() } : {}),
    })
    router.replace(`/challenges/${challengeDetailData?.id ?? 0}/questions?${newParams?.toString()}`)
  }

  return (
    <ChallengeQuestionHomeContainer ref={ref} as={asTag ?? "section"} className={`${className}`} {...restProps}>
      {/* ChallengeQuestionHomeHeading */}
      <ChallengeQuestionHomeHeading>
        <PageHeading.Breadcrumb>
          {challengeDetailData?.past && (
            <Link href={`/challenges?pedigree=${challengeDetailData?.past}&sort=latest`}>
              <span>{challengeDetailData?.past}</span>
            </Link>
          )}
          {challengeDetailData?.type && (
            <Link href={`/challenges?type=${challengeDetailData?.type}&sort=latest`}>
              <span>{challengeDetailData?.type}</span>
            </Link>
          )}
          <Link href={`/challenges/${challengeDetailData?.id ?? 0}`}>
            <span>{challengeDetailData?.title ?? ""}</span>
          </Link>
        </PageHeading.Breadcrumb>
        <PageHeading.Title asTag={"h2"}>{challengeDetailData?.title ?? "" ?? ""}</PageHeading.Title>
      </ChallengeQuestionHomeHeading>
      {/* ChallengeQuestionHomeFilter */}
      <ChallengeQuestionHomeFilter
        formTitle={memoParams?.isSearched ? `검색된 문제 ${challengeQuestionListData?.totalPages ?? 0}개` : `모든 문제`}
        formData={filterForm}
        formPlaceholder={{
          state: "상태",
          sort: "정렬",
          keyword: "문제 제목, 질문 검색",
        }}
        formOptionGroups={{
          state: QuestionFilterOptionGroups?.state ?? [],
          sort: QuestionFilterOptionGroups?.sort ?? [],
        }}
        formAction={{
          submit: "검색",
        }}
        handleValid={onSubmit}
      />
      {/* ChallengeQuestionHomeResult */}
      <ChallengeQuestionHomeResult>
        {challengeQuestionListData?.content?.length ? (
          <>
            <QuestionList data={challengeQuestionListData?.content ?? []} />
            <Pagination
              page={filterForm.getValues("page")}
              totalPages={challengeQuestionListData?.totalPages ?? 0}
              onPaging={onPaging}
            />
          </>
        ) : memoParams && memoParams?.isSearched ? (
          <Notice type="block">
            <Notice.Icon status="success" name="MagnifyingGlass" />
            <Notice.Title>일치하는 질문이 없습니다</Notice.Title>
            <Notice.Description>조건을 변경하시거나 다른 질문을 검색해보세요</Notice.Description>
          </Notice>
        ) : (
          <Notice type="block">
            <Notice.Icon status="success" name="MagnifyingGlass" />
            <Notice.Title>등록된 질문이 없습니다</Notice.Title>
          </Notice>
        )}
      </ChallengeQuestionHomeResult>
    </ChallengeQuestionHomeContainer>
  )
})

const ChallengeQuestionHomeHeading = styled(PageHeading)`
  /*  */
`

const ChallengeQuestionHomeFilter = styled(QuestionFilter)`
  /*  */
`

const ChallengeQuestionHomeResult = styled.div`
  nav {
    margin-top: 24px;
  }
  @media ${(props) => props.theme.screen.device.md} {
    nav {
      margin-top: 16px;
    }
  }
`

const ChallengeQuestionHomeContainer = styled.section`
  padding-top: 40px;
  ${ChallengeQuestionHomeHeading} {
  }
  ${ChallengeQuestionHomeFilter} {
    margin-top: 24px;
  }
  ${ChallengeQuestionHomeResult} {
    margin-top: 24px;
  }
  @media ${(props) => props.theme.screen.device.md} {
    padding-top: 24px;
    ${ChallengeQuestionHomeHeading} {
    }
    ${ChallengeQuestionHomeFilter} {
      margin-top: 16px;
    }
    ${ChallengeQuestionHomeResult} {
      margin-top: 16px;
    }
  }
`

export default ChallengeQuestionHome
