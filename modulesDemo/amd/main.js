/**
 * Created by Allen Liu on 2022/6/7.
 */

/*
require(['./child.js'],function(data){
  console.log(data);//hahaha
})
//require.js*/


require.config({
  paths: {
    'jquery':'./libs/jquery.min',
    'child':'./child',
    'umdChild':'../umd/child'
  }
});



require(['jquery','child','umdChild'],function($,child,umdChild){
  console.log($,'jquery-parent');
  console.log(child,'child');
  console.log(umdChild,'umdChild');
});