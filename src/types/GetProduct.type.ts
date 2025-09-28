export interface ProductType {
  _id: string;
  id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  imageCover: string;
  images: string[];
  sold: number;
  ratingsQuantity: number;
  ratingsAverage: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  reviews: unknown  [];
  category: {
    _id: string;
    name: string;
    slug: string;
    image: string;
  };
  brand: {
    _id: string;
    name: string;
    slug: string;
    image: string;
  };
  subcategory: Array<{
    _id: string;
    name: string;
    slug: string;
    category: string;
  }>;
}

export interface ProductsResponse {
  results: number;
  metadata: {
    currentPage: number;
    numberOfPages: number;
    limit: number;
    nextPage?: number;
  };
  data: ProductType[];
}

export interface SingleProductResponse {
  data: ProductType;
}