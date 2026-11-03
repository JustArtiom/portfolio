import type { EntryContext } from "react-router";
import { ServerRouter } from "react-router";
import { prerender } from "react-dom/static";

// Only runs at build time (ssr: false) to prerender pages. Unlike the default
// streaming entry, `prerender` waits for every Suspense boundary (lazy blog
// posts included), so the HTML holds the full page instead of fallbacks that
// an inline script swaps in later.
export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  routerContext: EntryContext
) {
  let status = responseStatusCode;

  const { prelude } = await prerender(
    <ServerRouter context={routerContext} url={request.url} />,
    {
      // Never split large boundaries out to the end of the document; that
      // only helps live streaming, and here it would hide content behind JS.
      progressiveChunkSize: Number.POSITIVE_INFINITY,
      onError(error: unknown) {
        // A non-200 status makes React Router fail the build for this page.
        status = 500;
        console.error(`Prerender error at ${request.url}:`, error);
      },
    }
  );

  responseHeaders.set("Content-Type", "text/html");
  return new Response(prelude, { headers: responseHeaders, status });
}
