import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    breeds: [],
    selected: null,
    selectedImages: []
  },
  mutations: {
    storeBreeds: (state, breeds) => {
      state.breeds = breeds;
    },
    select: (state, selection) => {
      state.selected = selection;
    },
    storeSelectedImages: (state, images) => {
      state.selectedImages = images;
    }
  },
  actions: {
    loadBreeds: context => {
      axios
        .get("https://dog.ceo/api/breeds/list/all")
        .then(response => {
          const data = response.data.message;
          const breeds = [];

          for (const breed in data) {
            breeds.push({
              name: breed,
              subBreeds: data[breed]
            });
          }

          context.commit("storeBreeds", breeds);
        })
        .catch(error => {
          console.error(error);
        });
    },
    select: (context, selection) => {
      context.commit("select", selection);
      context.commit("storeSelectedImages", []);

      const route = selection.subName
        ? `${selection.name}/${selection.subName}`
        : selection.name;

      axios
        .get(`https://dog.ceo/api/breed/${route}/images`)
        .then(response => {
          context.commit("storeSelectedImages", response.data.message);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
});
