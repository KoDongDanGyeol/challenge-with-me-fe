"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { FieldValues } from "react-hook-form"
import styled from "styled-components"
import PageFilter from "@/components/display/PageFilter"
import Button from "@/components/general/Button"
import Icon from "@/components/general/Icon"
import FormHoc, { FormHocMainProps } from "@/components/entry/FormHoc"
import Input from "@/components/entry/Input"
import Select from "@/components/entry/Select"
import { QuestionFilterTypes } from "@/components/form/QuestionFilter"

export interface QuestionFilterMainProps<T extends FieldValues = QuestionFilterTypes> extends FormHocMainProps<T> {
  //
}

const QuestionFilterMain = FormHoc<QuestionFilterTypes>((props: QuestionFilterMainProps) => {
  const { formTitle, formAction, formData, formPlaceholder, formOptionGroups, handleValid, ...restProps } = props

  const params = useParams<{ problemId?: string }>()
  const { control, handleSubmit } = formData

  return (
    <QuestionFilterMainContainer
      id="question-filter"
      asTag="form"
      onSubmit={handleSubmit(handleValid)}
      noValidate
      {...restProps}
    >
      <PageFilter.Search>
        <Select<QuestionFilterTypes>
          control={control}
          name="state"
          rules={{}}
          multiple={false}
          shape="square"
          title={`${formPlaceholder?.state} 선택`}
          placeholder={formPlaceholder?.state ?? ""}
          optionGroups={formOptionGroups?.state ?? []}
          className="col-select"
          onChange={() => {
            handleSubmit(handleValid)()
          }}
        />
        <Input<QuestionFilterTypes>
          control={control}
          name="keyword"
          rules={{}}
          type="text"
          placeholder={formPlaceholder?.keyword ?? ""}
          appendIcon={
            <button type="submit">
              <Icon name="MagnifyingGlass" aria-hidden={true} />
              <span className="sr-only">{formAction?.submit ?? "검색"}</span>
            </button>
          }
          className="col-input"
        />
      </PageFilter.Search>
      <PageFilter.Title>{formTitle}</PageFilter.Title>
      <PageFilter.Action>
        <Select<QuestionFilterTypes>
          control={control}
          name="sort"
          rules={{}}
          multiple={false}
          shape="plain"
          title={`${formPlaceholder?.sort} 선택`}
          placeholder={formPlaceholder?.sort ?? ""}
          optionGroups={formOptionGroups?.sort ?? []}
          onChange={() => {
            handleSubmit(handleValid)()
          }}
        />
        {params?.problemId && (
          <Link href={`/challenges/${params?.problemId}/questions/create`} passHref={true} legacyBehavior={true}>
            <Button asTag="a" shape="square" variants="primary" emphasis="subtle" size="sm">
              질문하기
            </Button>
          </Link>
        )}
      </PageFilter.Action>
    </QuestionFilterMainContainer>
  )
})

const QuestionFilterMainContainer = styled(PageFilter)`
  .col-select {
    width: auto;
  }
  .col-input {
    width: 240px;
  }
  @media ${(props) => props.theme.screen.device.md} {
    .col-select {
      width: calc(50% - 4px);
    }
    .col-input {
      width: calc(50% - 4px);
    }
  }
`

export default QuestionFilterMain
