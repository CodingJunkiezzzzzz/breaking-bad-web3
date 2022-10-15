import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, SSRProvider } from "react-bootstrap";
import type { AppProps } from "next/app";
import { ThirdwebWeb3Provider } from "@3rdweb/hooks";
import { Header } from "../components/Header";

function MyApp({ Component, pageProps }: AppProps) {
  const connectors = {
    injected: {},
  };
  return (
    <ThirdwebWeb3Provider
      connectors={connectors}
      supportedChainIds={[1, 80001]}
    >
      <SSRProvider>
        <Container>
          <Header></Header>
          <Component {...pageProps} />
        </Container>
      </SSRProvider>
    </ThirdwebWeb3Provider>
  );
}

export default MyApp;
