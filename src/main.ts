import { createApp, provide, type InjectionKey } from 'vue';
import globalComponents from '@/components';
import router from './router';
import store from './store';
import directive from './directive';
import './mock';
import App from './App.vue';
import '@/assets/style/global.less';
import '@/api/interceptor';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import '@arco-design/web-vue/es/message/style/index.less';
import '@arco-design/web-vue/es/notification/style/index.less';
import '@arco-design/web-vue/es/modal/style/index.less';

import { initVChartArcoTheme } from '@visactor/vchart-arco-theme';
import { PROVIDE_THEME_KEY } from '@/constants/provideKeys';
initVChartArcoTheme();

const app = createApp(App);

/* app handler */
// 强制在生产模式下抛出错误
app.config.throwUnhandledErrorInProduction = false;
app.config.errorHandler = async (
  err,
  instance,
  info /* `info` 是一个 Vue 特定的错误信息 */
) => {
  console.log('======');
  await fetch('/api/error', {
    method: 'post',
    body: JSON.stringify({
      message: (err as { message: string })?.message || 'Unknown error',
      type: info
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

/* 运行时警告 仅会在开发阶段 */
// app.config.warnHandler = (msg, instance, trace) => {};

/* 自定义 Vue 模板编译器 */
// app.config.compilerOptions;

/* TODO: Performance */
app.config.performance;

/* 定义全局变量: 扩展ComponentCustomProperties接口 */
app.config.globalProperties;
console.log('globalProperties', app.config.globalProperties.__app);

/* Provide */
app.provide('message', 'hello');
// 给provide 和 注入值定义类型
// const provideKey: InjectionKey<number> = Symbol();
provide(PROVIDE_THEME_KEY, '123');

app.use(router);
app.use(store);
app.use(ArcoVueIcon);
app.use(globalComponents);
app.use(directive);

app.mount('#app');
