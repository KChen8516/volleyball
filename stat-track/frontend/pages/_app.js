// Use Next.js goodies for setting up the base application
import App, { Container } from "next/app";
import { ApolloProvider } from "react-apollo";
import withData from "../lib/withData";

import { Page } from "../components/Page";

class MyApp extends App {
  // next.js lifecycle method
  static async getInitialProps({ Component, ctx }) {
    // allows next.js to crawl a page for Queries and Mutations
    // so that they can be fired before render
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    pageProps.query = ctx.query;
    return { pageProps };
  }

  render() {
    const { Component, apollo, pageProps } = this.props;

    return (
      <Container>
        <ApolloProvider client={apollo}>
          <Page>
            <Component {...pageProps} />
          </Page>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withData(MyApp);
