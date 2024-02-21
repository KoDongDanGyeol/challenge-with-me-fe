"use client"

import { forwardRef, useMemo } from "react"
import Link from "next/link"
import { useRouter, useSearchParams, useParams } from "next/navigation"
import { useForm } from "react-hook-form"
import styled from "styled-components"
import { PolymorphicComponentPropWithRef, PolymorphicRef } from "@/types/polymorphic"
import PageHeading from "@/components/display/PageHeading"
import SolutionCard from "@/components/display/SolutionCard"
import Notice from "@/components/display/Notice"
import Pagination from "@/components/display/Pagination"
import SolutionFilter, { SolutionFilterTypes, SolutionFilterOptionGroups } from "@/components/form/SolutionFilter"

export type SolutionHomeProps<C extends React.ElementType> = PolymorphicComponentPropWithRef<
  C,
  {
    //
  }
>

export type SolutionHomeComponent = <C extends React.ElementType = "section">(
  props: SolutionHomeProps<C>,
) => React.ReactNode

const response = {
  totalPage: 12,
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
}

const SolutionHome: SolutionHomeComponent = forwardRef(function SolutionHome<C extends React.ElementType = "section">(
  props: SolutionHomeProps<C>,
  ref?: PolymorphicRef<C>,
): React.ReactNode {
  const { asTag, className = "", ...restProps } = props

  const router = useRouter()
  const searchParams = useSearchParams()
  const params = useParams<{ problemId: string }>()

  const filterForm = useForm<SolutionFilterTypes>({
    defaultValues: {
      language:
        SolutionFilterOptionGroups.language
          .flatMap(({ options }) => options)
          .find(({ value }) => searchParams?.get("language") ?? "" === value)?.value ?? "java",
      type:
        SolutionFilterOptionGroups.type
          .flatMap(({ options }) => options)
          .find(({ value }) => searchParams?.get("type") ?? "" === value)?.value ?? "all",
      size: 10,
      page: !isNaN(Number(searchParams?.get("page")))
        ? Math.max(Math.min(Number(searchParams?.get("page") ?? 1), response?.totalPage), 1)
        : 1,
    },
  })

  const isSearched = useMemo(() => {
    if (searchParams?.get("language") !== "java") return true
    if (searchParams?.get("type") !== "all") return true
    if (Number(searchParams?.get("page") ?? 1) > 1) return true
    return false
  }, [searchParams])

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
    router.replace(`/solutions/${params?.problemId}?${newParams?.toString()}`)
  }

  return (
    <SolutionHomeContainer ref={ref} as={asTag ?? "section"} className={`${className}`} {...restProps}>
      {/* SolutionHomeHeading */}
      <SolutionHomeHeading>
        <PageHeading.Breadcrumb>
          {response?.pedigree && (
            <Link href={`/challenges?pedigree=${response?.pedigree?.value}&sort=latest`}>
              <span>{response?.pedigree?.text}</span>
            </Link>
          )}
          {response?.type && (
            <Link href={`/challenges?type=${response?.type?.value}&sort=latest`}>
              <span>{response?.type?.text}</span>
            </Link>
          )}
          <span>{response?.title}</span>
        </PageHeading.Breadcrumb>
        <PageHeading.Title asTag={"h2"}>{response?.title ?? ""}</PageHeading.Title>
      </SolutionHomeHeading>
      {/* SolutionHomeFilter */}
      <SolutionHomeFilter
        formTitle={"전체 풀이"}
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
      {/* SolutionHomeResult */}
      <SolutionHomeResult>
        {response?.solutions?.length ? (
          <>
            <SolutionHomeList>
              {response?.solutions?.map((solution) => (
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
            </SolutionHomeList>
            <Pagination page={filterForm.getValues("page")} totalPage={response?.totalPage} onPaging={onPaging} />
          </>
        ) : isSearched ? (
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
      </SolutionHomeResult>
    </SolutionHomeContainer>
  )
})

const SolutionHomeHeading = styled(PageHeading)`
  /*  */
`

const SolutionHomeFilter = styled(SolutionFilter)`
  /*  */
`

const SolutionHomeList = styled.ul`
  /*  */
`

const SolutionHomeResult = styled.div`
  nav {
    margin-top: 24px;
  }
  @media ${(props) => props.theme.screen.device.md} {
    nav {
      margin-top: 16px;
    }
  }
`

const SolutionHomeContainer = styled.section`
  padding-top: 40px;
  ${SolutionHomeHeading} {
  }
  ${SolutionHomeFilter} {
    margin-top: 24px;
  }
  ${SolutionHomeResult} {
    margin-top: 24px;
  }
  @media ${(props) => props.theme.screen.device.md} {
    padding-top: 24px;
    ${SolutionHomeHeading} {
    }
    ${SolutionHomeFilter} {
      margin-top: 16px;
    }
    ${SolutionHomeResult} {
      margin-top: 16px;
    }
  }
`

export default SolutionHome
