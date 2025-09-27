import { BrandType } from "@/types/Brand.type";

interface SpecificBrandResponse {
  data: BrandType;
}

export default async function GetSpecificBrand(brandId: string): Promise<BrandType | null> {
  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/brands/${brandId}`, {
      cache: 'no-store',
    });
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    const response: SpecificBrandResponse = await res.json();
    return response.data;
  } catch (error) {
    console.error('Error fetching specific brand:', error);
    return null;
  }
}