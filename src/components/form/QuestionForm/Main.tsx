"use client"

import { FieldValues } from "react-hook-form"
import styled from "styled-components"
import Button from "@/components/general/Button"
import FormHoc, { FormHocMainProps } from "@/components/entry/FormHoc"
import Input from "@/components/entry/Input"
import Textarea from "@/components/entry/Textarea"
import Helper from "@/components/entry/Helper"
import Label from "@/components/entry/Label"
import { QuestionFormTypes } from "@/components/form/QuestionForm"

export interface QuestionFormMainProps<T extends FieldValues = QuestionFormTypes> extends FormHocMainProps<T> {
  //
}

const QuestionFormMain = FormHoc<QuestionFormTypes>((props: QuestionFormMainProps) => {
  const { formAction, formData, formPlaceholder, handleValid, handleCanceled, ...restProps } = props

  const { control, formState, handleSubmit } = formData

  return (
    <QuestionFormMainContainer id="question-form" onSubmit={handleSubmit(handleValid)} noValidate {...restProps}>
      <div className="row-input">
        <Label htmlFor="title">제목</Label>
        <Input<QuestionFormTypes>
          control={control}
          name="title"
          rules={{
            required: {
              value: true,
              message: "타이틀을 입력해주세요",
            },
          }}
          type="text"
          placeholder={formPlaceholder?.title ?? ""}
        />
        <Helper variants="error">{formState?.errors?.title?.message}</Helper>
      </div>
      <div className="row-input">
        <Label htmlFor="content">내용</Label>
        <Textarea<QuestionFormTypes>
          control={control}
          name="content"
          rules={{
            required: {
              value: true,
              message: "내용을 입력해주세요",
            },
          }}
          placeholder={formPlaceholder?.content ?? ""}
          rows={4}
          autoGrow={true}
        />
        <Helper variants="default">이 입력폼은 마크다운 문법을 지원합니다.</Helper>
        <Helper variants="error">{formState?.errors?.content?.message}</Helper>
      </div>
      <div className="row-submit">
        {handleCanceled && (
          <Button type="button" shape="square" variants="primary" emphasis="subtle" onClick={handleCanceled}>
            {formAction?.cancel}
          </Button>
        )}
        <Button type="submit" shape="square" variants="primary" emphasis="bold">
          {formAction?.submit}
        </Button>
      </div>
    </QuestionFormMainContainer>
  )
})

const QuestionFormMainContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
  .row-input {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .row-submit {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
  }
  @media ${(props) => props.theme.screen.device.md} {
    gap: 16px;
  }
`

export default QuestionFormMain
