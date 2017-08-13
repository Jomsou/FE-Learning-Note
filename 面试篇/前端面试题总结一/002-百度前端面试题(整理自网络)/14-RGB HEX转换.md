 1 /*RGB(255,255,0),rgb(25,12,100)*/
 2 var rgbToHex = function(rgb) {
 3     var reg = /RGB|rgb|\(|\)/g;
 4     var rColor = rgb.replace(reg,'').split(',');
 5     var strHex = '#';
 6     for(var i=0,len=rColor.length;i<len;i++) {
 7         var hex = Number(rColor[i]).toString(16);
 8         if(hex.length == 1){
 9             hex = '0' + hex;
10         }
11         strHex = strHex + hex;
12     }
13     return strHex;
14 }
15 
16 /*#ff00f0,#ff0*/
17 var hexToRgb = function(hex) {
18     if(hex.length==4){ //将3位的颜色变为6位的形式
19         var hColor = '#';
20         for(var i=1;i<4;i++) {
21             hColor = hColor + hex.substring(i,i+1) + hex.substring(i,i+1);
22         }
23         hex = hColor;
24     }
25     var strRgbArr = [];
26     for(var i=1;i<7;i=i+2){
27         strRgbArr.push(parseInt('0x'+hex.substring(i,i+2)));
28     }
29     return 'RGB(' + strRgbArr.join(',') + ')';
30 }