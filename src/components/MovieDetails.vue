<template>
<div class="h-screen bg-[#485D6B] grid place-items-center">
    <!-- Network Error -->
    <p v-if="networkError" class="absolute top-[50%] translate-x-[-60%] left-[50%] text-4xl ">Network Error :)</p>

    <!-- Loading -->
    <div v-if="loading" class="absolute top-[50%] translate-x-[-60%] left-[50%]" role="status">
        <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
        </svg>
        <span class="sr-only">Loading...</span>
    </div>

    <!-- Movie Details Card -->
    <div v-else class="bg-[#F2F4FD] h-[26rem] text-[#4d5e62] w-[50%] rounded-xl flex">
        <img class="w-[40%] h-[100%] rounded-l-xl" :src="imgURL" alt="">
        <div class="px-4 py-14">
            <h1 class="mb-4 text-2xl font-bold">{{ title }}</h1>
            <h4 class="mb-1 text-base font-semibold">{{year}}</h4>
            <h4 class="mb-1 text-base font-semibold">{{type}}</h4>
            <h4 class="mb-1 text-base font-semibold">{{ imbdId }}</h4>
            <h4 class="mb-1 text-base font-semibold">{{ country }}</h4>
            <h4 class="mb-4 overflow-y-auto text-base font-semibold h-14 no-scrollbar scroll-hidden">
                {{ isExpanded ? fullText : truncatedText }}
                <span v-if="fullText.length > 80" @click="toggleText" class="text-blue-500 cursor-pointer">
                    {{ isExpanded ? 'less' : 'more' }}
                </span>
            </h4>
            <button @click="goBack" class="group relative px-8 py-2 font-medium border-2 border-[#414f53] rounded-md overflow-hidden hover:text-[#F2F4FD] z-10">
                <span class="relative z-20">Go back</span>
                <span class="before:content-[''] before:absolute before:bg-[#4d5e62] before:w-52 before:h-52 before:top-0 before:right-[100%] group-hover:before:right-0 before:duration-200 before:z-10"></span>
            </button>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios';
import {
    useRoute
} from 'vue-router'
export default {
    name: 'MovieDetails',
    data() {
        return {
            title: '',
            year: '',
            type: '',
            imbdId: '',
            country: '',
            imgURL: '',
            loading: false,
            networkError: false,
            isExpanded: false,
            fullText: '',
            truncatedText: ''
        }
    },
    async created() {
        this.loading = true;
        try {
            const route = useRoute();
            const result = await axios.get(`https://www.omdbapi.com/?apikey=cb90fb6e&i=${route.query.imbdId}`)
            this.imgURL = result.data.Poster;
            this.title = route.query.title || "Undefine"
            this.year = route.query.year || "Undefine"
            this.type = result.data.Genre;
            this.imbdId = result.data.Ratings[0].Value;
            this.country = result.data.Country;
            this.fullText = result.data.Plot;
            if(this.fullText.length > 80) {
                this.truncatedText = result.data.Plot.substring(0, 80) + '...';
            } else {
                this.truncatedText = result.data.Plot;
            }
        } catch (error) {
            if (error.code === 'ERR_NETWORK') {
                this.networkError = true
            }
        } finally {
            this.loading = false;
        }
    },
    methods: {
        goBack() {
            this.$router.push({
                name: 'MovieList'
            })
        },
        async toggleText() {
            this.isExpanded = !this.isExpanded;
        }
    }
};
</script>
