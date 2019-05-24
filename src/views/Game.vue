<template>
  <div class="game">
    <div v-if="gameActive">
      <section class="section has-text-centered">
        <img :src="src" />
      </section>

      <div class="columns">
        <div
          v-for="option in options"
          :key="option"
          @click="choseOption(option)"
          class="column button is-large is-capitalized"
        >
          {{ option }}
        </div>
      </div>
    </div>
    <div v-else>
      <div class="has-text-centered">
        <div class="title">
          Welcome to guess my doge!
          <span class="icon"><i class="mdi mdi-dog"></i></span>
        </div>
        <section
          class="section"
          v-if="guessedCorrect == true || guessedCorrect == false"
        >
          <div v-if="guessedCorrect">
            <span class="is-capitalized">{{ correctOption }}</span> was correct!
          </div>
          <div v-else>
            Unlucky. <span class="is-capitalized">{{ correctOption }}</span> was
            the correct answer
          </div>
        </section>
        <div class="button is-large" @click="startGame">
          Start Game!
        </div>
      </div>
      <section class="section stats">
        <div class="columns is-mobile">
          <div class="column">Games played</div>
          <div class="column has-text-right">{{ played }}</div>
        </div>
        <div class="columns is-mobile">
          <div class="column">Won</div>
          <div class="column has-text-right">{{ won }}</div>
        </div>
        <div class="columns is-mobile">
          <div class="column">Lost</div>
          <div class="column has-text-right">{{ lost }}</div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import axios from "axios";

import store from "@/stores/breeds";

export default {
  store,
  name: "merge",
  data: function() {
    return {
      gameActive: false,
      played: 0,
      won: 0,
      lost: 0,
      src: null,
      options: [],
      correctOption: null,
      guessedCorrect: null
    };
  },
  methods: {
    startGame: function() {
      this.src = null;
      this.options = [];
      this.correctOption = null;
      this.guessedCorrect = null;
      this.gameActive = true;

      axios
        .get("https://dog.ceo/api/breeds/image/random")
        .then(response => {
          this.src = response.data.message;
          this.correctOption = this.src.split("/")[4].replace("-", " ");

          this.options.push(this.correctOption);
          console.log(this.correctOption);
          const breeds = this.$store.state.breeds;
          while (this.options.length < 4) {
            const randomBreed =
              breeds[Math.floor(Math.random() * breeds.length)];

            let breedName = randomBreed.name;
            if (randomBreed.subBreeds.length) {
              const subBreeds = randomBreed.subBreeds;
              const randomSubBreed =
                subBreeds[Math.floor(Math.random() * subBreeds.length)];

              breedName += " " + randomSubBreed;
            }

            if (!this.options.includes(breedName)) {
              this.options.push(breedName);
            }
          }

          // https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
          const shuffle = a => {
            for (let i = a.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [a[i], a[j]] = [a[j], a[i]];
            }
            return a;
          };

          this.options = shuffle(this.options);
        })
        .catch(error => {
          console.error(error);
        });
    },
    choseOption: function(option) {
      if (option == this.correctOption) {
        this.won++;
        this.guessedCorrect = true;
      } else {
        this.lost++;
        this.guessedCorrect = false;
      }
      this.played++;
      this.gameActive = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.game {
  width: 100%;
  height: 100%;

  img {
    max-width: 100%;
    max-height: 600px;
  }
  .stats {
    max-width: 300px;
    margin: 0 auto;
  }
}
</style>
