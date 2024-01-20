import { useNuxtApp } from 'nuxt/app';
import type { ObjectDirective } from 'vue';

interface PosthogElement extends HTMLElement {
  originalParentElement: HTMLElement | null;
  replacer: Comment;
}

export const vPosthogFeatureFlag: ObjectDirective<PosthogElement, string> = {
  beforeMount: (el, { value }) => {
    const { $posthog } = useNuxtApp();

    if (!$posthog) return;

    if ($posthog.isFeatureEnabled(value)) return;

    const replacer = document.createComment('');

    el.replacer = replacer;
    el.originalParentElement = el.parentElement;
    el.parentElement?.replaceChild(replacer, el);
  },
  beforeUpdate: (el, { value }) => {
    const { $posthog } = useNuxtApp();

    if (!$posthog) return;

    $posthog.reloadFeatureFlags();

    if ($posthog.isFeatureEnabled(value)) {
      el.originalParentElement?.replaceChild(el, el.replacer);
      return;
    }

    const replacer = document.createComment('');

    el.replacer = replacer;
    el.originalParentElement = el.parentElement;
    el.parentElement?.replaceChild(replacer, el);
  },
};
