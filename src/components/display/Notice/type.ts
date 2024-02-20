export const NoticeType = {
  Block: "block",
  Content: "content",
} as const

export type NoticeType = (typeof NoticeType)[keyof typeof NoticeType]

export const NoticeIconStatus = {
  Success: "success",
  Danger: "danger",
} as const

export type NoticeIconStatus = (typeof NoticeIconStatus)[keyof typeof NoticeIconStatus]
