### 初始化项目

[创建一个新的 Nuxt 项目](https://www.shadcn-vue.com/docs/installation/nuxt.html)

```bash
$ pnpm create nuxt@latest
```

[添加 shadcn-nuxt 模块](https://www.shadcn-vue.com/docs/installation/nuxt.html)

```bash
$ pnpm dlx nuxi@latest module add shadcn-nuxt
```

[使用 unocss-preset-shadcn](https://github.com/unocss-community/unocss-preset-shadcn)

```bash
$ pnpm i @unocss/reset
$ pnpm i -D unocss unocss-preset-animations nocss-preset-shadcn
```

```ts
# unocss.config.ts
import { defineConfig, presetWind3 } from 'unocss'
import presetAnimations from 'unocss-preset-animations'
import { builtinColors, presetShadcn } from 'unocss-preset-shadcn'

export default defineConfig({
  presets: [
    presetWind3(),
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
        "(components|src)/**/*.{js,ts}",
      ],
    },
  },
});
```

```md
> [!IMPORTANT]
> Do not run `npx shadcn-vue@latest init` to initialize your project.

1. `pnpm i lucide-vue-next reka-ui class-variance-authority clsx tailwind-merge` for shadcn-vue.
2. copy `utils.ts` into your project at `src/lib`
3. create `components.json` in your project root and modify as needed
4. `npx shadcn-vue@latest add button` for shadcn-vue.

> [!WARNING]
> You may need an empty `tailwind.config.js` file in your project root to make cli commands happy.
>
> If you encounter problems adjusting animation property, this may be because [tailwind-animate](https://github.com/jamiebuilds/tailwindcss-animate) has [duplicate rules about animation and transition](https://github.com/jamiebuilds/tailwindcss-animate/pull/46). You can refer to [Migration Guide from Animations Preset for UnoCSS](https://unocss-preset-animations.aelita.me/guide/migration.html) to solve this problem.
```

```ts
# copy `utils.ts` into your project at `src/lib`
import type { ClassValue } from 'clsx'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

```json
# create `components.json` in your project root and modify as needed
{
  "$schema": "https://shadcn-vue.com/schema.json",
  "style": "new-york",
  "typescript": true,
  "tailwind": {
    "config": "tailwind.config.js", // "tailwind.config.ts"
    "css": "src/assets/index.css", // "assets/index.css"
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "composables": "@/composables",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib"
  },
  "iconLibrary": "lucide"
}


# need to create an empty file:  `assets/index.css`
# need to create an empty file: `tailwind.config.ts`
```

[添加 shadcn-vue 组件](https://www.shadcn-vue.com/docs/cli.html)

```bash
# 安装按钮组件
$ npx shadcn-vue@latest add button
$ pnpm dlx shadcn-vue@latest add button
# 安装全部组件
$ pnpm dlx shadcn-vue@latest add --all
```

### 项目功能完善

[主题切换](https://github.com/unocss-community/unocss-preset-shadcn/blob/main/playground/src/components/theme-switch.tsx)

```ts
# modify app.vue file
const colorMode = useColorMode()
const color = computed(() => colorMode.value === 'dark' ? '#09090b' : '#ffffff')
const { theme, radius } = useCustomize()

useHead({
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { key: 'theme-color', name: 'theme-color', content: color },
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' },
  ],
  htmlAttrs: {
    lang: 'en',
  },
  bodyAttrs: {
    class: computed(() => `theme-${theme.value}`),
    style: computed(() => `--radius: ${radius.value}rem;`),
  },
})
```

[黑暗模式 @nuxtjs/color-mode](https://www.shadcn-vue.com/docs/dark-mode.html)

```ts
# 配置 nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/color-mode'
  ],
  colorMode: {
    classSuffix: ''
  }
})
```

```ts
# 切换模式
const colorMode = useColorMode()
colorMode.preference = "auto" | "light" | "dark"
```

[nuxt-i18n-micro](https://s00d.github.io/nuxt-i18n-micro/)

```bash
$ pnpm install nuxt-i18n-micro
```

```ts
# After installation, add the module to your nuxt.config.ts file:
export default defineNuxtConfig({
  modules: [
    'nuxt-i18n-micro',
  ],
  i18n: {
    locales: [
      { code: 'en', iso: 'en-US', dir: 'ltr' },
      { code: 'zh-CN', iso: 'zh-CN', dir: 'ltr' },
    ],
    localeCookie: 'lang',
    defaultLocale: 'en',
    translationDir: 'locales',
    autoDetectLanguage: true,
    autoDetectPath: '/',
    meta: true,
  },
})
```

[nuxt-zod-i18n](https://github.com/xibman/nuxt-zod-i18n)

```bash
# 1. Add `nuxt-zod-i18n` dependency to your project
$ npx nuxi@latest module add nuxt-zod-i18n
```

```ts
# 2. Add `nuxt-zod-i18n` to the `modules` section of `nuxt.config.ts` before `@nuxtjs/i18n` module
export default defineNuxtConfig({
  modules: ['nuxt-zod-i18n', '@nuxtjs/i18n']
})
```

[ICON](https://nuxt.com/modules/icon)

```bash
$ npx nuxi module add icon
# or
$ pnpm i -D @nuxt/icon

# 将图标集合安装到本地 pnpm i -D @iconify-json/collection-name
$ pnpm i -D @iconify-json/lucide
```

```ts
export default defineNuxtConfig({
  modules: ['@nuxt/icon'],
})
```

```ts
# 按需导入图标集合的部分图标 这样有利于缩小项目体积
export default defineNuxtConfig({
  modules: ['@nuxt/icon'],
  icon: {
    serverBundle: {
      collections: ['uil', 'mdi'],
    },
  },
})
```

###### [icones](https://icones.js.org/)

```vue
<Icon name="uil:github" />
<Icon name="fad:digital8" />
```

[pinia](https://nuxt.com/modules/pinia)

```bash
$ pnpm i pinia @pinia/nuxt
```

```ts
export default defineNuxtConfig({
  modules: ['@pinia/nuxt'],
})
```
