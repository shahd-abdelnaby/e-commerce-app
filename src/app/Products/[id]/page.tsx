import React from "react";
import SelectedProduct from "../../../api/SelectedProduct";
import Details from "../../_components/Details/Details";
import getRelatedProducts from "@/productCategoryActions/relatedProducts.action";
import { ProductType } from "@/types/product.type";
import SingleProduct from './../../_components/singleProduct/SingleProduct';

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await SelectedProduct(id);
  
if(!data) return <h1>No products here</h1>
  const relatedProducts = await getRelatedProducts(data.category._id)
  return (
    <>
      <Details data={data} />
        <div className="container w-[80%] mx-auto my-12">
            <div className="flex flex-wrap">
            {relatedProducts.data.map((currentProduct:ProductType) => (
              <SingleProduct key={currentProduct.id} Product={currentProduct} />
            ))}
           </div>
           </div>
    </>
  );
}
