"use client"

import { useRef, useState, useEffect } from "react"
import styled from "styled-components"
import { useController, Control, FieldValues, FieldPath, RegisterOptions } from "react-hook-form"
import { SelectShape } from "@/components/entry/Select/type"
import Icon from "@/components/general/Icon"

export interface SelectMainProps<T extends FieldValues> extends React.HTMLAttributes<HTMLSelectElement> {
  control: Control<T>
  rules?: RegisterOptions<T>
  name: FieldPath<T>
  placeholder?: string
  disabled?: boolean
  multiple?: boolean
  shape?: SelectShape
  optionGroups: {
    label: string
    options: { value: T[FieldPath<T>]; text: string }[]
  }[]
  onChange?: () => void
  onBlur?: () => void
}

const SelectMain = <T extends FieldValues>(props: SelectMainProps<T>) => {
  const {
    control,
    rules,
    name,
    placeholder,
    disabled = false,
    multiple = false,
    shape = SelectShape.Square,
    optionGroups,
    className = "",
    onChange,
    onBlur,
    ...restProps
  } = props

  const { field } = useController({ control, name, rules })
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [structure, setStructure] = useState<{
    isActivated: boolean
    currentValue: T[FieldPath<T>] | T[FieldPath<T>][]
  }>({
    isActivated: false,
    currentValue: field.value,
  })

  useEffect(() => {
    if (JSON.stringify(field.value) === JSON.stringify(structure.currentValue)) return
    setStructure((prev) => ({ ...prev, currentValue: field.value }))
    onChange?.()
  }, [field.value])

  return (
    <SelectMainContainer
      ref={containerRef}
      onBlur={(event) =>
        !containerRef.current?.contains(event.relatedTarget) &&
        setStructure((prev) => ({ ...prev, isActivated: false }))
      }
      className={`shape-${shape} ${className}`}
    >
      <SelectMainCombobox
        ref={field.ref}
        role="combobox"
        type="button"
        disabled={disabled}
        onClick={() => setStructure((prev) => ({ ...prev, isActivated: !structure.isActivated }))}
        aria-expanded={structure.isActivated}
        aria-controls={`${name}-listbox`}
        aria-labelledby={`${name}-label`}
        aria-haspopup="listbox"
      >
        <span className={`${structure.isActivated ? "" : ""}`}>
          {optionGroups?.flatMap(({ options }) => options)?.find(({ value }) => value === structure.currentValue)
            ?.text ?? placeholder}
        </span>
        <Icon name="ChevronUpDown" className="icon-chevron" aria-hidden={true} />
      </SelectMainCombobox>
      <SelectMainListbox id={`${name}-listbox`} className={`listbox`} aria-labelledby={`${name}-label`}>
        {structure.isActivated && (
          <div className="inner">
            {optionGroups.map(({ label, options }, index) => (
              <ul key={`${name}-${index}-label`} role="group" aria-labelledby={`${name}-${index}-lebel`}>
                <li id={`${name}-${index}-label`} className={`${optionGroups.length <= 1 ? "sr-only" : ""}`}>
                  <span>{label}</span>
                </li>
                {options.map(({ value, text }) => {
                  const isSelected = multiple
                    ? [...structure.currentValue].includes(value)
                    : value === structure.currentValue
                  const onClick = () => {
                    if (multiple) {
                      const newValue = [...structure.currentValue].includes(value)
                        ? [...structure.currentValue].filter((v: string) => v !== value)
                        : [...structure.currentValue, value]
                      field.onChange(newValue)
                      onChange?.()
                      setStructure((prev) => ({ ...prev, currentValue: newValue as T[FieldPath<T>][] }))
                      return
                    }
                    field.onChange(value)
                    setStructure((prev) => ({ ...prev, currentValue: value }))
                    onChange?.()
                    setStructure((prev) => ({ ...prev, isActivated: false }))
                  }
                  return (
                    <li key={value} role="option" className={isSelected ? "selected" : ""} aria-selected={isSelected}>
                      <button type="button" onClick={onClick}>
                        {multiple && <Icon name="Check" className="icon-check" aria-hidden={true} />}
                        {text}
                      </button>
                    </li>
                  )
                })}
              </ul>
            ))}
          </div>
        )}
      </SelectMainListbox>
      <select
        id={name}
        value={field.value || (multiple ? [] : "")}
        required={Boolean(rules?.required)}
        multiple={multiple}
        disabled={disabled}
        onChange={(event) => {
          multiple
            ? field.onChange(Array.from(event.target.selectedOptions).map(({ value }) => value))
            : field.onChange(event.target.value)
        }}
        onBlur={() => {
          field.onBlur()
          onBlur?.()
        }}
        hidden={true}
        {...restProps}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {optionGroups.map(({ label, options }) => {
          if (optionGroups.length === 1) {
            return options.map(({ text, value }) => (
              <option key={value} value={value}>
                {text}
              </option>
            ))
          }
          return (
            <optgroup key={label} label={label}>
              {options.map(({ value, text }) => (
                <option key={value} value={value}>
                  {text}
                </option>
              ))}
            </optgroup>
          )
        })}
      </select>
    </SelectMainContainer>
  )
}

