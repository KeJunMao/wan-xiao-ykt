import CampusCard from "./campus.mjs";
import analysis from "./analysis.mjs";
import chalkPipe from "chalk-pipe";
import chalk from "chalk";
import dotenv from "dotenv";

dotenv.config();

const log = console.log;
const title1 = chalkPipe("underline.bold", chalk.bgHex("#0091EA"));
const title2 = chalkPipe("#80DEEA.underline.bold");
const label = chalkPipe("#81D4FA");
const value = chalkPipe("orange.bold");

const user = new CampusCard(process.env.PHONE, process.env.PASSWORD);
const flag = await user.exchangeSecret();
flag ? await user.login() : "";

const data = await user.getTradeDetail("2020-10-1", "2020-12-31");
const ad = analysis(data);
const { expend: ed, recharge: rd, expendMax: md } = ad;
// 转换为钱
const tm = (m) => "¥" + m.toFixed("2");

log(title1("\n山西传媒 - 我的校园卡 2020 年度报告\n"));

log(
  `${title2("我总支出的")} - 共计 ${value(ed.count)} 笔，合计: ${value(
    tm(ed.sum)
  )}\n`
);
ed.category.forEach((item) => {
  log(
    ` • ${label(item.name)} ${value(item.count)} 笔,合计 ${value(tm(item.sum))}`
  );
});
log();
log(`其中我消费最多的是${value(md.sum.name)}，这家店物美价廉；`);
log(`      最长照顾的是${value(md.count.name)}，这一年，我还是只喝的起水。\n`);

log(
  `${title2("我总充值的")} - 共计 ${value(rd.count)} 笔，合计: ${value(
    tm(rd.sum)
  )}\n`
);
rd.category.forEach((item) => {
  log(
    ` • ${label(item.name)} ${value(item.count)} 笔,合计 ${value(tm(item.sum))}`
  );
});
log();

log(`愿我每一年都是最${value("美好")}的一年！`);
