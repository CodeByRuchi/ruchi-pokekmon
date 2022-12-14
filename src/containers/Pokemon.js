import { useDispatch, useSelector } from "react-redux";
import { GetPokemon } from "../actions/PokemonActions";
import _ from "lodash";
import { useEffect } from "react";

const Pokemon = (props) => {
  const pokemonName = props.match.params.pokemon;
  const dispatch = useDispatch();
  const pokemonState = useSelector((state) => state.Pokemon);

  useEffect(() => {
    dispatch(GetPokemon(pokemonName));
  }, []);

  const ShowData = () => {
    if (!_.isEmpty(pokemonState.data[pokemonName])) {
      const pokeData = pokemonState.data[pokemonName];
      console.log(pokeData);
      return (
        <div className={"pokemon-wrapper"}>
        
          <div className={"image"}>
           
            <img src={pokeData.sprites.front_shiny} alt="" />
            <img src={pokeData.sprites.back_shiny} alt="" />
          </div>
          <div className="stat-abi">
            <div className="stats">
              <h1>Pokemon Stats</h1>
              {pokeData.stats.map((el) => {
                return (
                  <div className="stats-bar">
                    <label>{el.stat.name}</label>
                    <progress max="100" value={el.base_stat} />
                  </div>
                );
              })}
            </div>
            <div className="ability">
              <h1>Pokemon Abilities</h1>
              {pokeData.abilities.map((el) => {
                return <p>{el.ability.name}</p>;
              })}
            </div>
          </div>
        </div>
      );
    }

    if (pokemonState.loading) {
      return <p>Loading...</p>;
    }

    if (pokemonState.errorMsg !== "") {
      return <p>{pokemonState.errorMsg}</p>;
    }

    return <p>error getting pokemon</p>;
  };

  return (
    <div className={"poke"}>
      <h1>{pokemonName}</h1>
      <ShowData />
    </div>
  );
};

export default Pokemon;
