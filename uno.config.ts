// unocss.config.ts
import { defineConfig, presetAttributify, presetIcons, presetTypography, presetWind3 } from 'unocss'
import presetAnimations from 'unocss-preset-animations'
import { builtinColors, presetShadcn } from 'unocss-preset-shadcn'

export default defineConfig({
  theme: {
    animation: {
      keyframes: {
        'spin-slow': '{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}',
      },
      counts: {
        'spin-slow': 'infinite',
      },
      durations: {
        'spin-slow': '3s',
      },
    },
  },
  presets: [
    presetWind3(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
    }),
    presetTypography(),
    presetAnimations(),
    presetShadcn(builtinColors.map((c) => ({ color: c }))),
  ],
  // By default, `.ts` and `.js` files are NOT extracted.
  // If you want to extract them, use the following configuration.
  // It's necessary to add the following configuration if you use shadcn-vue or shadcn-svelte.
  content: {
    pipeline: {
      include: [
        // the default
        /\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
        // include js/ts files
        '(components|src)/**/*.{js,ts}',
      ],
    },
  },
})
