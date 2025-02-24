import type { InjectionKey } from 'vue';

// export const PROVIDE_KEYS = {
//   THEME: Symbol('theme')
// };

export const PROVIDE_THEME_KEY: InjectionKey<string> = Symbol('theme');
export const PROVIDE_TEST_KEY = Symbol('test') as InjectionKey<string>;
