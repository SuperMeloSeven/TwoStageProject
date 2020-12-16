define(['jq_lazyload'], () => {
  return {
    init() {
      $.ajax({
        url: 'http://10.31.161.62/dashboard/converse_project/php/index_goods.php',
        dataType: 'json'
      }).done((data) => {
        // 二级菜单相关--tab选项卡
        const $nav_li = $('.nav_li');
        const $nav_extend = $('.nav_extend');
        const $mask = $('.mask');
        const $banner_height = $('.banner').height();


        // 幻灯片相关
        const $slide = $('.slide');
        const $slide_pic = $('.slide_pic');
        const $slide_prev = $('.slide_prev');
        const $slide_next = $('.slide_next');
        const $menu_li = $('.menu_li');
        const $pic_num = $slide_pic.size();
        let $timer = null;
        let $num = 0;
        $('.slide_pic img').height($banner_height);


        // 点击进入登录注册页面
        const $log_a_btn = $('.log_a_btn');
        const $reg_a_btn = $('.reg_a_btn');
        const $confirm_btn = $('.confirm_btn');


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
          if ($('.header_login').css('display') === 'block' || $('.header_register').css('display') === 'block'){
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

          if ($('.header_login').css('display') === 'block' || $('.header_register').css('display') === 'block'){
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


        // 注册登录逻辑
        $telephone = $('.telephone');
        $password = $('.password');
        $confirm_pwd = $('.confirm_pwd');
        $email = $('.email');
        $birthday = $('.birthday');
        $reg_code = $('.reg_code');
        $reg_code_area = $('.reg_code_area');
        $male = $('.male');
        $female = $('.female');
        $reg_flag = $('.reg_flag');
        $reg_btn = $('.reg_btn');
        $reg_cue = $('.reg_cue');
        $reg_form = $('.reg_form');
        let teleFlag = true;
        let pwdFlag = true;
        let pwdAgainFlag = true;
        let emailFlag = true;
        let birthFlag = true;
        let codeFlag = true;
        let codeArr = [];
        let codeStr = '';

        // console.log($reg_cue.eq(1));
        // 手机号码验证
        $telephone.blur(function () {
          if($(this).val()){
            let $reg = /^1(3|5|6|7|8|9)\d{9}$/;
            if ($reg.test($(this).val())) {
              $reg_cue.eq(0).hide();
              $telephone.css({'border':'1px solid #333','outline':'none'});
              teleFlag = true;
            } else {
              $reg_cue.eq(0).show();
              $reg_cue.eq(0).html('请输入11位有效中国手机号码！');
              $telephone.css({'border':'1px solid red','outline':'none'});
              teleFlag = false;
            }
          }else{
            $reg_cue.eq(0).show();
            $reg_cue.eq(0).html('手机号码不可为空！');
            $telephone.css({'border':'1px solid red','outline':'none'});
            teleFlag = false;
          }
        });
        // 密码验证
        $reg_cue.eq(1).hide();
        $password.on('input',function () {
          // console.log($(this).val());
          if ($(this).val().length >= 8 && $(this).val().length <= 12) {
            let $regNum = /\d+/g;
            let $regEngLower = /[a-z]+/g;
            let $regEngUpper = /[A-Z]+/g;
            let $countLanguage = 0;
            // 特殊字符且包括下划线（不要漏了下划线）
            let $regSpec = /[\W_]+/;

            console.log($(this).val());
            // 判断语种数量
            if ($regNum.test($(this).val())) {
              $countLanguage++;
            }     
            if ($regEngLower.test($(this).val())) {
              $countLanguage++;
            }      
            if ($regEngUpper.test($(this).val())) {
              $countLanguage++;
            }      
            if ($regSpec.test($(this).val())) {
              $countLanguage++;
            }

            console.log($countLanguage);
            if($countLanguage !== 4){
              $reg_cue.eq(1).show();
              $reg_cue.eq(1).html('密码要有数字，大小写字母，特殊字符混合！');
              $password.css({'border':'1px solid red','outline':'none'});
              pwdFlag = false;
            }
          }else{
            $reg_cue.eq(1).show();
            $reg_cue.eq(1).html('密码为8-12位字符！');
            $password.css({'border':'1px solid red','outline':'none'});
            pwdFlag = false;
          }
        });
        $password.blur(function () {
          if($(this).val() !== ''){
            $reg_cue.eq(1).hide();
            $password.css({'border':'1px solid #333','outline':'none'});
            pwdFlag = true;
          }else{
            $reg_cue.eq(1).show();
            $reg_cue.eq(1).html('密码不可为空！');
            $password.css({'border':'1px solid red','outline':'none'});
            pwdFlag = false;
          }
          console.log($(this).val());
        });       
        // 确认密码
        $confirm_pwd.on('input',function () {
          if ($(this).val().length < 8 || $(this).val().length > 12) {
            $reg_cue.eq(2).show();
            $reg_cue.eq(2).html('密码为8-12位字符！');
            $confirm_pwd.css({'border':'1px solid red','outline':'none'});
            pwdAgainFlag = false;
          }
        });
        $confirm_pwd.blur(function () {
          // 这里就检查输入的内容是否为空即可
          if ($(this).val() !== $password.val()) {
            $reg_cue.eq(2).show();
            $reg_cue.eq(2).html('两次密码输入结果不一致！');
            $confirm_pwd.css({'border':'1px solid red','outline':'none'});
            pwdAgainFlag = false;
          } else if ($(this).val() === '' && $password.val() === '') {
            $reg_cue.eq(2).show();
            $reg_cue.eq(2).html('密码不可为空！');
            $confirm_pwd.css({'border':'1px solid red','outline':'none'});
            pwdAgainFlag = false;
          } else {
            $reg_cue.eq(2).hide();
            $confirm_pwd.css({'border':'1px solid #333','outline':'none'});
            pwdAgainFlag = true;
          }
        });
        // 邮箱验证
        $email.blur(function () {
          if($(this).val()){
            let $regEmail = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/;
            if ($regEmail.test($(this).val())) {
              $reg_cue.eq(3).hide();
              $email.css({'border':'1px solid #333','outline':'none'});
              emailFlag = true;
            } else {
              $reg_cue.eq(3).show();
              $reg_cue.eq(3).html('请输入有效的电子邮箱地址！');
              $email.css({'border':'1px solid red','outline':'none'});
              emailFlag = false;
            }
          }else{
            $reg_cue.eq(3).show();
            $reg_cue.eq(3).html('邮箱不可为空！');
            $email.css({'border':'1px solid red','outline':'none'});
            emailFlag = false;
          }
        });
        // 生日验证
        $birthday.blur(function () {
          if($(this).val()){
            let $regBirth = /^(19|bai20)\d{2}-(1[0-2]|0?[1-9])-(0?[1-9]|[1-2][0-9]|3[0-1])$/;
            if ($regBirth.test($(this).val())) {
              $reg_cue.eq(4).hide();
              $birthday.css({'border':'1px solid #333','outline':'none'});
              birthFlag = true;
            } else {
              $reg_cue.eq(4).show();
              $reg_cue.eq(4).html('请输入有效的生日！');
              $birthday.css({'border':'1px solid red','outline':'none'});
              birthFlag = false;
            }
          }else{
            $reg_cue.eq(4).show();
            $reg_cue.eq(4).html('生日不可为空！');
            $birthday.css({'border':'1px solid red','outline':'none'});
            birthFlag = false;
          }
        });
        // 验证码
        $reg_code_area.html(regCode());
        $reg_code_area.on('click',function () {
          $reg_code_area.html(regCode());
        });
        $reg_code.blur(function () {          
          // $reg_code_area.html();
          if($(this).val()){
            // console.log($reg_code_area.html());
            // console.log($(this).val());
            if ($(this).val() === $reg_code_area.html()) {
              $reg_cue.eq(5).hide();
              $reg_code.css({'border':'1px solid #333','outline':'none'});
              codeFlag = true;
            } else {
              $reg_cue.eq(5).show();
              $reg_cue.eq(5).html('请输入正确的验证码！');
              $reg_code.css({'border':'1px solid red','outline':'none'});
              codeFlag = false;
            }
          }else{
            $reg_cue.eq(5).show();
            $reg_cue.eq(5).html('验证码不可为空！');
            $reg_code.css({'border':'1px solid red','outline':'none'});
            codeFlag = false;
          }
        });
        function regCode() {
          for (let a = 48; a <= 57; a++) {
            codeArr.push(String.fromCharCode(a));
          }
      
          for (let b = 65; b <= 90; b++) {
            codeArr.push(String.fromCharCode(b));
          }
      
          for (let c = 0; c < 4; c++) {
            let index = parseInt(Math.random() * codeArr.length);
            
            if (index > 9) {
              let bool = Math.random() > 0.45 ? true : false;
              if(bool){
                codeStr += codeArr[index].toLowerCase();
              }else{
                codeStr += codeArr[index];
              }
            } else {
              codeStr += codeArr[index];
            }
          }
          codeStr += ',';
          codeStr = codeStr.split(',');
          return codeStr[codeStr.length-2];
        }
        // 性别逻辑 默认选择男性
        $male.prop('checked',true);
        // 是否能够点击注册
        $reg_flag.on('click',function () {
          if($telephone.val() === ''){
            $reg_cue.eq(0).show();
            $reg_cue.eq(0).html('手机号码不可为空！');
            $telephone.css({'border':'1px solid red','outline':'none'});
            teleFlag = false;
          }
          if($password.val() === ''){
            $reg_cue.eq(1).show();
            $reg_cue.eq(1).html('密码不可为空！');
            $password.css({'border':'1px solid red','outline':'none'});
            pwdFlag = false;
          }
          if($confirm_pwd.val() === ''){
            $reg_cue.eq(2).show();
            $reg_cue.eq(2).html('密码不可为空！');
            $confirm_pwd.css({'border':'1px solid red','outline':'none'});
            pwdAgainFlag = false;
          }
          if($email.val() === ''){
            $reg_cue.eq(3).show();
            $reg_cue.eq(3).html('邮箱不可为空！');
            $email.css({'border':'1px solid red','outline':'none'});
            emailFlag = false;
          }
          if($birthday.val() === ''){
            $reg_cue.eq(4).show();
            $reg_cue.eq(4).html('生日不可为空！');
            $birthday.css({'border':'1px solid red','outline':'none'});
            birthFlag = false;
          }
          if($reg_code.val() === ''){
            $reg_cue.eq(5).show();
            $reg_cue.eq(5).html('验证码不可为空！');
            $reg_code.css({'border':'1px solid red','outline':'none'});
            codeFlag = false;
          }
          if(!teleFlag || !pwdFlag || !pwdAgainFlag || !emailFlag || !birthFlag || !codeFlag){
            $reg_flag.removeClass('reg_btn').addClass('reg_btn_disable');
          }else{
            $reg_flag.removeClass('reg_btn_disable').addClass('reg_btn');
          }
        });
        $reg_form.on('click',function () {
          console.log(1111);
          if($telephone.val() === ''){
            $reg_cue.eq(0).show();
            $reg_cue.eq(0).html('手机号码不可为空！');
            $telephone.css({'border':'1px solid red','outline':'none'});
            teleFlag = false;
          }
          if($password.val() === ''){
            $reg_cue.eq(1).show();
            $reg_cue.eq(1).html('密码不可为空！');
            $password.css({'border':'1px solid red','outline':'none'});
            pwdFlag = false;
          }
          if($confirm_pwd.val() === ''){
            $reg_cue.eq(2).show();
            $reg_cue.eq(2).html('密码不可为空！');
            $confirm_pwd.css({'border':'1px solid red','outline':'none'});
            pwdAgainFlag = false;
          }
          if($email.val() === ''){
            $reg_cue.eq(3).show();
            $reg_cue.eq(3).html('邮箱不可为空！');
            $email.css({'border':'1px solid red','outline':'none'});
            emailFlag = false;
          }
          if($birthday.val() === ''){
            $reg_cue.eq(4).show();
            $reg_cue.eq(4).html('生日不可为空！');
            $birthday.css({'border':'1px solid red','outline':'none'});
            birthFlag = false;
          }
          if($reg_code.val() === ''){
            $reg_cue.eq(5).show();
            $reg_cue.eq(5).html('验证码不可为空！');
            $reg_code.css({'border':'1px solid red','outline':'none'});
            codeFlag = false;
          }
          if(!teleFlag || !pwdFlag || !pwdAgainFlag || !emailFlag || !birthFlag || !codeFlag){
            $reg_flag.removeClass('reg_btn').addClass('reg_btn_disable');
          }else{
            $reg_flag.removeClass('reg_btn_disable').addClass('reg_btn');
          }
        });
        $reg_btn.on('click',function () {
          
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
        }, function () {
          $slide_pic.eq($(this).index()).show().siblings('.slide_pic').hide();
          $menu_li.eq($(this).index()).addClass('slide_active').siblings('.menu_li').removeClass('slide_active');

          $timer = setInterval(() => {
            $slide_next.click();
          }, 3000);
        });
        $slide_next.hover(() => {
          clearInterval($timer);
        }, () => {
          $timer = setInterval(() => {
            $slide_next.click();
          }, 3000);
        });
        $slide_prev.hover(() => {
          clearInterval($timer);
        }, () => {
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
        // console.log(data);
        const $cate_detail = $('.cate_detail');
        let $renderStr = '';
        let $old_price = '';
        let $new_price = '';
        $.each(data, function (index, value) {
          // console.log(value);
          if (!value.oldPrice) {
            $old_price = `<p class="old_price" style="visibility:hidden"><del></del></p>`;
            $new_price = `<p class="now_price1">￥${value.nowPrice}</p>`;
          } else {
            $old_price = `<p class="old_price"><del>￥${value.oldPrice}</del></p>`;
            $new_price = `<p class="now_price2">￥${value.nowPrice}</p>`;
          }
          $renderStr += `
            <li class="cate_detail_li">
              <div class="ca_de_img"><a href="#" ><img class="lazy" data-original="${value.url}" width="165" height="165" /></a></div>
              <p class="ca_de_title"><a href="#">${value.title}</a></p>
              ${$old_price}
              ${$new_price}
            </li>
          `;
        });
        $cate_detail.html($renderStr);
        //懒加载---页面加载完成
        $(function () {
          $('img.lazy').lazyload({
            effect: 'fadeIn' //显示方法：谈入
          });
        })
      });
    }
  }
});