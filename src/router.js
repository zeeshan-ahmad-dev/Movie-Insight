import {createRouter, createWebHistory} from 'vue-router'
import MovieList from './components/MovieList.vue';
import MovieDetails from './components/MovieDetails.vue';

const routes = [
    {
        name: 'MovieList',
        path: '/',
        component: MovieList
    },
    {
        name: 'MovieDetails',
        path: '/moviedetails',
        component: MovieDetails,
        props: true
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});
export default router;