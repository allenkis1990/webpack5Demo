/**
 * Created by Allen Liu on 2022/6/1.
 */
console.log(window.is_production,33);
// import('./assets/scss/index.scss')
import "@/assets/css/index.css"
import "@/assets/scss/index.scss"






// let txt = require('@/assets/txt/article.txt')
import text from '@/assets/txt/text.txt'
console.log(text,'文本');

import article from '@/assets/txt/article.txt'
console.log(article,'文章');

let umdData = require('@/assets/amdDemo/data.js')
console.log(umdData,'umdData');


// let $ = require('jquery')
console.log($,123);
console.log(process.env.NODE_ENV,33333);
//异步引入JS
// import("@/mods/mod1/index.js")


//异步引入CSS
// async function asyncLoadCss(){
//   await import ("@/assets/css/index2.css")
// }
// asyncLoadCss()

let a = 1
console.log(a);
let fn = ()=>{
  console.log($);
}
fn()


if(module.hot){
  module.hot.accept();
}