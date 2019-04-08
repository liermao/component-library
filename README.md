# compontent
# 主要是争对移动端的一些插件
> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install
#安装移动端的px转vw的依赖包，配置文件查看.postcssrc.js文件
npm i postcss-aspect-ratio-mini postcss-px-to-viewport postcss-write-svg postcss-cssnext postcss-viewport-units cssnano -D
npm i cssnano-preset-advanced -D
#css预处理器为less
npm install less less-loader --D
#轮播部分依赖better-scroll
npm install better-scroll --save

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
