import PageHeadingMain, { PageHeadingMainProps } from "@/components/display/PageHeading/Main"
import PageHeadingBreadcrumb, { PageHeadingBreadcrumbProps } from "@/components/display/PageHeading/Breadcrumb"
import PageHeadingTitle, { PageHeadingTitleProps } from "@/components/display/PageHeading/Title"

export type { PageHeadingMainProps, PageHeadingBreadcrumbProps, PageHeadingTitleProps }

export default Object.assign(PageHeadingMain, {
  Breadcrumb: PageHeadingBreadcrumb,
  Title: PageHeadingTitle,
})
