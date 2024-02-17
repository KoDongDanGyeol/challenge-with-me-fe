import PageFilterMain, { PageFilterMainProps } from "@/components/display/PageFilter/Main"
import PageFilterSearch, { PageFilterSearchProps } from "@/components/display/PageFilter/Search"
import PageFilterBadge, { PageFilterBadgeProps } from "@/components/display/PageFilter/Badge"
import PageFilterTitle, { PageFilterTitleProps } from "@/components/display/PageFilter/Title"
import PageFilterAction, { PageFilterActionProps } from "@/components/display/PageFilter/Action"

export type {
  PageFilterMainProps,
  PageFilterSearchProps,
  PageFilterBadgeProps,
  PageFilterTitleProps,
  PageFilterActionProps,
}

export default Object.assign(PageFilterMain, {
  Search: PageFilterSearch,
  Badge: PageFilterBadge,
  Title: PageFilterTitle,
  Action: PageFilterAction,
})
