const ctx = require.context("./components/", false, /\.vue$/);

const routes = ctx.keys().map(key => ({
  path: key
}));

routes.push({
  path: "/",
  redirect: "./table-example"
});
export default routes;
