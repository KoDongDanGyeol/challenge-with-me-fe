"use client"

import Button from "@/components/general/Button"
import IconMain from "@/components/general/Icon"
import { getCookie, hasCookie, setCookie } from "cookies-next"
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import styled from "styled-components"

const SignIn = () => {
  const [loginCheck, setLoginCheck] = useState(false)
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "authenticated") {
      if (hasCookie("accessToken-token") === true) {
        router.push("/challenges")
      } else {
        sendSessionInfo()
      }
    }
  }, [status])

  const sendSessionInfo = async () => {
    if (session && session.user) {
      const params = new URLSearchParams()
      params.append("name", session.user.name || "")
      params.append("email", session.user.email || "")
      params.append("img", session.user.image || "")

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/backend/api/oauth/login/google`, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: params,
        })

        if (response.ok) {
          console.log("전송 성공")
          const data = await response.json()
          setCookie("accessToken-token", data.accessToken)
          router.push("/challenges")
        } else {
          console.error("전송 실패")
          setLoginCheck(true)
        }
      } catch (error) {
        console.error("Error", error)
      }
    }
  }

  return (
    <Container>
      <div className="inner">
        <TitleContainer>
          <h2>
            성장을 위한 도전,
            <br />
            Challenge With Me
          </h2>
        </TitleContainer>

        <SignInContainer>
          <h3>로그인</h3>
          <Button
            emphasis="bold"
            shape="square"
            size="lg"
            variants="primary"
            onClick={() => {
              signIn("GoogleProvider")
            }}
          >
            <GoogleSymbol name="SymbolGoogle" />
            Google로 시작하기
            {loginCheck && <span className="login-fail">로그인 실패</span>}
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
  @media (max-width: 768px) {
    height: auto;
    .inner {
      padding: 0;
      flex-direction: column;
      gap: 0px;
    }
  }
`

const TitleContainer = styled.div`
  width: 100%;
  color: rgb(var(--color-gray0));
  h2 {
    font-size: ${(props) => props.theme.typo.size.xl};
    line-height: ${(props) => props.theme.typo.leading.xl};
  }
  @media (max-width: 768px) {
    padding: 24px 16px;
    h2 {
      font-size: ${(props) => props.theme.typo.size.lg};
      line-height: ${(props) => props.theme.typo.leading.lg};
    }
  }
`

const SignInContainer = styled.div`
  max-width: 600px;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: rgb(var(--color-gray0));
  border-radius: 8px;
  padding: 32px 40px;
  gap: 24px;

  Button {
    position: relative;
    justify-content: center;
  }
  svg {
    width: 30px;
    margin-top: 3px;
  }
  @media (max-width: 768px) {
    max-width: 100%;
    padding: 24px 16px 0px 16px;
    border-radius: 0;
  }

  .login-fail {
    position: absolute;
    top: 40px;
    left: 90px;
    color: rgb(var(--color-red600));
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
