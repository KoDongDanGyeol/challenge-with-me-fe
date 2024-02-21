import SolutionCardMain, { SolutionCardMainProps } from "@/components/display/SolutionCard/Main"
import SolutionCardProfile, { SolutionCardProfileProps } from "@/components/display/SolutionCard/Profile"
import SolutionCardContent, { SolutionCardContentProps } from "@/components/display/SolutionCard/Content"

export type { SolutionCardMainProps, SolutionCardProfileProps, SolutionCardContentProps }

export default Object.assign(SolutionCardMain, {
  Profile: SolutionCardProfile,
  Content: SolutionCardContent,
})
