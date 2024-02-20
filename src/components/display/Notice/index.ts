import { NoticeType, NoticeIconStatus } from "@/components/display/Notice/type"
import NoticeMain, { NoticeMainProps } from "@/components/display/Notice/Main"
import NoticeIcon, { NoticeIconProps } from "@/components/display/Notice/Icon"
import NoticeTitle, { NoticeTitleProps } from "@/components/display/Notice/Title"
import NoticeDescription, { NoticeDescriptionProps } from "@/components/display/Notice/Description"
import NoticeAction, { NoticeActionProps } from "@/components/display/Notice/Action"

export type {
  NoticeType,
  NoticeIconStatus,
  NoticeMainProps,
  NoticeIconProps,
  NoticeTitleProps,
  NoticeDescriptionProps,
  NoticeActionProps,
}

export default Object.assign(NoticeMain, {
  Icon: NoticeIcon,
  Title: NoticeTitle,
  Description: NoticeDescription,
  Action: NoticeAction,
})
