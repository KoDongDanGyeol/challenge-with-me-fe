"use client"

import styled from "styled-components"
import { IconName, Icons } from "@/components/general/Icon"

export interface IconProps extends React.SVGAttributes<SVGElement> {
  name: keyof typeof IconName
}

const IconMain = (props: IconProps) => {
  const { name, ...restProps } = props
  return <IconMainContainer as={Icons[name]} {...restProps} />
}

const IconMainContainer = styled.div`
  //
`

export default IconMain
