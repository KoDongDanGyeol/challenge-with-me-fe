"use client"

import Input from "@/components/entry/Input"
import Label from "@/components/entry/Label"
import Button from "@/components/general/Button"
import { getCookie } from "cookies-next"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { styled } from "styled-components"
import { getMyPageData } from "../../_libs/myPageQuery"
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"

const EditProfile = () => {
  const { control, handleSubmit, formState } = useForm({
    defaultValues: {
      name: "",
    },
  })

  useEffect(() => {
    if (!cookieToken) {
      router.push("/signIn")
      // alert("로그인 후 이용 가능합니다")
      return
    }
  }, [])

  const router = useRouter()

  const cookieToken = getCookie("accessToken-token")
  const { data: myPageData } = useQuery({
    queryKey: ["myPage", cookieToken],
    queryFn: getMyPageData,
  })

  const updateProfile = async (data: object) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/backend/api/user/profile`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookieToken!.toString()}`,
      },
      body: JSON.stringify(data),
    })

    if (response.ok) {
      console.log("프로필 업데이트 성공")
      router.push("/myPage")
    } else {
      throw new Error("프로필 업데이트 실패")
    }

    return response.json()
  }

  return (
    <Container>
      <div className="content-wapper">
        <h2>프로필 변경</h2>
        <div className="img-change-box">
          {myPageData && <img src={myPageData.imgUrl} alt="profile" />}

          <ChangeButton emphasis="minimal" shape="square" size="xs" variants="primary">
            Change
          </ChangeButton>
        </div>
        <form className="name-change-box" onSubmit={handleSubmit(updateProfile)}>
          <Label>이름</Label>
          <Input
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
          <div className="row-action">
            <CancleButton emphasis="minimal" shape="square" size="xs" variants="primary">
              취소
            </CancleButton>
            <Button emphasis="bold" shape="square" size="xs" variants="primary">
              저장
            </Button>
          </div>
        </form>
      </div>
    </Container>
  )
}

export default EditProfile

const Container = styled.div`
  max-width: 1280px;
  padding: 40px 32px 0px 32px;
  margin: 0 auto;

  .content-wapper {
    display: flex;
    flex-direction: column;
    gap: 24px;
    h2 {
      font-size: ${(props) => props.theme.typo.size.lg};
      line-height: ${(props) => props.theme.typo.leading.lg};
      font-weight: 400;
    }
  }

  .img-change-box {
    display: flex;
    align-items: center;
    gap: 20px;
    Button {
      max-width: 78px;
      max-height: 34px;
    }
    img {
      max-width: 48px;
      max-height: 48px;
      border-radius: 112px;
    }
  }

  .name-change-box {
    display: flex;
    flex-direction: column;
    gap: 24px;
    Label {
      color: rgb(var(--color-gray700));
      font-size: ${(props) => props.theme.typo.size.xs};
      line-height: ${(props) => props.theme.typo.leading.xs};
      font-weight: 400;
    }
  }
  .row-action {
    display: flex;
    justify-content: end;
    gap: 12px;

    Button {
      padding: 8px 16px;
      font-weight: 400;
    }
  }
`

const ChangeButton = styled(Button)`
  border: 1px solid rgb(var(--color-gray300));
  color: rgb(var(--color-gray700));
  padding: 8px 12px;
`
const CancleButton = styled(Button)`
  border: 1px solid rgb(var(--color-gray300));
  color: rgb(var(--color-gray700));
`
