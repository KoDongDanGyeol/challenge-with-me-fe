"use client"

import Link from "next/link"
import styled from "styled-components"
import Icon from "@/components/general/Icon"
import { MergeTypes } from "@/libs/utils"
import { QuestionListModel } from "@/app/(service)/questions/_libs/getQuestionList"
import { ChallengeQuestionListModel } from "@/app/(service)/challenges/_libs/getChallengeQuestionList"

export interface QuestionListMainProps extends React.HTMLAttributes<HTMLDivElement> {
  data: MergeTypes<QuestionListModel["content"][number], ChallengeQuestionListModel["content"][number]>[]
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
                {question?.problemTitle && <span className="col-challenge">{question?.problemTitle}</span>}
                <strong className="col-title">{question?.title}</strong>
              </div>
              <div className="row-extra">
                <div className="col-extra">
                  <Icon name="UserCircle" aria-hidden={true} />
                  <span className="sr-only">질문자</span>
                  <span>{question?.name}</span>
                </div>
                <div className="col-extra">
                  <Icon name="Calendar" aria-hidden={true} />
                  <span className="sr-only">등록일</span>
                  <span>{new Date(question?.createdAt).toJSON().slice(0, 10)}</span>
                </div>
                <div className="col-extra">
                  <Icon name="ChatBubbleLeftEllipsis" aria-hidden={true} />
                  <span className="sr-only">답변</span>
                  <span>{question?.answerCounts}</span>
                </div>
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
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .col-title {
    font-size: ${(props) => props.theme.typo.size.base};
    line-height: ${(props) => props.theme.typo.leading.base};
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .col-extra {
    display: flex;
    gap: 6px;
    max-width: 33%;
    font-size: ${(props) => props.theme.typo.size.sm};
    line-height: ${(props) => props.theme.typo.leading.sm};
    color: rgb(var(--color-gray500));
    svg {
      width: 16px;
      stroke: rgb(var(--color-gray500));
    }
    span {
      flex: 1 1 0px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  @media ${(props) => props.theme.screen.device.md} {
    .row-extra {
      gap: 16px;
    }
  }
`

export default QuestionListMain
