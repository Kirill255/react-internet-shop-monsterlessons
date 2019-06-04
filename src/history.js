import { createBrowserHistory } from "history";
import qhistory from "qhistory";
import { stringify, parse } from "qs";

const history = qhistory(
  createBrowserHistory({
    /* history configuration options */
  }),
  stringify,
  parse
);

//dev only
window.routerHistory = history;

export default history;
