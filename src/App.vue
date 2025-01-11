<template>
  <h1>Table of Users</h1>

  <div class="container">
    <div class="flex flex-col items-start gap-2 py-4">
      <SearchInput label="email" />
      <SearchInput label="username" />
    </div>
    <UsersTable @open-modal="openModal" />
  </div>

  <transition name="fade" mode="out-in">
    <Modal
        v-if="isModalOpen && selectedUser"
        :user="selectedUser"
        @close="closeModal"
    />
  </transition>
</template>

<script setup lang="ts">
import { ref } from "vue";
import SearchInput from "./components/SearchInput.vue";
import UsersTable from "./components/UsersTable.vue";
import Modal from "./components/Modal.vue";
import type { User } from "./js/types.ts";

const isModalOpen = ref<boolean>(false);
const selectedUser = ref<User | null>(null);

const openModal = (user: User) => {
  isModalOpen.value = true;
  selectedUser.value = user;
};

const closeModal = () => {
  isModalOpen.value = false;
  selectedUser.value = null;
};
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>