# My Fe Library

This template should help get you started developing with Vue 3 in Vite.

### Start
```bash
npm install -g pnpm
pnpm install
make run
```

#### Import
```bash
# css
pnpm install -D tailwindcss@latest postcss@latest autoprefixer@latest
pnpx tailwindcss init
```

#### tips
使用正则给手机号加码
```js
{{ mobile.replace(/^(\d{1,3}(?:_\d{1,4})?)\d{3,4}(\d{3,4})/, '$1****$2') }}
```

这个正则表达式可以支持以下测试用例：
* 18312348123 → 183****8123
* 852_93854382 → 852_93****4382
* 44_100054385438 → 44_1000****5438
* 225_4382932 → 225_43****932
* 1_5793854309 → 1_579****4309
* 354_8439414 → 354_84****414
