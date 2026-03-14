import { useState } from "react";
import { Field, FieldDescription, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import clsx from "clsx";
import type { UseFormRegisterReturn } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";

type Props = {
  id: string;
  label: string;
  error?: string;
  register: UseFormRegisterReturn;
};

const InputPassword = ({ id, label, error, register }: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Field>
      <FieldLabel
        htmlFor={id}
        className={clsx("text-base", error && "text-destructive")}
      >
        {label}
      </FieldLabel>

      <div className="relative">
        <Input
          id={id}
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          className={clsx(
            "py-5 focus-visible:ring-primary/50 focus-visible:border-primary",
            error &&
              "border-destructive focus-visible:ring-destructive/50 focus-visible:border-destructive",
          )}
          {...register}
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>

      {error && (
        <FieldDescription className="text-destructive">
          {error}
        </FieldDescription>
      )}
    </Field>
  );
};

export default InputPassword;
