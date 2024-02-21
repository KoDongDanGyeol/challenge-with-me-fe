"use client"

import styled from "styled-components"

export interface ProfileContentProps extends React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>> {
  name: string
}

const ProfileContent = (props: ProfileContentProps) => {
  const { name, className = "", children, ...restProps } = props

  return (
    <ProfileContentContainer className={`${className}`} {...restProps}>
      <div className="row-title">
        <strong className="col-name">{name}</strong>
      </div>
      <div className="row-extra">{children}</div>
    </ProfileContentContainer>
  )
}

const ProfileContentContainer = styled.div`
  flex: 1 1 0px;
  overflow: hidden;
  .row-title {
  }
  .row-extra {
    display: flex;
    gap: 4px;
  }
  .col-name {
    display: block;
    font-size: ${(props) => props.theme.typo.size.sm};
    line-height: ${(props) => props.theme.typo.leading.sm};
    font-weight: 500;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .col-content {
    display: block;
    font-size: ${(props) => props.theme.typo.size.sm};
    line-height: ${(props) => props.theme.typo.leading.sm};
    color: rgb(var(--color-gray500));
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
`

export default ProfileContent
