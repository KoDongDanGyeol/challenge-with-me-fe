"use client"

import { useRef } from "react"
import { Control, FieldValues, FieldPath, useFieldArray, Path, ArrayPath, FieldArray } from "react-hook-form"
import styled from "styled-components"
import { IDETypes } from "@/components/form/IDE"
import Icon from "@/components/general/Icon"
import Button from "@/components/general/Button"
import Input from "@/components/entry/Input"

export interface IDETestcaseEditorProps<T extends FieldValues = IDETypes>
  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  control: Control<T>
  name: FieldPath<T>
  testcaseType: IDETypes["testcaseType"]
}

const typeGuard = (type: string, value: string) => {
  const intRegex = /^-?\d+(\.\d+)?$/
  const booleanRegex = /true|false/
  const stringRegex = /^"[^"]*"$/
  try {
    switch (type) {
      // int
      case "int":
        return intRegex.test(value)
      case "int[]":
        return JSON.parse(value).every((v: unknown) => intRegex.test(`${v}`) && typeof v === "number")
      case "int[][]":
        return JSON.parse(value).every((v: unknown) =>
          (v as []).every((_v: unknown) => intRegex.test(`${_v}`) && typeof _v === "number"),
        )
      // boolean
      case "boolean":
        return booleanRegex.test(value)
      case "boolean[]":
        return JSON.parse(value).every((v: unknown) => booleanRegex.test(`${v}`) && typeof v === "boolean")
      case "boolean[][]":
        return JSON.parse(value).every((v: unknown) =>
          (v as []).every((_v: unknown) => booleanRegex.test(`${_v}`) && typeof _v === "boolean"),
        )
      // string
      case "string":
        return stringRegex.test(value)
      case "string[]":
        return JSON.parse(value).every((v: unknown) => stringRegex.test(`"${v}"`) && typeof v === "string")
      case "string[][]":
        return JSON.parse(value).every((v: unknown) =>
          (v as []).every((_v: unknown) => stringRegex.test(`"${_v}"`) && typeof _v === "string"),
        )
      // default
      default:
        return false
    }
  } catch (error) {
    // error
    return false
  }
}

