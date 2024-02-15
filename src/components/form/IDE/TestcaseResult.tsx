"use client"

import styled from "styled-components"

export interface IDETestcaseResultProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  errorMessage?: string
}

const IDETestcaseResult = (props: IDETestcaseResultProps) => {
  const { errorMessage, className = "", ...restProps } = props

  return (
    <IDETestcaseResultContainer className={`${className}`} {...restProps}>
      <div className="markdown">
        {errorMessage && (
          <div className="markdown-card">
            <p className="color-danger">{errorMessage}</p>
          </div>
        )}
        <div className="markdown-card">
          <ul>
            <li>
              <p>정수, 소수는 숫자를 입력하면 됩니다</p>
              <ul>
                <li>
                  <span className="code-inline">3.141597</span>
                </li>
              </ul>
            </li>
            <li>
              <p>문자열은 큰 따옴표를 이용해 입력해 주세요</p>
              <ul>
                <li>
                  <span className="code-inline">&quot;string&quot;</span>
                </li>
              </ul>
            </li>
            <li>
              <p>boolean은 true/false 소문자로 입력해 주세요</p>
              <ul>
                <li>
                  <span className="code-inline">true</span>
                </li>
                <li>
                  <span className="code-inline">false</span>
                </li>
              </ul>
            </li>
            <li>
              <p>배열을 입력하려면 아래와 같이 []로 감싸서 입력해 주세요</p>
              <ul>
                <li>
                  <span className="code-inline">[0, 1, 2, 3, 4]</span>
                </li>
                <li>
                  <span className="code-inline">[&quot;abc&quot;, &quot;cde&quot;]</span>
                </li>
                <li>
                  <span className="code-inline">[true, false, true]</span>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </IDETestcaseResultContainer>
  )
}

const IDETestcaseResultContainer = styled.div`
  flex: 1 1 0px;
  min-height: 0;
  padding: 16px;
  overflow-y: auto;
  @media ${(props) => props.theme.screen.device.md} {
    flex: none;
    overflow-y: inherit;
  }
`

export default IDETestcaseResult
