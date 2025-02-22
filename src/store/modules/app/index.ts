import { defineStore } from 'pinia';
import defaultSettings from '@/config/settings.json';
import type { AppState } from './types';
import { computed, reactive, toRaw, toRefs } from 'vue';

// const useAppStore = defineStore('app', {
//   state: (): AppState => ({ ...defaultSettings }),

//   getters: {
//     appCurrentSetting(state: AppState): AppState {
//       return { ...state };
//     },
//     appDevice(state: AppState) {
//       return state.device;
//     }
//   },

//   actions: {
//     updateSettings(partial: Partial<AppState>) {
//       this.$patch(partial);
//     },

//     toggleTheme(dark: boolean) {
//       if (dark) {
//         this.theme = 'dark';
//         document.body.setAttribute('arco-theme', 'dark');
//       } else {
//         this.theme = 'light';
//         document.body.removeAttribute('arco-theme');
//       }
//     },
//     toggleDevice(device: string) {
//       this.device = device;
//     },
//     toggleMenu(value: boolean) {
//       this.hideMenu = value;
//     }
//   }
// });

const useAppStore = defineStore('app', () => {
  const settings = reactive({ ...defaultSettings });

  const appCurrentSetting = computed(() => toRaw(settings));
  const appDevice = computed(() => settings.device);

  const updateSettings = (partial: Partial<AppState>) => {
    Object.assign(settings, partial);
  };

  const toggleTheme = (dark: boolean) => {
    if (dark) {
      settings.theme = 'dark';
      document.body.setAttribute('arco-theme', 'dark');
    } else {
      settings.theme = 'light';
      document.body.removeAttribute('arco-theme');
    }
  };

  const toggleDevice = (device: string) => {
    settings.device = device;
  };

  const toggleMenu = (value: boolean) => {
    settings.hideMenu = value;
  };

  return {
    ...toRefs(settings),
    appCurrentSetting,
    appDevice,
    toggleTheme,
    toggleDevice,
    toggleMenu,
    updateSettings
  };
});

export default useAppStore;
