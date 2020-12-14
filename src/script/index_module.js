define([],()=>{
  return {
    init(){
      $.ajax({
        url: 'http://localhost/dashboard/converse_project/php/banner.php',
        dataType: 'json'
      }).done((data)=>{
        // console.log(data);

        // 二级菜单相关--tab选项卡
        const $nav_li = $('.nav_li');
        const $nav_extend = $('.nav_extend');
        
        // 幻灯片相关
        const $slide = $('.slide');
        const $slide_prev = $('.slide_prev');
        const $slide_next = $('.slide_next');
        const $menu_list = $('.menu_list');

        
        // 二级菜单--tab选项卡
        $nav_li.hover(function () {
          // $nav_extend.show();
          $nav_extend.eq($(this).index()).show().siblings('.nav_extend').hide();
        },function () {
          $nav_extend.hide();
        });
        $nav_extend.hover(function () {
          $(this).show();
        },function () {
          $(this).hide();
        });


      });
    }
  }
});