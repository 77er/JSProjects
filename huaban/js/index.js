//无线滚动海报js实现
  /*  var screenW = document.documentElement.clientWidth;
    var banner_ul = $("banner").getElementsByTagName("ul")[0];
    var banner_lis = banner_ul.children;
    banner_ul.style.width = screenW * 3 + "px";
    for (var i = 0; i < banner_lis.length; i++) {
        banner_lis[i].style.width = screenW + "px";
    }
    banner_ul.appendChild(banner_lis[0].cloneNode(true));
    /!* banner_ul.onmouseout=function () {
         var timmer1=setInterval(auto,1000);
         function auto(){
             constant(banner_ul,-screenW*2,20);
             banner_ul.style.left=0+"px";
         }
     }*!/
    */

window.onload=function () {
    var tablis = $("tab_title").children[0].children;
    var doms = $("tab").getElementsByClassName("dom");
    var lastIndex = 0;
    for (var i = 0; i < tablis.length; i++) {
        (function (index) {
            tablis[index].onclick = function () {
                tablis[lastIndex].className = "";
                doms[lastIndex].style.display = "none";
                this.className = "choose";
                doms[index].style.display = "block";
                lastIndex = index;
            }
        })(i)
    }
    boxCreate();
    setTimeout(function () {waterFull("dom_full", "box");},800);
    var timer1 = null;
      window.onscroll=function () {
            // 吸顶效果及elevator的出现
            xiDing();
            //动态加载图片
            clearTimeout(timer1);
            timer1=setTimeout(function () {
                if(isLoad()){//此时可以开始加载新的图片
                   boxCreate();}
                   waterFull("dom_full","box");
                },200);
      };

    //  登录部分
    $("login").onclick=function () {
        $("mask").style.display="block";
    }
    $("close").onclick=function () {
        $("mask").style.display="none";
    }
    //banner部分
    autoPlay();
    //回到顶部动画
    $("to_top").onclick=function () {
        buffer(document.documentElement,{scrollTop:0},null);
    }
};

/**
 * 海报自动无线滚动
 */
function autoPlay() {
    var bannerLis=$("banner").getElementsByTagName("li");
    var index=0;
    setInterval(function () {
        for(var i=0;i<bannerLis.length;i++){
            var li=bannerLis[i];
            buffer(li,{opacity:0},null);
            // li.style.opacity=0;
        }
        buffer(bannerLis[index],{opacity:1},null);
        index++;
        if(index>=bannerLis.length){
            index=0;
        }
    },1500)
}

/**
 * 缓动动画函数
 * @param {object}obj
 * @param {string}attr
 * @param {number}target
 */
function buffer(obj,json,fn) {
    clearInterval(obj.timer);
    var begin=0,target=0,speed=0,flag=true;
    obj.timer=setInterval(function () {
        //这个flag一定要设在定时器内部
        flag=true;
        for(var k in json){
            if (k==="opacity"){
                begin=Math.round(parseFloat(getStyleAttr(obj,k))*100)||0;
                target=json[k]*100;
            } else{
                begin=parseInt(getStyleAttr(obj,k))||0;
                // console.log(begin);
                target=json[k];
            }
            speed=(target-begin)*0.2;
            speed=(target>begin)?Math.ceil(speed):Math.floor(speed);
            // obj.innerText=begin;
            if(k==="opacity"){
                //w3c写法
                obj.style.opacity=(begin+speed)/100;
                obj.style.filter="alpha(opacity:"+begin+speed+")";
            }else{
                obj.style[k]=begin+speed+"px";
            }
            if(begin!==target){
                flag=false;
            }
        }
        if(flag){//此时已执行完
            clearInterval(obj.timer);
            if(fn){
                fn();
            }
        }
    },20)
}
/**
 * 获取元素的CSS样式属性
 * @param {object}obj
 * @param {string}attr
 * @returns {string}
 */
function getStyleAttr(obj,attr) {
    if(obj.currentStyle){
        return obj.currentStyle[attr];
    }
    else {
        return window.getComputedStyle(obj,null)[attr];
    }

}

/**
 * 吸顶效果及elevator的出现
 */
function xiDing() {
    var top=$("fast_login").offsetTop+$("fast_login").offsetHeight;
    var scroll=document.documentElement.scrollTop;
    if(scroll>=top){
        $("floating").style.display="block";
        $("to_top").style.display="block";
    }
    else{
        $("floating").style.display="none";
        $("to_top").style.display="none";
    }
}

function boxCreate() {
    var boxArr=[
        {"src":"./images/img_01.png","txt":"现代版画风的樱桃小丸子 id=44291414~~感谢喜欢，阿糖是个爪集素材的好少年~~~"},
        {"src":"./images/img_02.png","txt":"Magina illustration ps magina"},
        {"src":"./images/img_03.png","txt":"&nb-七渡"},
        {"src":"./images/img_04.png","txt":"业桉的微博_微博"},
        {"src":"./images/img_05.png","txt":"现代版画风~~感谢喜欢"},
        {"src":"./images/img_06.png","txt":"SUNSET by Jooyoung Park concept artist Seou..."},
        {"src":"./images/img_07.png","txt":""},
        {"src":"./images/img_08.png","txt":"感谢喜欢~~~"},
        {"src":"./images/img_09.png","txt":""},
        {"src":"./images/img_10.png","txt":""},
        {"src":"./images/img_11.png","txt":"分享西班牙插画家Júlia Sardà ​​​"},
        {"src":"./images/img_12.png","txt":"和小猪走吧"},
        {"src":"./images/img_13.png","txt":"字符集 - 例证狗父亲青少年的儿童儿童人夫人朋友家庭例证字符"},
        {"src":"./images/img_14.png","txt":"荷花水墨工笔作品"},
        {"src":"./images/img_15.png","txt":"画师ozyako的作品，很特别的画风"}];
    var boxFather=$("dom_full"),src,txt,innerH;
    for(var i=0;i<15;i++){
        innerH=boxFather.innerHTML;
        src=boxArr[i].src;
        txt=boxArr[i].txt;
        str="<div class=\"box\">" +
            "<div class=\"box-img\">" +
            "<img src="+src+" alt=\"\">"+
            "<div class=\"mask\"></div>" +
            "</div>" +
            "<p>"+txt+"</p>" +
            "<div class=\"box-btn\">" +
            "<a href=\"\" class=\"use\">采集</a>" +
            "<a href=\"\" class=\"like\">" +
            "<span class=\"heart\"></span>" +
            "</a></div></div>";
        innerH+=str;
        boxFather.innerHTML=innerH;
    }
//    为盒子设置事件
    var box=boxFather.children;
    var box_img=boxFather.getElementsByClassName("box-img");
    for(var j=0;j<box.length;j++){
        box[j].onmouseover=function () {
            this.children[2].style.display="block";
        };
        box[j].onmouseout=function () {
            this.children[2].style.display="none";
        };
        box_img[j].onmouseover=function () {
            this.children[1].style.display="block";
        };
        box_img[j].onmouseout=function () {
            this.children[1].style.display="none";
        };
    }

}
//检查是否需要载入图片
function isLoad(){
        var boxs=document.getElementsByClassName("box");
        var screenH=document.clientHeight||document.documentElement.clientHeight;
        var scrollY=document.documentElement.scrollTop;
        var lastBox=boxs[boxs.length-1];
        return lastBox.offsetTop+lastBox.offsetHeight*0.5<(scrollY+screenH);
    }
function $(id) {
    return typeof id==="string"?document.getElementById(id):null;
}





