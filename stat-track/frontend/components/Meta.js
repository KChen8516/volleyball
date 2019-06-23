import Head from "next/head";

export const Meta = () => (
  <Head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta charSet="utf-8" />
    <link rel="shortcut icon" href="/static/favicon.png" />
    {/* Progress bar styles */}
    <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
    {/* Insert a css file here to override Bulma global CSS variables */}
    {/* BulmaCSS */}
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.5/css/bulma.min.css"
    />
    <title>Stat Track</title>
  </Head>
);
