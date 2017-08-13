# Array和string常用方法

## Array数组常用方法
   
    　　先创建一个数组var abc = [1,2,3,4,5,6,7,8,9];
    
    　　(1)pop(); 这个方法会删除数组的最后一项并返回删除掉的值。
    　　　　比如：console.log(abc.pop());//9;   
                console.log(abc); //[1,2,3,4,5,6,7,8];
    
    　　(2)push(); 这个方法会往数组的最后面添加一个值并返回掉值。
    　　　　比如：console.log(abc.push(10));//10;    
                console.log(abc); //[1,2,3,4,5,6,7,8,9,10];
    
    　　(3)shift(); 这个方法会删除数组的第一项并返回删除掉的值。
    　　　　比如：console.log(abc.shift());//1;    
                console.log(abc); //[2,3,4,5,6,7,8,9];
    
    　　(4)unshift(); 这个方法会在数组的第一项前添加一个值并返回数组的长度。
    　　　　比如：console.log(abc.unshift(0));//10;    
                console.log(abc); //[0,1,2,3,4,5,6,7,8,9];
    
    　　(5)reverse(); 反转数组顺序。
    　　　　比如:abc.reverse(); 
                console.log(abc); // [9,8,7,6,5,4,3,2,1];
    
    　　(6)sort(); 数组排序，不过是按照字符串的方式来排序。
    　　　　比如: var abb = [0,1,5,10,15]; 
                abb.sort(); 
                console.log(abb); //[0,1,10,15,5];
    
    　　(7)concat(); 该方法可以基与当前数组中的所有项创建一个新数组。
    　　　　比如: var colors = ["red","blue","yellow"];  
                var colors2 = colors.concat("black","orange");  
                //["red", "blue", "yellow", "black", "orange"];
    
    　　(8)slice();该方法可以理解为截取数组，接受2个参数,只填一个参数代表从该位置截取到最后，
            填两个参数代表要截取的头和尾的位置，但是取头不取尾。
    
    　　比如：var colors = ["red", "blue", "yellow", "black", "orange"];
    　　　　　　colors.slice(1);//["blue", "yellow", "black", "orange"];
    　　　　　　colors.slice(1,3);//["blue", "yellow"];
    
    　　(9)splice(); splice是数组当中最强大的方法了，其用法用很多。
    　　　　删除：可以删除任意数量的项，只需要指定2个参数。例如splice(0,2);会删除数组中的前面两项。
    　　　　插入：可以向指定的位置插入任意数量的项，比如：splice(2,0,"red”,"blue”)会从数组的
                第二个位置开始添加red和blue两项。
    　　　　替换：可以删除指定的位置的项并插入任意数量的项，比如：splice(2,2,"red”,"blue”)
                会从数组的第二个位置删除两项并添加red和blue两项。
    　　　　splice()始终返回一个数组，该数组从原始数组中删除的项，没有的话就返回空数组。
    
    　　(10)indexOf(); 该方法用来检索某项数组出现的位置,出现多次的话只记录第一次出现的位置。
    　　　　比如：var abc = [1,2,3,4,5,6,7,8,9];  
                abc.indexOf(5);  //4;
    
    　　　　注：如果没有检索到值的话会返回-1;
    　　　　比如：var abc = [1,2,3,4,5,6,7,8,9];  
                abc.indexOf(-10);  //-1;
    
    　　(11)join();将数组转化为字符串，括号内标识连接的方式。
    　　　　比如：var abc = ["red","blue","green","yellow"];  
                abc.join("+");  //"red+blue+green+yellow";
                
       (12) ES5新增方法: forEach,map,reduce,filter,every,some
       

## String字符串常用方法

　　首先创一个字符串 var abc = “helloworld”;
    
    　　(1)charAt();该方法会返回对应位置所在的字符。
    　　　　比如：console.log(abc.charAt(1));  //e
    
    　　(2)concat(); 拼接字符串;
    　　　　比如 var a = "hello"; 
           a.concat("world");  // helloworld;
    
    　　(3)slice(); 截取字符串;接受2个参数,只填一个参数代表从该位置截取到最后，填两个参数代表要截取的头和尾的位置，
                但是取头不取尾。
    
    　　(4)substring(); 截取字符串;接受2个参数,只填一个参数代表从该位置截取到最后，
                    填两个参数代表要截取的头和尾的位置，但是取头不取尾。
    
    　　　注：slice和substring的区别在于他们的参数为负数的时候，slice会把负数与字符串的长度相加，
        而substring会把负数转化为0。
    
    　　　比如 var a = "hello"; a.slice(-3) = a.slice(2);  //llo;  
    　　　　　 var a = "hello"; a.substring(-3) = a.substring(0);  //hello;
    
    　　(5)substr(); 截取字符串;接受2个参数,只填一个参数代表从该位置截取到最后，填两个参数代表要截取的开始位置和长度;
    　　　　比如  var a = “helloworld”；
                a.substr(3,7);  //代表截取字符串第三个位置开始截取7个字符串，故返回"loworld";
    
    　　(6)indexOf(); 该方法用来检索某个字符出现的位置。
    
    　　(7)toLocaleUpperCase(); 字符串转大写。
    
    　　(8)toLocaleLowerCase(); 字符串转小写。
    
    　　(9)split(); 切割字符串并放在一个数组中,括号内表示切割的标识。
    　　　　比如: var abc = "red,blue,green,yellow";  
                abc.split(",");  // ["red","blue","green","yellow"];