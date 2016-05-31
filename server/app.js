import koa from "koa";
import serve from "koa-static-server";
import path from "path";
import staticServe from "./static";

var app = new koa();
app.use(staticServe(path.join(__dirname, '/../dist')));
app.listen(5000);
console.log("listening 5000...");
