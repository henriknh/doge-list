<template>
  <div class="browse">
    <div v-if="isMobile()">
      <div v-if="$store.state.selected">
        <div class="btn-back" @click="$store.commit('select', null)">
          <span class="icon">
            <i class="mdi mdi-keyboard-backspace"></i>
          </span>
          Back
        </div>
        <Grid />
      </div>
      <List :list-store="$store" v-else />
    </div>
    <div class="browse columns" v-else>
      <List class="column is-one-quarter" :list-store="$store" />
      <Grid class="column" />
    </div>
  </div>
</template>

<script>
import store from "@/stores/breeds";

import List from "@/components/List.vue";
import Grid from "@/components/Grid.vue";

export default {
  store,
  name: "browse",
  components: {
    List,
    Grid
  },
  methods: {
    isMobile() {
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../node_modules/bulma/bulma.sass";

.browse {
  width: 100%;
  height: 100%;

  .btn-back {
    padding-bottom: $gap;
    cursor: pointer;
  }
}
</style>
