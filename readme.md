# 完美校园一卡通年度报告

## 安装

### 克隆并安装依赖

```bash
git clone https://github.com/KeJunMao/wan-xiao-ykt.git
cd wan-xiao-ykt
npm i
cd web
npm i
```

### 修改环境变量

复制 `.env.template` 文件为 `.env`，将完美校园手机号与密码信息补充

## 运行

### cli 版本

```bash
node index.mjs
```

![cli运行结果](./cli-preview.jpg)

### 运行 web 版

> web 版信息不全

```bash
cd web
npm run build
cd ..
node api.mjs
```

## 注意事项

web 版本默认是跑在 ipv6 的 80 端口，如需改为 ipv4 的话只要修改 `api.mjs`的第 40 行为

```js
await f.listen(80);
```

当然，如果想要改变端口只需要改变 80 为其他端口号即可
