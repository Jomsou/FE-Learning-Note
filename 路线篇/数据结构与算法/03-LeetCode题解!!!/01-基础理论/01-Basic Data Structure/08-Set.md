# Set

Set 是一种用于`保存不重复元素`的数据结构。常被用作测试归属性，故其查找的性能十分重要。


## Java

Set 与 Collection 具有安全一样的接口，通常有HashSet, TreeSet 或 LinkedHashSet三种实现。
HashSet基于散列函数实现，无序，查询速度最快；TreeSet基于红-黑树实现，有序。

    Set<String> hash = new HashSet<String>();
    hash.add("billryan");
    hash.contains("billryan");
    
    在不允许重复元素时可当做哈希表来用。