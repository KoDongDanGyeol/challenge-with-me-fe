"use client"

import { forwardRef } from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import styled from "styled-components"
import { PolymorphicComponentPropWithRef, PolymorphicRef } from "@/types/polymorphic"
import PageHeading from "@/components/display/PageHeading"
import PageFilter from "@/components/display/PageFilter"
import QuestionForm, { QuestionFormTypes } from "@/components/form/QuestionForm"

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
}

export type ChallengeQuestionCreateProps<C extends React.ElementType> = PolymorphicComponentPropWithRef<
  C,
  {
    //
  }
>

export type ChallengeQuestionCreateComponent = <C extends React.ElementType = "section">(
  props: ChallengeQuestionCreateProps<C>,
) => React.ReactNode

const ChallengeQuestionCreate: ChallengeQuestionCreateComponent = forwardRef(function ChallengeQuestionCreate<
  C extends React.ElementType = "section",
>(props: ChallengeQuestionCreateProps<C>, ref?: PolymorphicRef<C>): React.ReactNode {
  const { asTag, className = "", ...restProps } = props

  const createForm = useForm<QuestionFormTypes>({
    defaultValues: {
      title: "",
      content: "",
    },
  })

  const onSubmit = (data: QuestionFormTypes) => {
    console.log(data)
  }

  return (
    <ChallengeQuestionCreateContainer ref={ref} as={asTag ?? "section"} className={`${className}`} {...restProps}>
      {/* ChallengeQuestionCreateHeading */}
      <ChallengeQuestionCreateHeading>
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
      </ChallengeQuestionCreateHeading>
      {/* ChallengeQuestionHomeFilter */}
      <ChallengeQuestionHomeFilter>
        <PageFilter.Title asTag="h3">질문하기</PageFilter.Title>
      </ChallengeQuestionHomeFilter>
      {/* ChallengeQuestionHomeForm */}
      <ChallengeQuestionHomeForm
        formData={createForm}
        formAction={{
          submit: "등록",
          back: "취소",
        }}
        formPlaceholder={{
          title: "",
          content:
            "문제와 관련된 질문을 구체적으로 작성해 주세요.\n타인에 대한 비방이나 욕설, 광고, 정답 공개 등 게시판의 목적과 관련 없는 내용은 삭제될 수 있습니다.",
        }}
        handleValid={onSubmit}
      />
    </ChallengeQuestionCreateContainer>
  )
})

const ChallengeQuestionCreateHeading = styled(PageHeading)`
  /*  */
`

const ChallengeQuestionHomeFilter = styled(PageFilter)`
  /*  */
`

const ChallengeQuestionHomeForm = styled(QuestionForm)`
  /*  */
`

const ChallengeQuestionCreateContainer = styled.section`
  padding-top: 40px;
  ${ChallengeQuestionCreateHeading} {
  }
  ${ChallengeQuestionHomeFilter} {
    margin-top: 24px;
  }
  ${ChallengeQuestionHomeForm} {
    margin-top: 24px;
  }
  @media ${(props) => props.theme.screen.device.md} {
    padding-top: 24px;
    ${ChallengeQuestionCreateHeading} {
    }
    ${ChallengeQuestionHomeFilter} {
      margin-top: 16px;
    }
    ${ChallengeQuestionHomeForm} {
      margin-top: 16px;
    }
  }
`

export default ChallengeQuestionCreate
