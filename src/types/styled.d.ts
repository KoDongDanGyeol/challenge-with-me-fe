import "styled-components";
import { Theme } from "@/stores/theme";
import { Color } from "@/styles/theme/color";
import { ScreenDevice, TypeScreenSize } from "@/styles/theme/screen";
import { TypoLeading, TypoSize } from "@/styles/theme/typo";

declare module "styled-components" {
  export interface DefaultTheme
    extends Record<"color", Record<Theme, Color>>,
      Record<
        "screen",
        Record<"device", ScreenDevice> & Record<"size", TypeScreenSize>
      >,
      Record<
        "typo",
        Record<"leading", TypoLeading> & Record<"size", TypoSize>
      > {}
}
