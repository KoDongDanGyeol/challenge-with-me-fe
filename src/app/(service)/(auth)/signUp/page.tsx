"use client"

import { useForm } from "react-hook-form"
import styled from "styled-components"
import Label from "@/components/entry/Label"
import Input from "@/components/entry/Input"
import Checkbox from "@/components/entry/CheckBox"
import Helper from "@/components/entry/Helper"
import Button from "@/components/general/Button"

interface SignUpType {
  name: string
  email: string
  checkAll: boolean
  checkTerms1: boolean
  checkTerms2: boolean
}

const SignUp = () => {
  const { control, formState, handleSubmit } = useForm<SignUpType>({
    defaultValues: {
      name: "",
      email: "lorem@ipsum.com",
      checkAll: false,
      checkTerms1: false,
      checkTerms2: false,
    },
  })

  const onSubmit = (data: SignUpType) => {
    console.log(data)
  }

  return (
    <S.Container>
      <div className="inner">
        <S.TitleContainer>
          <h2>
            성장을 위한 도전,
            <br />
            Challenge With Me
          </h2>
        </S.TitleContainer>
        <S.SignUpContainer noValidate onSubmit={handleSubmit(onSubmit)}>
          <h3>회원가입</h3>
          <div className="row-input">
            <Label htmlFor="name">이름</Label>
            <Input<SignUpType>
              control={control}
              name="name"
              rules={{
                required: {
                  value: true,
                  message: "이름을 입력해주세요.",
                },
              }}
              type="text"
              placeholder=""
            />
            <Helper variants="error">{formState.errors.name?.message}</Helper>
          </div>
          <div className="row-input">
            <Label htmlFor="email">이메일</Label>
            <Input<SignUpType>
              control={control}
              name="email"
              type="email"
              rules={{
                required: {
                  value: true,
                  message: "이름을 입력해주세요.",
                },
              }}
              placeholder="이메일을 입력해주세요"
              disabled={true}
            />
          </div>
          <div className="row-checkbox">
            <Checkbox<SignUpType>
              control={control}
              name="checkAll"
              rules={{
                required: {
                  value: true,
                  message: "",
                },
              }}
            >
              전체 동의
            </Checkbox>
            <Checkbox<SignUpType>
              control={control}
              name="checkTerms1"
              rules={{
                required: {
                  value: true,
                  message: "",
                },
              }}
            >
              이용약관 동의
            </Checkbox>
            <Checkbox<SignUpType>
              control={control}
              name="checkTerms2"
              rules={{
                required: true,
              }}
            >
              개인정보처리방침 동의
            </Checkbox>
          </div>
          <div className="row-action">
            <Button emphasis="bold" shape="square" size="lg" variants="primary">
              회원가입
            </Button>
          </div>
        </S.SignUpContainer>
      </div>
    </S.Container>
  )
}

const Container = styled.section`
  display: flex;
  align-items: center;
  height: 100%;
  background-color: rgb(var(--color-primary900));
  .inner {
    margin: 0 auto;
    width: 100%;
    max-width: 1280px;
    padding: 40px 32px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 64px;
  }
`

const TitleContainer = styled.div`
  width: 100%;
  color: rgb(var(--color-gray0));
  h2 {
    font-size: ${(props) => props.theme.typo.size.xl};
    line-height: ${(props) => props.theme.typo.leading.xl};
  }
`

const SignUpContainer = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  max-width: 600px;
  background-color: rgb(var(--color-gray0));
  border-radius: 8px;
  padding: 32px 40px;
  gap: 24px;
  .row-input {
    label + div {
      margin-top: 4px;
    }
  }
  .row-checkbox {
    div + div {
      margin-top: 24px;
    }
  }
  .row-action {
    text-align: right;
  }
`

const S = {
  Container,
  TitleContainer,
  SignUpContainer,
}
export default SignUp
