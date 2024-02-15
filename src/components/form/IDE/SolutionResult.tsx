"use client"

import styled from "styled-components"
import Icon from "@/components/general/Icon"
import { IDESolutionResultStatus, IDESolutionResultType } from "@/components/form/IDE/type"

export interface IDESolutionResultProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  resultType: IDESolutionResultType
  resultStatus: IDESolutionResultStatus
  resultGrade: {
    input?: string[]
    output?: string
    passed?: boolean
    expected?: string
    errorMsg?: string | null
  }[]
}

const IDESolutionResult = (props: IDESolutionResultProps) => {
  const { resultType, resultStatus, resultGrade = [], className = "", ...restProps } = props

  const countAll = resultGrade.length
  const countPassed = resultGrade.filter((result) => result?.passed).length

  if (resultType === IDESolutionResultType.Ready) {
    return (
      <IDESolutionResultContainer className={`${className}`} $resultType={resultType} {...restProps}>
        <div className="markdown">
          <p className="color-gray">실행 결과가 여기에 표시됩니다.</p>
        </div>
      </IDESolutionResultContainer>
    )
  }

  if (resultType === IDESolutionResultType.Run) {
    return (
      <IDESolutionResultContainer className={`${className}`} $resultType={resultType} {...restProps}>
        <div className="markdown">
          <div className="markdown-card">
            <strong>테스트</strong>
            <p className="color-gray">
              {resultStatus === IDESolutionResultStatus.Wait && "채점을 시작합니다"}
              {resultStatus === IDESolutionResultStatus.Cancel && "채점이 중지되었습니다"}
              {resultStatus === IDESolutionResultStatus.Complete && "채점이 완료되었습니다"}
            </p>
            <div className="markdown-table">
              {resultGrade.map((grade, index) => (
                <table key={index}>
                  <colgroup>
                    <col style={{ width: "100px" }} />
                    <col style={{ width: "auto" }} />
                  </colgroup>
                  <tbody>
                    <tr>
                      <td colSpan={2}>{`테스트 ${index + 1}`}</td>
                    </tr>
                    <tr>
                      <td>입력값</td>
                      <td>{grade.input}</td>
                    </tr>
                    <tr>
                      <td>기댓값</td>
                      <td>{grade.expected}</td>
                    </tr>
                    <tr>
                      <td>실행 결과</td>
                      <td>
                        {resultStatus === IDESolutionResultStatus.Wait && (
                          <Icon name="Loading" className="icon-loading" />
                        )}
                        {resultStatus === IDESolutionResultStatus.Cancel && null}
                        {resultStatus === IDESolutionResultStatus.Complete && (
                          <span className={grade.passed ? "color-success" : "color-danger"}>
                            {grade.output || grade.errorMsg || ""}
                          </span>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              ))}
            </div>
          </div>
          {resultStatus === IDESolutionResultStatus.Complete && (
            <div className="markdown-card">
              <strong>테스트 결과</strong>
              <p className={`${countAll === countPassed ? "color-success" : "color-danger"}`}>
                {countAll}개 중 {countPassed}개 성공
              </p>
              {countAll === countPassed && (
                <p className="color-gray">
                  {`샘플 테스트 케이스를 통과했다는 의미로, 작성한 코드가 문제의 정답은 아닐 수 있습니다. (샘플 테스트 케이스는 [테스트 케이스 추가하기] 버튼을 통해 확인하실 수 있습니다.)`}
                </p>
              )}
            </div>
          )}
        </div>
      </IDESolutionResultContainer>
    )
  }

  if (resultType === IDESolutionResultType.Submit) {
    return (
      <IDESolutionResultContainer className={`${className}`} $resultType={resultType} {...restProps}>
        <div className="markdown">
          <div className="markdown-card">
            <strong>채점</strong>
            <p className="color-gray">
              {resultStatus === IDESolutionResultStatus.Wait && "채점을 시작합니다"}
              {resultStatus === IDESolutionResultStatus.Cancel && "채점이 중지되었습니다"}
              {resultStatus === IDESolutionResultStatus.Complete && "채점이 완료되었습니다"}
            </p>
            <div className="markdown-table">
              <table>
                <colgroup>
                  <col style={{ width: "100px" }} />
                  <col style={{ width: "auto" }} />
                </colgroup>
                <tbody>
                  {resultGrade.map((grade, index) => (
                    <tr key={index}>
                      <td>{`테스트 ${index + 1}`}</td>
                      <td>
                        {resultStatus === IDESolutionResultStatus.Wait && (
                          <Icon name="Loading" className="icon-loading" />
                        )}
                        {resultStatus === IDESolutionResultStatus.Cancel && null}
                        {resultStatus === IDESolutionResultStatus.Complete && (
                          <span className={grade.passed ? "color-success" : "color-danger"}>
                            {grade.output || grade.errorMsg || ""}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {resultStatus === IDESolutionResultStatus.Complete && (
            <div className="markdown-card">
              <strong>채점 결과</strong>
              <p>{(countPassed / countAll) * 100} / 100</p>
            </div>
          )}
        </div>
      </IDESolutionResultContainer>
    )
  }

  return null
}

interface IDESolutionResultStyled {
  $resultType: IDESolutionResultProps["resultType"]
}

const IDESolutionResultContainer = styled.div<IDESolutionResultStyled>`
  flex: 1 1 0px;
  min-height: 0;
  padding: 16px;
  font-size: ${(props) => props.theme.typo.size.sm};
  line-height: ${(props) => props.theme.typo.leading.sm};
  overflow-y: auto;
  .markdown-card {
    .icon-loading {
      width: 16px;
    }
    table + table {
      margin-top: -1px;
    }
  }
  @media ${(props) => props.theme.screen.device.md} {
    flex: none;
    overflow-y: inherit;
  }
`

export default IDESolutionResult
