import { useRouter } from "next/router";
import { trpc } from "../_trpc/client";
import { serverClient } from "~/server/api/server";
import { Logo } from "../_components/Logo";
import QuickQuote from "../_components/QuickQuote";

export default async function LandingPage({
  params: { slug },
}: {
  params: { slug: string };
}) {

  const content = await serverClient.wp.getContent(slug)

  return (
    <>
      <Logo></Logo>
      <h1>WP PAGES</h1>
      <div>
        <pre><code>{JSON.stringify(content, null, 2)}</code></pre>
      </div>
      <QuickQuote></QuickQuote>
    </>
  );
}
