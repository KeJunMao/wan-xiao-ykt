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
npm run cli
```

![cli运行结果](./cli-preview.jpg)

### 运行 web 版

> web 没有充值信息

```bash
cd web
npm run build
cd ..
npm run web
```
