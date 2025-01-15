import React from "react";

interface Props<T extends FieldValues> {
  schema: ZodType<T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>;
  type: "SIGN_IN" | "SIGN_UP";
}

const AuthForm = ({ type, schema, defualtValues, onSubmit }: Props) => {
  return (
    <div>
      AuthForm
      <p>Text</p>
    </div>
  );
};
export default AuthForm;
