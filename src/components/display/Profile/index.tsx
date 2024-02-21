import ProfileMain, { ProfileMainProps } from "@/components/display/Profile/Main"
import ProfilePicture, { ProfilePictureProps } from "@/components/display/Profile/Picture"
import ProfileContent, { ProfileContentProps } from "@/components/display/Profile/Content"

export type { ProfileMainProps, ProfilePictureProps, ProfileContentProps }

export default Object.assign(ProfileMain, {
  Picture: ProfilePicture,
  Content: ProfileContent,
})
