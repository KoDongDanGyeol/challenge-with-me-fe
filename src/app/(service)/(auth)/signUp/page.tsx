"use client"
import CheckboxMain from "@/components/entry/CheckBox/Main"
import Input from "@/components/entry/Input"
import InputMain from "@/components/entry/Input/Main"
import Button from "@/components/general/Button"
import { useForm } from "react-hook-form"
import styled from "styled-components"

const SignUp = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm()

  return (
    <S.Container>
      <div>
        <h2>
          성장을 위한 도전,
          <br />
          Challenge With Me
        </h2>
      </div>
      <div>
        <S.SignUpContainer>
          <h3>회원가입</h3>
          <div>
            <p>이름</p>
            <InputMain
              control={control}
              name="name"
              rules={{ required: true }}
              type="text"
              placeholder="이름을 입력해주세요"
            />
          </div>
          <div>
            <p>이메일</p>
            <InputMain control={control} name="email" rules={{ required: true }} type="email" disabled={true} />
          </div>
          <S.AgreeContainer>
            <div>
              <CheckboxMain control={control} name="checkbox" />
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
          <Button emphasis="bold" shape="square" size="xl" variants="primary">
            회원가입
          </Button>
        </S.SignUpContainer>
      </div>
    </S.Container>
  )
}

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
    h2 {
      font-size: 28px;
      margin: 0;
    }
  }
`

const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  background-color: #fff;
  border-radius: 8px;
  padding: 30px;
  color: #000;
  gap: 20px;

  div {
    p {
      font-size: 18px;
      color: #374151;
      margin-bottom: 8px;
    }
  }
`

const AgreeContainer = styled.div`
  div {
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;
    p {
      font-size: 14px;
      span {
        font-weight: bold;
        border-bottom: 1px solid #374151;
        color: #374151;
      }
    }
  }
`

const S = {
  Container,
  SignUpContainer,
  AgreeContainer,
}
export default SignUp
