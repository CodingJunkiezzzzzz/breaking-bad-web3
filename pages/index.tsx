import type { NextPage } from "next";
import type { Character as TypeCharacter } from "../types/character";
import Character from "../components/Charater";
import { Row, Col } from "react-bootstrap";
import Connected from "../components/Connected";

type Props = {
  data: TypeCharacter[];
};

const Home: NextPage<Props> = ({ data }) => {
  return (
    <Connected>
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
    </Connected>
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
