define([], () => {
  return {
    init() {
      $.ajax({
        url: 'http://localhost/dashboard/converse_project/php/index_goods.php',
        dataType: 'json'
      }).done((data) => {
        // 二级菜单相关--tab选项卡
        const $nav_li = $('.nav_li');
        const $nav_extend = $('.nav_extend');
        const $mask = $('.mask');

        // 幻灯片相关
        const $slide = $('.slide');
        const $slide_pic = $('.slide_pic');
        const $slide_prev = $('.slide_prev');
        const $slide_next = $('.slide_next');
        const $menu_li = $('.menu_li');
        const $pic_num = $slide_pic.size();
        let $timer = null;
        let $num = 0;


        // 二级菜单--tab选项卡
        $nav_li.hover(function () {
          // $nav_extend.show();
          $nav_extend.eq($(this).index()).show().siblings('.nav_extend').hide();
          $mask.show();
        }, function () {
          $nav_extend.hide();
          $mask.hide();
        });
        $nav_extend.hover(function () {
          $(this).show();
        }, function () {
          $(this).hide();
        });

        // 轮播图逻辑
        $menu_li.eq(0).addClass('slide_active'); //默认初始第一个为样式

        $slide.hover(function () {
          clearInterval($timer);
        }, function () {
          $timer = setInterval(() => {
            $slide_next.click();
          }, 3000);
        });

        $menu_li.hover(function () {
          clearInterval($timer);
          $slide_pic.eq($(this).index()).show().siblings('.slide_pic').hide();
          $menu_li.eq($(this).index()).addClass('slide_active').siblings('.menu_li').removeClass('slide_active');
          $num = $(this).index();
        },function () {
          $slide_pic.eq($(this).index()).show().siblings('.slide_pic').hide();
          $menu_li.eq($(this).index()).addClass('slide_active').siblings('.menu_li').removeClass('slide_active');

          $timer = setInterval(() => {
            $slide_next.click();
          }, 3000);
        });
        $slide_next.hover(()=>{
          clearInterval($timer);
        },()=>{
          $timer = setInterval(() => {
            $slide_next.click();
          }, 3000);
        });
        $slide_prev.hover(()=>{
          clearInterval($timer);
        },()=>{
          $timer = setInterval(() => {
            $slide_next.click();
          }, 3000);
        });
        $slide_next.on('click', function () {
          // console.log($pic_num);
          $num++;
          slide();
        });
        $slide_prev.on('click', function () {
          $num--;
          slide();
        });

        $timer = setInterval(() => { // 自动轮播
          $slide_next.click();
        }, 3000);

        function slide() {
          if ($num === $pic_num) {
            $num = 1;
          }

          if ($num === -1) {
            $num = $pic_num - 2;
          }

          if ($num === $pic_num - 1) {
            $menu_li.eq(0).addClass('slide_active').siblings('.menu_li').removeClass('slide_active');
            $slide_pic.eq(0).show().siblings('.slide_pic').hide();
          } else {
            $menu_li.eq($num).addClass('slide_active').siblings('.menu_li').removeClass('slide_active');
            $slide_pic.eq($num).show().siblings('.slide_pic').hide();
          }
        }



        // 渲染
        console.log(data);
        const $cate_detail = $('.cate_detail');
        let $renderStr = '';
        let $old_price = '';
        let $new_price = '';
        $.each(data,function (index,value) {
          // console.log(value);
          if(!value.oldPrice){
            $old_price = `<p class="old_price" style="visibility:hidden"><del></del></p>`;
            $new_price = `<p class="now_price1">￥${value.nowPrice}</p>`;
          }else{
            $old_price = `<p class="old_price"><del>￥${value.oldPrice}</del></p>`;
            $new_price = `<p class="now_price2">￥${value.nowPrice}</p>`;
          }
          $renderStr += `
            <li class="cate_detail_li">
              <div class="ca_de_img"><a href="#" ><img src="${value.url}" alt=""></a></div>
              <p class="ca_de_title"><a href="#">${value.title}</a></p>
              ${$old_price}
              ${$new_price}
            </li>
          `;     
        });
        $cate_detail.html($renderStr);    
      });
    }
  }
});