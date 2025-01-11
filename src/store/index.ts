import { createStore } from 'vuex';
import { API_URL } from '../js/apiUrl.ts';
import type { User } from '../js/types.ts';

interface State {
    users: User[];
    searchEmail: string;
    searchUsername: string;
    loading: boolean;
    error: string | null;
}

const store = createStore<State>({
    state: {
        users: [],
        searchEmail: '',
        searchUsername: '',
        loading: false,
        error: null
    },
    mutations: {
        setData(state: State, payload: User[]) {
            state.users = payload;
        },
        setSearchEmail(state: State, payload: string) {
            state.searchEmail = payload;
        },
        setSearchUsername(state: State, payload: string) {
            state.searchUsername = payload;
        },
        setLoading(state: State, payload: boolean) {
            state.loading = payload;
        },
        setError(state: State, payload: string | null) {
            state.error = payload;
        },
    },
    actions: {
        async fetchData({ commit }) {
            commit('setLoading', true);
            commit('setError', null);
            try {
                const response = await fetch(API_URL);
                if (!response.ok) {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }
                const data = await response.json();
                commit('setData', data);
            } catch (error: any) {
                commit('setError', error.message || 'An error occurred while fetching data.');
            } finally {
                commit('setLoading', false);
            }
        },
        updateSearchEmail({ commit }, query: string) {
            commit('setSearchEmail', query);
        },
        updateSearchUsername({ commit }, query: string) {
            commit('setSearchUsername', query);
        },
    },
    getters: {
        filteredUsers(state: State): User[] {
            return state.users.filter(user => {
                const matchesEmail = state.searchEmail ? user.email.toLowerCase().includes(state.searchEmail.toLowerCase()) : true;
                const matchesUsername = state.searchUsername ? user.username.toLowerCase().includes(state.searchUsername.toLowerCase()) : true;
                return matchesEmail && matchesUsername;
            });
        },
        isLoading(state: State): boolean {
            return state.loading;
        },
        errorMessage(state: State): string | null {
            return state.error;
        },
    },
});

export default store;
