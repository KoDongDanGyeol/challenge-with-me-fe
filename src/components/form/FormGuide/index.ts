import { FieldValues } from "react-hook-form";
import FormGuideMain, {
  FormGuideMainProps,
} from "@/components/form/FormGuide/Main";

export interface FormGuideTypes extends FieldValues {
  title: string;
}

export type { FormGuideMainProps };

export default Object.assign(FormGuideMain, {
  //
});
