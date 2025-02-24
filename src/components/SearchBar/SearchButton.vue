<template>
  <!-- <button @click="count++"> -->
  <button @click="handleButtonClick">
    <slot />
    {{ count }}
  </button>
</template>

<script lang="ts">
import { defineComponent, nextTick, ref } from 'vue';

export default defineComponent({
  setup() {
    const count = ref(0);

    async function handleButtonClick() {
      count.value++;
      await nextTick();
      //Dom 完成更新
    }

    return {
      count,
      handleButtonClick
    };
  }
});
</script>

<style scoped></style>
