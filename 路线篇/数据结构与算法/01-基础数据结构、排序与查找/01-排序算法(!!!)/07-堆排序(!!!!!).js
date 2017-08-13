/**
 1.堆
 堆实际上是一棵完全二叉树，其任何一非叶节点满足性质：
 Key[i]<=key[2i+1]&&Key[i]<=key[2i+2]或者Key[i]>=Key[2i+1]&&key>=key[2i+2]
 即任何一非叶节点的关键字不大于或者不小于其左右孩子节点的关键字。
 堆分为大顶堆和小顶堆，满足Key[i]>=Key[2i+1]&&key>=key[2i+2]称为大顶堆，
 满足 Key[i]<=key[2i+1]&&Key[i]<=key[2i+2]称为小顶堆。
 由上述性质可知大顶堆的堆顶的关键字肯定是所有关键字中最大的，小顶堆的堆顶的关键字是所有关键字中最小的。
 2.堆排序的思想
 利用大顶堆(小顶堆)堆顶记录的是最大关键字(最小关键字)这一特性，使得每次从无序中选择最大记录(最小记录)变得简单。
 其基本思想为(大顶堆)：
 1)将初始待排序关键字序列(R1,R2....Rn)构建成大顶堆，此堆为初始的无须区；
 2)将堆顶元素R[1]与最后一个元素R[n]交换，此时得到新的无序区(R1,R2,......Rn-1)和新的有序区(Rn),
 且满足R[1,2...n-1]<=R[n];
 3)由于交换后新的堆顶R[1]可能违反堆的性质，因此需要对当前无序区(R1,R2,......Rn-1)调整为新堆，
 然后再次将R[1]与无序区最后一个元素交换，得到新的无序区(R1,R2....Rn-2)和新的有序区(Rn-1,Rn)。
 不断重复此过程直到有序区的元素个数为n-1，则整个排序过程完成。
 操作过程如下：
 1)初始化堆：将R[1..n]构造为堆；
 2)将当前无序区的堆顶元素R[1]同该区间的最后一个记录交换，然后将新的无序区调整为新的堆。
 因此对于堆排序，最重要的两个操作就是构造初始堆和调整堆，其实构造初始堆事实上也是调整堆的过程，
 只不过构造初始堆是对所有的非叶节点都进行调整。
 *
 *
 * 堆排序
 * 堆排序适合于数据量非常大的场合（百万数据）。

 * 堆排序不需要大量的递归或者多维的暂存数组。这对于数据量非常巨大的序列是合适的。
 * 比如超过数百万条记录，因为快速排序，归并排序都使用递归来设计算法，在数据量非常大的时候，可能会发生堆栈溢出错误。

 * 堆排序会将所有的数据建成一个堆，最大的数据在堆顶，然后将堆顶数据和序列的最后一个数据交换。
 * 接下来再次重建堆，交换数据，依次下去，就可以排序所有的数据。
 *
 * 若在输出堆顶的最小值之后，使得剩余n-1个元素的序列重又建成一个堆，则得到n个元素的次小值。
 * 如此反复执行，便能得到一个有序序列，这个过程称之为堆排序。
 *
 * 实现堆排序需要解决两个问题：

 　　　　1.如何由一个无序序列建成一个堆？

 　　　　2.如何在输出堆顶元素之后，调整剩余元素成为一个新的堆？
 */

var generateTestData = require('./00-TestDataGenerator');

/*方法说明：调整堆,维护堆的性质
 @param  arr 数组
 @param  x   数组下标
 @param  len 堆大小*/
function adjustHeap(arr, x, len) {
    var l = 2 * x, r = 2 * x + 1, largest = x, temp;
    if (l < len && arr[l] > arr[largest]) {
        largest = l;
    }
    if (r < len && arr[r] > arr[largest]) {
        largest = r;
    }
    if (largest != x) {
        temp = arr[x];
        arr[x] = arr[largest];
        arr[largest] = temp;
        adjustHeap(arr, largest, len);
    }
}

/*方法说明：堆排序
 @param  array 待排序数组*/
function heapSort(array) {
    //建堆
    var heapSize = array.length, temp;
    for (var i = Math.floor(heapSize / 2); i >= 0; i--) {
        adjustHeap(array, i, heapSize);
    }

    //堆排序
    for (var j = heapSize - 1; j >= 1; j--) {
        temp = array[0];
        array[0] = array[j];
        array[j] = temp;
        adjustHeap(array, 0, --heapSize);
    }

    return array;
}

var data = generateTestData(20000);
// console.log(data);

var start = new Date().getTime();
console.log('start sorting....');

var result = heapSort(data);

var end = new Date().getTime();
console.log('耗时: ' + (end - start) + ' ms');

// console.log(result);
