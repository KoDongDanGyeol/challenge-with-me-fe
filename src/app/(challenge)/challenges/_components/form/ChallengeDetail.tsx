"use client"

import { forwardRef, useState } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { useForm } from "react-hook-form"
import { useMutation, useQuery } from "@tanstack/react-query"
import styled from "styled-components"
import { PolymorphicComponentPropWithRef, PolymorphicRef } from "@/types/polymorphic"
import { ChallengeDetailParams, getChallengeDetail } from "@/app/(challenge)/challenges/_libs/getChallengeDetail"
import { ChallengeTestcaseParams, getChallengeTestcase } from "@/app/(challenge)/challenges/_libs/getChallengeTestcase"
import { ChallengeRunModel, postChallengeRun } from "@/app/(challenge)/challenges/_libs/postChallengeRun"
import { ChallengeSubmitModel, postChallengeSubmit } from "@/app/(challenge)/challenges/_libs/postChallengeSubmit"
import Button from "@/components/general/Button"
import PageHeading from "@/components/display/PageHeading"
import IDE, {
  IDETypes,
  IDESolutionResultType,
  IDESolutionResultStatus,
  IDESolutionInitialValue,
} from "@/components/form/IDE"

export type ChallengeDetailProps<C extends React.ElementType> = PolymorphicComponentPropWithRef<
  C,
  {
    params: ChallengeDetailParams & ChallengeTestcaseParams
  }
>

export type ChallengeDetailComponent = <C extends React.ElementType = "article">(
  props: ChallengeDetailProps<C>,
) => React.ReactNode

