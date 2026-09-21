import ProductsList from "./_components/ProductsList";
import ProductForm from "./_components/ProductForm";
import { getProducts } from "@/lib/actions/product.actions";
import { getCategories } from "@/lib/actions/category.actions";
import { getBrands } from "@/lib/actions/brand.actions";       
import { cookies } from "next/headers";

export const metadata = {
  title: "مدیریت محصولات",
};

export default async function ProductsPage({ searchParams }) {
  const { edit } = await searchParams;
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const cookieHeader = token ? `token=${token}` : "";

  const [products, categories, brands] = await Promise.all([
    getProducts(cookieHeader),
    getCategories(cookieHeader),
    getBrands(cookieHeader),
  ]);

  const productToEdit = edit ? products.find((p) => p._id === edit) : null;

  return (
    <div className="max-w-6xl mx-auto space-y-6">      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-1">
          <ProductForm 
          key={productToEdit?._id || "new"}
            productToEdit={productToEdit} 
            categories={categories} 
            brands={brands} 
          />
        </div>        
        <div className="lg:col-span-2">
          <ProductsList products={products} />
        </div>
      </div>
    </div>
  );
}