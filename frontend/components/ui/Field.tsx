import MetaLabel from "./MetaLabel";
import { cn } from "@/utils/cn";

const INPUT_CLASS =
  "font-sans text-[15px] px-3.5 py-3 border border-line rounded-lg bg-bg text-ink disabled:opacity-60 focus:outline-none focus:border-accent focus:shadow-[0_0_0_3px_color-mix(in_oklab,var(--color-accent)_18%,transparent)] transition-all";

function FieldShell({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <MetaLabel>{label}</MetaLabel>
      {children}
    </label>
  );
}

export function TextField({
  label,
  className,
  ...rest
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <FieldShell label={label}>
      <input className={cn(INPUT_CLASS, className)} {...rest} />
    </FieldShell>
  );
}

export function TextareaField({
  label,
  className,
  rows = 5,
  ...rest
}: { label: string } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <FieldShell label={label}>
      <textarea
        rows={rows}
        className={cn(
          INPUT_CLASS,
          "resize-y min-h-[110px] leading-normal",
          className
        )}
        {...rest}
      />
    </FieldShell>
  );
}
