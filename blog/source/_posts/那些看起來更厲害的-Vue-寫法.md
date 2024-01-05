---
title: 那些看起來更厲害的 Vue 寫法
date: 2024-01-05 12:18:36
tags:
---

紀錄一下原先工作中的寫法與 Vue 釋出新版本功能之後的比對

# Vue 3.3

## defineEmits

###### 🔵 Before
```ts
// Before
interface Emits {
  (e: 'update:model-value', value: string): void;
}
```

##### 🟢 After

###### 1 - ❗這邊如果使用 `interface` TypeScript 會報錯

```ts
interface Emits {
  'update:model-value': [value: string];
}

const emit = defineEmits<Emits>(); // TS Error: Type 'Emits' does not satisfy the constraint...
```

###### 2 - 🟢 將 `interface` 改成 `type`
```ts
type Emits = {
  'update:model-value': [value: string];
};
```

###### 3 - 🟢 直接定義在 `defineEmits` 中
```ts
const emit = defineEmits<{
  'update:model-value': [value: string];
}>();
```

## defineProps 預設值

##### 🔵 Before
```ts
withDefaults(defineProps<Props>(), {
  msg: 'Default',
});
```

##### 🟢 After
```ts
const { msg = 'Default' } = defineProps<Props>();
```

上述的寫法目前需要額外設置才會啟用。

```js
// vite.config.js
export default {
  plugins: [
    vue({
      script: {
        propsDestructure: true
      }
    })
  ]
}
```

## 自訂組件雙向綁定 / defineModel
[請參考此處](https://dahisc.github.io/posts/8863/)

## v-bind 相同名稱的 prop / 變數

##### 🔵 Before
```
<img :id="id" :src="src" :alt="alt">
```

##### 🟢 After
```html
<img :id :src :alt>
```

## defineOptions

##### 🔵 Before 
```js
<script>
export default {
  inheritAttrs: false
};
</script>
```

##### 🟢 After 
```js
<script setup>
defineOptions({ inheritAttrs: false })
</script>
```