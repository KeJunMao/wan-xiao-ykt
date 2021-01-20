import chalkPipe from "chalk-pipe";
import chalk from "chalk";

const data = [
  {
    name: "餐费支出",
    count: 169,
    sum: "¥843.20",
  },
];

console.table(data, ["name", "count"]);
