import { ReactElement, ReactNode } from "react";

interface Props {
  type?: "submit" | "reset" | "button" | undefined;
  children: ReactNode;
  onClick?(): void;
}
export default function Btn({ type, children, onClick }: Props) {
  return (
    <button
      type={type}
      onClick={onClick ?? onClick}
      className="border-2 border-cyan-700 bg-cyan-500 text-white p-2 rounded-xl font-bold"
    >
      {children}
    </button>
  );
}
