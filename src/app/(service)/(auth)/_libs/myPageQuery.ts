import { getCookie } from "cookies-next"

export const getMyPageData = async () => {
  const cookieToken = getCookie("accessToken-token")
  if (!cookieToken) throw new Error("로그인 후 이용 가능합니다.")

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/api/user/mypage`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${cookieToken.toString()}`,
    },
  })

  if (!response.ok) throw new Error("프로필 정보를 가져오는 데 실패했습니다.")

  return response.json()
}
