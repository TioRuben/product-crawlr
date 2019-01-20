import { Query } from "react-apollo";

interface Data {
  allProducts: {
    description: Array<string>;
  };
}

class AllProductsQuery extends Query<Data> {}
