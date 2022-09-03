import React from "react";
import {
  BrowserRouter as Router, Route, Switch
} from "react-router-dom";

import ProductReview from "./Components/ProductReview/ProductReview";
import Products from "./Components/Products/Products";
import Reviews from "./Components/Reviews/index";

export default function OliverTakeHome() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Products />
          </Route>

          <Route path="/product-review/:productId">
            <ProductReview />
          </Route>

          <Route exact path="/products">
            <Products />
          </Route>

          <Route exact path="/reviews">
            <Reviews />
          </Route>

        </Switch>
      </div>
    </Router>
  );
}
