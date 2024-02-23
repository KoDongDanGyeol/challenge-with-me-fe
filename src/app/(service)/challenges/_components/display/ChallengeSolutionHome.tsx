"use client"

import { forwardRef, useMemo } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import styled from "styled-components"
import { PolymorphicComponentPropWithRef, PolymorphicRef } from "@/types/polymorphic"
import PageHeading from "@/components/display/PageHeading"
import SolutionCard from "@/components/display/SolutionCard"
import Notice from "@/components/display/Notice"
import Pagination from "@/components/display/Pagination"
import SolutionFilter, { SolutionFilterTypes, SolutionFilterOptionGroups } from "@/components/form/SolutionFilter"

export type ChallengeSolutionHomeProps<C extends React.ElementType> = PolymorphicComponentPropWithRef<
  C,
  {
    searchParams: {
      [key in keyof SolutionFilterTypes]?: string
    }
  }
>

export type ChallengeSolutionHomeComponent = <C extends React.ElementType = "section">(
  props: ChallengeSolutionHomeProps<C>,
) => React.ReactNode

const response = {
  challengeDetail: {
    id: 1,
    pedigree: {
      value: "2024-KAKAO-WINTER-INTERNSHIP",
      text: "2024 KAKAO WINTER INTERNSHIP",
    },
    type: {
      value: "hash",
      text: "해시",
    },
    title: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus optio id eum totam.
      Aperiam, saepe dignissimos! Maxime cupiditate, nemo aperiam eos eligendi vero quasi quidem labore hic saepe quos ab?
    `,
  },
  solutionList: {
    totalPage: 12,
    totalCount: 120,
    solutions: [
      {
        id: 0,
        name: "Lorem ipsum",
        imgUrl: "https://source.unsplash.com/random/300x300/?person",
        isLiked: true,
        language: "java",
        submitCode: `
import java.util.Scanner;

public class Solution {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    String a = sc.next();
  }
}`,
      },
      {
        id: 1,
        name: "Dolor sit",
        imgUrl: "",
        isLiked: false,
        language: "java",
        submitCode: `
import java.util.Scanner;

public class Solution {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    String a = sc.next();
  }
}`,
      },
    ],
  },
}

const ChallengeSolutionHome: ChallengeSolutionHomeComponent = forwardRef(function ChallengeSolutionHome<
  C extends React.ElementType = "section",
>(props: ChallengeSolutionHomeProps<C>, ref?: PolymorphicRef<C>): React.ReactNode {
  const { asTag, searchParams, className = "", ...restProps } = props

  const router = useRouter()

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
      ? Math.max(Math.min(Number(params?.get("page") ?? 1), response?.solutionList?.totalPage), 1)
      : 1
    const isSearched = [
      Boolean(language !== "java"),
      Boolean(type !== "all"),
      // Boolean(page > 1),
    ].includes(true)
    return { language, type, page, isSearched }
  }, [searchParams])

  const filterForm = useForm<SolutionFilterTypes>({
    defaultValues: {
      language: memoParams?.language ?? "java",
      type: memoParams?.type ?? "all",
      size: 10,
      page: memoParams?.page ?? 1,
    },
  })

  const onPaging = (number: number) => {
    filterForm.setValue("page", number)
    filterForm.handleSubmit(onSubmit)()
  }

  const onLike = (id: number) => {
    console.log(id)
  }

  const onSubmit = (data: SolutionFilterTypes) => {
    const newParams = new URLSearchParams({
      ...(data?.language ? { language: data?.language } : {}),
      ...(data?.type ? { type: data?.type } : {}),
      ...(data?.page > 1 ? { page: data?.page?.toString() } : {}),
    })
    router.replace(`/challenges/${response?.challengeDetail?.id}/solutions?${newParams?.toString()}`)
  }

  return (
    <ChallengeSolutionHomeContainer ref={ref} as={asTag ?? "section"} className={`${className}`} {...restProps}>
      {/* ChallengeSolutionHomeHeading */}
      <ChallengeSolutionHomeHeading>
        <PageHeading.Breadcrumb>
          {response?.challengeDetail?.pedigree && (
            <Link href={`/challenges?pedigree=${response?.challengeDetail?.pedigree?.value}&sort=latest`}>
              <span>{response?.challengeDetail?.pedigree?.text}</span>
            </Link>
          )}
          {response?.challengeDetail?.type && (
            <Link href={`/challenges?type=${response?.challengeDetail?.type?.value}&sort=latest`}>
              <span>{response?.challengeDetail?.type?.text}</span>
            </Link>
          )}
          <Link href={`/challenges/${response?.challengeDetail?.id}`}>
            <span>{response?.challengeDetail?.title}</span>
          </Link>
        </PageHeading.Breadcrumb>
        <PageHeading.Title asTag={"h2"}>{response?.challengeDetail?.title ?? ""}</PageHeading.Title>
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
        {response?.solutionList?.solutions?.length ? (
          <>
            <ChallengeSolutionHomeList>
              {response?.solutionList?.solutions?.map((solution) => (
                <SolutionCard key={solution?.id} asTag="li">
                  <SolutionCard.Profile
                    cardId={solution?.id}
                    imgUrl={solution?.imgUrl}
                    name={solution?.name}
                    language={solution?.language}
                  />
                  <SolutionCard.Content
                    cardId={solution?.id}
                    language={solution?.language}
                    submitCode={solution?.submitCode}
                    isLiked={solution?.isLiked}
                    onLike={onLike}
                  />
                </SolutionCard>
              ))}
            </ChallengeSolutionHomeList>
            <Pagination
              page={filterForm.getValues("page")}
              totalPage={response?.solutionList?.totalPage}
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
