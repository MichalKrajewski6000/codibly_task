import axios from "axios";
import { makeAutoObservable } from "mobx";
import { isArray } from "lodash";

type Product = {
  id: number;
  name: string;
  year: number;
  color: string;
  pantone_value: string;
};

class ProductStore {
  isLoading: boolean = true;
  allProducts: Product[] = [];
  totalCount: number = 0;
  currentProduct: Product | undefined = undefined;

  constructor() {
    makeAutoObservable(this);
  }

  getProducts(page: string | null, id: string | null) {
    return new Promise((resolve, reject) => {
      this.isLoading = true;
      let params = {};
      if (!id) {
        params = {
          per_page: 5,
          page: page,
        };
      } else {
        params = {
          per_page: 5,
          page: page ? page : 1,
          id: id,
        };
      }
      axios
        .get(`https://reqres.in/api/products`, {
          params: params,
        })
        .then((snap) => {
          if (isArray(snap.data.data)) this.allProducts = snap.data.data;
          else this.allProducts.push(snap.data.data);

          this.totalCount = snap.data.total;
          resolve(this.allProducts);
        })
        .catch((err) => reject(err))
        .finally(() => {
          this.isLoading = false;
        });
    });
  }

  getProductById(id: number) {
    return new Promise((resolve, reject) => {
      this.isLoading = true;
      axios
        .get(`https://reqres.in/api/products`, {
          params: {
            id: id,
          },
        })
        .then((snap) => {
          this.currentProduct = snap.data.data;
        })
        .catch((err) => reject(err))
        .finally(() => {
          this.isLoading = false;
        });
    });
  }
}

export default new ProductStore();
