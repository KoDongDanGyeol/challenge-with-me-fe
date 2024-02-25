"use client"

import Link from "next/link"
import styled from "styled-components"
import Icon from "@/components/general/Icon"
import { ChallengeListModel } from "@/app/(service)/challenges/_libs/getchallengeList"

export interface ChallengeListMainProps extends React.HTMLAttributes<HTMLDivElement> {
  data: ChallengeListModel["content"]
}

const ChallengeListMain = (props: ChallengeListMainProps) => {
  const { data, className = "", ...restProps } = props

  return (
    <ChallengeListMainContainer className={`${className}`} {...restProps}>
      <table>
        <colgroup>
          {data?.find((challenge) => challenge?.state) && <col style={{ width: "68px" }} />}
          <col style={{ width: "auto" }} />
          <col style={{ width: "80px" }} />
          <col style={{ width: "120px" }} />
          <col style={{ width: "80px" }} />
        </colgroup>
        <thead>
          <tr>
            {data?.find((challenge) => challenge?.state) && <th className="col-state">상태</th>}
            <th className="col-title">제목</th>
            <th className="col-level">난이도</th>
            <th className="col-count">완료한 사람</th>
            <th className="col-rate">정답률</th>
          </tr>
        </thead>
        <tbody>
          {data.map((challenge) => (
            <tr key={challenge?.id}>
              {challenge?.state === "unsolved" ? (
                <td className="col-state">
                  <span className="sr-only">안 푼 문제</span>
                </td>
              ) : challenge?.state === "solving" ? (
                <td className="col-state">
                  <Icon name="ExclamationCircle" className="icon-exclamation" aria-hidden={true} />
                  <span className="sr-only">풀고 있는 문제</span>
                </td>
              ) : challenge?.state === "solved" ? (
                <td className="col-state">
                  <Icon name="CheckCircle" className="icon-check" aria-hidden={true} />
                  <span className="sr-only">푼 문제</span>
                </td>
              ) : challenge?.state ? (
                <td className="col-state"></td>
              ) : null}
              <td className="col-title">
                <Link href={`/challenges/${challenge?.id}`}>{challenge?.title}</Link>
                <span className="color-gray">{`${challenge?.type} | ${challenge?.past}`}</span>
              </td>
              <td className="col-level">
                <span className={`color-level${parseInt(challenge?.level.replace(/\D/g, ""), 10)}`}>
                  {challenge?.level}
                </span>
              </td>
              <td className="col-count">
                <span className="color-gray">{`${challenge?.completedUserCount > 9999999 ? "+" : ""}${Math.min(challenge?.completedUserCount, 9999999).toLocaleString("ko-KR")}명`}</span>
              </td>
              <td className="col-rate">
                <span className="color-gray">{`${Math.round(challenge?.correctRate * 100) / 100}%`}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </ChallengeListMainContainer>
  )
}

const ChallengeListMainContainer = styled.div`
  border: 1px solid rgb(var(--color-gray200));
  border-radius: 8px;
  overflow-x: auto;
  overflow-y: hidden;
  table {
    min-width: 700px;
    thead {
      th {
        padding: 8px 16px;
        text-align: center;
        font-size: ${(props) => props.theme.typo.size.xs};
        line-height: ${(props) => props.theme.typo.leading.xs};
        color: rgb(var(--color-gray500));
        background: rgb(var(--color-gray50));
      }
    }
    tbody {
      tr {
        position: relative;
        border-top: 1px solid rgb(var(--color-gray200));
      }
      td {
        padding: 12px 16px;
        font-size: ${(props) => props.theme.typo.size.sm};
        line-height: ${(props) => props.theme.typo.leading.sm};
        vertical-align: middle;
      }
    }
  }
  .col-state {
    text-align: center;
    svg {
      margin: 0 auto;
      width: 24px;
      &.icon-check {
        stroke: rgb(var(--color-primary500));
      }
      &.icon-exclamation {
        stroke: rgb(var(--color-yellow500));
      }
    }
  }
  .col-title {
    a {
      display: block;
      width: 100%;
      font-weight: 500;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      &:before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
      }
    }
    span {
      display: block;
      width: 100%;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }
  .col-level {
    text-align: center;
  }
  .col-count {
    text-align: right;
  }
  .col-rate {
    text-align: right;
  }
  .color-gray {
    color: rgb(var(--color-gray500));
  }
  .color-level0 {
    color: rgb(var(--color-primary500));
  }
  .color-level1 {
    color: rgb(var(--color-primary700));
  }
  .color-level2 {
    color: rgb(var(--color-green500));
  }
  .color-level3 {
    color: rgb(var(--color-green700));
  }
  .color-level4 {
    color: rgb(var(--color-red500));
  }
  .color-level5 {
    color: rgb(var(--color-red700));
  }
`

export default ChallengeListMain
