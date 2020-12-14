// 配置模块
require.config({
  paths: {
    // 这里的路径不需要带上扩展名
    'jq': 'https://cdn.bootcdn.net/ajax/libs/jquery/1.12.4/jquery.min',
    'jq_cookie': 'https://cdn.bootcdn.net/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.min',
    'jq_lazyload': 'https://cdn.bootcdn.net/ajax/libs/jquery.lazyload/1.9.1/jquery.lazyload'
  },
  shim: { //让不支持AMD的模块支持AMD，jquery本身支持AMD
    'jq_cookie': {
      deps: ['jq'],
    },
    'jq_lazyload': {
      deps: ['jq'], //deps:表示当前的模块依赖那个模块。
      // exports: 'jquery_lazyload' //给模块另外取一个别名。
    },
  }
});


// 调用模块
require(['jq'], () => {
  let $module_page = $('#page').attr('data-origin');

  // 调用子模块
  require([$module_page], module => {
    // 调用不同模块下对象的方法
    module.init();
  });
});