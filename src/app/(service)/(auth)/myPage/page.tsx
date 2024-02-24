"use client"

import Label from "@/components/entry/Label"
import Button from "@/components/general/Button"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

import { styled } from "styled-components"

const MyPage = () => {
  const router = useRouter()

  const handleProfileChangeClick = () => {
    router.push("/myPage/editProfile")
  }
  const { status, data: session } = useSession()

  useEffect(() => {
    console.log(session)
  })

  return (
    <Container>
      <div className="content-wapper">
        <div className="profile">
          {session && session.user && session.user!.image && <img src={session.user.image} alt="Profile" />}

          {session && <div>{session.user!.name}</div>}
          <Button emphasis="subtle" shape="square" size="xs" variants="primary" onClick={handleProfileChangeClick}>
            프로필 변경
          </Button>
        </div>
        <div className="profile-info-box">
          <div className="title">
            <h2>계정 정보</h2>
          </div>
          <div className="email-info-box">
            <Label>이메일</Label>
            {session && <div className="email-info">{session.user!.email}</div>}
          </div>
          <div className="bar"></div>
          <div className="profile-remove-box">
            <h2>계정 삭제</h2>
            <p>계정 삭제 시 프로필 및 응시란 테스트 정보가 삭제가 됩니다.</p>
            <div className="row-action">
              <RemoveButton emphasis="bold" shape="square" size="xs" variants="primary">
                삭제
              </RemoveButton>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default MyPage

const Container = styled.div`
  max-width: 1280px;
  padding: 40px 32px 0px 32px;
  margin: 0 auto;
  h2 {
    font-weight: 400;
    font-size: ${(props) => props.theme.typo.size.lg};
    line-height: ${(props) => props.theme.typo.leading.lg};
  }
  .content-wapper {
    width: 100%;
    display: flex;
    gap: 33px;
    justify-content: center;
  }

  .profile {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 12px;
    img {
      border-radius: 112px;
      width: 200px;
      height: 200px;
    }
    Button {
      width: 100%;
    }
  }

  .title {
    margin-bottom: 24px;
  }

  .profile-info-box {
    width: 100%;
    Label {
      color: rgb(var(--color-gray900));
      font-size: ${(props) => props.theme.typo.size.xs};
      line-height: ${(props) => props.theme.typo.leading.xs};
    }
  }

  .email-info-box {
    gap: 4px;
  }

  .email-info {
    color: rgb(var(--color-gray500));
    font-size: ${(props) => props.theme.typo.size.base};
    line-height: ${(props) => props.theme.typo.leading.base};
  }

  .bar {
    width: 100%;
    height: 1px;
    background-color: rgb(var(--color-gray200));
    margin: 24px 0;
  }

  .profile-remove-box {
    display: flex;
    flex-direction: column;
    gap: 24px;
    p {
      width: 100%;
      background-color: rgb(var(--color-yellow50));
      color: rgb(var(--color-red800));
      font-size: ${(props) => props.theme.typo.size.xs};
      line-height: ${(props) => props.theme.typo.leading.xs};
      padding: 16px;
      border-radius: 6px;
    }
    div {
      text-align: right;
    }
  }
`
const RemoveButton = styled(Button)`
  background-color: rgb(var(--color-red100));
  border: none;
  color: rgb(var(--color-red700));
  font-size: ${(props) => props.theme.typo.size.xs};
  line-height: ${(props) => props.theme.typo.leading.xs};
  padding: 8px 16px;
`
