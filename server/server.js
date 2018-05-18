import Koa from 'koa';
import views from 'koa-views';
import path from 'path';

const app = new Koa();

app.use(require('koa-static')(path.join(__dirname, '../build')));
app.use(views(path.join(__dirname, '../views'), {
    extension: 'html'
}));

app.use(async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// response
app.use(async (ctx) => {
    await ctx.render('index.html');
});

app.listen(8080);

console.log("server start, please visit http://127.0.0.1:8080");

module.exports = app;
