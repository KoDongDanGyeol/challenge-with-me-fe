"use client"

import { useEffect, useMemo } from "react"
import { useRecoilState } from "recoil"
import { styled } from "styled-components"
import { ObjectEntries } from "@/libs/utils"
import useResize from "@/libs/hook/useResize"
import { atomGlobal } from "@/stores/global"
import { ScreenSize, screenSize } from "@/styles/theme/screen"

export interface LayoutMainProps extends React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>> {
  //
}

const LayoutMain = (props: LayoutMainProps) => {
  const { className = "", children, ...restProps } = props

  const { resizeStructure } = useResize()
  const [global, setGlobal] = useRecoilState(atomGlobal)

  const currentScreen = useMemo<(keyof ScreenSize)[]>(() => {
    const result = [] as (keyof ScreenSize)[]
    const sizes = Object.entries(screenSize) as ObjectEntries<typeof screenSize>
    sizes.sort(([, a], [, b]) => parseInt(a) - parseInt(b))
    if (resizeStructure.windowInnerWidth === 0) {
      return result
    }
    for (const [key, value] of sizes) {
      result.push(key)
      if (resizeStructure.windowInnerWidth <= parseInt(value)) break
    }
    return result
  }, [resizeStructure.windowInnerWidth])

  useEffect(() => {
    if (JSON.stringify(global.screen) !== JSON.stringify(currentScreen)) {
      setGlobal((prev) => ({
        ...prev,
        screen: currentScreen,
      }))
    }
  }, [currentScreen, global.screen, setGlobal])

  return (
    <LayoutMainContainer className={`${className}`} {...restProps}>
      {children}
    </LayoutMainContainer>
  )
}

const LayoutMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

export default LayoutMain
