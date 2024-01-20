import { defineNuxtPlugin } from '#app';
import { vPosthogCapture } from '../directives/v-posthog-capture';
import { vPosthogFeatureFlag } from '../directives/v-posthog-feature-flag';

export default defineNuxtPlugin(({ vueApp }) => {
  vueApp.directive('posthog-capture', vPosthogCapture);
  vueApp.directive('posthog-feature-flag', vPosthogFeatureFlag);
});
