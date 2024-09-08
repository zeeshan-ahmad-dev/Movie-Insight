<template>
<div @click="gotoMovie(detail.Title, detail.Year, detail.Type, detail.imdbID)" class="grid px-4 py-8 transition-all border border-black rounded-md cursor-pointer h-96 group hover:bg-gray-500 lg:px-10 place-items-center">
    <h1 class="mb-3 text-center duration-300 lg:text-lg group-hover:-translate-y-3 sm:text-base">{{ detail.Title }}</h1>
    <img class="w-48 transition-all rounded-md h-60 group-hover:scale-110" :src="detail.Poster" alt="">
</div>
</template>

<script>
export default {
    name: 'Moive',
    props: {
        detail: Object
    },
    methods: {
        gotoMovie(title, year, type, imbdId) {
            this.$router.push({
                name: 'MovieDetails',
                query: {
                    title,
                    year,
                    type,
                    imbdId
                }
            })
        }
    }

};
</script>
