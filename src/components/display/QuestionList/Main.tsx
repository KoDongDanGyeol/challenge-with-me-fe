"use client"

import Link from "next/link"
import styled from "styled-components"
import Icon from "@/components/general/Icon"

export interface QuestionListMainProps extends React.HTMLAttributes<HTMLDivElement> {
  data: {
    id: number
    challenge: string
    title: string
    content?: string
    name: string
    createdAt: string
    answerCounts: number
  }[]
}

const QuestionListMain = (props: QuestionListMainProps) => {
  const { data, className = "", ...restProps } = props

  return (
    <QuestionListMainContainer className={`${className}`} {...restProps}>
      <ul>
        {data?.map((question) => (
          <li key={question?.id}>
            <Link href={`/questions/${question?.id}`}>
              <div className="row-main">
                <span className="col-challenge">{question?.challenge}</span>
                <strong className="col-title">{question?.title}</strong>
                {question?.content && <p className="col-content">{question?.content}</p>}
              </div>
              <div className="row-extra">
                <span className="col-extra">
                  <Icon name="UserCircle" aria-hidden={true} />
                  <em className="sr-only">질문자</em>
                  {question?.name}
                </span>
                <span className="col-extra">
                  <Icon name="Calendar" aria-hidden={true} />
                  <em className="sr-only">등록일</em>
                  {new Date(question?.createdAt).toJSON().slice(0, 10)}
                </span>
                <span className="col-extra">
                  <Icon name="ChatBubbleLeftEllipsis" aria-hidden={true} />
                  <em className="sr-only">답글</em>
                  {question?.answerCounts}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </QuestionListMainContainer>
  )
}

const QuestionListMainContainer = styled.div`
  border: 1px solid rgb(var(--color-gray200));
  border-radius: 8px;
  li a {
    display: block;
    width: 100%;
    padding: 14px 16px;
  }
  li + li {
    border-top: 1px solid rgb(var(--color-gray200));
  }
  .row-main {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .row-extra {
    margin-top: 8px;
    display: flex;
    flex-direction: row;
    gap: 24px;
  }
  .col-challenge {
    font-size: ${(props) => props.theme.typo.size.sm};
    line-height: ${(props) => props.theme.typo.leading.sm};
  }
  .col-title {
    font-size: ${(props) => props.theme.typo.size.base};
    line-height: ${(props) => props.theme.typo.leading.base};
    font-weight: 500;
  }
  .col-content {
    font-size: ${(props) => props.theme.typo.size.sm};
    line-height: ${(props) => props.theme.typo.leading.sm};
    color: rgb(var(--color-gray500));
  }
  .col-extra {
    display: flex;
    gap: 6px;
    font-size: ${(props) => props.theme.typo.size.sm};
    line-height: ${(props) => props.theme.typo.leading.sm};
    color: rgb(var(--color-gray500));
    svg {
      width: 16px;
      stroke: rgb(var(--color-gray500));
    }
  }
`

export default QuestionListMain
