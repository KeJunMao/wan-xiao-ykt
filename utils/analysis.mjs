// 对象转数组
function ObjToArr(obj) {
  return Object.keys(obj).map((name) => ({
    name,
    ...obj[name],
  }));
}

// 统计赋值数据
function countData(obj, cell) {
  const opfare = parseFloat(cell.opfare);
  obj.count++;
  obj.sum += opfare;
  if (cell.description === "购热水支出") {
    cell.description = "洗澡支出";
  }
  if (!obj.category[cell.description]) {
    obj.category[cell.description] = {
      count: 0,
      sum: 0,
    };
  }
  if (!obj.terms[cell.termName]) {
    obj.terms[cell.termName] = {
      count: 0,
      sum: 0,
    };
  }
  obj.category[cell.description].count++;
  obj.category[cell.description].sum += opfare;
  obj.terms[cell.termName].count++;
  obj.terms[cell.termName].sum += opfare;
}

// 统计：
// 消费笔数,消费额度
// 支出分类额度
// 充值笔数，充值额度
// 消费最多的店，最长光顾的店，
// todo 消费最多那天
export default function analysis(data) {
  data = data.data;
  // 消费
  const expend = {
    count: 0,
    sum: 0,
    category: {},
    terms: {},
  };
  // 充值
  const recharge = {
    count: 0,
    sum: 0,
    category: {},
    terms: {},
  };
  data.forEach((cell) => {
    if (cell.description.indexOf("支出") !== -1) {
      countData(expend, cell);
    } else {
      countData(recharge, cell);
    }
  });

  expend.terms = ObjToArr(expend.terms);
  recharge.terms = ObjToArr(recharge.terms);
  expend.category = ObjToArr(expend.category);
  recharge.category = ObjToArr(recharge.category);
  expend.category.sort((a, b) => b.sum - a.sum);

  const expendMax = {
    count: expend.terms.sort((a, b) => b.count - a.count)[0],
    sum: expend.terms.sort((a, b) => b.sum - a.sum)[0],
  };

  return {
    expend,
    recharge,
    expendMax,
  };
}
