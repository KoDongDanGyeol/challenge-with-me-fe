import QuestionHome, { QuestionHomeProps } from "@/app/(service)/questions/_components/display/QuestionHome"

interface PageProps {
  searchParams: QuestionHomeProps<keyof JSX.IntrinsicElements>["searchParams"]
}

const page = ({ searchParams }: PageProps) => {
  return <QuestionHome asTag="section" searchParams={searchParams} className="container" />
}

export default page
