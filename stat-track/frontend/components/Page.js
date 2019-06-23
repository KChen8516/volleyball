import { Header } from "./Header";
import { Meta } from "./Meta";
import styled, { ThemeProvider, injectGlobal } from "styled-components";

// leverage styled component's theme capabilities
const theme = {
  red: "#FF0000",
  black: "#393939",
  grey: "#3a3a3a",
  lightgrey: "#e1e1e1",
  offwhite: "#ededed",
  maxWidth: "1000px",
  boxShadow: "0 12px 24px 0 rgba(0,0,0,0.09)",
};

const StyledPage = styled.div`
  background: white;
  color: ${(props) => props.theme.black};
`;

const ContentContainer = styled.div`
  /* max-width: ${(props) => props.theme.maxWidth}; */
  margin: 0 auto;
  padding: 2 rem;
`;

injectGlobal`
  html {
    box-sizing: border-box;
  }
  *, *.before, *:after {
    box-sizing: inherit;
  }
`;

export const Page = (props) => {
  return (
    <ThemeProvider theme={theme}>
      <StyledPage>
        <Meta />
        <Header />
        <ContentContainer>{props.children}</ContentContainer>
      </StyledPage>
    </ThemeProvider>
  );
};
