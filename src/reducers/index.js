import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import history from "../history";

import phones from "./phones";
import phonesPage from "./phonesPage";
import phonePage from "./phonePage";
import basket from "./basket";
import categories from "./categories";

export default combineReducers({
  router: connectRouter(history),
  phones,
  phonesPage,
  phonePage,
  basket,
  categories
});
