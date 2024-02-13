"use client";
import Button from "@/components/general/Button";
import styled from "styled-components";

const SignUp = () => {
  return (
    <S.Container>
      <div>
        <h1>성장을 위한 도전,</h1>
        <h1>Challenge With Me</h1>
      </div>
      <div>
        <S.SignUpContainer>
          <p>회원가입</p>
          <div>
            <p>이름</p>
            <input type="text" />
          </div>
          <div>
            <p>이메일</p>
            <input type="email" />
          </div>
          <S.AgreeContainer>
            <div>
              <input type="checkbox" />
              <p>전체 동의</p>
            </div>
            <div>
              <input type="checkbox" />
              <p>
                <span>이용약관</span> 동의
              </p>
            </div>
            <div>
              <input type="checkbox" />
              <p>
                <span>개인정보처리방침</span> 동의
              </p>
            </div>
          </S.AgreeContainer>
          <Button
            as="button"
            emphasis="bold"
            shape="square"
            size="xl"
            variants="primary"
          >
            회원가입
          </Button>
        </S.SignUpContainer>
      </div>
    </S.Container>
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

const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  background-color: #fff;
  border-radius: 8px;
  padding: 30px;
  color: #000;
  gap: 20px;
  p {
    font-size: 20px;
    margin: 0px;
  }
  div {
    p {
      font-size: 18px;
      color: #374151;
      margin-bottom: 8px;
    }
    input {
      width: 100%;
      padding: 10px 4px 10px 4px;
      border: solid 1px #d1d5db;
      border-radius: 6px;
      box-sizing: border-box;
    }
    input[type="email"] {
      background-color: #f9fafb;
      color: #6b7280;
    }
  }
`;

const AgreeContainer = styled.div`
  div {
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;
    input[type="checkbox"] {
      width: 16px;
      height: 16px;
      margin-right: 10px;
      border: solid 1px #d1d5db;
    }
    p {
      margin: 0px;
      font-size: 14px;
      span {
        font-weight: bold;
        border-bottom: 1px solid #374151;
        color: #374151;
      }
    }
  }
`;

const S = {
  Container,
  SignUpContainer,
  AgreeContainer,
};
export default SignUp;
