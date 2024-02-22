"use client"

import { forwardRef, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import styled from "styled-components"
import { PolymorphicComponentPropWithRef, PolymorphicRef } from "@/types/polymorphic"
import PageHeading from "@/components/display/PageHeading"
import PageFilter from "@/components/display/PageFilter"
import QuestionCard from "@/components/display/QuestionCard"
import AnswerCard from "@/components/display/AnswerCard"
import AnswerForm, { AnswerFormTypes } from "@/components/form/AnswerForm"

const response = {
  user: {
    id: 1,
    name: "Lorem ipsum",
  },
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
    id: 0,
    memberId: 1,
    challenge: "같은 숫자는 싫어",
    title: "테스트케이스 4번 실패",
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
    name: "Lorem ipsum",
    imgUrl: "https://source.unsplash.com/random/300x300/?person",
    createdAt: "2024-02-20T11:13:22.281246",
    answerCounts: 2,
    answers: [
      {
        id: 0,
        memberId: 1,
        name: "Lorem ipsum",
        imgUrl: "https://source.unsplash.com/random/300x300/?person",
        createdAt: "2024-02-21T20:51:56",
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
      {
        id: 1,
        memberId: 1,
        name: "Lorem ipsum",
        imgUrl: "https://source.unsplash.com/random/300x300/?person",
        createdAt: "2024-02-21T20:51:56",
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
    ],
  },
}

export type QuestionDetailProps<C extends React.ElementType> = PolymorphicComponentPropWithRef<
  C,
  {
    //
  }
>

export type QuestionDetailComponent = <C extends React.ElementType = "article">(
  props: QuestionDetailProps<C>,
) => React.ReactNode

const QuestionDetail: QuestionDetailComponent = forwardRef(function QuestionDetail<
  C extends React.ElementType = "article",
>(props: QuestionDetailProps<C>, ref?: PolymorphicRef<C>): React.ReactNode {
  const { asTag, className = "", ...restProps } = props

  const router = useRouter()
  const [structure, setStructure] = useState<{ mode: "editable" | "uneditable" }>({
    mode: "uneditable",
  })

  const createForm = useForm<AnswerFormTypes>({
    defaultValues: {
      content: "",
    },
  })

  const editForm = useForm<AnswerFormTypes>({
    defaultValues: {
      id: undefined,
      content: "",
    },
  })

  const onEditQuestion = (id: number) => {
    router.push(`/questions/${id}/edit`)
  }

  const onDeleteQuestion = (id: number) => {
    console.log(id)
  }

  const onCreateAnswer = (data: AnswerFormTypes) => {
    console.log(data)
  }

  const onUpdateAnswer = (data: AnswerFormTypes) => {
    console.log(data)
  }

  const onCancelAnswer = () => {
    setStructure((prev) => ({ ...prev, mode: "uneditable" }))
    editForm.setValue("id", undefined)
    editForm.setValue("content", "")
  }

  const onEditAnswer = (id: number) => {
    editForm.setValue("id", id)
    editForm.setValue("content", response?.questionDetail?.answers?.find((answer) => answer.id === id)?.content ?? "")
    setStructure((prev) => ({ ...prev, mode: "editable" }))
  }

  const onDeleteAnswer = (id: number) => {
    console.log(id)
  }

  return (
    <QuestionDetailContainer ref={ref} as={asTag ?? "article"} className={`${className}`} {...restProps}>
      {/* QuestionDetailHeading */}
      <QuestionDetailHeading>
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
      </QuestionDetailHeading>
      {/* QuestionDetailFilter */}
      <QuestionDetailFilter>
        <PageFilter.Title>{response?.questionDetail?.title}</PageFilter.Title>
      </QuestionDetailFilter>
      {/* QuestionDetailCard */}
      <QuestionDetailCard>
        <QuestionCard.Profile
          cardId={response?.questionDetail?.id}
          imgUrl={response?.questionDetail?.imgUrl}
          name={response?.questionDetail?.name}
          createdAt={response?.questionDetail?.createdAt}
          {...(response?.questionDetail?.memberId === response?.user?.id
            ? {
                onEdit: onEditQuestion,
                onDelete: onDeleteQuestion,
              }
            : {})}
        />
        <QuestionCard.Content cardId={response?.questionDetail?.id} content={response?.questionDetail?.content} />
      </QuestionDetailCard>
      {/* QuestionDetailAnswerTitle */}
      {!!response?.questionDetail?.answerCounts && (
        <QuestionDetailAnswerTitle>
          <PageFilter.Title asTag="h4">답변 {response?.questionDetail?.answerCounts}개</PageFilter.Title>
        </QuestionDetailAnswerTitle>
      )}
      {/* QuestionDetailAnswerList */}
      {!!response?.questionDetail?.answerCounts && (
        <QuestionDetailAnswerList>
          {response?.questionDetail?.answers?.map((answer) => (
            <AnswerCard key={answer?.id} asTag="li">
              <AnswerCard.Profile
                cardId={answer?.id}
                imgUrl={answer?.imgUrl}
                name={answer?.name}
                createdAt={answer?.createdAt}
                {...(answer?.memberId === response?.user?.id
                  ? {
                      onEdit: onEditAnswer,
                      onDelete: onDeleteAnswer,
                    }
                  : {})}
              />
              {structure?.mode === "editable" && editForm.getValues("id") === answer?.id ? (
                <QuestionDetailAnswerForm
                  formData={editForm}
                  formPlaceholder={{ content: "답변을 입력해주세요" }}
                  formAction={{ cancel: "취소", submit: "저장" }}
                  handleValid={onUpdateAnswer}
                  handleCanceled={onCancelAnswer}
                />
              ) : structure?.mode === "uneditable" ? (
                <AnswerCard.Content cardId={answer?.id} content={answer?.content} />
              ) : null}
            </AnswerCard>
          ))}
        </QuestionDetailAnswerList>
      )}
      {/* QuestionDetailAnswerTitle */}
      <QuestionDetailAnswerTitle>
        <PageFilter.Title>답변 쓰기</PageFilter.Title>
      </QuestionDetailAnswerTitle>
      {/* QuestionDetailAnswerForm */}
      <QuestionDetailAnswerForm
        formData={createForm}
        formPlaceholder={{ content: "답변을 입력해주세요" }}
        formAction={{ submit: "등록" }}
        handleValid={onCreateAnswer}
      />
    </QuestionDetailContainer>
  )
})

const QuestionDetailHeading = styled(PageHeading)`
  /*  */
`

const QuestionDetailFilter = styled(PageHeading)`
  /*  */
`

const QuestionDetailCard = styled(QuestionCard)`
  /*  */
`

const QuestionDetailAnswerTitle = styled(PageFilter)`
  /*  */
`

const QuestionDetailAnswerList = styled.ul`
  /*  */
`

const QuestionDetailAnswerForm = styled(AnswerForm)`
  /*  */
`

const QuestionDetailContainer = styled.article`
  padding-top: 40px;
  ${QuestionDetailHeading} {
  }
  ${QuestionDetailFilter} {
    margin-top: 24px;
  }
  ${QuestionDetailCard} {
    margin-top: 24px;
  }
  ${QuestionDetailAnswerTitle} {
    margin-top: 24px;
    padding-top: 24px;
    border-top: 1px solid rgb(var(--color-gray300));
  }
  ${QuestionDetailAnswerList} {
    margin-top: 16px;
  }
  ${QuestionDetailAnswerForm} {
    margin-top: 16px;
  }
  @media ${(props) => props.theme.screen.device.md} {
    padding-top: 24px;
    ${QuestionDetailHeading} {
    }
    ${QuestionDetailFilter} {
      margin-top: 16px;
    }
    ${QuestionDetailCard} {
      margin-top: 16px;
    }
    ${QuestionDetailAnswerTitle} {
      margin-top: 16px;
      padding-top: 16px;
    }
    ${QuestionDetailAnswerList} {
      margin-top: 12px;
    }
    ${QuestionDetailAnswerForm} {
      margin-top: 12px;
    }
  }
`

export default QuestionDetail
