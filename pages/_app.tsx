import type { AppProps } from "next/app";
import type { LayoutProps } from "@vercel/examples-ui/layout";
import React, { useState, useEffect } from "react";

import { getLayout } from "@vercel/examples-ui";
import "@vercel/examples-ui/globals.css";

function App({ Component, pageProps }: AppProps) {
  const Layout = getLayout<LayoutProps>(Component);

  return (
    <Layout
      title="Verify NFT Access"
      path="solutions/verify-nft"
      description="How to verify NFT ownership"
    >
      <Component {...pageProps} />
    </Layout>
  );
}

export default App;