const SelectMainCombobox = styled.button`
  position: relative;
  display: block;
  width: 100%;
  text-align: left;
  font-size: ${(props) => props.theme.typo.size.sm};
  line-height: ${(props) => props.theme.typo.leading.sm};
  color: rgb(var(--color-gray900));
  background: rgb(var(--color-gray0));
  overflow: hidden;
  .icon-chevron {
    position: absolute;
    top: 50%;
    display: block;
    width: 20px;
    transform: translateY(-50%);
  }
`

const SelectMainListbox = styled.div`
  position: absolute;
  top: 100%;
  width: max-content;
  min-width: 100%;
  z-index: 1;
  .inner {
    margin-top: 4px;
    max-height: 228px;
    padding: 4px 0;
    background: rgb(var(--color-gray0));
    border: 1px solid rgb(var(--color-gray300));
    border-radius: 6px;
    overflow-y: auto;
  }
  button {
    position: relative;
    display: block;
    width: 100%;
    padding: 4px 12px;
    text-align: left;
    font-size: ${(props) => props.theme.typo.size.sm};
    line-height: ${(props) => props.theme.typo.leading.sm};
    &:has(.icon-check) {
      padding-left: 36px;
    }
  }
  span {
    display: block;
    width: 100%;
    padding: 4px 12px;
    text-align: left;
    font-size: ${(props) => props.theme.typo.size.sm};
    line-height: ${(props) => props.theme.typo.leading.sm};
    color: rgb(var(--color-gray500));
  }
  .icon-check {
    position: absolute;
    top: 6px;
    left: 12px;
    display: block;
    width: 16px;
    padding: 2px;
    border-radius: 4px;
    stroke: rgb(var(--color-gray300));
    border: 1px solid rgb(var(--color-gray300));
  }
  .selected {
    button {
      font-weight: 500;
    }
    .icon-check {
      background: rgb(var(--color-primary500));
      border-color: rgb(var(--color-primary500));
      stroke: rgb(var(--color-gray0));
    }
  }
`

const SelectMainContainer = styled.div`
  position: relative;
  &.shape-square {
    ${SelectMainCombobox} {
      padding: 8px 36px 8px 12px;
      border: 1px solid rgb(var(--color-gray300));
      border-radius: 6px;
      .icon-chevron {
        right: 8px;
        stroke: rgb(var(--color-gray400));
      }
    }
    ${SelectMainListbox} {
      left: 0;
    }
  }
  &.shape-plain {
    ${SelectMainCombobox} {
      padding: 0 28px 0 0;
      .icon-chevron {
        right: 0;
      }
    }
    ${SelectMainListbox} {
      right: 0;
    }
  }
`

export default SelectMain
