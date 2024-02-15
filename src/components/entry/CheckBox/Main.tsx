"use client"

import { useController, Control, FieldValues, FieldPath } from "react-hook-form"
import styled from "styled-components"

export interface CheckboxProps<T extends FieldValues> extends React.HTMLAttributes<HTMLInputElement> {
  control: Control<T>
  name: FieldPath<T>
}

const CheckboxMain = <T extends FieldValues>(props: CheckboxProps<T>) => {
  const { control, name, ...restProps } = props
  const { field } = useController({ control, name })

  return (
    <CheckboxContainer>
      <input type="checkbox" {...field} checked={field.value} {...restProps} />
    </CheckboxContainer>
  )
}

const CheckboxContainer = styled.div`
  input[type="checkbox"] {
    width: 16px;
  }
`

export default CheckboxMain
