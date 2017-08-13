# js数组去重函数

    Array.prototype.unique = function(){
       var res = [];
       var map = {};
       for(var i = 0; i < this.length; i++){
          if(!map[this[i]]){
             res.push(this[i]);
             map[this[i]] = 1;
          }
       }
       return res;
    }
    
    var arr = [112,112,34,'你好',112,112,34,'你好','str','str1'];
    console.log(arr.unique());