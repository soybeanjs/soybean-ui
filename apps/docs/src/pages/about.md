---
title: About
---

<script setup>
const { t } = useI18n();
useHead({ title: () => t('button.about') });

const router = useRouter();
</script>

<div>
  <h3 class="text-center">{{ t('button.about') }}</h3>
  <SButtonLink @click="router.back()">Go back</SButtonLink>
</div>

[Vitesse](https://github.com/antfu/vitesse) is an opinionated [Vite](https://github.com/vitejs/vite) starter template made by [@antfu](https://github.com/antfu) for mocking apps swiftly. With **file-based routing**, **components auto importing**, **markdown support**, I18n, PWA and uses **UnoCSS** for styling and icons.

```js
function vitesse() {
  const foo = 'bar';
  console.log(foo);
}
```

Check out the [GitHub repo](https://github.com/antfu/vitesse) for more details.
