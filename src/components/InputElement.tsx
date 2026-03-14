import { Field, FieldDescription, FieldLabel } from "#/components/ui/field";
import { Input } from "#/components/ui/input";
import { Textarea } from "#/components/ui/textarea";
import type { UseFormRegisterReturn } from "react-hook-form";
import clsx from "clsx";

type Props = {
  id: string;
  label: string;
  register: UseFormRegisterReturn;
  type: "input" | "textarea" | "password";
  error?: string;
  autoFocus?: boolean;
  placeholder: string;
};

const InputElement = ({
  id,
  label,
  type,
  register,
  error,
  autoFocus,
  placeholder,
}: Props) => {
  return (
    <Field>
      <FieldLabel
        htmlFor={id}
        className={clsx("text-base", error && "text-destructive")}
      >
        {label}
      </FieldLabel>

      {type !== "textarea" ? (
        <Input
          id={id}
          placeholder={placeholder}
          className={clsx(
            "py-5 focus-visible:ring-primary/50 focus-visible:border-primary",
            error &&
              "border-destructive focus-visible:ring-destructive/50 focus-visible:border-destructive",
          )}
          {...register}
          autoFocus={autoFocus}
        />
      ) : (
        <Textarea
          id={id}
          placeholder={placeholder}
          className={clsx(
            "focus-visible:ring-primary/50 focus-visible:border-primary",
            id === "excerpt" ? "min-h-20" : "min-h-80",
            error &&
              "border-destructive focus-visible:ring-destructive/50 focus-visible:border-destructive",
          )}
          {...register}
        />
      )}

      {error && (
        <FieldDescription className="text-destructive">
          {error}
        </FieldDescription>
      )}
    </Field>
  );
};

export default InputElement;
