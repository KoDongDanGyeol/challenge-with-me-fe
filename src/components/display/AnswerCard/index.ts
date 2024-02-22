import AnswerCardMain, { AnswerCardMainProps } from "@/components/display/AnswerCard/Main"
import AnswerCardProfile, { AnswerCardProfileProps } from "@/components/display/AnswerCard/Profile"
import AnswerCardContent, { AnswerCardContentProps } from "@/components/display/AnswerCard/Content"

export type { AnswerCardMainProps, AnswerCardProfileProps, AnswerCardContentProps }

export default Object.assign(AnswerCardMain, {
  Profile: AnswerCardProfile,
  Content: AnswerCardContent,
})
