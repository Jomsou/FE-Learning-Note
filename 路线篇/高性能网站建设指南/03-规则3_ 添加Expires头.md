## Expires

为图片添加长久的Expires头非常普遍,但是不应该仅限于图片。

`长久的Expires应该涵盖任何不经常变化的资源`,如js、css、flash等,
但是,HTML文档不应该包含长久的Expires头,因为它是动态的,需要在每次请求时被更新。

### cache-control