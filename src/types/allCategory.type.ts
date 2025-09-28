export interface CategoryType {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface CategoriesResponse {
  results: number;
  metadata: {
    currentPage: number;
    numberOfPages: number;
    limit: number;
  };
  data: CategoryType[];
}