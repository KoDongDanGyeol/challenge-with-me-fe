import IDEMain, { IDEMainProps } from "@/components/form/IDE/Main"
import IDEGrid, { IDEGridProps } from "@/components/form/IDE/Grid"
import IDEHead, { IDEHeadProps } from "@/components/form/IDE/Head"
import IDEMarkdown, { IDEMarkdownProps } from "@/components/form/IDE/Markdown"
import IDEControl, { IDEControlProps } from "@/components/form/IDE/Control"
import IDESolutionEditor, { IDESolutionEditorProps } from "@/components/form/IDE/SolutionEditor"
import IDESolutionResult, { IDESolutionResultProps } from "@/components/form/IDE/SolutionResult"
import IDETestcaseEditor, { IDETestcaseEditorProps } from "@/components/form/IDE/TestcaseEditor"
import IDETestcaseResult, { IDETestcaseResultProps } from "@/components/form/IDE/TestcaseResult"
import { IDEGridArea, IDESolutionResultStatus, IDESolutionResultType } from "@/components/form/IDE/type"

export interface IDETypes {
  solution: string
  testcaseType: {
    input: string[]
    expected: string
  }
  testcaseValue: {
    public: {
      input: string[]
      expected: string
    }[]
    userSaved: {
      input: string[]
      expected: string
    }[]
    userDraft: {
      input: string[]
      expected: string
    }[]
  }
}

export type {
  IDEGridArea,
  IDESolutionResultStatus,
  IDESolutionResultType,
  IDEMainProps,
  IDEGridProps,
  IDEHeadProps,
  IDEMarkdownProps,
  IDEControlProps,
  IDESolutionEditorProps,
  IDESolutionResultProps,
  IDETestcaseEditorProps,
  IDETestcaseResultProps,
}

export default Object.assign(IDEMain, {
  Grid: IDEGrid,
  Head: IDEHead,
  Markdown: IDEMarkdown,
  Control: IDEControl,
  SolutionEditor: IDESolutionEditor,
  SolutionResult: IDESolutionResult,
  TestcaseEditor: IDETestcaseEditor,
  TestcaseResult: IDETestcaseResult,
})
