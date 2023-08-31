import Image from 'next/image'
import QuickQuote from './_components/QuickQuote'
import { Logo } from './_components/Logo'
import { useQuery } from '@tanstack/react-query'

// const queryPages = async (slug: string) => {
//   const response = await fetch(
//     `http://prototype.local/wp-json/wp/v2/pages?slug=${slug}`, { next: { revalidate: 0 }}
//   );
//   if (!response.ok) {
//     throw new Error("There was a problem fetching the page.");
//   }
//   const json = await response.json();
//   return WPPageSchema.parse(json)
// };

export default function Main() {



  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Logo></Logo>
      <QuickQuote></QuickQuote>
    </main>
  )
}
