import LayoutMain, { LayoutMainProps } from "@/components/display/Layout/Main"
import LayoutHeader, { LayoutHeaderProps } from "@/components/display/Layout/Header"
import LayoutContent, { LayoutContentProps } from "@/components/display/Layout/Content"
import LayoutFooter, { LayoutFooterProps } from "@/components/display/Layout/Footer"

export type { LayoutMainProps, LayoutHeaderProps, LayoutContentProps, LayoutFooterProps }

export default Object.assign(LayoutMain, {
  Header: LayoutHeader,
  Content: LayoutContent,
  Footer: LayoutFooter,
})
