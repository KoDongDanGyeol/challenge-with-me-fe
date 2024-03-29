"use client"

import styled from "styled-components"
import { FieldValues, SubmitHandler, UseFormReturn } from "react-hook-form"
import { SelectMainProps } from "@/components/entry/Select"

export interface FormHocMainProps<T extends FieldValues>
  extends React.PropsWithChildren<React.HTMLAttributes<HTMLFormElement>> {
  formData: UseFormReturn<T>
  formTitle?: string
  formAction?: {
    [key in "reset" | "submit" | "cancel"]?: string
  }
  formPlaceholder?: {
    [key in keyof T]?: string
  }
  formOptionGroups?: {
    [key in keyof T]?: SelectMainProps<T>["optionGroups"]
  }
  isLoading?: boolean
  isSuccess?: boolean
  handleValid: SubmitHandler<T>
  handleCanceled?: () => void
}

const FormHocMain = <T extends FieldValues>(FormHocMain: (props: FormHocMainProps<T>) => React.ReactNode) => {
  return function Form(props: FormHocMainProps<T>) {
    const { className = "", ...restProps } = props
    return (
      <FormHocMainComponent className={`${className}`}>
        <FormHocMain {...restProps} />
      </FormHocMainComponent>
    )
  }
}

const FormHocMainComponent = styled.div`
  //
`

export default FormHocMain
