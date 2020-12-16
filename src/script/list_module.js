define(['jq_lazyload', 'pagination'], () => {
  return {
    init() {
      // 头部相关
      const $nav_li = $('.nav_li');
      const $nav_extend = $('.nav_extend');
      const $log_a_btn = $('.log_a_btn');
      const $reg_a_btn = $('.reg_a_btn');
      const $confirm_btn = $('.confirm_btn');
      const $mask = $('.mask');

      // 二级菜单--tab选项卡
      if ($('.header_login').css('display') === 'none' || $('.header_register').css('display') === 'none') {
        $nav_li.bind({
          mouseenter: function () {
            $nav_extend.eq($(this).index()).show().siblings('.nav_extend').hide();
            $mask.show();
          },
          mouseleave: function () {
            $nav_extend.hide();
            $mask.hide();
          }
        });
        $nav_extend.bind({
          mouseenter: function () {
            $(this).show();
            $mask.show();
          },
          mouseleave: function () {
            $(this).hide();
            $mask.hide();
          }
        });

      }
      // 注册登录相关
      $log_a_btn.on('click', function () {
        $('.header_extend').css('display', 'block');
        $('.header_login').css('display', 'block');
        $('.header_register').css('display', 'none');
        $log_a_btn.addClass('reg_log_active').siblings('.reg_a_btn').removeClass('reg_log_active');
        $mask.show();

        // 防止在注册登录页面取消遮罩
        if ($('.header_login').css('display') === 'block' || $('.header_register').css('display') === 'block') {
          $nav_li.unbind('mouseenter').unbind('mouseleave');
          $nav_extend.unbind('mouseenter').unbind('mouseleave');
        }
      });
      $reg_a_btn.on('click', function () {
        $('.header_extend').css('display', 'block');
        $('.header_register').css('display', 'block');
        $('.header_login').css('display', 'none');
        $reg_a_btn.addClass('reg_log_active').siblings('.log_a_btn').removeClass('reg_log_active');
        $mask.show();

        if ($('.header_login').css('display') === 'block' || $('.header_register').css('display') === 'block') {
          $nav_li.unbind('mouseenter').unbind('mouseleave');
          $nav_extend.unbind('mouseenter').unbind('mouseleave');
        }
      });
      $confirm_btn.on('click', function () {
        $('.header_login').css('display', 'none');
        $('.header_register').css('display', 'block');
        $reg_a_btn.addClass('reg_log_active').siblings('.log_a_btn').removeClass('reg_log_active');
      });
      $mask.on('click', function () {
        $('.header_extend').css('display', 'none');
        $('.header_login').css('display', 'none');
        $('.header_register').css('display', 'none');
        $reg_a_btn.removeClass('reg_log_active');
        $log_a_btn.removeClass('reg_log_active');
        $mask.show();
        $mask.hide();

        // 重新绑定nav对应事件
        $nav_li.bind({
          mouseenter: function () {
            $nav_extend.eq($(this).index()).show().siblings('.nav_extend').hide();
            $mask.show();
          },
          mouseleave: function () {
            $nav_extend.hide();
            $mask.hide();
          }
        });
        $nav_extend.bind({
          mouseenter: function () {
            $(this).show();
            $mask.show();
          },
          mouseleave: function () {
            $(this).hide();
            $mask.hide();
          }
        });
      });

      // -------------------------------------------------------

      $.ajax({
        url: 'http://10.31.161.62/dashboard/converse_project/php/list_goods.php',
        dataType: 'json'
      }).done((data) => {
        // console.log(data);

        // 渲染相关
        const $cate_detail = $('.cate_detail');
        const $order_btn = $('.fun_title a');
        let $array_default = []; //排序前的li放入此数组。
        let $array = []; //排序后的数组
        let $prev = []; //li里面的商品的前一个价格
        let $next = []; //li里面的商品的后一个价格
        let $renderStr = '';
        let $old_price = '';
        let $new_price = '';
        data = data.pagecontent;
        $.each(data, (index, value) => {
          if (!value.oldPrice) {
            $old_price = `<p class="old_price" style="visibility:hidden"><del></del></p>`;
            $new_price = `<p class="now_price1">￥${value.nowPrice}</p>`;
          } else {
            $old_price = `<p class="old_price"><del>￥${value.oldPrice}</del></p>`;
            $new_price = `<p class="now_price2">￥${value.nowPrice}</p>`;
          }
          $renderStr += `
            <li class="cate_detail_li">
              <div class="ca_de_img"><a href="detail.html?sid=${value.sid}" ><img class="lazy" data-original="${value.url}" width="165" height="165" /></a></div>
              <p class="ca_de_title"><a href="#">${value.title}</a></p>
              ${$old_price}
              ${$new_price}
            </li>
          `;
        });
        $cate_detail.html($renderStr);
        $("img.lazy").lazyload({
          effect: "fadeIn"
        });
        //将li元素添加到排序前的数组中。
        $array_default = [];  //重置数组，处理在如最后一页一页数据少于前几页时，进行排序多渲染的问题
        $array = [];//重置数组，处理在如最后一页一页数据少于前几页时，进行排序多渲染的问题
        $('.cate_detail li').each(function (index, element) { //element:原生的元素对象
          $array_default[index] = $(this); //排序前
          $array[index] = $(this); //排序后
        });
        // console.log($array_default);


        //进行分页设置(html页面载入分页的结构)
        $('.page').pagination({
          pageCount: data.pagesize, //总的页数
          jump: true, //是否开启跳转到指定的页数，布尔值。
          prevContent: '上一页', //将图标改成上一页下一页。
          nextContent: '下一页',
          callback: function (api) { //该行是固有用法
            console.log(api.getCurrent()); //获取当前的点击的页码。该行是固有用法
            $.ajax({
              url: 'http://10.31.161.62/dashboard/converse_project/php/list_goods.php',
              data: {
                page: api.getCurrent()
              },
              dataType: 'json'
            }).done(function (datalist) {
              datalist = datalist.pagecontent; //获取接口里面数据
              console.log(datalist);
              let $renderStr = '';
              $.each(datalist, function (index, value) {
                if (!value.oldPrice) {
                  $old_price = `<p class="old_price" style="visibility:hidden"><del></del></p>`;
                  $new_price = `<p class="now_price1">￥${value.nowPrice}</p>`;
                } else {
                  $old_price = `<p class="old_price"><del>￥${value.oldPrice}</del></p>`;
                  $new_price = `<p class="now_price2">￥${value.nowPrice}</p>`;
                }
                $renderStr += `
                <li class="cate_detail_li">
                  <div class="ca_de_img"><a href="detail.html?sid=${value.sid}" ><img class="lazy" data-original="${value.url}" width="165" height="165" /></a></div>
                  <p class="ca_de_title"><a href="#">${value.title}</a></p>
                  ${$old_price}
                  ${$new_price}
                </li>
                `;
              });
              $cate_detail.html($renderStr);
              //懒加载
              $("img.lazy").lazyload({
                effect: "fadeIn"
              });

              //将li元素添加到排序前的数组中。
              $array_default = [];
              $array = [];
              $('.cate_detail li').each(function (index, element) { //element:原生的元素对象
                $array_default[index] = $(this); //排序前
                $array[index] = $(this); //排序后
              });
              // console.log($array_default);
            });
          }
        });

        // 点击按钮实现升序降序效果
        $order_btn.each(function (index, element) {
          // console.log(element);
          $(element).on('click', function () {
            $(this).addClass('fun_style').siblings('.fun_title a').removeClass('fun_style');
          });
        });
        $order_btn.eq(0).on('click', function () {
          //遍历渲染。
          $.each($array_default, function(index, value) { //value就是li元素
            $cate_detail.append(value);
          });
        });

        $order_btn.eq(1).on('click', function () {
          // console.log(111);

          // 冒泡排序实现价格排序
          for (let i = 0; i < $array.length - 1; i++) {
            for (let j = 0; j < $array.length - 1 - i; j++) {
              // console.log($array[j]);
              $prev = parseFloat($array[j].find('p').last().html().substring(1)); //上一个价格
              $next = parseFloat($array[j + 1].find('p').last().html().substring(1)); //下一个价格
              if ($prev > $next) {
                //通过价格的比较,交换的是里面的这个li元素
                let temp = $array[j];
                $array[j] = $array[j + 1];
                $array[j + 1] = temp;
              }
            }
          }
          //遍历渲染。
          $.each($array, function (index, value) { //value就是li元素
            $cate_detail.append(value);
          });
          // console.log($array);
        });

        $order_btn.eq(2).on('click', function () {
          // 冒泡排序实现价格排序
          for (let i = 0; i < $array.length - 1; i++) {
            for (let j = 0; j < $array.length - 1 - i; j++) {
              // console.log($array[j]);
              $prev = parseFloat($array[j].find('p').last().html().substring(1)); //上一个价格
              $next = parseFloat($array[j + 1].find('p').last().html().substring(1)); //下一个价格
              if ($prev < $next) {
                //通过价格的比较,交换的是里面的这个li元素
                let temp = $array[j];
                $array[j] = $array[j + 1];
                $array[j + 1] = temp;
              }
            }
          }
          //遍历渲染。
          $.each($array, function (index, value) { //value就是li元素
            $cate_detail.append(value);
          });
        });

      });
    }
  }
});