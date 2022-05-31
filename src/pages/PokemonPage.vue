<template>
  <h1 v-if="!pokemon">Espere por favor...</h1>
  <div v-else>
    <h1>Quién es este Pokemon?</h1>
    <h4>Vidas: {{ credits }}</h4>
    <!-- Picture -->
    <PokemonPicture :pokemon-id="pokemon.id" :show-pokemon="showPokemon" />
    <!-- Opciones -->
    <PokemonOption :pokemons="pokemonArr" @pokemon-selected="checkAnswer" />

    <template v-if="showAnswer">
      <h2 class="fade-in">{{ message }}</h2>
      <button :disabled="!newCreditGame" @click="newGame">Nuevo juego</button>
      <button :disabled="newCreditGame" @click="newCredit">
        Nuevo crédito
      </button>
    </template>
  </div>
</template>

<script>
import PokemonOption from "@/components/PokemonOption";
import PokemonPicture from "@/components/PokemonPicture";

import getPokemonOptions from "@/helpers/getPokemonOptions";

export default {
  components: {
    PokemonOption,
    PokemonPicture,
  },
  data() {
    return {
      pokemonArr: [],
      pokemon: null,
      pokemonSelected: null,
      showPokemon: false,
      showAnswer: false,
      message: "",
      credits: 3,
      newCreditGame: true,
    };
  },
  watch: {
    credits() {
      if (this.credits === 0) {
        this.message = "Ya no hay oportunidades";
        this.newCreditGame = false;
      }
    },
  },
  methods: {
    async mixPokemonArray() {
      this.pokemonArr = await getPokemonOptions();

      const rndInt = Math.floor(Math.random() * 4);

      this.pokemon = this.pokemonArr[rndInt];
    },
    checkAnswer(selectedPokemon) {
      if (this.showAnswer) {
        this.message = `Ya has seleccionado un pokemon anteriormente`;
        return false;
      }
      // if (this.credits >= 0) {
      if (this.pokemon.id === selectedPokemon) {
        this.pokemonSelected = this.pokemonArr[selectedPokemon];
        this.message = `Seleccionaste el pokemon correcto ${this.pokemon.name}`;
      } else {
        this.pokemonSelected = this.pokemonArr[selectedPokemon];
        this.message = `Seleccionaste el pokemon incorrecto, el correcto es ${this.pokemon.name}`;
        this.credits--;
      }

      this.showPokemon = true;
      this.showAnswer = true;
    },
    newGame() {
      this.pokemonArr = [];
      this.pokemon = null;
      this.showPokemon = false;
      this.showAnswer = false;
      this.message = "";
      this.mixPokemonArray();
      // this.$router.go(0);
    },
    newCredit() {
      this.newGame();
      this.credits = 3;
      this.newCreditGame = true;
    },
  },
  mounted() {
    this.mixPokemonArray();
  },
};
</script>