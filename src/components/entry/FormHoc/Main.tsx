"use client"

import styled from "styled-components"
import { FieldValues, SubmitHandler, UseFormReturn } from "react-hook-form"

export interface FormHocMainProps<T extends FieldValues>
  extends React.PropsWithChildren<React.HTMLAttributes<HTMLFormElement>> {
  formAction?: {
    reset?: string
    submit?: string
  }
  formData: UseFormReturn<T>
  formPlaceholder?: {
    [key in keyof T]?: T[key] extends object
      ? { [subKey in keyof T[key]]?: string }
      : T[key] extends Array<object>
        ? { [subKey in keyof T[key][number]]?: string }
        : string
  }
  isLoading?: boolean
  isSuccess?: boolean
  handleValid: SubmitHandler<T>
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
