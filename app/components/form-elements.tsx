import * as React from "react";
import clsx from "clsx";
import { useId } from "@reach/auto-id";

function Label({ className, ...labelProps }: JSX.IntrinsicElements["label"]) {
  return (
    <label
      {...labelProps}
      className={clsx(
        "inline-block text-gray-800 dark:text-gray-200",
        className
      )}
    />
  );
}

type InputProps =
  | ({ type: "textarea" } & JSX.IntrinsicElements["textarea"])
  | JSX.IntrinsicElements["input"];

const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  props,
  ref
) {
  const className = clsx(
    "placeholder-gray-500 dark:disabled:text-blueGray-500 focus-ring px-3 py-1 w-full text-black disabled:text-gray-400 dark:text-gray-100 text-lg font-medium dark:bg-sky-800 rounded-lg bg-white border border-gray-400",
    props.className
  );

  if (props.type === "textarea") {
    return (
      <textarea
        {...(props as JSX.IntrinsicElements["textarea"])}
        className={className}
      />
    );
  }

  return (
    <input
      {...(props as JSX.IntrinsicElements["input"])}
      className={className}
      ref={ref}
    />
  );
});

interface InputErrorProps {
  id: string;
  children?: string | null;
}

function InputError({ children, id }: InputErrorProps) {
  if (!children) {
    return null;
  }

  return (
    <p role="alert" id={id} className="mt-1 text-sm text-red-500">
      {children}
    </p>
  );
}

export const Field = React.forwardRef<
  HTMLInputElement,
  {
    label: string;
    name: string;
    className?: string;
    defaultValue?: string | null;
    error?: string[] | null;
    description?: React.ReactNode;
  } & InputProps
>(function Field(
  { defaultValue, error, name, label, className, description, id, ...props },
  ref
) {
  const prefix = useId();
  const inputId = id ?? `${prefix}-${name}`;
  const errorId = `${inputId}-error`;
  const descriptionId = `${inputId}-description`;

  return (
    <div className={clsx("mb-2", className)}>
      <div className="flex items-baseline justify-between gap-2 px-1">
        <Label htmlFor={inputId}>{label}</Label>
      </div>

      <Input
        // @ts-expect-error no idea 🤷‍♂️
        ref={ref}
        {...(props as InputProps)}
        name={name}
        id={inputId}
        autoComplete={name}
        required
        defaultValue={defaultValue}
        aria-describedby={
          error ? errorId : description ? descriptionId : undefined
        }
      />
      {error?.length ? (
        <InputError id={errorId}>{error.join(",")}</InputError>
      ) : description ? (
        <div id={descriptionId} className="text-primary text-lg">
          {description}
        </div>
      ) : (
        <div>{` `}</div>
      )}
    </div>
  );
});

// function ButtonGroup({
//   children,
// }: {
//   children: React.ReactNode | React.ReactNode[];
// }) {
//   return (
//     <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
//       {children}
//     </div>
//   );
// }

// function ErrorPanel({
//   children,
//   id,
// }: {
//   children: React.ReactNode;
//   id?: string;
// }) {
//   return (
//     <div role="alert" className="relative mt-8 px-11 py-8" id={id}>
//       <div className="absolute inset-0 rounded-lg bg-red-500 opacity-25" />
//       <div className="relative text-lg font-medium text-primary">
//         {children}
//       </div>
//     </div>
//   );
// }

// export { Label, Input, InputError, ButtonGroup, ErrorPanel };
