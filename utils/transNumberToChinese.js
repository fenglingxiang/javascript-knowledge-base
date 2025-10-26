// 将数字转换成汉语的输出
function transNumberToChinese(number) {
  if (typeof number !== 'number') throw new TypeError("Expected a number")
  number = number.toString()
  const res = [] //存放数字分组，4个为一组，因为到万分位又存在万、十万、百万、千万，所以以此类推，4个数字为一组
  const length = number.length
  const units = ["", "万", "亿", "万亿"]
  for (let i = length; i > 0; i -= 4) {
    res.push(format(number.slice(Math.max(0, i - 4), i)))
  }

  for (let i = 0; i < res.length; i++) {
    res[i] = res[i] + units[i]
  }

  if (number < 0) res.push("负")

  return res.reverse().join('')
}

function format(numberStr) {
  numberStr = numberStr.toString()
  if (isNaN(Number(numberStr))) throw new TypeError("Expected a number")
  const numbers = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"]
  const units = ["", "十", "百", "千"]
  let res = ""
  const length = numberStr.length
  if (numberStr === '0') return numbers[0]
  for (let i = 0; i < length; i++) {
    const value = numberStr[i]
    if (value === '0') continue //如果当前是0，则跳出循环，避免把0都转换成零
    if (numberStr[i - 1] === '0') res += numbers[0] //如果上一位是0，则需要把上一位的0转换成零，比如 101 是读成 一百零一
    res = res + numbers[value] + units[length - 1 - i] //因为是从左向右循环的，但是读数是从右向左的，所以单位需要反过来取值
  }

  if (length === 2 && numberStr[0] === '1') res = res.slice(1) //因为读数没有读一十几的，所以舍弃一

  return res
}

console.log(transNumberToChinese(12345078077)) //一百二十三亿四千五百零七万八千零七十七