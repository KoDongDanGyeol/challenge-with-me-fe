"use client"

import styled from "styled-components"
import { useController, Control, FieldValues, FieldPath, RegisterOptions } from "react-hook-form"

export interface TextareaMainProps<T extends FieldValues> extends React.HTMLAttributes<HTMLTextAreaElement> {
  control: Control<T>
  rules?: RegisterOptions<T>
  name: FieldPath<T>
  placeholder?: string
  disabled?: boolean
  rows?: number
  autoComplete?: "on" | "off"
  autoGrow?: boolean
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
  onBlur?: () => void
}

const TextareaMain = <T extends FieldValues>(props: TextareaMainProps<T>) => {
  const {
    control,
    rules,
    name,
    placeholder = "",
    disabled = false,
    rows = 3,
    autoComplete = "off",
    autoGrow = false,
    className = "",
    onChange,
    onBlur,
    ...restProps
  } = props

  const { field, fieldState } = useController({ control, name, rules })

  return (
    <TextareaMainContainer className={`${className}`}>
      <textarea
        ref={field.ref}
        autoComplete={autoComplete}
        disabled={disabled}
        id={name}
        required={Boolean(rules?.required)}
        placeholder={placeholder}
        rows={rows}
        value={field.value || ""}
        style={{ overflow: autoGrow ? "hidden" : "auto", resize: autoGrow ? "none" : "vertical" }}
        onChange={(event) => {
          if (event.target.value) field.onChange(event.target.value)
          else field.onChange("")
          onChange?.(event)
        }}
        onBlur={() => {
          field.onBlur()
          onBlur?.()
        }}
        {...restProps}
      />
      {autoGrow && <span aria-hidden="true">{(field.value || "") + " "}</span>}
    </TextareaMainContainer>
  )
}

const TextareaMainContainer = styled.div`
  position: relative;
  display: grid;
  flex: 1 1 0%;
  min-width: 0;
  textarea,
  span {
    grid-area: 1 / 1 / 2 / 2;
    padding: 8px 12px;
    font-size: ${(props) => props.theme.typo.size.sm};
    line-height: ${(props) => props.theme.typo.leading.sm};
  }
  textarea {
    min-height: 36px;
    border: 1px solid rgb(var(--color-gray300));
    border-radius: 6px;
    &:disabled {
      color: rgb(var(--color-gray500));
      background-color: rgb(var(--color-gray50));
    }
  }
  span {
    visibility: hidden;
    white-space: pre-wrap;
    pointer-events: none;
  }
`

export default TextareaMain
