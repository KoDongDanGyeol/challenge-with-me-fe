"use client"

import { forwardRef, useMemo } from "react"
import Link from "next/link"
import { notFound, useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { useQuery } from "@tanstack/react-query"
import styled from "styled-components"
import { PolymorphicComponentPropWithRef, PolymorphicRef } from "@/types/polymorphic"
import { ChallengeDetailParams, getChallengeDetail } from "@/app/(challenge)/challenges/_libs/getChallengeDetail"
import {
  ChallengeSolutionListParams,
  ChallengeSolutionListSearchParams,
  getChallengeSolutionList,
} from "@/app/(service)/challenges/_libs/getChallengeSolutionList"
import PageHeading from "@/components/display/PageHeading"
import SolutionCard from "@/components/display/SolutionCard"
import Notice from "@/components/display/Notice"
import Pagination from "@/components/display/Pagination"
import SolutionFilter, { SolutionFilterTypes, SolutionFilterOptionGroups } from "@/components/form/SolutionFilter"

export type ChallengeSolutionHomeProps<C extends React.ElementType> = PolymorphicComponentPropWithRef<
  C,
  {
    params: ChallengeDetailParams & ChallengeSolutionListParams
    searchParams: ChallengeSolutionListSearchParams
  }
>

export type ChallengeSolutionHomeComponent = <C extends React.ElementType = "section">(
  props: ChallengeSolutionHomeProps<C>,
) => React.ReactNode

const ChallengeSolutionHome: ChallengeSolutionHomeComponent = forwardRef(function ChallengeSolutionHome<
  C extends React.ElementType = "section",
>(props: ChallengeSolutionHomeProps<C>, ref?: PolymorphicRef<C>): React.ReactNode {
  const { asTag, params, searchParams, className = "", ...restProps } = props

  const router = useRouter()

  const { data: challengeDetailData } = useQuery({
    queryKey: ["challengeDetail", params],
    queryFn: getChallengeDetail,
    staleTime: 60 * 1000,
  })

  const { data: challengeSolutionListData } = useQuery({
    queryKey: ["challengeSolutionList", params, searchParams],
    queryFn: getChallengeSolutionList,
    staleTime: 60 * 1000,
  })

  const memoParams = useMemo(() => {
    const params = new URLSearchParams(searchParams)
    const language =
      SolutionFilterOptionGroups.language
        .flatMap(({ options }) => options)
        .find(({ value }) => (params?.get("language") ?? "").split(",")?.includes(value.toString()))?.value ?? "java"
    const type =
      SolutionFilterOptionGroups.type
        .flatMap(({ options }) => options)
        .find(({ value }) => (params?.get("type") ?? "").split(",")?.includes(value.toString()))?.value ?? "all"
    const page = !isNaN(Number(params?.get("page")))
      ? Math.max(Math.min(Number(params?.get("page") ?? 1), challengeSolutionListData?.totalPages ?? 0), 1)
      : 1
    const isSearched = [
      Boolean(language !== "java"),
      // Boolean(type !== "all"),
      // Boolean(page > 1),
    ].includes(true)
    return { language, type, page, isSearched }
  }, [searchParams])

  const filterForm = useForm<SolutionFilterTypes>({
    defaultValues: {
      language: memoParams?.language ?? "java",
      type: memoParams?.type ?? "all",
      size: 5,
      page: memoParams?.page ?? 1,
    },
  })

  const onPaging = (number: number) => {
    filterForm.setValue("page", number)
    filterForm.handleSubmit(onSubmit)()
  }

  // const onLike = (id: number) => {
  //   console.log(id)
  // }

  const onSubmit = (data: SolutionFilterTypes) => {
    const params = new URLSearchParams({
      ...(data?.language ? { language: data?.language } : {}),
      ...(data?.type ? { type: data?.type } : {}),
      ...(data?.page > 1 ? { page: data?.page?.toString() } : {}),
    })
    router.replace(`/challenges/${challengeDetailData?.id ?? 0}/solutions?${params?.toString()}`)
  }

  if (!challengeDetailData || !challengeDetailData?.id) {
    notFound()
  }

  return (
    <ChallengeSolutionHomeContainer ref={ref} as={asTag ?? "section"} className={`${className}`} {...restProps}>
      {/* ChallengeSolutionHomeHeading */}
      <ChallengeSolutionHomeHeading>
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
        <PageHeading.Title asTag={"h2"}>{challengeDetailData?.title ?? ""}</PageHeading.Title>
      </ChallengeSolutionHomeHeading>
      {/* ChallengeSolutionHomeFilter */}
      <ChallengeSolutionHomeFilter
        formTitle={"모든 풀이"}
        formData={filterForm}
        formPlaceholder={{
          language: "언어",
          type: "풀이 유형",
        }}
        formOptionGroups={{
          language: SolutionFilterOptionGroups?.language ?? [],
          type: SolutionFilterOptionGroups?.type ?? [],
        }}
        handleValid={onSubmit}
      />
      {/* ChallengeSolutionHomeResult */}
      <ChallengeSolutionHomeResult>
        {challengeSolutionListData?.content?.length ? (
          <>
            <ChallengeSolutionHomeList>
              {challengeSolutionListData?.content?.map((solution) => (
                <SolutionCard key={solution?.id} asTag="li">
                  <SolutionCard.Profile solution={solution} />
                  <SolutionCard.Content
                    solution={solution}
                    //onLike={onLike}
                  />
                </SolutionCard>
              ))}
            </ChallengeSolutionHomeList>
            <Pagination
              page={filterForm.getValues("page")}
              totalPages={challengeSolutionListData?.totalPages ?? 0}
              onPaging={onPaging}
            />
          </>
        ) : memoParams && memoParams?.isSearched ? (
          <Notice type="block">
            <Notice.Icon status="success" name="MagnifyingGlass" />
            <Notice.Title>일치하는 풀이가 없습니다</Notice.Title>
            <Notice.Description>조건을 변경하시거나 다른 풀이를 검색해보세요</Notice.Description>
          </Notice>
        ) : (
          <Notice type="block">
            <Notice.Icon status="success" name="MagnifyingGlass" />
            <Notice.Title>등록된 풀이가 없습니다</Notice.Title>
          </Notice>
        )}
      </ChallengeSolutionHomeResult>
    </ChallengeSolutionHomeContainer>
  )
})

const ChallengeSolutionHomeHeading = styled(PageHeading)`
  /*  */
`

const ChallengeSolutionHomeFilter = styled(SolutionFilter)`
  /*  */
`

const ChallengeSolutionHomeList = styled.ul`
  /*  */
`

const ChallengeSolutionHomeResult = styled.div`
  nav {
    margin-top: 24px;
  }
  @media ${(props) => props.theme.screen.device.md} {
    nav {
      margin-top: 16px;
    }
  }
`

const ChallengeSolutionHomeContainer = styled.section`
  padding-top: 40px;
  ${ChallengeSolutionHomeHeading} {
  }
  ${ChallengeSolutionHomeFilter} {
    margin-top: 24px;
  }
  ${ChallengeSolutionHomeResult} {
    margin-top: 24px;
  }
  @media ${(props) => props.theme.screen.device.md} {
    padding-top: 24px;
    ${ChallengeSolutionHomeHeading} {
    }
    ${ChallengeSolutionHomeFilter} {
      margin-top: 16px;
    }
    ${ChallengeSolutionHomeResult} {
      margin-top: 16px;
    }
  }
`

export default ChallengeSolutionHome
