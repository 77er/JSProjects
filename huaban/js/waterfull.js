
/**
 * 瀑布流布局
 * @param parent
 * @param sonName
 */
function waterFull(parent,sonName) {
    var boxs=document.getElementsByClassName(sonName);
    var boxParent=document.getElementById(parent);
    for (var j=0;j<boxs.length;j++){
        boxs[j].style.position="absolute";
    }
    boxParent.style.position="relative";
    var boxW=parseInt(boxs[0].offsetWidth);
    var screenW=document.documentElement.clientWidth;
    var cols=parseInt(screenW/boxW);
    var xyMargin=19;
    // boxParent.style.width=cols*boxW+"px";
    // boxParent.style.margin="0 auto";
    var arrH=[];
    for(var i=0;i<boxs.length;i++){
        if(i<cols){
            boxs[i].style.left=(boxW+xyMargin)*i+"px";
            boxs[i].style.top=xyMargin+"px";
            arrH.push(boxs[i].offsetHeight+xyMargin);
        }else{
            var minH=_.min(arrH);
            // console.log(minH);
            var index=getIndex(arrH,minH);
            boxs[i].style.left=index*(boxW+xyMargin)+"px";
            boxs[i].style.top=(minH+xyMargin)+"px";
            arrH[index]+=boxs[i].offsetHeight+xyMargin;
        }
    }
    var parentHeight=boxs[boxs.length-1].offsetTop+boxs[boxs.length-1].offsetHeight;
    boxParent.style.height=parentHeight+"px";
}
/**
 * 获取数组中某个值的索引
 * @param arr
 * @param value
 * @returns {number}
 */
function getIndex(arr,value) {
    for(var i=0;i<arr.length;i++){
        if(arr[i]===value){
            return i;
        }
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

