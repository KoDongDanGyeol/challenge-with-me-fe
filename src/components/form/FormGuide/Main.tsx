"use client";

import { FieldValues } from "react-hook-form";
import FormHoc, { FormHocMainProps } from "@/components/entry/FormHoc";
import { FormGuideTypes } from "@/components/form/FormGuide";
import Label from "@/components/entry/Label";
import Input from "@/components/entry/Input";
import Helper from "@/components/entry/Helper";
import Button from "@/components/general/Button";

export interface FormGuideMainProps<T extends FieldValues = FormGuideTypes>
  extends FormHocMainProps<T> {
  //
}

const FormGuideMain = FormHoc<FormGuideTypes>((props: FormGuideMainProps) => {
  const {
    formAction,
    formData,
    formPlaceholder,
    isLoading,
    handleValid,
    ...restProps
  } = props;

  const { control, handleSubmit, formState } = formData;

  return (
    <form
      id="form-guide"
      onSubmit={handleSubmit(handleValid)}
      noValidate
      {...restProps}
    >
      <div>
        <Label as="label" htmlFor="title" necessity="icon" isRequired={true}>
          제목
        </Label>
        <Input<FormGuideTypes>
          control={control}
          name="title"
          placeholder={formPlaceholder?.title}
          rules={{
            required: {
              value: true,
              message: "제목을 입력해 주세요",
            },
          }}
          type="text"
        />
        <Helper variants="error">{formState?.errors?.title?.message}</Helper>
      </div>

      <div className="action">
        <Button type="reset" emphasis="subtle" disabled={isLoading}>
          {formAction?.reset ?? "Reset"}
        </Button>
        <Button type="submit" emphasis="bold" disabled={isLoading}>
          {formAction?.submit ?? "Submit"}
        </Button>
      </div>
    </form>
  );
});

export default FormGuideMain;
