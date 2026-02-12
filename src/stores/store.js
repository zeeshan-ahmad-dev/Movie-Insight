import { defineStore } from "pinia";

export const useMoviesStore = defineStore("movies", {
    state: () => ({
        movies: []
    }),
    actions: {
        setMovies(moviesArray) {
            movies.value = moviesArray;
        },
    }
})