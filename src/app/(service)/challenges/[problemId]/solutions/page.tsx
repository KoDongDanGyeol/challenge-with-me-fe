import ChallengeSolutionHome, {
  ChallengeSolutionHomeProps,
} from "@/app/(service)/challenges/_components/display/ChallengeSolutionHome"

interface PageProps {
  searchParams: ChallengeSolutionHomeProps<keyof JSX.IntrinsicElements>["searchParams"]
}

const page = ({ searchParams }: PageProps) => {
  return <ChallengeSolutionHome asTag="section" searchParams={searchParams} className="container" />
}

export default page
