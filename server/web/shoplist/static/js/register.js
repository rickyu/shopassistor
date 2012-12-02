/**
 * 新注册流程
 * author WangXi <xi.wang618@gmail.com>
 * **/
var registerAction = {
	email : '',
	password : '',
	nickname : '',
	taobaoID : '',
	gender : '',
	/*check email*/
	blurEmailInput:function() {
		var emailaddress = $("#emailaddress").val();
		var offset = $('#emailaddress').position();
		var posTop = offset['top'];
		var posLeft = offset['left'] + 280;
		if(emailaddress.length == 0) {
			showStatusIconOnRegForm( 'emailaddress' , 'warning' );
			showMsgOnRegForm('notice' , '请填写有效的电子邮箱，该邮箱将成为你在美丽说的登录帐号，同时用于找回密码。',posTop, posLeft);
			return false;
		}
		if ( !isEmail(emailaddress) ) {
			if ( emailaddress == "电子邮箱" ) {
				showStatusIconOnRegForm( 'emailaddress' , 'wrong' );
				showMsgOnRegForm('warning' , '你还没有填写电子邮箱哦。',posTop, posLeft);
				return false;
			}
			else{
				showStatusIconOnRegForm( 'emailaddress' , 'wrong' );
				showMsgOnRegForm('warning' , '电子邮箱格式有误，请重输！',posTop, posLeft);
				return false;
			}
		}
		
		var checkUserExist = checkIfEmailExist (emailaddress);
		if ( checkUserExist != "10" ) {
			showStatusIconOnRegForm( 'emailaddress' , 'wrong' );
			showMsgOnRegForm('warning' , '这个邮箱已经注册过美丽说了，请输入其他邮箱。',posTop, posLeft);
			return false;
		}
		showStatusIconOnRegForm( 'emailaddress' , 'good' );
		hideMsgWarningOnRegForm();
		hideMsgOnRegFrom ( );
		registerAction.email =emailaddress;
		return true;
	},
	focusEmailInput : function () {
		registerAction.blurEmailInput();
		return false;
	},
	checkNicknameSymbol: function(nickname) {
		return new RegExp("[ |:|：|@|#|\.|,|\!|\$|\%|\|\/]{1,}" ,'gi').test(nickname);
	},
	/*check nickname*/
	blurNicknameInput : function () {
		var nickname = $('#nickname').val();
		var isAT = this.checkNicknameSymbol(nickname);
		var offsetH = $('#nickname').parent().next('.hints').position();
		var offset = $('#nickname').position();
		var posTop = offset['top'];
		var posLeft = offsetH['left'] + 30;
		if (nickname == '昵称') {
			showStatusIconOnRegForm( 'nickname' , 'wrong' );
			showMsgOnRegForm('warning' , '你还没有填写昵称哦。',posTop, posLeft);
			return false;
		}
		if ( isAT == true ) {
			showStatusIconOnRegForm( 'nickname' , 'wrong' );
			showMsgOnRegForm('warning' , '支持中英文、数字、下划线，限长10个汉字。',posTop, posLeft);
			return false;
		}
		if(nickname.length == 0) {
			showStatusIconOnRegForm( 'nickname' , 'warning' );
			showMsgOnRegForm('notice' , '你喜爱的称呼，中英文下划线都可以。',posTop, posLeft);
			return false;
		}
		var nickname_length = checkStringLength(nickname);
		if( nickname_length > 20) {
			showStatusIconOnRegForm( 'nickname' , 'wrong' );
			showMsgOnRegForm('warning' , '支持中英文、数字、下划线，限长10个汉字。',posTop, posLeft);
			return false;
		}
		//判断昵称是否合法
		var checkUserExist = checkIfNickExist ( nickname );
		if ( checkUserExist == "5" || checkUserExist == "2" ) {
			showStatusIconOnRegForm( 'nickname' , 'wrong' );
			showMsgOnRegForm('warning' , '这个昵称已经有人使用了，请重新命名。',posTop, posLeft);
			return false;
		}
		if ( checkUserExist == "4" || checkUserExist == "3") {
			showStatusIconOnRegForm( 'nickname' , 'wrong' );
			showMsgOnRegForm('warning' , '支持中英文、数字、下划线，限长10个汉。',posTop, posLeft);
			return false;
		}

		showStatusIconOnRegForm( 'nickname' , 'good' );
		hideMsgWarningOnRegForm();
		hideMsgOnRegFrom ( );
		registerAction.nickname = nickname;
		return true;
	},
	focusNicknameInput : function( ) {
		registerAction.blurNicknameInput();
		return false;
	},

	/*check password*/
	blurPasswordInput : function (){
		var offset = $('#password').position();
		var posTop = offset['top'];
		var posLeft = offset['left'] + 280;
		var password = $("#password").val().replace(/(^\s*)|(\s*$)/g, "");
		if(password.length == 0 ){
			showStatusIconOnRegForm( 'password' , 'warning' );
			showMsgOnRegForm('notice' , '6位到32位，英文字母、数字或符号。',posTop, posLeft);
			return false;
		}
		if(password.length < 6 || password.length > 32) {
			showStatusIconOnRegForm( 'password' , 'wrong' );
			showMsgOnRegForm('warning' , '输入密码需在6位到32位之间。',posTop, posLeft);
			return false;
		}
		showStatusIconOnRegForm( 'password' , 'good' );
		hideMsgWarningOnRegForm();
		hideMsgOnRegFrom ( );
		registerAction.password = password;
		return true;
	},
	focusPasswordInput: function ( ) {
		registerAction.blurPasswordInput();
		return false;
	},

	/*check repeat password*/
	blurVPasswordInput : function (){
		var password = $("#password").val().replace(/(^\s*)|(\s*$)/g, "");
		var offset = $('#confirm_password').position();
		var posTop = offset['top'];
		var posLeft = offset['left'] + 280;

		var confirm_password = $("#confirm_password").val().replace(/(^\s*)|(\s*$)/g, "");
		if(confirm_password.length == 0 ) {
			showStatusIconOnRegForm( 'confirm_password' , 'warning' );
			showMsgOnRegForm('notice' , '再输入一次密码',posTop, posLeft);
			return false;
		}
		if(confirm_password.length < 6 || confirm_password.length > 32) {
			showStatusIconOnRegForm( 'confirm_password' , 'wrong' );
			showMsgOnRegForm('warning' , '输入密码需在6位到32位之间。',posTop, posLeft);
			return false;
		}
		if ( confirm_password != password) {
			showStatusIconOnRegForm( 'confirm_password' , 'wrong' );
			showMsgOnRegForm('warning' , '两次密码输入不一致，请重新输入',posTop, posLeft);
			return false;
		}
		showStatusIconOnRegForm( 'confirm_password' , 'good' );
		hideMsgWarningOnRegForm();
		hideMsgOnRegFrom ( );
		return true;
	},
	focusVPasswordInput : function (){
		registerAction.blurVPasswordInput();
		return false;
	},

	/*check taobao ID*/
	blurTaoBaoID : function ( ) {
		var taobaoID = $("#taobao_id").val().replace(/(^\s*)|(\s*$)/g, "");
		var offset = $('#taobao_id').position();
		var posTop = offset['top'];
		var posLeft = offset['left'] + 280 ;
		if ( taobaoID.length == 0 ) {
			showStatusIconOnRegForm( 'taobao_id' , 'warning' );
			showMsgOnRegForm('notice' , '请放心填写真实的淘宝用户名，用来领取你的美丽奖金。我们保护你的隐私。' , posTop , posLeft);
			return false;
		}
		var ifTaobaoIDExist = checkIfTaobaoIDExist ( taobaoID );
		if ( ifTaobaoIDExist == 0 ) {
			//alert("111");
			showStatusIconOnRegForm( 'taobao_id' , 'wrong' );
			showMsgOnRegForm('warning' , '请填写你真实的淘宝用户名! 用来领取你的美丽奖金。我们保护你的隐私。' , posTop , posLeft);
			return false;
		}
		showStatusIconOnRegForm( 'taobao_id' , 'good' );
		hideMsgWarningOnRegForm();
		hideMsgOnRegFrom ( );
		registerAction.taobaoID = taobaoID;
		return true;
	},
	focusTaoBaoID : function  ( )  {
		registerAction.blurTaoBaoID();
		return false;
	},

	/*check code*/
	blurCheckcodeInputForNewReg : function  ( ) {
		hideMsgOnRegFrom ( );
		var offset = $('#checkcode').position();
		var posTop = offset['top'] +1;
		var posLeft = offset['left'] + 258;
		//showStatusIconOnRegForm( 'checkcode' , 'warning' );
		showMsgOnRegForm('notice' , '输入验证码。' , posTop , posLeft);
	},
	focusCheckcodeInputForNewReg : function  ( ) {
		registerAction.blurCheckcodeInputForNewReg();
		$('.bottom-left-t').css('width', '105px');
		return false;
	},

	/*check gender*/
	blurGenderRadio : function ( ) {
		var offset = $('#genderM').position();
		var posTop = offset['top'] -17;
		var posLeft = offset['left'] + 146;
		//alert($('#genderM').attr('checked'));
		//alert($('#genderF').attr('checked'));
		var genderM = $('#genderM').val();
		var genderF = $('#genderF').val();
		var gender = '';
		if ( $('#genderM').attr('checked') == true ) {
			gender = genderM;
		}
		if ( $('#genderF').attr('checked') ) {
			gender = genderF
		}
		registerAction.gender = gender;
		if ( gender == undefined || gender == '' ) {
			showStatusIconOnRegForm( 'genderM' , 'warning' );
			showMsgOnRegForm('warning' , '你的性别。以后不能更改。' , posTop , posLeft);
			return false;
		}
		showStatusIconOnRegForm( 'genderM' , 'good' );
		hideMsgWarningOnRegForm();
		hideMsgOnRegFrom ( );
		//showStatusIconOnRegForm( 'genderM' , 'good' );
		return true;
	},
	focusGenderRadio : function ( ) {
		var offset = $('#genderM').position();
		var posTop = offset['top'] -17;
		var posLeft = offset['left']  + 146;
		showMsgOnRegForm('notice' , '你的性别。以后不能更改。' , posTop , posLeft);
		registerAction.blurGenderRadio( );
		showStatusIconOnRegForm( 'genderM' , 'good' );
		hideMsgWarningOnRegForm();
		hideMsgOnRegFrom ( );
		return false;
	},

	/*互联表单提交*/
	checkRegisterBindForm : function(type) {
		var boolCheck = false;
		boolCheck = registerAction.blurEmailInput();
		if(boolCheck == false) {
			return false;
		}
		boolCheck = registerAction.blurPasswordInput();
		if(boolCheck == false) {
			return false;
		}
		var data = {"email":registerAction.email,"password":registerAction.password};
		var url = server_url + "users/registerActionWeibo/" + type ;
		var callback = function(response) {
				$loginSuccess = $.dialog({
					title:'<span class="ml4">提示</span>',
					content:'<div class="f16 c"><span class="reg_suc">注册成功！</span></div>' 
				});
				$loginSuccess.find('.close_z').hide();
				$loginSuccess.toCenter().show();
				showShadow();
				setTimeout(function(){location.href = response}, 1000);
		};
		$.post(url,data,callback);
		$(".regFormBtn").attr("disabled", "disabled");
		setTimeout(function(){$(".regFormBtn").attr("disabled", false);},3000);
		return false;

	},
	/*表单提交*/
	checkRegisterForm : function ( ) {
		var boolCheck = false;
		boolCheck = registerAction.blurEmailInput();
		if ( boolCheck == false ) {
			return false;
		}
		boolCheck = registerAction.blurPasswordInput();
		if ( boolCheck == false ) {
			return false;
		}
		boolCheck = registerAction.blurVPasswordInput();
		if ( boolCheck == false ) {
			return false;
		}
		boolCheck = registerAction.blurNicknameInput();
		if ( boolCheck == false ) {
			return false;
		}
		boolCheck = registerAction.blurGenderRadio();
		if ( boolCheck == false ) {
			return false;
		}
		var checkcode = $("#checkcode2").val();
		var checkCodeEquals = verifyCheckCode(checkcode, 'reg');
		if ( checkCodeEquals == "0" ) {
			var offset = $('#checkcode').position();
			var posTop = offset['top'] +1;
			var posLeft = offset['left'] + 260;
			changeCheckCode();
			showStatusIconOnRegForm( 'checkcode' , 'wrong' );
			showMsgOnRegForm('warning' , '验证码输入错误。' , posTop , posLeft);
			return false;
		}  else {
			showStatusIconOnRegForm( 'checkcode' , 'good' );
		}

		var agreement = $("#agreement").attr("checked");
		if( agreement == false ) {
			var offset = $('#agreement').position();
			var posTop = offset['top'];
			var posLeft = offset['left'] + 200;
			showStatusIconOnRegForm( 'checkcode' , 'wrong' );
			showMsgOnRegForm('warning' , '需要同意美丽说服务使用协议。' , posTop , posLeft);
			return false;
		} else {
			showStatusIconOnRegForm( 'agreement' , 'good' );
		}
		if (registerAction.gender == "男") {
			$isFale = $.dialog({
				title:'<span style="margin-left:5px;">美丽提示</span>',
				content:$('#is_fale').show(),
				width:'420px',
				closeHandle: function() { $(this).closest('.dialog').hide(); hideShadow();}
			});
			 var ua = navigator.userAgent.toLowerCase();
			 var isIE6 = ua.indexOf("msie 6") > -1;//判断是否为IE6
			 var fixed = 'fixed'
			 if (isIE6) { fixed = '';}
			 $isFale.toCenter(fixed).show();
			 showShadow();
			 return false;
		}
		//$('#newRegister_submit').attr('disabled', 'disabled');
		var invite_code = $('#invite_code').val();
		var inviter_id = $('#inviter_id').val();
		var inviter_name = $('#inviter_name').val();
		var follow = 0;
		follow = $('#follow-mls-reg').attr('checked') ? 1 : 0;
		var from = $('#register-from').val();

		var data = {
				'email' : registerAction.email,
				'password' : registerAction.password,
				'nickname' : registerAction.nickname,
				'gender' : registerAction.gender,
				'checkcode' : checkcode,
				'invite_code' : invite_code,
				'inviter_id' : inviter_id,
				'inviter_name' : inviter_name,
				'follow' : follow,
				'from' : from
		};
		var url = server_url + "users/ajax_createNewUser";
		var callback=function ( t ) {
			if(t=='user_name'){
				$('#user_name_show').show();
				return  false;
			}else{
				window.location.href = t;
			}
		};
		 $.ajax({
			   async: false,
			   type: "POST",
			   url: url,
			   data: data,
			   success: callback
		 });
		return false;
	},

	checkQzoneRegisterForm : function () {
		var boolCheck = false;
		boolCheck = registerAction.blurNicknameInput();
		if ( boolCheck == false ) {
			return false;
		}
		boolCheck = registerAction.blurGenderRadio();
		if ( boolCheck == false ) {
			return false;
		}
		var gender = 'nv';
		if ( $('#genderM').attr('checked') == true ) {
			gender = 'man';
		}

		if (gender == 'man') {
			setTimeout(function(){location.href = 'http://www.meilishuo.com/connect/wbfail/qzone';}, 10);
			return false;
		}
		return true;
	},

	WeibocheckRegisterForm : function ( ) {
		var boolCheck = false;
		boolCheck = registerAction.blurEmailInput();
		if ( boolCheck == false ) {
			return false;
		}
		boolCheck = registerAction.blurPasswordInput();
		if ( boolCheck == false ) {
			return false;
		}
		boolCheck = registerAction.blurVPasswordInput();
		if ( boolCheck == false ) {
			return false;
		}
		var data = {
				'email' : registerAction.email,
				'password' : registerAction.password
		};
		var url = server_url + "users/ajax_updateWeiboUser";
		var callback=function ( t ) {
			if(t=='1'){
				//$('#success').show();
				//$('#failed').hide();
				//如果修改成功，则跳到/settings/setPersonal页面，暂时
				window.location.href = "/settings/setPersonal";
				return false;
				//success
			}else{
				$('#success').hide();
				$('#failed').show();
				return false;
				//出错处理
			}
		};
		//$.post(url ,data,callback);
		 $.ajax({
			   async: false,
			   type: "POST",
			   url: url,
			   data: data,
			   success: callback
		 });
		return false;
	},

	/*check real name*/
	blurRealname : function  ( ) {
		hideMsgOnRegFrom ( );
		var offset = $('#realname').position();
		var posTop = offset['top'];
		var posLeft = offset['left'] + 193;

		if( $('#realname').val().length == 0 ) {
			showMsgOnRegForm('notice' , '是参加活动、领取奖金的凭证，他人不可见，美丽说保护你的隐私。' , posTop , posLeft);
			showStatusIconOnRegForm( 'realname' , 'warning' );
			return false;
		} else {
			showStatusIconOnRegForm( 'realname' , 'ok' );
			return true;
		}
	},
	focusRealname : function  ( ) {
		registerAction.blurRealname();
		return false;
	},

	/*check birthday*/
	blurBirth : function  ( ) {
		hideMsgOnRegFrom ( );
		var offset = $('#birthday').position();
		var posTop = offset['top'];
		var posLeft = offset['left'] + 193;

		if( $('#birthday').val().length == 0 ) {
			showMsgOnRegForm('notice' , '生日当天登录美丽说，会有惊喜哦！' , posTop , posLeft);
			return false;
		} else {
			return true;
		}
	},
	focusBirth : function  ( ) {
		registerAction.blurBirth();
		return false;
	},
	singleCheckBoxChange : function(item) {
		if (!item.attr('checked')) {
			$('#select_all').removeAttr('checked');
		}
		return false;
	},
	selectAll : function(selectAll) {
		if (selectAll.attr('checked')) {
			$('.register3 .groupBox .chk').attr('checked', 'checked');
		}
		return false;
	},
	groupTabClick : function(tab) {
		$('.register3 ul li').removeClass('active').eq(tab).addClass('active');
		if ($('#group-' + tab).hasClass('loaded')) {
			$('#group-' + tab).removeClass('none').siblings('div.grid_9').addClass('none');
		}
		else {
			$.ajax({
				url: server_url + 'users/ajax_get_groups_html',
				data: {'tab': tab},
				success: function(ret) {
					$('#group-' + tab).html(ret).removeClass('none').addClass('loaded').siblings('div.grid_9').addClass('none');
				}
			});
		}
	},
	checkRegisterFormExtInfo : function () {
		var realname = $('#realname').val();
		var birthday = $('#birthday').val();
		var provinceid = $('#provinceid').val();
		var cityid = $('#cityid').val();
		var userId = $('#user_id').val();

		var boolCheck = false;
		boolCheck = registerAction.blurRealname();
		if ( boolCheck == false ) {
			return false;
		}

		boolCheck = registerAction.blurBirth();
	 	if ( boolCheck == 0 ) {
			return false;
	 	}

	 	if ( provinceid == 0 ) {
	 		var offset = $('#cityid').position();
			var posTop = offset['top'];
			var posLeft = offset['left']  + 220;
			showMsgOnRegForm('warning' , '请选择所在的省' , posTop , posLeft);
			return false;
	 	}

	 	if ( cityid == '所在城市' ) {
	 		var offset = $('#cityid').position();
			var posTop = offset['top'];
			var posLeft = offset['left']  + 220;
			showMsgOnRegForm('warning' , '请选择所在的城市' , posTop , posLeft);
			return false;
	 	}
	 	var data = {
	 			'realname' : realname,
	 			'birthday' : birthday,
	 			'provinceid' : provinceid,
	 			'cityid' : cityid,
	 			'user_id' : userId
	 			//'taobao_id': taobaoId
	 	};
	 	var url = server_url + "users/ajax_createNewUserExtInfo";
	 	var callback=function ( t ) {
			window.location=t;
		};
		$.post(url ,data,callback);
		return false;
	},
	createAGroup : function () {
		var group_name = $('#group_name').val();
		var ag_info_name = $("#ag_info_name");
		var ag_name_flag = /[\$|#|\|"]/.test(group_name);
		if(group_name == "" || group_name == "输入你的杂志名称") {
			ag_info_name.text('你还没有填写杂志名称哦。').fadeIn(300);
			var t = setTimeout(function(){ag_info_name.fadeOut(300);},5000);
			return false;
		}
		if(ag_name_flag) {
			ag_info_name.html('抱歉，名字里不可以使用特殊符号。').fadeIn(300);
			var t = setTimeout(function(){ag_info_name.fadeOut(300);},5000);
			return false;
		}
		var data = {'name' : group_name};

		var url = server_url + 'group/ajax_createGroup';
		var callback = function (t) {
			if (t == 0 || t == 2 ) {
				ag_info_name.text('这个名称已经有人使用了，请重新命名。').fadeIn(300);
				var t = setTimeout(function(){ag_info_name.fadeOut(300);},5000);
				$('.regGroupCreatBtn').removeClass('regGroupCreatBtn').addClass('regGroupBtn').html('好了，下一步<samp>&gt;&gt;</samp>');
			}
			else {
			    	window.location = server_url + 'users/registerStep4';
				}
			}
		$('.regGroupBtn').removeClass('regGroupBtn').addClass('regGroupCreatBtn').html('创建中<samp>...</samp>');
		$.post(url, data, callback);
	}

};

function showMsgOnRegForm ( msgType , msgContent , posTop , posLeft ) {
	hideMsgOnRegFrom ( );
	var msgID;
	if ( msgType == 'notice' ) {
		msgID = 'regNotice';
	} else {
		msgID = 'regWarning';
	}
	$('#'+msgID+' .messageBox').html(msgContent);
	$('#'+msgID).css('left', posLeft);
	$('#'+msgID).css('top', posTop);
	$('#'+msgID).show();
	$('.bottom-left-t').css('width', '158px');
	$('.bottom-left-w').css('width', '158px');
	//var t = setTimeout(function(){$('#'+msgID).fadeOut(300);},5000);
}

function hideMsgOnRegFrom ( ) {
	$('#regNotice').hide();
	//$('#regWarning').hide();
}

function hideMsgWarningOnRegForm() {
	$('#regWarning').hide();
}

function showStatusIconOnRegForm ( currentObj , iconType ) {
	var obj = $('#'+currentObj).parents('.inputBox').parents('.oneline').find('.hints');
	obj.css("width" , '25px');
	obj.css("height" , '25px');
	if ( iconType == 'wrong' ) {
		obj.css("background" , "url('"+pictureBaseUrl+"css/images/register/wrong.gif')");
	} else if ( iconType == 'warning' ) {
		//obj.css("background" , "url('"+pictureBaseUrl+"css/images/register/warning.gif')");
	} else {
		obj.css("background" , "url('"+pictureBaseUrl+"css/images/register/good.gif')");
	}
	return true;
}

function keydown(){
	$('#emailaddress_hint').hide();
	var $input = $('#emailaddress');
	if($input.val()=="请输入注册时使用的邮箱"){
		$input.val('');
		$input.css('color','black')
	}
	if($input.val()!="请输入注册时使用的邮箱"&&$input.val()!="")
	{
		$input.css('color','black');
	}
	return true;
}
function dingti(){
	var $ti=$('#yincang_gzq');
	$ti.hide();
}

function showHintInfo(section, info){
	$(section).html(info);
	$(section).show();
}
