import { CategoriesResponse } from '@/types/allCategory.type';
import { CategoryType } from '@/types/category.type';

export default async function AllCategories(): Promise<CategoryType[]> {
  try {
    const res = await fetch('https://ecommerce.routemisr.com/api/v1/categories', {
      cache: 'no-store', // or 'force-cache' for caching
    });
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    const response: CategoriesResponse = await res.json();
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}