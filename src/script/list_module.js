define(['jq_lazyload', 'pagination'], () => {
  return {
    init() {
      $.ajax({
        url: 'http://localhost/dashboard/converse_project/php/list_goods.php',
        dataType: 'json'
      }).done((data) => {
        // 二级菜单相关--tab选项卡
        const $nav_li = $('.nav_li');
        const $nav_extend = $('.nav_extend');
        const $mask = $('.mask');
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
          $mask.show();
        }, function () {
          $(this).hide();
          $mask.hide();
        });

        // console.log(data);

        // 渲染相关
        const $cate_detail = $('.cate_detail');
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
              <div class="ca_de_img"><a href="#" ><img src="${value.url}" alt=""></a></div>
              <p class="ca_de_title"><a href="#">${value.title}</a></p>
              ${$old_price}
              ${$new_price}
            </li>
          `;
        });
        $cate_detail.html($renderStr);


        //2.进行分页设置(html页面载入分页的结构)
        $('.page').pagination({
          pageCount: data.pageno, //总的页数
          jump: true, //是否开启跳转到指定的页数，布尔值。
          prevContent: '上一页', //将图标改成上一页下一页。
          nextContent: '下一页',
          callback: function (api) {
            console.log(api.getCurrent()); //获取当前的点击的页码。
            $.ajax({
              url: 'http://localhost/dashboard/converse_project/php/list_goods.php',
              data: {
                page: api.getCurrent()
              },
              dataType: 'json'
            }).done(function (datalist) {
              datalist = datalist.pagedata; //获取接口里面数据
              let $renderStr = '';
              $.each(datalist, function (index, value) {
                $renderStr += `
                  <li>
                      <a href="detail.html?sid=${value.sid}">
                      <img class="lazy" data-original="${value.url}" width="165" height="165" />
                          <p>${value.title}</p>
                          <span>￥${value.price}</span>
                      </a>
                  </li>
                `;
              });
              $list.html($renderStr);
              //懒加载
              $("img.lazy").lazyload({
                effect: "fadeIn"
              });

              //将li元素添加到排序前的数组中。
              $('.list li').each(function (index, element) { //element:原生的元素对象
                $array_default[index] = $(this); //排序前
                $array[index] = $(this); //排序后
              });
              console.log($array_default);
            });
          }
        });
      });
    }
  }
});