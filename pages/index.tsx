import type { NextPage } from "next";
import type { Character } from "../types/character";

type Props = {
  data: Character[];
};

const Home: NextPage<Props> = ({ data }) => {
  return (
    <div>
      {data.map((character) => (
        <div key={character.char_id}>{character.name}</div>
      ))}
    </div>
  );
};

export async function getServerSideProps() {
  const res = await fetch("https://www.breakingbadapi.com/api/characters");
  const data: Character[] = await res.json();

  return {
    props: {
      data,
    },
  };
}

export default Home;
