/**
* @class hxthebe
* @Author JakeChiu
* @createTime 2016-03-30
* @version 1.0
*/
if (typeof(hxthebe)=='undefined') {var hxthebe = { lang: {}, params: {} }};
(function(){
	//声明类库
	hxthebe.dom={
		setdom:function(){  
			this.width = $(window).width();
			this.height = $(window).height();
			this.boxheight= boxheight;
			this.mainBox = $("#mainBox");
			this.mleft = $("#mLeft");
			this.mLiner = $("#mLiner");
			this.mRight = $("#mRight");
		}
	}
	hxthebe.dom.setdom.prototype = 
	{
		setboxlay:function()
		{
			//设置dom框架
			var _this =this;
			var leftopt ={
				width:function(){
					if ($("#mlinercopy").length > 0) {
						return $("#mlinercopy").css("left").split("px")[0]
					}else
					{
						return _this.width / 2 - 5
					}
				},
				height:_this.boxheight
			}
			var lineropt ={
				height:_this.boxheight,
				width:_this.mLiner.width(),
				left:function()
				{
					if ($("#mlinercopy").length > 0) {
						return $("#mlinercopy").css("left").split("px")[0];
					} else {
						return leftopt.width();
					}
				}
			}
			var rightopt ={
				height:_this.boxheight,
				width:_this.width - lineropt.left()-10
			}
			_this.mleft.css({width:leftopt.width(),height:leftopt.height});
			_this.mLiner.css({height:lineropt.height,left:lineropt.left()});
			_this.mRight.css({height:rightopt.height,width:rightopt.width});
		},
	 	getMousePos:function(event) { 
	      var e = event || window.event; 
	      var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft; 
	      var scrollY = document.documentElement.scrollTop || document.body.scrollTop; 
	      var x = e.pageX || e.clientX + scrollX; 
	      var y = e.pageY || e.clientY + scrollY; 
	      //alert('x: ' + x + '\ny: ' + y); 
	      return { 'x': x, 'y': y }; 
	    },
	    linermover:function()
	    {
	    	var _this = this;
	    	_this.mainBox.mousemove(function(event) {
	    		var pointX = _this.getMousePos(event).x;
				$("#mlinercopy").css("left",pointX)
	    	});
	    },
		setlinneranimate:function()
		{
			//绑定中间条动画
			var _this=this;
			var obj=_this.mLiner;
			var o = $("<div></div>")
			obj.mousedown(function(event) {
				o.attr({"id":"mlinercopy","calss":"liner poa"});
				o.css({"left":_this.mLiner.css("left"),"z-index":9,height:_this.boxheight});
				_this.mainBox.append(o);
				_this.linermover();
			})
			$(window).mouseup(function(event) {
				if($("#mlinercopy").length > 0)
				{
				// obj.css("left",o.css("left"));
				// _this.mleft.css("width",o.css("left"));
				// _this.mRight.css("left",o.css("left"));
				_this.setboxlay();
				_this.mLiner.css("left",o.css("left"))
				o.remove();
				}
			});
		},
		settab:function()
		{
			$("#rbot .tab .nv").click(function(){
				$(this).addClass("on").siblings('.nv').removeClass("on");
				$("#rbot .cont").hide()
				$("#tab"+$(this).index()).show()
			})
		},
		rightlay:function()
		{
			//设置右侧dom
			var _this=this;
			var height = _this.boxheight / 2;
			$("#rtop").height(height);
			$("#rbot").height(height);
			$("#tabcon").height(height-$("#rot .tab").height());
			this.settab();
		},
		bindLogMore:function()
		{
			var _h =this.boxheight;
			$("#log_more").click(function(){
				if($("#log_more").hasClass("f"))
				{
					$("#rtop").show(500,function(){
						$("#rbot").height(_h/2);
					});
					$("#log_more").removeClass("f");
					$("#tabcon").height(_h/2-$("#rot .tab").height());	
					
				}else{
					$("#rtop").hide(500);
					$("#log_more").addClass("f");
					$("#rbot").height(_h);
					$("#tabcon").height(_h-$("#rot .tab").height());	
				}
			})

		},
		beg:function(type,state)
		{
			var _this = this;
			$(".spinner").show();
			if(type)
			{
				$("#tab0").append("<div class=\"output_area\">"+state+"</div>");
            	_this.showlog()
			}
		},
		endr:function(toinsert,err)
		{
			var _this = this;
            if(typeof(err)!="undefined")
            {
            	$("#tab1").append(toinsert);
            	_this.showerr()
            }
            else
            {
				if (toinsert.find(".output_error").length > 0) {
					$("#tab1").append(toinsert);
					_this.showerr()
				}
				else 
				{
					$("#tab0").append(toinsert);
					_this.showlog()
				}
			}
            $(".spinner").hide()
		},
		showlog:function()
		{
			$("#rbot .tab .nv").removeClass("on");
         	$("#rbot .cont").hide();
         	$("#tab0").show()
			$("#rbot .tab .nv:eq(0)").addClass("on");
			$(".spinner").hide()
		},
		showerr:function()
		{
			$("#rbot .tab .nv").removeClass("on");
         	$("#rbot .cont").hide();
         	$("#tab1").show();
			$("#rbot .tab .nv:eq(1)").addClass("on");
			$(".spinner").hide()
		},
		init:function()
		{

			this.setboxlay();
			this.setlinneranimate();
			this.rightlay();
			this.bindLogMore();
		}
	}
})();