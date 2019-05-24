<template>
  <div class="list">
    <input
      class="input"
      placeholder="Filter on breed name..."
      v-model="filter"
    />

    <ul class="menu-list">
      <li v-for="breed in listStore.state.breeds" :key="breed.name">
        <span
          v-if="showBreed(breed.name)"
          class="is-capitalized"
          @click="$store.dispatch('select', { name: breed.name })"
        >
          {{ breed.name }}
        </span>

        <ul v-if="breed.subBreeds.length">
          <li
            v-for="subBreed in breed.subBreeds"
            :key="subBreed"
            class="is-capitalized"
          >
            <span
              v-if="showBreed(breed.name, subBreed)"
              class="is-capitalized"
              @click="
                $store.dispatch('select', {
                  name: breed.name,
                  subName: subBreed
                })
              "
            >
              {{ subBreed }} {{ breed.name }}
            </span>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "list",
  props: ["list-store"],
  data: function() {
    return {
      filter: null
    };
  },
  methods: {
    showBreed: function(baseName, subName = null) {
      if (!this.filter) return true;

      const name = subName ? subName + " " + baseName : baseName;

      return name.toLowerCase().includes(this.filter.toLowerCase());
    }
  }
};
</script>

<style lang="scss" scoped>
.list {
  /* Remove style set by bulma for list class */
  background-color: initial !important;
  border-radius: initial !important;
  box-shadow: initial !important;

  .input {
    margin-bottom: 1.5rem;
  }

  .menu-list {
    overflow: auto;
    max-height: 100%;

    li {
      span {
        cursor: pointer !important;
      }
    }
  }
}
</style>
