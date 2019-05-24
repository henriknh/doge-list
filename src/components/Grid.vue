<template>
  <div class="grid">
    <div class="showSelected" v-if="$store.state.selected">
      <div class="title">
        Selected breed:
        <span class="is-capitalized">
          <span v-if="$store.state.selected.subName">
            {{ $store.state.selected.subName }}
          </span>
          {{ $store.state.selected.name }}
        </span>
      </div>

      <div class="columns is-multiline is-3">
        <Thumb
          class="column is-one-quarter"
          v-for="thumb in $store.state.selectedImages"
          :key="thumb"
          :src="thumb"
        />
      </div>
    </div>

    <section v-else class="section is-large has-text-centered">
      <div class="title">
        Select a breed in order to display images
        <span class="icon"><i class="mdi mdi-dog"></i></span>
      </div>
      <div class="subtitle has-text-justified">
        <div class="path">
          <span
            class="icon"
            :style="{
              marginLeft: dogPosition + 'px',
              transform: dogRotation
            }"
            ><i class="mdi mdi-dog-side mdi-flip-h"></i>
          </span>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import store from "@/stores/breeds";

import Thumb from "@/components/Thumb.vue";

export default {
  store,
  name: "grid",
  components: { Thumb },
  mounted() {
    setInterval(() => {
      if (this.dogPosition == 0) {
        this.dogPosition = 300;
      }
      this.dogPosition--;
    }, 10);
  },
  data: function() {
    return {
      dogPosition: 0
    };
  },
  computed: {
    dogRotation: function() {
      const rotation = Math.sin(this.dogPosition / 10) * 5;
      return `rotate(${rotation}deg)`;
    }
  }
};
</script>

<style lang="scss" scoped>
.grid {
  width: 100%;
  height: 100%;

  .subtitle {
    .path {
      width: 300px;
      margin: 0 auto;
    }
  }

  .showSelected {
    height: 100%;
    .columns {
      overflow: auto;
      height: 100%;
    }
  }
}
</style>
