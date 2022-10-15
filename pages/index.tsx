import type { NextPage } from "next";
import type { Character as TypeCharacter } from "../types/character";
import Character from "../components/Charater";
import { Row, Col, Container, Button } from "react-bootstrap";
import { useWeb3 } from "@3rdweb/hooks";
import { useEffect } from "react";
import Swal from "sweetalert2";

type Props = {
  data: TypeCharacter[];
};

const Home: NextPage<Props> = ({ data }) => {
  const { connectWallet, address, error, disconnectWallet } = useWeb3();
  useEffect(() => {
    if (error) {
      Swal.fire({
        icon: "error",
        title: error.name,
        text: error.message,
      });
    }
  }, [error]);

  return (
    <Container>
      <div className="d-flex justify-content-between py-4">
        <h1>Breaking Bad Characters</h1>
        {!address ? (
          <Button
            onClick={() => connectWallet("injected")}
            variant="dark"
            className="d-flex align-items-center gap-2"
          >
            <img
              alt="Metamask Logo"
              src="/metamask.svg"
              width={32}
              height={32}
            ></img>
            <span>Login with MetaMask</span>
          </Button>
        ) : (
          <div className="d-flex flex-column justify-content-end align-items-end">
            <strong>Logged in ETH address</strong>
            <span>{address}</span>
            <Button
              onClick={disconnectWallet}
              variant="dark"
              className="d-flex align-items-center gap-2"
            >
              <span>Reconnect</span>
            </Button>
          </div>
        )}
      </div>
      <Row>
        {data.map((character) => (
          <Col
            style={{ marginBottom: "30px" }}
            xs={12}
            md={6}
            xl={4}
            xxl={3}
            key={character.char_id}
          >
            <Character style={{ height: "100%" }} character={character} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export async function getServerSideProps() {
  const res = await fetch("https://www.breakingbadapi.com/api/characters");
  const data: TypeCharacter[] = await res.json();

  return {
    props: {
      data,
    },
  };
}

export default Home;
