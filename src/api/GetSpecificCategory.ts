import { CategoryType } from '@/types/category.type';

interface SpecificCategoryResponse {
  data: CategoryType;
}

export default async function GetSpecificCategory(categoryId: string): Promise<CategoryType | null> {
  try {
    console.log('Fetching category with ID:', categoryId);
    const url = `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}`;
    console.log('API URL:', url);
    
    const res = await fetch(url, {
      cache: 'no-store',
    });
    
    console.log('Response status:', res.status);
    
    if (!res.ok) {
      console.error(`HTTP error! status: ${res.status}`);
      return null;
    }
    
    const response: SpecificCategoryResponse = await res.json();
    console.log('API Response:', response);
    return response.data;
  } catch (error) {
    console.error('Error fetching specific category:', error);
    return null;
  }
}