const IDETestcaseEditor = <T extends FieldValues = IDETypes>(props: IDETestcaseEditorProps<T>) => {
  const { control, name, testcaseType, className = "", ...restProps } = props

  const appendRef = useRef<HTMLButtonElement | null>(null)

  const publicFields = useFieldArray({
    control,
    name: `${name}.public` as ArrayPath<T>,
  })

  const userDraftFields = useFieldArray({
    control,
    name: `${name}.userDraft` as ArrayPath<T>,
    rules: {
      validate: {
        typeGuard: (v) => {
          const value = [...v] as IDETypes["testcaseValue"]["userDraft"]
          const flatValue = value.flatMap(({ input, expected }) => [
            ...input.map((value, index) => ({ value, type: testcaseType.input[index] })),
            { value: expected, type: testcaseType.expected },
          ])
          const invalidValue = flatValue.some(({ type, value }) => value === "")
          if (invalidValue) return "데이터를 모두 입력해주세요"
          const invalidType = flatValue.some(({ type, value }) => !typeGuard(type, value))
          if (invalidType) return "데이터 형식을 확인해주세요"
          return true
        },
      },
    },
  })

  const appendFields = () => {
    userDraftFields.append(
      { input: Array(testcaseType.input.length).fill(""), expected: "" } as FieldArray<T, ArrayPath<T>>,
      { focusName: `${name}.userDraft.${userDraftFields.fields.length}.input.${0}` },
    )
  }

  const removeFields = (index: number) => {
    userDraftFields.remove(index)
    appendRef.current?.focus()
  }

  if (!testcaseType.input.length) {
    return null
  }

  return (
    <IDETestcaseEditorContainer className={`${className}`} {...restProps}>
      <table>
        <colgroup>
          {testcaseType.input.map((type, colIndex) => (
            <col key={colIndex} style={{ width: "168px" }} />
          ))}
          <col style={{ width: "200px" }} />
        </colgroup>
        <thead>
          <tr>
            <th colSpan={testcaseType.input.length} scope="colgroup">
              Parameters
              <Button
                ref={appendRef}
                type="button"
                shape="square"
                variants="primary"
                emphasis="subtle"
                size="xs"
                className="button-append"
                onClick={() => {
                  appendFields()
                }}
              >
                추가
              </Button>
            </th>
            <th scope="col">Result</th>
          </tr>
          <tr>
            {testcaseType.input.map((type, colIndex) => (
              <th key={colIndex} scope="col">
                {type}
              </th>
            ))}
            <th scope="col" colSpan={2}>
              {testcaseType.expected}
            </th>
          </tr>
        </thead>
        <tbody>
          {publicFields.fields.map((field, rowIndex) => (
            <tr key={field.id}>
              {testcaseType.input.map((type, colIndex) => (
                <td key={`${field.id}-input${colIndex}`}>
                  <Input<T>
                    control={control}
                    key={`${name}.public.${rowIndex}.input.${colIndex}` as Path<T>}
                    name={`${name}.public.${rowIndex}.input.${colIndex}` as Path<T>}
                    type="text"
                    disabled={true}
                  />
                </td>
              ))}
              <td key={`${field.id}-expected`}>
                <Input<T>
                  control={control}
                  key={`${name}.public.${rowIndex}.expected` as Path<T>}
                  name={`${name}.public.${rowIndex}.expected` as Path<T>}
                  type="text"
                  disabled={true}
                />
              </td>
            </tr>
          ))}
          {userDraftFields.fields.map((field, rowIndex) => (
            <tr key={field.id}>
              {testcaseType.input.map((type, colIndex) => (
                <td key={`${field.id}-input${colIndex}`}>
                  <Input<T>
                    control={control}
                    key={`${name}.userDraft.${rowIndex}.input.${colIndex}` as Path<T>}
                    name={`${name}.userDraft.${rowIndex}.input.${colIndex}` as Path<T>}
                    type="text"
                    disabled={false}
                  />
                </td>
              ))}
              <td key={`${field.id}-expected`} className="col-action">
                <Input<T>
                  control={control}
                  key={`${name}.userDraft.${rowIndex}.expected` as Path<T>}
                  name={`${name}.userDraft.${rowIndex}.expected` as Path<T>}
                  type="text"
                  disabled={false}
                />
                <button
                  type="button"
                  className="button-remove"
                  onClick={() => {
                    removeFields(rowIndex)
                  }}
                >
                  <Icon name="XCircle" aria-hidden={true} />
                  <span className="sr-only">삭제</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </IDETestcaseEditorContainer>
  )
}

const IDETestcaseEditorContainer = styled.div`
  position: relative;
  flex: 1 1 0px;
  width: 100%;
  padding: 16px;
  overflow: auto;
  table {
    outline: 1px solid rgb(var(--color-gray300));
    border-radius: 8px;
    overflow: hidden;
    th,
    td {
      position: relative;
      padding: 8px 12px;
      font-size: ${(props) => props.theme.typo.size.sm};
      line-height: ${(props) => props.theme.typo.leading.sm};
      color: rgb(var(--color-gray500));
      vertical-align: middle;
    }
    tbody,
    tr + tr {
      border-top: 1px solid rgb(var(--color-gray200));
    }
  }
  .col-action {
    padding-right: 44px;
  }
  .button-append {
    position: absolute;
    top: 50%;
    right: 12px;
    transform: translateY(-50%);
  }
  .button-remove {
    position: absolute;
    top: 50%;
    right: 12px;
    width: 24px;
    transform: translateY(-50%);
    svg {
      stroke: rgb(var(--color-red500));
    }
  }
  @media ${(props) => props.theme.screen.device.md} {
    flex: none;
    height: auto;
  }
`

export default IDETestcaseEditor
