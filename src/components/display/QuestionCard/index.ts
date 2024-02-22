import QuestionCardMain, { QuestionCardMainProps } from "@/components/display/QuestionCard/Main"
import QuestionCardProfile, { QuestionCardProfileProps } from "@/components/display/QuestionCard/Profile"
import QuestionCardContent, { QuestionCardContentProps } from "@/components/display/QuestionCard/Content"

export type { QuestionCardMainProps, QuestionCardProfileProps, QuestionCardContentProps }

export default Object.assign(QuestionCardMain, {
  Profile: QuestionCardProfile,
  Content: QuestionCardContent,
})
