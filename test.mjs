import chalkPipe from "chalk-pipe";
import chalk from "chalk";

const log = console.log;
const title2 = chalkPipe("#80DEEA.underline.bold");
const label = chalkPipe("#81D4FA");
const value = chalkPipe("orange.bold");
const title1 = chalkPipe("underline.bold", chalk.bgHex("#0091EA"));

log(title1("\n山西传媒 - 我的校园卡 2020 年度报告\n"));

log(
  `${title2("我总支出的")} - 共计 ${value(10)} 笔，合计: ${value(
    "¥10465.32"
  )}\n`
);
log(` • ${label("用水支出")} ${value("10")} 笔,合计 ${value("¥10")}`);
log(` • ${label("用水支出")} ${value("10")} 笔,合计 ${value("¥10")}`);
log(` • ${label("用水支出")} ${value("10")} 笔,合计 ${value("¥10")}\n`);
log(`其中我消费最多的是${value("1号饮水北252#")}，这一年，我还是只喝的起水；`);
log(`      最长照顾的是${value("1号饮水北252#")}，这家店物美价廉。\n`);
log(
  `${title2("我总充值的")} - 共计 ${value(10)} 笔，合计: ${value(
    "¥10465.32"
  )}\n`
);
log(` • ${label("补助取款")} ${value("10")} 笔,合计 ${value("¥10")}`);
log(` • ${label("补助取款")} ${value("10")} 笔,合计 ${value("¥10")}`);
log(` • ${label("补助取款")} ${value("10")} 笔,合计 ${value("¥10")}`);
