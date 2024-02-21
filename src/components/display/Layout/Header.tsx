"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { useRecoilState } from "recoil"
import { styled } from "styled-components"
import { Timer, clearTimer, setTimer } from "@/libs/timer"
import useFocusTrap from "@/libs/hook/useFocusTrap"
import { atomGlobal } from "@/stores/global"
import Button from "@/components/general/Button"
import Icon from "@/components/general/Icon"
import Logo from "/public/logo.svg"

export interface LayoutHeaderProps extends React.HTMLAttributes<HTMLElement> {
  //
}

const LayoutHeader = (props: LayoutHeaderProps) => {
  const { className = "", ...restProps } = props

  const pathname = usePathname()
  const timers = useRef<Timer>({ delay: null })
  const [global, setGlobal] = useRecoilState(atomGlobal)
  const [header, setHeader] = useState({ isHeaderActivated: false })
  const { focusTrapRefs, onActivate, onDeactivate } = useFocusTrap(false, [["Escape", () => toggleSidebar(false)]])

  const toggleSidebar = useCallback(
    async (isActivate: boolean) => {
      if (isActivate) {
        document.body.classList.add("header-opened")
        setGlobal((prev) => ({ ...prev, isHeaderOpened: isActivate }))
        clearTimer(timers, { key: "delay" })
        await setTimer(timers, { key: "delay", delay: 0 })
        setHeader((prev) => ({ ...prev, isHeaderActivated: isActivate }))
        clearTimer(timers, { key: "delay" })
        await setTimer(timers, { key: "delay", delay: 200 })
        onActivate()
        return
      }
      document.body.classList.remove("header-opened")
      setHeader((prev) => ({ ...prev, isHeaderActivated: isActivate }))
      clearTimer(timers, { key: "delay" })
      await setTimer(timers, { key: "delay", delay: 200 })
      setGlobal((prev) => ({ ...prev, isHeaderOpened: isActivate }))
      clearTimer(timers, { key: "delay" })
      await setTimer(timers, { key: "delay", delay: 0 })
      onDeactivate()
    },
    [onActivate, onDeactivate, setGlobal],
  )

  useEffect(() => {
    toggleSidebar(false)
  }, [pathname, toggleSidebar])

  useEffect(() => {
    document.body.classList.remove("header-opened")
    setGlobal((prev) => ({ ...prev, isHeaderOpened: false }))
    setHeader((prev) => ({ ...prev, isHeaderActivated: false }))
  }, [global.screen, setGlobal])

  return (
    <LayoutHeaderContainer className={`${className}`} {...restProps}>
      <div className="inner">
        <LayoutHeaderLogo>
          <Link href="/">
            <Image src={Logo} width={120} alt="logo" />
          </Link>
        </LayoutHeaderLogo>
        <LayoutHeaderNavigation
          ref={focusTrapRefs.containerRef}
          className={`${global.isHeaderOpened ? "opened" : ""} ${header.isHeaderActivated ? "activated" : ""}`}
        >
          <LayoutHeaderLink>
            <ul className="link-menu">
              <li>
                <Link href="/challenges" className={pathname.startsWith("/challenges") ? "current" : ""}>
                  챌린지
                </Link>
              </li>
              <li>
                <Link href="/questions" className={pathname.startsWith("/questions") ? "current" : ""}>
                  질문/답변
                </Link>
              </li>
              {/* <li>
                <Link href="/user/activity" className={pathname.startsWith("/user/activity") ? "current" : ""}>
                  활동기록
                </Link>
              </li> */}
            </ul>
            <ul className="link-util">
              <li>
                <Link href="/auth/login" passHref={true} legacyBehavior={true}>
                  <Button asTag="a" shape="plain" variants="secondary" emphasis="minimal">
                    로그인
                  </Button>
                </Link>
              </li>
              <li>
                <Link href="/user" passHref={true} legacyBehavior={true}>
                  <Button asTag="a" shape="plain" variants="secondary" emphasis="minimal">
                    마이페이지
                  </Button>
                </Link>
              </li>
              <li>
                <Button asTag="button" shape="plain" variants="secondary" emphasis="minimal">
                  로그아웃
                </Button>
              </li>
            </ul>
          </LayoutHeaderLink>
          <LayoutHeaderControl
            ref={focusTrapRefs.returnRef}
            type="button"
            onClick={() => toggleSidebar(!global.isHeaderOpened)}
          >
            <Icon name={global.isHeaderOpened ? "XMark" : "Bars"} aria-hidden="true" />
            <span className="sr-only">{global.isHeaderOpened ? "닫기" : "열기"}</span>
          </LayoutHeaderControl>
        </LayoutHeaderNavigation>
      </div>
    </LayoutHeaderContainer>
  )
}

