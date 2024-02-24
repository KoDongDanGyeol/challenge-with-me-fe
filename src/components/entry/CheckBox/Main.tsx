"use client"

import { useController, Control, FieldValues, FieldPath, RegisterOptions } from "react-hook-form"
import styled from "styled-components"
import Icon from "@/components/general/Icon"

export interface CheckboxProps<T extends FieldValues>
  extends React.PropsWithChildren<React.HTMLAttributes<HTMLInputElement>> {
  control: Control<T>
  name: FieldPath<T>
  rules?: RegisterOptions<T>
  disabled?: boolean
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: () => void
}

const CheckboxMain = <T extends FieldValues>(props: CheckboxProps<T>) => {
  const { control, name, rules, disabled = false, children, onChange, onBlur, ...restProps } = props
  const { field } = useController({ control, name, rules })

  return (
    <CheckboxContainer>
      <input
        type="checkbox"
        ref={field.ref}
        id={name}
        name={name}
        disabled={disabled}
        checked={field.value}
        className="sr-only"
        onChange={(event) => {
          field.onChange(event.target.checked)
          onChange?.(event)
        }}
        onBlur={() => {
          field.onBlur()
          onBlur?.()
        }}
        {...restProps}
      />
      <div className="icon-check">
        <Icon name="Check" aria-hidden="true" />
      </div>
      <label htmlFor={name}>{children}</label>
    </CheckboxContainer>
  )
}

const CheckboxContainer = styled.div`
  position: relative;
  label {
    display: block;
    width: 100%;
    padding-left: 24px;
    font-size: ${(props) => props.theme.typo.size.sm};
    line-height: ${(props) => props.theme.typo.leading.sm};
    color: rgb(var(--color-gray500));
  }
  input[type="checkbox"] + .icon-check {
    position: absolute;
    top: 1px;
    left: 0;
    display: block;
    width: 18px;
    height: 18px;
    padding: 2px;
    border-radius: 4px;
    border: 1px solid rgb(var(--color-gray300));
    svg {
      stroke: rgb(var(--color-gray0));
    }
  }
  input[type="checkbox"]:focus + .icon-check {
    border-color: rgb(var(--color-primary500));
  }
  input[type="checkbox"]:checked + .icon-check {
    background: rgb(var(--color-primary500));
    border-color: rgb(var(--color-primary500));
  }
`

export default CheckboxMain
