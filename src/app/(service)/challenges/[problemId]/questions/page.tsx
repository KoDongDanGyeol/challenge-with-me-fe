import ChallengeQuestionHome, {
  ChallengeQuestionHomeProps,
} from "@/app/(service)/challenges/_components/display/ChallengeQuestionHome"

interface PageProps {
  searchParams: ChallengeQuestionHomeProps<keyof JSX.IntrinsicElements>["searchParams"]
}

const page = ({ searchParams }: PageProps) => {
  return <ChallengeQuestionHome asTag="section" searchParams={searchParams} className="container" />
}

export default page