const ChallengeDetail: ChallengeDetailComponent = forwardRef(function ChallengeDetail<
  C extends React.ElementType = "article",
>(props: ChallengeDetailProps<C>, ref?: PolymorphicRef<C>): React.ReactNode {
  const { asTag, params, className = "", ...restProps } = props

  const [structure, setStructure] = useState<{
    mode: "solution" | "testcase"
    language: "java"
    resultType: IDESolutionResultType
    resultStatus: IDESolutionResultStatus
    runResult: ChallengeRunModel["runResult"]
    submitResult: ChallengeRunModel["submitResult"]
  }>({
    mode: "solution",
    language: "java",
    resultType: "ready",
    resultStatus: "complete",
    runResult: [],
    submitResult: [],
  })

  const { data: challengeDetailData } = useQuery({
    queryKey: ["challengeDetail", params],
    queryFn: getChallengeDetail,
    staleTime: 60 * 1000,
  })

  const { data: challengeTestcaseData } = useQuery({
    queryKey: ["challengeTestcase", params],
    queryFn: getChallengeTestcase,
    staleTime: 60 * 1000,
  })

  const { control, formState, getValues, setValue, resetField, watch, handleSubmit } = useForm<IDETypes>({
    defaultValues: {
      id: challengeDetailData?.id ?? 0,
      solution: IDESolutionInitialValue[structure?.language] ?? "",
      testcaseTypes: {
        input: challengeTestcaseData?.testcaseTypes?.input ?? [],
        expected: challengeTestcaseData?.testcaseTypes?.expected ?? "",
      },
      testcaseValues: {
        public: challengeTestcaseData?.testcaseValues ?? [],
        userSaved: [],
        userDraft: [],
      },
    },
  })

  const mutationRun = useMutation<Response, unknown, IDETypes>({
    mutationFn: (variables) => {
      setStructure((prev) => ({
        ...prev,
        resultType: "run",
        resultStatus: "wait",
        runResult: (challengeTestcaseData?.testcaseValues ?? [])?.map(({ input, expected }) => ({
          input,
          expected,
        })),
        submitResult: [],
      }))
      return postChallengeRun(variables)
    },
    onSuccess: async (response) => {
      const data: ChallengeRunModel = await response.json()
      setStructure((prev) => ({
        ...prev,
        resultType: "run",
        resultStatus: "complete",
        runResult: data?.runResult ?? [],
        submitResult: data?.submitResult ?? [],
      }))
    },
    onError: (error) => {
      console.error(error)
      setStructure((prev) => ({
        ...prev,
        resultType: "run",
        resultStatus: "complete",
        runResult: [],
        submitResult: [],
      }))
    },
  })

  const mutationSubmit = useMutation<Response, unknown, IDETypes>({
    mutationFn: (variables) => {
      setStructure((prev) => ({
        ...prev,
        resultType: "submit",
        resultStatus: "wait",
        runResult: (challengeTestcaseData?.testcaseValues ?? [])?.map(({ input, expected }) => ({
          input,
          expected,
        })),
        submitResult: [...Array(challengeDetailData?.testcases?.[0]?.hiddenTestcaseCount ?? 0)].map(() => ({
          accuracyTest: "",
        })),
      }))
      return postChallengeSubmit(variables)
    },
    onSuccess: async (response) => {
      const data: ChallengeSubmitModel = await response.json()
      setStructure((prev) => ({
        ...prev,
        resultType: "submit",
        resultStatus: "complete",
        runResult: data?.runResult ?? [],
        submitResult: data?.submitResult ?? [],
      }))
    },
    onError: (error) => {
      console.error(error)
      setStructure((prev) => ({
        ...prev,
        resultType: "submit",
        resultStatus: "complete",
        runResult: [],
        submitResult: [],
      }))
    },
  })

  const onSubmit = (data: IDETypes) => {
    if (structure.mode === "testcase") {
      if (formState.errors.testcaseValues?.userDraft?.root) return
      setValue("testcaseValues.userSaved", getValues("testcaseValues.userDraft"))
      setStructure((prev) => ({ ...prev, mode: "solution" }))
      return
    }
    mutationSubmit.mutate(data)
  }

  if (!challengeDetailData || !challengeDetailData?.id) {
    notFound()
  }

  return (
    <ChallengeDetailContainer ref={ref} as={asTag ?? "article"} className={`${className}`} {...restProps}>
      {/* ChallengeDetailIDE */}
      <ChallengeDetailIDE onSubmit={handleSubmit(onSubmit)}>
        <IDE.Grid gridArea="leading">
          <PageHeading>
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
              <span>{challengeDetailData?.title ?? ""}</span>
            </PageHeading.Breadcrumb>
            <PageHeading.Title asTag={"h2"}>{challengeDetailData?.title ?? ""}</PageHeading.Title>
          </PageHeading>
        </IDE.Grid>
        <IDE.Grid gridArea="challenge">
          <IDE.Head>문제 설명</IDE.Head>
          <IDE.Markdown>{challengeDetailData?.description ?? ""}</IDE.Markdown>
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
            <IDE.TestcaseEditor<IDETypes>
              control={control}
              name="testcaseValues"
              testcaseTypes={{
                input: challengeTestcaseData?.testcaseTypes?.input ?? [],
                expected: challengeTestcaseData?.testcaseTypes?.expected ?? "",
              }}
            />
          </IDE.Grid>
        )}
        {structure.mode === "solution" && (
          <IDE.Grid gridArea="result">
            <IDE.Head>실행 결과</IDE.Head>
            <IDE.SolutionResult
              resultType={structure.resultType}
              resultStatus={structure.resultStatus}
              runResult={structure.runResult}
              submitResult={structure.submitResult}
            />
          </IDE.Grid>
        )}
        {structure.mode === "testcase" && (
          <IDE.Grid gridArea="result">
            <IDE.Head>테스트 케이스 형식</IDE.Head>
            <IDE.TestcaseResult errorMessage={formState.errors.testcaseValues?.userDraft?.root?.message} />
          </IDE.Grid>
        )}
        <IDE.Grid gridArea="trailing">
          <IDE.Control>
            <Link href={`/challenges/${challengeDetailData?.id ?? 0}/questions`} passHref={true} legacyBehavior={true}>
              <Button asTag="a" shape="square" variants="primary" emphasis="subtle" size="sm">
                {`질문${challengeDetailData?.questionsCount ? ` (${challengeDetailData?.questionsCount})` : ``}`}
              </Button>
            </Link>
            <Button
              type="button"
              shape="square"
              variants="primary"
              emphasis="subtle"
              size="sm"
              disabled={structure.resultStatus === "wait"}
              onClick={() => {
                setValue("testcaseValues.userDraft", getValues("testcaseValues.userSaved"))
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
              {(!Object.prototype.hasOwnProperty.call(challengeDetailData, "isSuccessSoluction") ||
                challengeDetailData?.isSuccessSoluction) && (
                <Link
                  href={`/challenges/${challengeDetailData?.id ?? 0}/solutions`}
                  passHref={true}
                  legacyBehavior={true}
                >
                  <Button asTag="a" shape="square" variants="primary" emphasis="subtle" size="sm">
                    풀이
                  </Button>
                </Link>
              )}
              <Button
                type="button"
                shape="square"
                variants="primary"
                emphasis="subtle"
                size="sm"
                disabled={structure.resultStatus === "wait"}
                onClick={() => {
                  setStructure((prev) => ({
                    ...prev,
                    resultType: "ready",
                    resultStatus: "complete",
                    runResult: [],
                    submitResult: [],
                  }))
                  setValue("solution", IDESolutionInitialValue[structure?.language] ?? "")
                }}
              >
                초기화
              </Button>
              <Button
                type="button"
                shape="square"
                variants="primary"
                emphasis="subtle"
                size="sm"
                disabled={structure.resultStatus === "wait"}
                onClick={() => mutationRun.mutate(watch())}
              >
                코드 실행
              </Button>
              <Button
                type="submit"
                shape="square"
                variants="primary"
                emphasis="bold"
                size="sm"
                disabled={structure.resultStatus === "wait"}
              >
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
                  resetField("testcaseValues.userDraft")
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
      </ChallengeDetailIDE>
    </ChallengeDetailContainer>
  )
})

const ChallengeDetailIDE = styled(IDE)`
  height: calc(100vh - 48px);
  @media ${(props) => props.theme.screen.device.md} {
    height: auto;
  }
`

const ChallengeDetailContainer = styled.article`
  max-width: 100% !important;
  padding-top: 24px;
  padding-bottom: 24px;
  @media ${(props) => props.theme.screen.device.md} {
    padding-top: 16px;
    padding-bottom: 16px;
  }
`

export default ChallengeDetail
