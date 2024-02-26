"use client"

import Label from "@/components/entry/Label"
import Button from "@/components/general/Button"
import { getMyPageData } from "@/app/(service)/(auth)/_libs/myPageQuery"
import { useQuery } from "@tanstack/react-query"
import { deleteCookie, getCookie } from "cookies-next"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { styled } from "styled-components"
import { signOut } from "next-auth/react"

// interface MyPageData {
//   name: string
//   email: string
//   imgUrl: string
// }
const MyPage = () => {
  const router = useRouter()
  const cookieToken = getCookie("accessToken-token")

  const handleProfileChangeClick = () => {
    router.push("/myPage/editProfile?")
  }

  useEffect(() => {
    if (!cookieToken) {
      router.push("/signIn")
      // alert("로그인 후 이용 가능합니다")
      return
    }
  }, [])

  const { data: myPageData } = useQuery({
    queryKey: ["myPage", cookieToken],
    queryFn: getMyPageData,
  })

  const deleteAccount = async () => {
    const result = confirm("정말 삭제하시겠습니까?")
    if (result === true) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/backend/api/user/withdrawal`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookieToken!.toString()}`,
        },
      })

      if (response.ok) {
        console.log("계정 삭제 성공")
        deleteCookie("accessToken-token")
        signOut({ callbackUrl: "/signIn" })
      } else {
        throw new Error("계정 삭제 실패")
      }

      return response.json()
    }
  }

  return (
    <Container>
      <div className="content-wapper">
        <div className="profile">
          <div className="profile-img">{myPageData && <img src={myPageData.imgUrl} alt="Profile" />}</div>
          {myPageData && <div>{myPageData.name}</div>}
          <Button emphasis="subtle" shape="square" size="xs" variants="primary" onClick={handleProfileChangeClick}>
            프로필 변경
          </Button>
        </div>
        <div className="bar1"></div>
        <div className="profile-info-box">
          <div className="title">
            <h2>계정 정보</h2>
          </div>
          <div className="email-info-box">
            <Label>이메일</Label>
            {myPageData && <div className="email-info">{myPageData.email}</div>}
          </div>
          <div className="bar2"></div>
          <div className="profile-remove-box">
            <h2>계정 삭제</h2>
            <p>계정 삭제 시 프로필 및 응시란 테스트 정보가 삭제가 됩니다.</p>
            <div className="row-action">
              <RemoveButton emphasis="bold" shape="square" size="xs" variants="primary" onClick={() => deleteAccount()}>
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
  @media (max-width: 768px) {
    h2 {
      font-size: ${(props) => props.theme.typo.size.lg};
      line-height: ${(props) => props.theme.typo.leading.lg};
    }
  }
  .content-wapper {
    width: 100%;
    display: flex;
    gap: 33px;
    justify-content: center;
    @media (max-width: 768px) {
      flex-direction: column;
    }
  }

  .profile {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 12px;
    .profile-img {
      max-width: 212px;
    }
    img {
      width: 212px;
      border-radius: 112px;
    }
    Button {
      width: 100%;
      display: flex;
      justify-content: center;
    }
    @media (max-width: 768px) {
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: start;
      .profile-img {
        max-width: 64px;
      }
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

  .bar1 {
    display: none;

    @media (max-width: 768px) {
      display: block;
      width: 100%;
      height: 1px;
      background-color: rgb(var(--color-gray200));
    }
  }

  .bar2 {
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
    .row-action {
      display: flex;
      justify-content: right;
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
