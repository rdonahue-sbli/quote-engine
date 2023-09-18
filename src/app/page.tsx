import Image from "next/image";
import QuickQuote from "./_components/QuickQuote";
import { Logo } from "./_components/Logo";
import { useQuery } from "@tanstack/react-query";

export default function Main() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Logo></Logo>
      <QuickQuote></QuickQuote>
    </main>
  );
}
