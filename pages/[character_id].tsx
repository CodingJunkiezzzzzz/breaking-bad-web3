import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Character } from "../types/character";
import { Spinner, Row, Col, Table } from "react-bootstrap";
import Connected from "../components/Connected";

export default function Details() {
  const router = useRouter();
  const { character_id } = router.query;
  const [character, setCharacter] = useState<Character>();

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        `https://www.breakingbadapi.com/api/characters/${character_id}`
      );
      const data = await res.json();
      setCharacter(data[0]);
    }
    fetchData();
  }, [character_id]);
  return !character ? (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ height: "100vh" }}
    >
      <Spinner animation="border" />
    </div>
  ) : (
    <Connected>
      <Row style={{ marginBottom: "1em" }}>
        <Col>
          <h1>{character.name}</h1>
        </Col>
      </Row>
      <Row>
        <Col sm={12} xl={3}>
          <img
            style={{
              width: "100%",
              objectFit: "cover",
              objectPosition: "top",
              maxHeight: "400px",
            }}
            alt={character.name}
            src={character.img}
          />
        </Col>
        <Col>
          <Row xs={2} md={3} xl={4}>
            <Table striped>
              <tbody>
                {Object.entries(character).map(([key, value]) => {
                  if (key === "img" || key === "char_id") return null;
                  return (
                    <tr key={key}>
                      <td>
                        <strong>
                          {key
                            .split("_")
                            .filter((x) => x.length > 0)
                            .map((x) => x.charAt(0).toUpperCase() + x.slice(1))
                            .join(" ")}
                        </strong>
                      </td>
                      <td>
                        {Array.isArray(value)
                          ? value.length
                            ? value.join(", ")
                            : "-"
                          : value}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Row>
        </Col>
      </Row>
    </Connected>
  );
}
