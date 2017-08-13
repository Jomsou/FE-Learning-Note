# Nginx的负载均衡方案

## 1、轮询

轮询即Round Robin，根据Nginx配置文件中的顺序，依次把客户端的Web请求分发到不同的后端服务器。

    http{
        upstream sampleapp {
            server <<dns entry or IP Address(optional with port)>>;
            server <<another dns entry or IP Address(optional with port)>>;
        }
        ....
        server{
           listen 80;
           ...
           location / {
              proxy_pass http://sampleapp;
           } 
        }
上面只有1个DNS入口被插入到upstream节，即sampleapp，同样也在后面的proxy_pass节重新提到。

## 2、最少连接
Web请求会被转发到连接数最少的服务器上。

    http{
        upstream sampleapp {
            least_conn;
            server <<dns entry or IP Address(optional with port)>>;
            server <<another dns entry or IP Address(optional with port)>>;
        }
        ....
        server{
           listen 80;
           ...
           location / {
              proxy_pass http://sampleapp;
           } 
        }
上面的例子只是在upstream节添加了least_conn配置。其它的配置同轮询配置。


## 3、IP地址哈希
    前述的两种负载均衡方案中，同一客户端连续的Web请求可能会被分发到不同的后端服务器进行处理，
    因此如果涉及到会话Session，那么会话会比较复杂。常见的是基于数据库的会话持久化。
    要克服上面的难题，可以使用基于IP地址哈希的负载均衡方案。
    这样的话，同一客户端连续的Web请求都会被分发到同一服务器进行处理。

    http{
        upstream sampleapp {
            ip_hash;
            server <<dns entry or IP Address(optional with port)>>;
            server <<another dns entry or IP Address(optional with port)>>;
        }
        ....
        server{
           listen 80;
           ...
           location / {
              proxy_pass http://sampleapp;
           } 
        }
上面的例子只是在upstream节添加了ip_hash配置。其它的配置同轮询配置。

## 4、基于权重的负载均衡
基于权重的负载均衡即Weighted Load Balancing，这种方式下，
我们可以配置Nginx把请求更多地分发到高配置的后端服务器上，把相对较少的请求分发到低配服务器。

    http{
        upstream sampleapp {
            server <<dns entry or IP Address(optional with port)>> weight=2;
            server <<another dns entry or IP Address(optional with port)>>;
        }
        ....
        server{
           listen 80;
           ...
           location / {
              proxy_pass http://sampleapp;
           }
      }
      
上面的例子在服务器地址和端口后weight=2的配置，这意味着，每接收到3个请求，前2个请求会被分发到第一个服务器，
第3个请求会分发到第二个服务器，其它的配置同轮询配置。

    还要说明一点，基于权重的负载均衡和基于IP地址哈希的负载均衡可以组合在一起使用。