const LayoutHeaderLogo = styled.h1`
  a {
    display: inline-flex;
    align-items: center;
    width: 100%;
    height: 100%;
  }
`

const LayoutHeaderLink = styled.nav`
  display: flex;
  justify-content: space-between;
  .link-menu {
    display: flex;
    gap: 16px;
    a,
    button {
      position: relative;
      display: inline-flex;
      align-items: center;
      width: 100%;
      height: 100%;
      padding: 0 6px;
      color: rgb(var(--color-gray900));
      &.current:after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 2px;
        background: rgb(var(--color-primary500));
        z-index: -1;
      }
    }
  }
  .link-util {
    display: flex;
    gap: 2px;
    a,
    button {
      display: inline-flex;
      align-items: center;
      width: 100%;
      height: 100%;
      padding: 0 6px;
    }
  }
  @media ${(props) => props.theme.screen.device.md} {
    flex-direction: column;
    justify-content: flex-start;
    ul + ul {
      margin-top: 12px;
      padding-top: 12px;
      border-top: 1px solid rgb(var(--color-gray200));
    }
    .link-menu {
      flex-direction: column;
      gap: 4px;
      a,
      button {
        padding: 6px 8px;
        &.current {
          background: rgb(var(--color-gray200));
          border-radius: 6px;
        }
        &.current:after {
          content: none;
        }
      }
    }
    .link-util {
      flex-direction: column;
      gap: 4px;
      a,
      button {
        padding: 6px 8px;
      }
    }
  }
`

const LayoutHeaderControl = styled.button`
  position: absolute;
  top: 50%;
  right: 8px;
  display: block;
  width: 40px;
  padding: 8px;
  transform: translateY(-50%);
  svg {
    width: 100%;
    stroke: rgb(var(--color-gray400));
  }
`

const LayoutHeaderNavigation = styled.div`
  flex: 1 1 0px;
  padding-left: 24px;
  ${LayoutHeaderLink} {
    height: 100%;
  }
  ${LayoutHeaderControl} {
    display: none;
  }
  @media ${(props) => props.theme.screen.device.md} {
    ${LayoutHeaderLink} {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      display: none;
      height: max-content;
      max-height: 0px;
      padding: 16px 8px;
      background: rgb(var(--color-gray0));
      border-bottom: 1px solid rgb(var(--color-gray200));
      overflow: hidden;
      transition: max-height 150ms ease-out;
    }
    ${LayoutHeaderControl} {
      display: block;
    }
    &.opened ${LayoutHeaderLink} {
      display: block;
    }
    &.activated ${LayoutHeaderLink} {
      max-height: 400px;
    }
  }
`

const LayoutHeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 64px;
  background: rgb(var(--color-gray0));
  border-bottom: 1px solid rgb(var(--color-gray200));
  z-index: 999;
  > .inner {
    margin: 0 auto;
    display: flex;
    width: 100%;
    height: 100%;
    max-width: 1280px;
    padding: 0 32px;
  }
  & + div {
    padding-top: 64px;
  }
  @media ${(props) => props.theme.screen.device.md} {
    > .inner {
      padding: 0 16px;
    }
  }
`

export default LayoutHeader
