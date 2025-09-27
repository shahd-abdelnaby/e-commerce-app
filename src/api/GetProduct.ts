import { ProductsResponse } from '@/types/GetProduct.type';
import { ProductType } from '@/types/product.type';

export default async function GetBrandProducts(brandId: string): Promise<ProductType[]> {
  try {
    console.log('Fetching products for brand ID:', brandId);
    const url = `https://ecommerce.routemisr.com/api/v1/products?brand=${brandId}`;
    console.log('API URL:', url);
    
    const res = await fetch(url, {
      cache: 'no-store',
    });
    
    console.log('Response status:', res.status);
    
    if (!res.ok) {
      console.error(`HTTP error! status: ${res.status}`);
      return [];
    }
    
    const response: ProductsResponse = await res.json();
    console.log('API Response:', response);
    return response.data;
  } catch (error) {
    console.error('Error fetching brand products:', error);
    return [];
  }
}