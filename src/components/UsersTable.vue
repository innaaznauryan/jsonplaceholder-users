<template>
  <p v-if="loading" class="p-2">Loading Users...</p>
  <p v-else-if="error" class="text-red-500 p-2">Error: {{ error }}</p>
  <p v-else-if="!filteredUsers.length">No Users to Show</p>
  <table v-else class="text-left w-full">
    <thead>
      <tr>
        <th class="p-1">Email</th>
        <th class="p-1">Name</th>
        <th class="p-1">Username</th>
        <th class="p-1">City</th>
        <th class="p-1">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in filteredUsers" :key="user.id">
        <td class="p-1">{{ user.email }}</td>
        <td class="p-1">{{ user.name }}</td>
        <td class="p-1">{{ user.username }}</td>
        <td class="p-1">{{ user.address.city }}</td>
        <td class="p-1">
          <button
              @click="$emit('openModal', user)"
          >
            Show
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import type { User } from "../js/types.ts";

const store = useStore();
defineEmits(['openModal']);

const filteredUsers = computed<User[]>(() => store.getters.filteredUsers);
const loading = computed(() => store.getters.isLoading);
const error = computed(() => store.getters.errorMessage);

onMounted(() => {
  store.dispatch('fetchData');
})
</script>