<template>
  <div class="thumb">
    <div
      class="image"
      :style="{ backgroundImage: 'url(' + src + ')' }"
      @click="toggleShowFull"
    ></div>
    <section
      class="section full-image has-text-centered"
      v-if="showFull"
      @click="toggleShowFull"
    >
      <img :src="src" />
    </section>
  </div>
</template>

<script>
export default {
  name: "thumb",
  props: ["src"],
  data: function() {
    return {
      showFull: false
    };
  },
  methods: {
    toggleShowFull: function() {
      this.showFull = !this.showFull;
    }
  }
};
</script>

<style lang="scss">
.thumb {
  height: 200px;

  .image {
    background-size: cover;
    background-position: center;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }

  .full-image {
    z-index: 3000;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100vh;
    width: 100vw;
    background: rgba(0, 0, 0, 0.6);

    img {
      margin: auto 0;
      max-height: 100%;
      max-widht: 100%;
    }
  }
}
</style>
