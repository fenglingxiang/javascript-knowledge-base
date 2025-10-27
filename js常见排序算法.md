## 排序算法

1. 冒泡排序 适合小规模数据排序，比较稳定，时间复杂度 O(n^2)，空间复杂度 O(1)

```js
function bubbleSort(arr) {
  let length = arr.length;
  let isCompare; //判断是否需要比较
  do {
    isCompare = false;
    for (let i = 1; i < length; i++) {
      if (arr[i - 1] < arr[i]) {
        [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]]; //最小的一直冒泡到尾部
        isCompare = true;
      }
    }
    length--;
  } while (isCompare);
  return arr;
}

bubbleSort([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]); //[10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
```

2. 选择排序，交换次数相对少，适用于移动成本高的场景，时间复杂度 O(n^2)，空间复杂度 O(1)

```js
function selectionSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    let maxIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] > arr[maxIndex]) {
        maxIndex = j;
      }
    }
    if (maxIndex !== i) [arr[i], arr[maxIndex]] = [arr[maxIndex], arr[i]];
  }
  return arr;
}
```

3. 插入排序，适合增量式数据处理，比较稳定，时间复杂度 O(n^2)，空间复杂度 O(1)

```js
function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    const temp = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] < temp) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = temp;
  }
  return arr;
}
```

4. 快速排序, 速度相对较快，最常用， 时间复杂度 O(nlogn)，空间复杂度 O(logn)

```js
function quickSort(arr) {
  if (arr.length <= 1) return arr;
  const midIndex = Math.floor(arr.length / 2);
  const midValue = arr.splice(midIndex, 1)[0];
  const left = [];
  const right = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] >= midValue) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return quickSort(left).concat([midValue], quickSort(right));
}
```
