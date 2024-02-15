"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import Link from "next/link"
import styled from "styled-components"
import IDE, { IDETypes, IDESolutionResultType, IDESolutionResultStatus } from "@/components/form/IDE"
import PageHeading from "@/components/display/PageHeading"
import Button from "@/components/general/Button"

interface ChallengeDetailProps extends React.HTMLAttributes<HTMLDivElement> {
  //
}

const challenge = {
  guide: `
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
  testcaseType: {
    input: ["int[][]", "int", "int"],
    expected: "int",
  },
  testcaseValue: [
    {
      input: ["[[1,2],[2,3]]", "3", "2"],
      expected: "28",
    },
    {
      input: ["[[4,4,3],[3,2,2],[2,1,0]]", "5", "3"],
      expected: "0",
    },
  ],
  result: {
    resultType: "ready" as IDESolutionResultType,
    resultStatus: "complete" as IDESolutionResultStatus,
    resultGrade: [
      {
        input: ["[[1,2],[2,3]]", "3", "2"],
        expected: "28",
        output: "실행한 결괏값 50이 기댓값 28과 다릅니다.",
        passed: false,
        errorMsg: "lorem...",
      },
      {
        input: ["[[4,4,3],[3,2,2],[2,1,0]]", "5", "3"],
        expected: "0",
        output: "테스트를 통과하였습니다.",
        passed: true,
        errorMsg: "lorem...",
      },
    ],
  },
}

const ChallengeDetail = (props: ChallengeDetailProps) => {
  const { className = "" } = props

  const [structure, setStructure] = useState<{
    mode: "solution" | "testcase"
    language: "java"
  }>({
    mode: "solution",
    language: "java",
  })

  const { control, formState, getValues, setValue, resetField, handleSubmit } = useForm<IDETypes>({
    defaultValues: {
      solution: "",
      testcaseType: challenge.testcaseType,
      testcaseValue: {
        public: challenge.testcaseValue.map(({ input, expected }) => ({ input, expected })),
        userSaved: [],
        userDraft: [],
      },
    },
  })

  const onSubmit = (data: IDETypes) => {
    if (structure.mode === "testcase") {
      if (formState.errors.testcaseValue?.userDraft?.root) return
      setValue("testcaseValue.userSaved", getValues("testcaseValue.userDraft"))
      setStructure((prev) => ({ ...prev, mode: "solution" }))
      return
    }
    console.log(data)
  }

  return (
    <ChallengeDetailContainer onSubmit={handleSubmit(onSubmit)} className={`${className}`}>
      <IDE.Grid gridArea="leading">
        <PageHeading>
          <PageHeading.Breadcrumb>
            <Link href="#">
              <span>기출</span>
            </Link>
            <Link href="#">
              <span>유형</span>
            </Link>
            <span>제목</span>
          </PageHeading.Breadcrumb>
          <PageHeading.Title asTag={"h2"}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus optio id eum totam. Aperiam, saepe
            dignissimos! Maxime cupiditate, nemo aperiam eos eligendi vero quasi quidem labore hic saepe quos ab?
          </PageHeading.Title>
        </PageHeading>
      </IDE.Grid>
      <IDE.Grid gridArea="challenge">
        <IDE.Head>문제 설명</IDE.Head>
        <IDE.Markdown>{challenge.guide}</IDE.Markdown>
      </IDE.Grid>
      {structure.mode === "solution" && (
        <IDE.Grid gridArea="editor">
          <IDE.Head>{`solution.${structure.language}`}</IDE.Head>
          <IDE.SolutionEditor<IDETypes>
            control={control}
            name="solution"
            rules={{}}
            defaultLanguage={structure.language}
          />
        </IDE.Grid>
      )}
      {structure.mode === "testcase" && (
        <IDE.Grid gridArea="editor">
          <IDE.Head>테스트 케이스</IDE.Head>
          <IDE.TestcaseEditor<IDETypes> control={control} name="testcaseValue" testcaseType={challenge.testcaseType} />
        </IDE.Grid>
      )}
      {structure.mode === "solution" && (
        <IDE.Grid gridArea="result">
          <IDE.Head>실행 결과</IDE.Head>
          <IDE.SolutionResult {...challenge.result} />
        </IDE.Grid>
      )}
      {structure.mode === "testcase" && (
        <IDE.Grid gridArea="result">
          <IDE.Head>테스트 케이스 형식</IDE.Head>
          <IDE.TestcaseResult errorMessage={formState.errors.testcaseValue?.userDraft?.root?.message} />
        </IDE.Grid>
      )}
      <IDE.Grid gridArea="trailing">
        <IDE.Control>
          <Link href="#" passHref={true} legacyBehavior={true}>
            <Button asTag="a" shape="square" variants="primary" emphasis="subtle" size="sm">
              질문 (n)
            </Button>
          </Link>
          <Button
            type="button"
            shape="square"
            variants="primary"
            emphasis="subtle"
            size="sm"
            onClick={() => {
              setStructure((prev) => ({
                ...prev,
                mode: prev.mode === "solution" ? "testcase" : "solution",
              }))
            }}
          >
            {structure.mode === "solution" ? "테스트 케이스 추가하기" : "문제로 돌아가기"}
          </Button>
        </IDE.Control>
        {structure.mode === "solution" && (
          <IDE.Control>
            <Button type="button" shape="square" variants="primary" emphasis="subtle" size="sm">
              초기화
            </Button>
            <Button type="button" shape="square" variants="primary" emphasis="subtle" size="sm">
              코드 실행
            </Button>
            <Button type="submit" shape="square" variants="primary" emphasis="bold" size="sm">
              제출 후 채점하기
            </Button>
          </IDE.Control>
        )}
        {structure.mode === "testcase" && (
          <IDE.Control>
            <Button
              type="button"
              shape="square"
              variants="primary"
              emphasis="subtle"
              size="sm"
              onClick={() => {
                resetField("testcaseValue.userDraft")
              }}
            >
              초기화
            </Button>
            <Button type="submit" shape="square" variants="primary" emphasis="bold" size="sm">
              저장 후 문제로 돌아가기
            </Button>
          </IDE.Control>
        )}
      </IDE.Grid>
    </ChallengeDetailContainer>
  )
}

const ChallengeDetailContainer = styled(IDE)`
  margin-top: 24px;
  margin-bottom: 24px;
  height: calc(100vh - 48px);
  @media ${(props) => props.theme.screen.device.md} {
    height: auto;
    margin-top: 16px;
    margin-bottom: 16px;
  }
`

export default ChallengeDetail
