<template>
  <div :class="['input-wrapper', styles.inputWrapper]">
    <input
      ref="input"
      :value="modelValue"
      @input="
        e => emit('update:modelValue', (e.target as HTMLInputElement).value)
      "
    />
    <textarea
      ref="textareaRef"
      :value="textarea"
      @input="
        e => emit('update:textarea', (e.target as HTMLTextAreaElement).value)
      "
    />
    <input
      type="checkbox"
      :value="radioVal"
      @change="
        e => {
          radioVal = (e.target as HTMLInputElement).checked;
        }
      "
    />
    <div class="input-append">
      <slot>default</slot>
      <slot name="a">a</slot>
      <slot name="b">b</slot>
    </div>
    <div v-if="slots.prepend" class="input-prepend">
      <slot name="prepend" :text="slotText" />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  useAttrs,
  useSlots,
  useCssModule,
  inject,
  reactive,
  useTemplateRef,
  watchEffect,
  Ref
} from 'vue';

const theme = ref({
  bg: 'red',
  color: 'blue'
});

// defineSlots 为插槽定义props类型
defineSlots<{
  prepend(props: { text: string }): any;
  a(): any;
  b(): any;
}>();

// useCssModule
const cssModule = useCssModule('styles');
console.log(cssModule);

// props
// const props = defineProps({
//   modelValue: {
//     type: String,
//     required: true
//   },
//   textarea: {
//     type: String,
//     required: true
//   }
// });
const props = defineProps<{
  moduleValue: string;
  textarea: string;
}>();

// NOTE:3.5+从 defineProps 返回值解构出的变量是响应式的,Vue 的编译器会自动在前面添加 props.
// 在 3.5 及以上版本中，当使用响应式 Props 解构时，可以自然地声明默认值。但在 3.4 及以下版本中，默认情况下并未启用响应式 Props 解构。为了用基于类型声明的方式声明 props 的默认值，需要使用 withDefaults 编译器宏
const { textarea = '' } = props;

// const emit = defineEmits(['update:modelValue', 'update:textarea']);
const emit = defineEmits<{
  'update:moduleValue': [value: string];
  'update:textarea': [value: string];
}>();
const slots = useSlots();

const inputRef = useTemplateRef<HTMLInputElement>('input');
const textareaRef = ref<HTMLInputElement | null>(null);

watchEffect(() => {
  console.log('inputRef', inputRef?.value?.focus());
  console.log('textareaRef', textareaRef);
});

const attrs = useAttrs();

const slotText = ref('slotInnerText');

// defineModel<类型, 修饰符>
const radioVal = defineModel<boolean, 'trim | uppercase'>('radioVal', {
  // type: Boolean,
  default: false
});

console.log('inject', inject('message'));

// const [radioVal, modelModifiers] = defineModel({
//   set(value) {
//     if (modelModifiers.trim) {
//       return value.trim();
//     }
//     return value;
//   }
// });
interface State {
  user: {
    name: string;
    age: number;
  };
}

const state: State = reactive({
  user: {
    name: 'John',
    age: 30
  }
});

interface IStateRef {
  name: string;
  age: number;
}
const stateRef: Ref<IStateRef> = ref();

defineExpose<{
  state: State;
}>({
  state
});
</script>

<style scoped module="styles">
/* module不指定名称则通过$style获取 */
.nputWrapper {
  background: palevioletred;
}

/* 插槽选择器 */
:slotted(button) {
  background-color: v-bind('theme.bg');
  color: v-bind('theme.color');
}
</style>

<style scoped>
/* 全局选择器 */
:global(div) {
  background-color: antiquewhite;
}
</style>

<!-- 从所安装的 "todomvc-app-css" npm 包中导入一个文件 -->
<!-- <style src="todomvc-app-css/index.css" /> -->
