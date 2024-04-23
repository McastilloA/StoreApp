export interface Dialog {
  data: Products;
  action: number;
}

export interface Products {
  id: string;
  name: string;
  description: string;
  price: string;
  quantity: number;
}
