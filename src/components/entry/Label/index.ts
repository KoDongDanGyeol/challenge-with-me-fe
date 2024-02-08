import LabelMain, {
  LabelMainProps,
  LabelMainComponent,
} from "@/components/entry/Label/Main";

export const LabelNecessity = {
  Icon: "icon",
  Text: "text",
} as const;

export type LabelNecessity =
  (typeof LabelNecessity)[keyof typeof LabelNecessity];

export type { LabelMainProps, LabelMainComponent };

export default Object.assign(LabelMain, {
  //
});
