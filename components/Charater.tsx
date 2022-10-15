import Link from "next/link";
import { Card, Button } from "react-bootstrap";
import type { Character } from "../types/character";

export default function Character({
  character,
  style,
}: {
  character: Character;
  style?: React.CSSProperties;
}) {
  return (
    <Card style={style}>
      <Card.Img
        height={300}
        style={{ objectFit: "cover", objectPosition: "top" }}
        variant="top"
        src={character.img}
      />
      <Card.Body>
        <Card.Title>{character.name}</Card.Title>
        <Card.Text>{character.occupation.join(", ")}</Card.Text>
        <Link href={"/" + character.char_id}>Details</Link>
      </Card.Body>
    </Card>
  );
}
