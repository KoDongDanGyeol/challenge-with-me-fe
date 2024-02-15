"use client"

import styled from "styled-components"
import { useController, Control, FieldValues, FieldPath, RegisterOptions } from "react-hook-form"

export interface InputMainProps<T extends FieldValues> extends React.HTMLAttributes<HTMLInputElement> {
  control: Control<T>
  rules?: RegisterOptions<T>
  name: FieldPath<T>
  type?: string
  placeholder?: string
  disabled?: boolean
  autoComplete?: "on" | "off"
  min?: string | number
  max?: string | number
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: () => void
}

const InputMain = <T extends FieldValues>(props: InputMainProps<T>) => {
  const {
    control,
    rules,
    name,
    type = "text",
    placeholder = "",
    disabled = false,
    autoComplete = "off",
    min,
    max,
    className = "",
    onChange,
    onBlur,
    ...restProps
  } = props

  const { field, fieldState } = useController({ control, name, rules })

  return (
    <InputMainContainer className={`${className}`}>
      <input
        ref={field.ref}
        autoComplete={autoComplete}
        disabled={disabled}
        id={name}
        max={max}
        min={min}
        required={Boolean(rules?.required)}
        placeholder={placeholder}
        type={type}
        value={field.value || ""}
        onChange={(event) => {
          if (event.target.value)
            field.onChange(
              type === "number"
                ? +event.target.value
                : type === "tel"
                  ? event.target.value.match(/\\d+/g)?.join("")
                  : event.target.value,
            )
          else field.onChange("")
          onChange?.(event)
        }}
        onBlur={() => {
          field.onBlur()
          onBlur?.()
        }}
        {...restProps}
      />
    </InputMainContainer>
  )
}

const InputMainContainer = styled.div`
  input {
    border-radius: 6px;
    padding: 9px 13px;
    border: 1px solid rgb(var(--color-gray300));
  }

  input:error {
    border: 1px solid #ef4444;
  }
  input:disable {
    background-color: rgb(var(--color-gray50));
    color: rgb(var(--color-gray200));
  }
`

export default InputMain
