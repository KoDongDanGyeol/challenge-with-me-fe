import ChallengeHome, { ChallengeHomeProps } from "@/app/(service)/challenges/_components/display/ChallengeHome"

interface PageProps {
  searchParams: ChallengeHomeProps<keyof JSX.IntrinsicElements>["searchParams"]
}

const page = ({ searchParams }: PageProps) => {
  return <ChallengeHome asTag="section" searchParams={searchParams} className="container" />
}

export default page
