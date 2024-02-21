"use client"

import { FieldValues } from "react-hook-form"
import styled from "styled-components"
import PageFilter from "@/components/display/PageFilter"
import FormHoc, { FormHocMainProps } from "@/components/entry/FormHoc"
import Select from "@/components/entry/Select"
import { SolutionFilterTypes } from "@/components/form/SolutionFilter"

export interface SolutionFilterMainProps<T extends FieldValues = SolutionFilterTypes> extends FormHocMainProps<T> {
  //
}

const SolutionFilterMain = FormHoc<SolutionFilterTypes>((props: SolutionFilterMainProps) => {
  const { formTitle, formAction, formData, formPlaceholder, formOptionGroups, handleValid, ...restProps } = props

  const { control, handleSubmit } = formData

  return (
    <SolutionFilterMainContainer
      id="solution-filter"
      asTag="form"
      onSubmit={handleSubmit(handleValid)}
      noValidate
      {...restProps}
    >
      <PageFilter.Title>{formTitle}</PageFilter.Title>
      <PageFilter.Action>
        <Select<SolutionFilterTypes>
          control={control}
          name="language"
          rules={{}}
          multiple={false}
          shape="plain"
          title={`${formPlaceholder?.language} 선택`}
          placeholder={formPlaceholder?.language ?? ""}
          optionGroups={formOptionGroups?.language ?? []}
          onChange={() => {
            handleSubmit(handleValid)()
          }}
        />
        <Select<SolutionFilterTypes>
          control={control}
          name="type"
          rules={{}}
          multiple={false}
          shape="plain"
          title={`${formPlaceholder?.type} 선택`}
          placeholder={formPlaceholder?.type ?? ""}
          optionGroups={formOptionGroups?.type ?? []}
          onChange={() => {
            handleSubmit(handleValid)()
          }}
        />
      </PageFilter.Action>
    </SolutionFilterMainContainer>
  )
})

const SolutionFilterMainContainer = styled(PageFilter)`
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
      width: 100%;
    }
  }
`

export default SolutionFilterMain
