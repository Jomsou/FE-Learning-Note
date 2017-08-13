 # 找出页面中class包含test字符串的元素并设置样式
 
     window.onload = function () {
            var nodes = document.getElementsByTagName("*");
            var nodeArray = [].slice.call(nodes);
            var regExp = /(\b)+(test)(\b)+/;   // \b匹配单词边界
            nodeArray.forEach(function (node) {
                if (regExp.test(node.className)) {
                    node.style.backgroundColor = "red";
                }
            });
     }