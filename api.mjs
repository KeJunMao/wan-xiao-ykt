import fastify from "fastify";
import CampusCard from "./campus.mjs";
import analysis from "./utils/analysis.mjs";
import path from "path";
import fastifyStatic from "fastify-static";

const f = fastify({ logger: true });
f.register(fastifyStatic, {
  root: path.join(path.resolve(), "web/public"),
  prefix: "/",
});

f.get("/", async (request, reply) => {
  return reply.sendFile("index.html");
});
f.post("/api/get", async (request, reply) => {
  const body = JSON.parse(request.body);
  const user = new CampusCard(body.phone, body.password);
  let flag = await user.exchangeSecret();

  if (flag) {
    flag = await user.login();
    if (user.userInfo.login && flag) {
      const data = await user.getTradeDetail("2020-10-1", "2020-12-31");
      const ad = analysis(data);
      return {
        message: "ok",
        data: ad,
      };
    }
  }
  return {
    message: "error",
    data: null,
  };
});

const start = async () => {
  try {
    // await f.listen(80, "::");
    await f.listen(3000);
    f.log.info(`server listening on ${f.server.address().port}`);
  } catch (err) {
    f.log.error(err);
    process.exit(1);
  }
};
start();
