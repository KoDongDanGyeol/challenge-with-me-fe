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
  questionDetail: {
    id: 1,
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    content: `
  # Heading 1
  ## Heading 2
  ### Heading 3
  #### Heading 4
  ##### Heading 5
  ###### Heading 6
  
  **Bold** or __Bold__
  
  *Italic* or _Italic_
  
  ~Cancel~ or ~~Cancel~~
  
  [Link Text](http://www.google.com/)
  
  ![Alt Text]()
  
  - ul>li 1
  - ul>li 2
      - ul>li 2-1
      - ul>li 2-2
          - ul>li 3-1
          - ul>li 3-2
  
  1. ol>li 1
  2. ol>li 2
      1. ol>li 2-1
      2. ol>li 2-2
  
  * [ ] Task
  * [x] Checked
  
  > Blockquotes
  
  | th 1 | th 2 |
  | ------ | ------ |
  | td 1   | td 2   |
  
  | a | b  |  c |  d  |
  | - | :- | -: | :-: |
  | lorem   | lorem   | lorem   | lorem   |
  
  Lorem \`ipsum\` dolor
  
  ~~~java
  import java.util.Scanner;
  
  public class Solution {
    public static void main(String[] args) {
      Scanner sc = new Scanner(System.in);
      String a = sc.next();
    }
  }
  ~~~
  
  \`\`\`java
  import java.util.Scanner;
  
  public class Solution {
    public static void main(String[] args) {
      Scanner sc = new Scanner(System.in);
      String a = sc.next();
    }
  }
  \`\`\`
  
  ---
  
  ***
  
  # XSS Attack Vectors
  
  ## Potential Exploits
  
  - Exploit 1: [malicious payload](javascript:alert("hi%20there"))
  - Exploit 2: <a>hello</a>
  - Exploit 3: <script>alert('Exploit 3')</script>
  - Exploit 4: <a href="\x01javascript:javascript:alert(1)">test</a>
  - Exploit 5: [![owasp]()](javascript:javascript:alert("Exploit%205"))
  - Exploit 6: [__bold exploit__](javascript:javascript:alert("Exploit%206"))
  - Exploit 7: [*italic exploit*](javascript:javascript:alert("Exploit%207"))
  - Exploit 8: [really anything](javascript:javascript:alert("Exploit%208"))
  - Exploit 9: [really anything - single](javascript:alert("Exploit%209"))
  - Exploit 10: <a href="javascript:alert("Hello")">Hello!</a>
  
  ## Working Exploits
  
  - None!
  
  ## Other
  
  - This is a [real link to Google](https://google.com).
  
  ---
  
  Here is a simple footnote[^1]. With some additional text after it.
  
  [^1]: My reference.
    `,
  },
}

export type QuestionEditProps<C extends React.ElementType> = PolymorphicComponentPropWithRef<
  C,
  {
    //
  }
>

export type QuestionEditComponent = <C extends React.ElementType = "section">(
  props: QuestionEditProps<C>,
) => React.ReactNode

const QuestionEdit: QuestionEditComponent = forwardRef(function QuestionEdit<C extends React.ElementType = "section">(
  props: QuestionEditProps<C>,
  ref?: PolymorphicRef<C>,
): React.ReactNode {
  const { asTag, className = "", ...restProps } = props

  const createForm = useForm<QuestionFormTypes>({
    defaultValues: {
      title: response?.questionDetail?.title,
      content: response?.questionDetail?.content,
    },
  })

  const onSubmit = (data: QuestionFormTypes) => {
    console.log(data)
  }

  return (
    <QuestionEditContainer ref={ref} as={asTag ?? "section"} className={`${className}`} {...restProps}>
      {/* QuestionEditHeading */}
      <QuestionEditHeading>
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
      </QuestionEditHeading>
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
      >
        {/*  */}
      </ChallengeQuestionHomeForm>
    </QuestionEditContainer>
  )
})

const QuestionEditHeading = styled(PageHeading)`
  /*  */
`

const ChallengeQuestionHomeFilter = styled(PageFilter)`
  /*  */
`

const ChallengeQuestionHomeForm = styled(QuestionForm)`
  /*  */
`

const QuestionEditContainer = styled.section`
  padding-top: 40px;
  ${QuestionEditHeading} {
  }
  ${ChallengeQuestionHomeFilter} {
    margin-top: 24px;
  }
  ${ChallengeQuestionHomeForm} {
    margin-top: 24px;
  }
  @media ${(props) => props.theme.screen.device.md} {
    padding-top: 24px;
    ${QuestionEditHeading} {
    }
    ${ChallengeQuestionHomeFilter} {
      margin-top: 16px;
    }
    ${ChallengeQuestionHomeForm} {
      margin-top: 16px;
    }
  }
`

export default QuestionEdit
