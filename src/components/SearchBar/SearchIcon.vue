<template>
  <!-- $attrs.class 指定元素来接收父级传递的class -->
  <icon-search :class="$attrs.class" />
  {{ records[0] }}
  <button @click="count++">inc count - {{ count }}-{{ alwaysSmall }}</button>
  <button @click="alwaysSmall = 2">set alwaysSmall</button>
  <!-- 样式多值 -->
  <div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }">111</div>
  <!-- $event -->
  <button @click="handleButtonClick($event, 2)">event</button>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';

const testReactive = reactive({
  name: 'joo',
  info: {
    records: [1, 2, 3],
    address: ref('xm')
  }
});

const records = testReactive.info.records;
//响应式对象中的ref属性会自动解包
testReactive.info.address;
//响应式数组和集合类型的元素不会解包
const books = reactive([ref('Vue 3 Guide')]);
books[0].value;

// computed
const count = ref(2);
const alwaysSmall = computed<number>({
  // 获取旧值
  get(previous) {
    if (count.value <= 3) return count.value;
    return previous;
  },
  set(newValue) {
    count.value = newValue * 2;
  }
});

function handleButtonClick(event: Event, value: number) {
  console.log(event, value);
}
</script>

<style scoped></style>
