"use client"

import Button from "@/components/general/Button"
import IconMain from "@/components/general/Icon"
import styled from "styled-components"

const SignIn = () => {
  return (
    <Container>
      <div>
        <h2>
          성장을 위한 도전,
          <br />
          Challenge With Me
        </h2>
      </div>
      <div>
        <SignInContainer>
          <h3>로그인</h3>
          <Button emphasis="bold" shape="square" size="lg" variants="primary">
            <GoogleSymbol name="SymbolGoogle" />
            Google로 시작하기
          </Button>
          <GithubLoginButton emphasis="bold" shape="square" size="lg" variants="primary">
            <GithubSymbol name="SymbolGithub" />
            Github로 시작하기
          </GithubLoginButton>
        </SignInContainer>
      </div>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 0 32px;
  align-items: center;
  background-color: #001640;
  color: #ffffff;
  min-height: 100%;
  div {
    max-width: 600px;
    flex: 1;
    h2 {
      font-size: 28px;
      margin: 0;
    }
  }
`

const SignInContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  background-color: #fff;
  border-radius: 8px;
  padding: 30px;
  gap: 24px;
  h3 {
    color: #000;
    font-size: 18px;
    font-weight: 500;
  }
  Button {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  svg {
    width: 30px;
    margin-top: 3px;
  }
`

const GithubLoginButton = styled(Button)`
  background-color: #4b5563;
  color: white;
  border: none;

  &:hover {
    background-color: #353f49;
  }
`

const GoogleSymbol = styled(IconMain)`
  width: 16px;
  height: 16px;
`

const GithubSymbol = styled(IconMain)`
  width: 16px;
  height: 16px;
`

export default SignIn
