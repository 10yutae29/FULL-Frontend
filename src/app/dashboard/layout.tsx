export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="w-full bg-slate-200 p-20">{children}</div>;
}
