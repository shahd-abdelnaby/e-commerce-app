import { BrandsResponse, BrandType } from "@/types/Brand.type";

export default async function AllBrands(): Promise<BrandType[]> {
  try {
    const res = await fetch('https://ecommerce.routemisr.com/api/v1/brands');
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    const response: BrandsResponse = await res.json();
    return response.data;
  } catch (error) {
    console.error('Error fetching brands:', error);
    return [];
  }
}

