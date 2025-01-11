<template>
  <div class="fixed top-0 left-0 w-full h-screen bg-gray-500 bg-opacity-50">
    <div
        class="flex flex-col items-center justify-between bg-white w-fit min-w-96 mx-auto my-8 p-6 gap-4"
    >
      <div class="flex justify-between w-full">
        <div class="font-bold">Details</div>
        <img
            :src="closeIcon"
            alt="Close Icon"
            class="w-6 cursor-pointer"
            @click="$emit('close')"
        />
      </div>
      <h2>Name: <span class="font-bold">{{ user.name }}</span></h2>
      <h3>Username: <span class="font-bold">{{ user.username }}</span></h3>
      <p>Email: <span class="font-bold">{{ user.email}}</span></p>
      <p>Street: <span>{{ user.address.street }}</span></p>
      <p>Suite: <span>{{ user.address.suite }}</span></p>
      <p>City: <span>{{ user.address.city }}</span></p>
      <p>Zipcode: <span>{{ user.address.zipcode }}</span></p>
      <p>Phone: <span>{{ user.phone }}</span></p>
      <p>Website: <span>{{ user.website }}</span></p>
      <p>Company: <span>{{ user.company.name }}</span></p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import type { User } from "../js/types.ts";
import closeIcon from "../assets/images/close.svg";

defineProps({
  user: {
    type: Object as PropType<User>,
    required: true
  }
})
defineEmits(['close']);
</script>