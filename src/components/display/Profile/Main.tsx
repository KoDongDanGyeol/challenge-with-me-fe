"use client"

import styled from "styled-components"

export interface ProfileMainProps extends React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>> {
  //
}

const ProfileMain = (props: ProfileMainProps) => {
  const { className = "", children, ...restProps } = props

  return (
    <ProfileMainContainer className={`${className}`} {...restProps}>
      {children}
    </ProfileMainContainer>
  )
}

const ProfileMainContainer = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`

export default ProfileMain
