"use client"

import { forwardRef, useMemo } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import styled from "styled-components"
import { PolymorphicComponentPropWithRef, PolymorphicRef } from "@/types/polymorphic"
import PageHeading from "@/components/display/PageHeading"
import Pagination from "@/components/display/Pagination"
import Notice from "@/components/display/Notice"
import QuestionList from "@/components/display/QuestionList"
import QuestionFilter, { QuestionFilterTypes, QuestionFilterOptionGroups } from "@/components/form/QuestionFilter"

const response = {
  questionList: {
    totalPage: 12,
    totalCount: 120,
    questions: [
      {
        id: 0,
        challenge: "같은 숫자는 싫어",
        title: "테스트케이스 4번 실패",
        content: "어디가 잘 못 된 걸까요??",
        name: "Lorem ipsum",
        createdAt: "2024-02-20T11:13:22.281246",
        answerCounts: 2,
      },
      {
        id: 1,
        challenge: "같은 숫자는 싫어",
        title: "테스트케이스 10번 실패",
        content: "어디가 잘 못 된 걸까요??",
        name: "Lorem ipsum",
        createdAt: "2024-02-20T11:13:22.281246",
        answerCounts: 2,
      },
    ],
  },
}

export type QuestionHomeProps<C extends React.ElementType> = PolymorphicComponentPropWithRef<
  C,
  {
    //
  }
>

export type QuestionHomeComponent = <C extends React.ElementType = "section">(
  props: QuestionHomeProps<C>,
) => React.ReactNode

const QuestionHome: QuestionHomeComponent = forwardRef(function QuestionHome<C extends React.ElementType = "section">(
  props: QuestionHomeProps<C>,
  ref?: PolymorphicRef<C>,
): React.ReactNode {
  const { asTag, className = "", ...restProps } = props

  const router = useRouter()
  const searchParams = useSearchParams()

  const filterForm = useForm<QuestionFilterTypes>({
    defaultValues: {
      state:
        QuestionFilterOptionGroups.state
          .flatMap(({ options }) => options)
          .find(({ value }) => searchParams?.get("state") ?? "" === value)?.value ?? "all",
      sort:
        QuestionFilterOptionGroups.sort
          .flatMap(({ options }) => options)
          .find(({ value }) => searchParams?.get("sort") ?? "" === value)?.value ?? "latest",
      keyword: searchParams?.get("keyword") ?? "",
      page: !isNaN(Number(searchParams?.get("page")))
        ? Math.max(Math.min(Number(searchParams?.get("page") ?? 1), response?.questionList?.totalCount), 1)
        : 1,
    },
  })

  const isSearched = useMemo(() => {
    if ((searchParams?.get("state") ?? "all") !== "all") return true
    if ((searchParams?.get("keyword") ?? "").length) return true
    // if ((searchParams?.get("sort") ?? "latest") !== "latest") return true
    // if (Number(searchParams?.get("page") ?? 1) > 1) return true
    return false
  }, [searchParams])

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
    router.replace(`/questions?${newParams?.toString()}`)
  }

  return (
    <QuestionHomeContainer ref={ref} as={asTag} className={`${className}`} {...restProps}>
      {/* QuestionHomeHeading */}
      <QuestionHomeHeading>
        <PageHeading.Title asTag="h2">질문/답변</PageHeading.Title>
      </QuestionHomeHeading>
      {/* QuestionHomeFilter */}
      <QuestionHomeFilter
        formTitle={isSearched ? `검색된 문제 ${response?.questionList?.totalCount}개` : `모든 문제`}
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
      {/* QuestionHomeResult */}
      <QuestionHomeResult>
        {response?.questionList?.questions?.length ? (
          <>
            <QuestionList data={response?.questionList?.questions ?? []} />
            <Pagination
              page={filterForm.getValues("page")}
              totalPage={response?.questionList?.totalPage}
              onPaging={onPaging}
            />
          </>
        ) : isSearched ? (
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
      </QuestionHomeResult>
    </QuestionHomeContainer>
  )
})

const QuestionHomeHeading = styled(PageHeading)`
  /*  */
`

const QuestionHomeFilter = styled(QuestionFilter)`
  /*  */
`

const QuestionHomeResult = styled.div`
  nav {
    margin-top: 24px;
  }
  @media ${(props) => props.theme.screen.device.md} {
    nav {
      margin-top: 16px;
    }
  }
`

const QuestionHomeContainer = styled.article`
  padding-top: 40px;
  ${QuestionHomeHeading} {
  }
  ${QuestionHomeFilter} {
    margin-top: 24px;
  }
  ${QuestionHomeResult} {
    margin-top: 24px;
  }
  @media ${(props) => props.theme.screen.device.md} {
    padding-top: 24px;
    ${QuestionHomeHeading} {
    }
    ${QuestionHomeFilter} {
      margin-top: 16px;
    }
    ${QuestionHomeResult} {
      margin-top: 16px;
    }
  }
`

export default QuestionHome
