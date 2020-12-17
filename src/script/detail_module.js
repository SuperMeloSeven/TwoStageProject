define(['jq_cookie'], () => {
  return {
    init() {
      // 二级菜单相关--tab选项卡
      const $nav_li = $('.nav_li');
      const $nav_extend = $('.nav_extend');
      const $mask = $('.mask');
      const $banner_height = $('.banner').height();

      // 点击进入登录注册页面
      const $log_a_btn = $('.log_a_btn');
      const $reg_a_btn = $('.reg_a_btn');
      const $confirm_btn = $('.confirm_btn');


      // 注册登录逻辑
      const $telephone = $('.telephone');
      const $password = $('.password');
      const $confirm_pwd = $('.confirm_pwd');
      const $email = $('.email');
      const $birthday = $('.birthday');
      const $reg_code = $('.reg_code');
      const $reg_code_area = $('.reg_code_area');
      const $male = $('.male');
      const $female = $('.female');
      const $reg_flag = $('.reg_flag');
      const $reg_btn = $('.reg_btn');
      const $reg_cue = $('.reg_cue');
      const $reg_form = $('.reg_form');
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
        if ($(this).val()) {
          let $reg = /^1(3|5|6|7|8|9)\d{9}$/;
          if ($reg.test($(this).val())) {
            // 验证手机号码唯一性
            $.ajax({
              type: 'post',
              url: 'http://10.31.161.62/dashboard/converse_project/php/register.php',
              data: {
                existTel: $telephone.val()
              }
            }).done((data) => {
              if (!data) {
                $reg_cue.eq(0).show().html('该手机号码已存在！');
                $telephone.css({
                  'border': '1px solid red',
                  'outline': 'none'
                });
              } else {
                $reg_cue.eq(0).hide();
                $telephone.css({
                  'border': '1px solid #333',
                  'outline': 'none'
                });
                teleFlag = true;
              }
            });
          } else {
            $reg_cue.eq(0).show().html('请输入11位有效中国手机号码！');
            $telephone.css({
              'border': '1px solid red',
              'outline': 'none'
            });
            teleFlag = false;
          }
        } else {
          $reg_cue.eq(0).show().html('手机号码不可为空！');
          $telephone.css({
            'border': '1px solid red',
            'outline': 'none'
          });
          teleFlag = false;
        }
      });
      // 密码验证
      $reg_cue.eq(1).hide();
      $password.blur(function () {
        if ($(this).val() !== '') {
          if ($(this).val().length >= 8 && $(this).val().length <= 12) {
            let $regNum = /\d+/g;
            let $regEngLower = /[a-z]+/g;
            let $regEngUpper = /[A-Z]+/g;
            let $countLanguage = 0;
            // 特殊字符且包括下划线（不要漏了下划线）
            let $regSpec = /[\W_]+/;

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
            if ($countLanguage !== 4) {
              $reg_cue.eq(1).show().html('密码要有数字，大小写字母，特殊字符混合！');
              $password.css({
                'border': '1px solid red',
                'outline': 'none'
              });
              pwdFlag = false;
            } else {
              $reg_cue.eq(1).hide();
              $password.css({
                'border': '1px solid #333',
                'outline': 'none'
              });
              pwdFlag = true;
            }
          } else {
            $reg_cue.eq(1).show().html('密码为8-12位字符！');
            $password.css({
              'border': '1px solid red',
              'outline': 'none'
            });
            pwdFlag = false;
          }
        } else {
          $reg_cue.eq(1).show().html('密码不可为空！');
          $password.css({
            'border': '1px solid red',
            'outline': 'none'
          });
          pwdFlag = false;
        }
        console.log($(this).val());
      });
      // 确认密码
      $confirm_pwd.on('input', function () {
        if ($(this).val().length < 8 || $(this).val().length > 12) {
          $reg_cue.eq(2).show().html('密码为8-12位字符！');
          $confirm_pwd.css({
            'border': '1px solid red',
            'outline': 'none'
          });
          pwdAgainFlag = false;
        }
      });
      $confirm_pwd.blur(function () {
        // 这里就检查输入的内容是否为空即可
        if ($(this).val() !== $password.val()) {
          $reg_cue.eq(2).show().html('两次密码输入结果不一致！');
          $confirm_pwd.css({
            'border': '1px solid red',
            'outline': 'none'
          });
          pwdAgainFlag = false;
        } else if ($(this).val() === '' && $password.val() === '') {
          $reg_cue.eq(2).show().html('密码不可为空！');
          $confirm_pwd.css({
            'border': '1px solid red',
            'outline': 'none'
          });
          pwdAgainFlag = false;
        } else {
          $reg_cue.eq(2).hide();
          $confirm_pwd.css({
            'border': '1px solid #333',
            'outline': 'none'
          });
          pwdAgainFlag = true;
        }
      });
      // 邮箱验证
      $email.blur(function () {
        if ($(this).val()) {
          let $regEmail = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/;
          if ($regEmail.test($(this).val())) {
            $reg_cue.eq(3).hide();
            $email.css({
              'border': '1px solid #333',
              'outline': 'none'
            });
            emailFlag = true;

          } else {
            $reg_cue.eq(3).show().html('请输入有效的电子邮箱地址！');
            $email.css({
              'border': '1px solid red',
              'outline': 'none'
            });
            emailFlag = false;
          }
        } else {
          $reg_cue.eq(3).show().html('邮箱不可为空！');
          $email.css({
            'border': '1px solid red',
            'outline': 'none'
          });
          emailFlag = false;
        }
      });
      // 生日验证
      $birthday.blur(function () {
        if ($(this).val()) {
          let $regBirth = /^(19|bai20)\d{2}-(1[0-2]|0?[1-9])-(0?[1-9]|[1-2][0-9]|3[0-1])$/;
          if ($regBirth.test($(this).val())) {
            $reg_cue.eq(4).hide();
            $birthday.css({
              'border': '1px solid #333',
              'outline': 'none'
            });
            birthFlag = true;
          } else {
            $reg_cue.eq(4).show().html('请输入有效的生日！');
            $birthday.css({
              'border': '1px solid red',
              'outline': 'none'
            });
            birthFlag = false;
          }
        } else {
          $reg_cue.eq(4).show().html('生日不可为空！');
          $birthday.css({
            'border': '1px solid red',
            'outline': 'none'
          });
          birthFlag = false;
        }
      });
      // 验证码
      $reg_code_area.html(regCode());
      $reg_code_area.on('click', function () {
        $reg_code_area.html(regCode());
      });
      $reg_code.blur(function () {
        // $reg_code_area.html();
        if ($(this).val()) {
          // console.log($reg_code_area.html());
          // console.log($(this).val());
          if ($(this).val() == $reg_code_area.html()) {
            $reg_cue.eq(5).hide();
            $reg_code.css({
              'border': '1px solid #333',
              'outline': 'none'
            });
            codeFlag = true;
          } else {
            $reg_cue.eq(5).show().html('请输入正确的验证码！');
            $reg_code.css({
              'border': '1px solid red',
              'outline': 'none'
            });
            codeFlag = false;
          }
        } else {
          $reg_cue.eq(5).show().html('验证码不可为空！');
          $reg_code.css({
            'border': '1px solid red',
            'outline': 'none'
          });
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
            if (bool) {
              codeStr += codeArr[index].toLowerCase();
            } else {
              codeStr += codeArr[index];
            }
          } else {
            codeStr += codeArr[index];
          }
        }
        codeStr += ',';
        codeStr = codeStr.split(',');
        return codeStr[codeStr.length - 2];
      }
      // 性别逻辑 默认选择男性
      $male.prop('checked', true);
      // 是否能够点击注册
      $reg_flag.on('click', function () {
        if ($telephone.val() === '') {
          $reg_cue.eq(0).show();
          $reg_cue.eq(0).html('手机号码不可为空！');
          $telephone.css({
            'border': '1px solid red',
            'outline': 'none'
          });
          teleFlag = false;
        }
        if ($password.val() === '') {
          $reg_cue.eq(1).show();
          $reg_cue.eq(1).html('密码不可为空！');
          $password.css({
            'border': '1px solid red',
            'outline': 'none'
          });
          pwdFlag = false;
        }
        if ($confirm_pwd.val() === '') {
          $reg_cue.eq(2).show();
          $reg_cue.eq(2).html('密码不可为空！');
          $confirm_pwd.css({
            'border': '1px solid red',
            'outline': 'none'
          });
          pwdAgainFlag = false;
        }
        if ($email.val() === '') {
          $reg_cue.eq(3).show();
          $reg_cue.eq(3).html('邮箱不可为空！');
          $email.css({
            'border': '1px solid red',
            'outline': 'none'
          });
          emailFlag = false;
        }
        if ($birthday.val() === '') {
          $reg_cue.eq(4).show();
          $reg_cue.eq(4).html('生日不可为空！');
          $birthday.css({
            'border': '1px solid red',
            'outline': 'none'
          });
          birthFlag = false;
        }
        if ($reg_code.val() === '') {
          $reg_cue.eq(5).show();
          $reg_cue.eq(5).html('验证码不可为空！');
          $reg_code.css({
            'border': '1px solid red',
            'outline': 'none'
          });
          codeFlag = false;
        }
        if (!teleFlag || !pwdFlag || !pwdAgainFlag || !emailFlag || !birthFlag || !codeFlag) {
          $reg_flag.removeClass('reg_btn').addClass('reg_btn_disable');
        } else {
          $reg_flag.removeClass('reg_btn_disable').addClass('reg_btn');
        }
        console.log(11111);
      });
      $reg_form.on('click', function () {
        if ($telephone.val() === '') {
          $reg_cue.eq(0).show();
          $reg_cue.eq(0).html('手机号码不可为空！');
          $telephone.css({
            'border': '1px solid red',
            'outline': 'none'
          });
          teleFlag = false;
        }
        if ($password.val() === '') {
          $reg_cue.eq(1).show();
          $reg_cue.eq(1).html('密码不可为空！');
          $password.css({
            'border': '1px solid red',
            'outline': 'none'
          });
          pwdFlag = false;
        }
        if ($confirm_pwd.val() === '') {
          $reg_cue.eq(2).show();
          $reg_cue.eq(2).html('密码不可为空！');
          $confirm_pwd.css({
            'border': '1px solid red',
            'outline': 'none'
          });
          pwdAgainFlag = false;
        }
        if ($email.val() === '') {
          $reg_cue.eq(3).show();
          $reg_cue.eq(3).html('邮箱不可为空！');
          $email.css({
            'border': '1px solid red',
            'outline': 'none'
          });
          emailFlag = false;
        }
        if ($birthday.val() === '') {
          $reg_cue.eq(4).show();
          $reg_cue.eq(4).html('生日不可为空！');
          $birthday.css({
            'border': '1px solid red',
            'outline': 'none'
          });
          birthFlag = false;
        }
        if ($reg_code.val() === '') {
          $reg_cue.eq(5).show();
          $reg_cue.eq(5).html('验证码不可为空！');
          $reg_code.css({
            'border': '1px solid red',
            'outline': 'none'
          });
          codeFlag = false;
        }
        if (!teleFlag || !pwdFlag || !pwdAgainFlag || !emailFlag || !birthFlag || !codeFlag) {
          $reg_flag.removeClass('reg_btn').addClass('reg_btn_disable');
        } else {
          $reg_flag.removeClass('reg_btn_disable').addClass('reg_btn');
        }
      });

      // 真正的注册
      $reg_btn.on('click', function () {
        let $is_gender = '';
        if ($male.prop('checked')) {
          $is_gender = 'male';
        } else if ($female.prop('checked')) {
          $is_gender = 'female';
        }

        $.ajax({
          type: 'post',
          url: 'http://10.31.161.62/dashboard/converse_project/php/register.php',
          data: {
            telephone: $telephone.val(),
            password: $password.val(),
            email: $email.val(),
            birthday: $birthday.val(),
            gender: $is_gender
          }
        }).done((data) => {
          // console.log(data);
          if (data === 'ok') {
            $('.header_login').css('display', 'block');
            $('.header_register').css('display', 'none');

            // 清空注册内容
            $telephone.val('');
            $password.val('');
            $confirm_pwd.val('');
            $email.val('');
            $birthday.val('');
            $reg_code.val('');
          } else {
            alert('注册失败！');
          }
        });
      });

      $confirm_btn.on('click', function () {
        $('.header_login').css('display', 'none');
        $('.header_register').css('display', 'block');

        // 下划线样式
        $reg_a_btn.addClass('reg_log_active').siblings('.log_a_btn').removeClass('reg_log_active');
      });


      // 登陆相关
      const $login_code = $('.login_code');
      const $login_code_area = $('.login_code_area');
      const $login_btn = $('.login_btn');
      const $login_tel = $('.login_tel');
      const $login_pass = $('.login_pass');
      const $tools_line = $('.tools_line');
      const $user_info = $('.user_info');
      const $user_tel = $('.user_tel');
      const $logout = $('.logout');
      let $login_tel_bool = true;
      let $login_pass_bool = true;
      let $login_code_bool = true;

      // 登陆界面验证
      $login_tel.on('blur', function () {
        if ($(this).val() === '') {
          $(this).css({
            'border': '1px solid red',
            'outline': 'none'
          });
          $login_tel_bool = false;
        } else {
          $(this).css({
            'border': '1px solid #333',
            'outline': 'none'
          });
          $login_tel_bool = true;
        }
      });
      $login_pass.on('blur', function () {
        if ($(this).val() === '') {
          $(this).css({
            'border': '1px solid red',
            'outline': 'none'
          });
          $login_pass_bool = false;
        } else {
          $(this).css({
            'border': '1px solid #333',
            'outline': 'none'
          });
          $login_pass_bool = true;
        }
      });
      $login_code.on('blur', function () {
        if ($(this).val() === '') {
          if ($(this).val() != $('.login_code_area').html()) {
            $(this).css({
              'border': '1px solid red',
              'outline': 'none'
            });
            $login_pass_bool = false;
          }
        } else {
          $(this).css({
            'border': '1px solid #333',
            'outline': 'none'
          });
          $login_pass_bool = true;
        }
      });
      $('.login_form').on('click', function () {
        if (!$login_tel_bool || !$login_pass_bool || !$login_code_bool || !$('.protocol').prop('checked')) {
          $('.login_flag').removeClass('login_btn').addClass('login_btn_disable');
        } else if ($login_tel_bool && $login_pass_bool && $login_code_bool && $('.protocol').prop('checked')) {
          $('.login_flag').removeClass('login_btn_disable').addClass('login_btn');
        }
      });

      $login_code_area.html(regCode());
      $login_code_area.on('click', function () {
        $login_code_area.html(regCode());
      });
      $login_code.on('blur', function () {
        if ($(this).val()) {
          if ($(this).val() == $login_code_area.html()) {
            $login_code.css({
              'border': '1px solid #333',
              'outline': 'none'
            });
          } else {
            alert('请输入正确的验证码！');
            $login_code.css({
              'border': '1px solid red',
              'outline': 'none'
            });
          }
        }
      })
      $login_btn.on('click', function () {
        $.ajax({
          type: 'post',
          url: 'http://10.31.161.62/dashboard/converse_project/php/login.php',
          data: {
            telephone: $login_tel.val(),
            password: $login_pass.val()
          }
        }).done(function (data) {
          if (!data) {
            alert('手机号码或者密码有误!');
            $password.val('');
          } else {
            location.href = 'index.html';
            localStorage.setItem('userTel', $login_tel.val());

            console.log($('.remember').prop('checked'));
            if ($('.remember:checked')) {
              console.log(1111);
              $('.remember').prop('checked', true)
              $login_tel.html(localStorage.getItem('userTel'));
            } else {
              $login_tel.html('');
            }
          }
        });
      });
      if (localStorage.getItem('userTel')) {
        $log_a_btn.css('visibility', 'hidden');
        $reg_a_btn.css('visibility', 'hidden');
        $tools_line.css('visibility', 'hidden');
        $user_info.show();
        $user_tel.html(localStorage.getItem('userTel'));
      }
      $logout.on('click', function () {
        $log_a_btn.css('visibility', 'visible');
        $reg_a_btn.css('visibility', 'visible');
        $tools_line.css('visibility', 'visible');
        $user_info.hide();
        localStorage.removeItem('userTel');
      });

      // -------------------------------------------------------

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

      let $sid = location.search.substring(1).split('=')[1];
      // 防止没有sid传入时，没有数据渲染
      if (!$sid) {
        $sid = 1;
      }

      $.ajax({
        url: 'http://10.31.161.62/dashboard/converse_project/php/detail_goods.php',
        dataType: 'json',
        data: {
          sid: $sid
        }
      }).done((data) => {
        console.log(data);

        // 根据传入的sid进行detail页面渲染
        let $curr_price = parseFloat(data.nowPrice);
        $('.goods_name').html(data.title);
        $('.curr_price').html($curr_price.toFixed(2));
        $('.detail_img img').attr('src', data.url);

        // -------------------------------------------------------

        const $spic = $('#spic');
        const $bpic = $('#bpic');
        const $sf = $('#sf'); //小放
        const $bf = $('#bf'); //大放
        const $left = $('#left'); //左箭头
        const $right = $('#right'); //右箭头
        const $list = $('#list'); //小图列表
        //$spic 小图   $bpic 大图  

        //小放/大放=小图/大图
        $sf.width($spic.width() * $bf.width() / $bpic.width());
        $sf.height($spic.height() * $bf.height() / $bpic.height());
        let $bili = $bpic.width() / $spic.width(); //比例大于1 放大效果
        $spic.hover(function() {
            $sf.css('visibility', 'visible');
            $bf.css('visibility', 'visible');
            $(this).on('mousemove', function(ev) {
                let $leftvalue = ev.pageX - $('.content_center').offset().left - $sf.width() / 2 - 80;
                let $topvalue = ev.pageY - $('.content_center').offset().top - $sf.height() / 2 - 120;
                if ($leftvalue < 0) {
                    $leftvalue = 0;
                } else if ($leftvalue >= $spic.width() - $sf.width()) {
                    $leftvalue = $spic.width() - $sf.width()
                }

                if ($topvalue < 0) {
                    $topvalue = 0;
                } else if ($topvalue >= $spic.height() - $sf.height()) {
                    $topvalue = $spic.height() - $sf.height()
                }

                $sf.css({
                    left: $leftvalue,
                    top: $topvalue
                });

                $bpic.css({
                    left: -$leftvalue * $bili,
                    top: -$topvalue * $bili
                });

            });
        }, function() {
            $sf.css('visibility', 'hidden');
            $bf.css('visibility', 'hidden');
        });


        // -------------------------------------------------------

        // 渲染放大镜小图
        let $small_pic = data.urls.split(',');
        let $s_pic_str = '';
        const $detail_pic_list = $('.detail_pic_list');
        $.each($small_pic, function (index, value) {
          // console.log(value);
          $s_pic_str += `
          <li class="pic_li">
            <a href="javascript:;"><img src="${value}" alt=""></a>
          </li>
          `;
        });
        $detail_pic_list.html($s_pic_str);

        $('.pic_li').on('click',function () {
          $(this).addClass('active').siblings('.pic_li').removeClass('active');

          $('#spic').find('img').attr('src',$(this).find('img').attr('src'));
        });

        // -------------------------------------------------------

        // 购物车逻辑
        let $arrSid = [];
        let $arrNum = [];

        //通过获取cookie进行判断，每存储一个商品对应的商品编号存入cookie里面，cookie就会发生变化。如果cookie里面存在当前商品的编号，该商品不是第一次存储，直接数量累加。
        function existCookie() {
          if ($.cookie('cookieSid') && $.cookie('cookieNum')) {
            $arrSid = $.cookie('cookieSid').split(',');
            $arrNum = $.cookie('cookieNum').split(',');
          } else { //没有cookie的情况下，数组需要清空
            $arrSid = [];
            $arrNum = [];
          }
        }

        //第一次存储添加sid进入$arrSid，存储数量
        //第二次以上，直接修改数量。
        $('.go_cart').on('click', function () {
          existCookie();
          if ($.inArray($sid, $arrSid) === -1) { //第一次添加商品
            $arrSid.push($sid);
            $.cookie('cookieSid', $arrSid, {
              expires: 10,
              path: '/'
            });
            $arrNum.push(1);
            $.cookie('cookieNum', $arrNum, {
              expires: 10,
              path: '/'
            });
          } else {
            //通过$sid获取商品的数量所在的位置。
            let $index = $.inArray($sid, $arrSid);
            $arrNum[$index] = parseInt($arrNum[$index]) + 1;
            $.cookie('cookieNum', $arrNum, {
              expires: 10,
              path: '/'
            });
          }
          console.log('商品成功加入');
        });

      });
    }
  }
});