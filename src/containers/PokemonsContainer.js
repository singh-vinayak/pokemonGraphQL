import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { Pokemon } from "../components/Pokemon";
import { GET_POKEMONS } from "../graphql/get-pokemons";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
//import Skeleton from 'react-loading-skeleton';

export function PokemonsContainer() {
  const { data: { pokemons = [] } = {} } = useQuery(GET_POKEMONS, {
    variables: { first: 151 }
  });
  const [page, setPage] = React.useState(1);
  //const [loading, setLoading] =  React.useState(true);
  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <div className="container">
      <Stack
        spacing={2}
        style={{
          "text-align": "center",
          margin: "20px auto",
          padding:"5px",
          background: "rgba(255,255,255,0.6)",
        }}
      >
        <Typography style={{"font-size":"1.5rem", textTransform: "uppercase"}}>Page: {page}</Typography>
        <Pagination
          count={8}
          page={page}
          onChange={handleChange}
          color="secondary"
        />
      </Stack>
      {pokemons &&
        pokemons
          .filter(
            (pokemon) =>
              pokemon.number >= ((page - 1) * 20 + 1) && pokemon.number <= (page - 1) * 20  + 20
          )
          .map((pokemon) => <Pokemon key={pokemon.id} pokemon={pokemon} />)}
    </div>
  );
}
