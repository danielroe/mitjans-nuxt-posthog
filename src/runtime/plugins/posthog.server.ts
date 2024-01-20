import { defineNuxtPlugin } from '#app';
import { defu } from 'defu';
import { type PostHogOptions, PostHog } from 'posthog-node';

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig().public.posthog;

  const clientOptions = defu<PostHogOptions, Partial<PostHogOptions>[]>(config.clientOptions, {
    host: config.host,
  });

  const posthogClient = new PostHog(config.publicKey, clientOptions);

  return {
    provide: {
      posthog: posthogClient,
    },
  };
});
