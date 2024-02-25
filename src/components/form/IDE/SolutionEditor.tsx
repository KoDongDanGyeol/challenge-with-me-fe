"use client"

import { useEffect, useState } from "react"
import { useController, Control, FieldValues, FieldPath, RegisterOptions } from "react-hook-form"
import Editor, { EditorProps } from "@monaco-editor/react"
import styled from "styled-components"
import useResize from "@/libs/hook/useResize"

export interface IDESolutionEditorProps<T extends FieldValues> extends EditorProps {
  control: Control<T>
  rules?: RegisterOptions<T>
  name: FieldPath<T>
}

const IDESolutionEditor = <T extends FieldValues>(props: IDESolutionEditorProps<T>) => {
  const { control, rules, name, defaultLanguage = "", ...restProps } = props

  const { resizeRef, resizeStructure } = useResize(500)
  const { field, fieldState } = useController({ control, name, rules })
  const [isMounted, setIsMounted] = useState(false)
  const [value, setValue] = useState((field.value ?? "").trim())

  useEffect(() => {
    if (!isMounted) return
    if (value === field.value) return
    setValue(field.value ?? "")
  }, [isMounted, value, field.value])

  return (
    <IDESolutionEditorContainer ref={resizeRef.containerRef}>
      <div className="blocking">{!isMounted ? "Loading" : resizeStructure.isDebounce ? "Resizing" : null}</div>
      <Editor
        defaultLanguage={defaultLanguage}
        defaultValue={value}
        width={resizeStructure.isDebounce ? 0 : resizeStructure.width}
        height={resizeStructure.isDebounce ? 0 : resizeStructure.height}
        loading={null}
        value={value}
        options={{
          padding: { top: 12, bottom: 12 },
          fontSize: 14,
          tabSize: 2,
          lineHeight: 19,
          automaticLayout: true,
          minimap: { enabled: false },
          scrollbar: { vertical: "auto", horizontal: "auto" },
          scrollBeyondLastLine: false,
        }}
        onMount={() => {
          setIsMounted(() => true)
        }}
        onChange={(value) => {
          setValue(() => value ?? "")
          field.onChange(value ?? "")
        }}
        {...restProps}
      />
    </IDESolutionEditorContainer>
  )
}

const IDESolutionEditorContainer = styled.div`
  position: relative;
  flex: 1 1 0px;
  width: 100%;
  > * {
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    font-size: ${(props) => props.theme.typo.size.sm};
    line-height: ${(props) => props.theme.typo.leading.sm};
  }
  .blocking {
    display: none;
    z-index: 1;
    background: rgb(var(--color-gray100));
    &:not(:empty) {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  @media ${(props) => props.theme.screen.device.md} {
    flex: none;
    height: 40vh;
  }
`

export default IDESolutionEditor
