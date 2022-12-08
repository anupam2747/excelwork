const ctx = require.context("./components/", false, /\.vue$/);

const routes = ctx.keys().map(key => ({
  path: key
}));

routes.push({
  path: "/",
  redirect: "./excel"
});
export default routes;
 