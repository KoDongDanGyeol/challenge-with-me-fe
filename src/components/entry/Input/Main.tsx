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
  appendIcon?: React.ReactNode
  appendButton?: React.ReactNode
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
    appendIcon,
    appendButton,
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
      {appendIcon && <InputMainIcon>{appendIcon}</InputMainIcon>}
      {appendButton && <InputMainButton>{appendButton}</InputMainButton>}
    </InputMainContainer>
  )
}

const InputMainIcon = styled.div`
  position: absolute;
  top: 50%;
  right: 4px;
  transform: translateY(-50%);
  button {
    display: block;
    padding: 4px;
  }
  svg {
    width: 20px;
    stroke: rgb(var(--color-gray400));
  }
`

const InputMainButton = styled.div`
  /*  */
`

const InputMainContainer = styled.div`
  position: relative;
  display: flex;
  gap: 8px;
  input {
    padding: 8px 12px;
    font-size: ${(props) => props.theme.typo.size.sm};
    line-height: ${(props) => props.theme.typo.leading.sm};
    border: 1px solid rgb(var(--color-gray300));
    border-radius: 6px;
    &:disabled {
      color: rgb(var(--color-gray500));
      background-color: rgb(var(--color-gray50));
    }
  }
  &:has(${InputMainIcon}) {
    input {
      padding-right: 36px;
    }
  }
`

export default InputMain
