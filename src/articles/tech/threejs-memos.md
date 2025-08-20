---
outline: deep
---

# Three.js 學習筆記

## 未分類

### 使用 Stats 模組追蹤效能

> 1-6

```ts
import Stats from 'three/addons/libs/stats.module.js';

const stats = new Stats(); // 引入

stats.showPanel(); // 預設顯示的資料

stats.start();
// 要追蹤的程式碼區塊
stats.end();

stats.update(); // 插入頻繁更新的函式追蹤更新狀況
```

### 使用 dat.gui 控制模型參數

::: warning
dat.gui 需要額外安裝型別檔 @types/dat.gui
:::

> 1-7

```ts
import { GUI } from 'dat.gui';

const gui = new GUI();
const cubeFolder = gui.addFolder('Cube'); // 在控制面板中建立分類資料夾
cubeFolder.add(cube.rotation, 'x', 0, Math.PI * 2); // 追蹤參數
cubeFolder.add(cube.rotation, 'y', 0, Math.PI * 2);
cubeFolder.add(cube.rotation, 'z', 0, Math.PI * 2);
cubeFolder.open(); // 預設開啟此資料夾

const cameraFolder = gui.addFolder('Camera');
cameraFolder.add(camera.position, 'z', 0, 20);
cameraFolder.open();
```

## 3D
### 鏡頭 Camera

## 其它
### package.json 中的 exports 可以改變引入路徑

```json
  "exports": {
    ".": {
      "import": "./build/three.module.js",
      "require": "./build/three.cjs"
    },
    "./examples/fonts/*": "./examples/fonts/*",
    "./examples/jsm/*": "./examples/jsm/*",
    "./addons": "./examples/jsm/Addons.js", // [!code highlight]
    "./addons/*": "./examples/jsm/*",
    "./src/*": "./src/*",
    "./webgpu": "./build/three.webgpu.js",
    "./tsl": "./build/three.tsl.js"
  },
```

```ts
// Before
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'; 

// After
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'; 
```


