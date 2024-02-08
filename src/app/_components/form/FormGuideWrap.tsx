"use client";

import { useForm } from "react-hook-form";
import FormGuide, { FormGuideTypes } from "@/components/form/FormGuide";

interface FormGuideWrapProps extends React.HTMLAttributes<HTMLDivElement> {
  //
}

const FormGuideWrap = (props: FormGuideWrapProps) => {
  // const {} = props;

  const example = useForm<FormGuideTypes>({
    defaultValues: {
      title: "",
    },
  });

  const submit = (data: FormGuideTypes) => {
    console.log(data);
  };

  return (
    <FormGuide
      formAction={{
        submit: "Submit Action",
      }}
      formData={example}
      formPlaceholder={{
        title: "Title Placeholder",
      }}
      handleValid={submit}
    />
  );
};

export default FormGuideWrap;
