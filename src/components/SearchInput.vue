<template>
  <div>
    <label :for="label" class="cursor-pointer pr-2">Search by {{ label }}</label>
    <input
        v-model="query"
        type="search"
        :id="label"
        :placeholder="`Search by ${label}...`"
        class="p-2"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const props = defineProps({
  label: {
    type: String,
    required: true
  }
});

const query = computed({
  get: () => {
    return props.label === 'email' ? store.state.searchEmail : store.state.searchUsername;
  },
  set: (value: string) => {
    if (props.label === 'email') {
      store.dispatch('updateSearchEmail', value);
    } else if (props.label === 'username') {
      store.dispatch('updateSearchUsername', value);
    }
  },
});
</script>