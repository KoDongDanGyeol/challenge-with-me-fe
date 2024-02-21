"use client"

import styled from "styled-components"
import Picture, { PictureMainProps } from "@/components/display/Picture"

export interface ProfilePictureProps extends React.HTMLAttributes<HTMLDivElement> {
  src: PictureMainProps["src"]
}

const ProfilePicture = (props: ProfilePictureProps) => {
  const { src, className = "", ...restProps } = props

  return (
    <ProfilePictureContainer className={`${className}`} {...restProps}>
      <Picture ratio={[1, 1]} rounded="full" src={src} alt="" />
    </ProfilePictureContainer>
  )
}

const ProfilePictureContainer = styled.div`
  width: 40px;
`

export default ProfilePicture
