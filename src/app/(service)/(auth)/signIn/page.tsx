"use client";

import Button from "@/components/general/Button";
import styled from "styled-components";

const SignIn = () => {
  return (
    <Container>
      <div>
        <h1>성장을 위한 도전,</h1>
        <h1>Challenge With Me</h1>
      </div>
      <div>
        <SignInContainer>
          <p>로그인</p>
          <Button
            as="button"
            emphasis="bold"
            shape="square"
            size="lg"
            variants="primary"
          >
            Google로 시작하기
          </Button>
          <GithubLoginButton
            as="button"
            emphasis="bold"
            shape="square"
            size="lg"
            variants="primary"
          >
            Github로 시작하기
          </GithubLoginButton>
        </SignInContainer>
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: #001640;
  color: #ffffff;
  padding: 40px 80px;
  div {
    max-width: 600px;
    flex: 1;
    h1 {
      font-size: 28px;
      margin: 0;
    }
  }
`;

const SignInContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  background-color: #fff;
  border-radius: 8px;
  padding: 30px;
  gap: 20px;
  p {
    color: #000;
    font-size: 20px;
    margin: 0px;
  }
`;

const GithubLoginButton = styled(Button)`
  background-color: #4b5563;
  color: white;
  border: none;

  &:hover {
    background-color: #353f49;
  }
`;

export default SignIn;
