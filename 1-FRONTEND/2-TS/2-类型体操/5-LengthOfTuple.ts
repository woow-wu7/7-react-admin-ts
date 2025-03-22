// 1
// 实现 获取元组长度

// 题目
// 创建一个通用的Length，接受一个readonly的数组，返回这个数组的长度。

// 详见
// - https://github.com/type-challenges/type-challenges/blob/main/questions/00018-easy-tuple-length/README.md

// 实现
// 1. 如何通过 ( 数组类型 T ) 获取数组的长度? // T['length']

// type TLen = tesla['length']
// 相当于 type TLen = 4

type Length<T extends readonly any[]> = T["length"];

type Tesla = ["tesla", "model 3", "model X", "model Y"];
type SpaceX = [
  "FALCON 9",
  "FALCON HEAVY",
  "DRAGON",
  "STARSHIP",
  "HUMAN SPACEFLIGHT"
];

type teslaLength = Length<Tesla>; // expected 4
type spaceXLength = Length<SpaceX>; // expected 5

// 对比
type TLength = Tesla["length"]; // T['length'] 用来获取数组长度
