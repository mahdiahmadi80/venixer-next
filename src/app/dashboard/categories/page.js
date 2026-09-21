import CategoriesList from "./_components/CategoriesList";
import CategoryForm from "./_components/CategoryForm";
import { getCategories } from "@/lib/actions/category.actions";
import { cookies } from "next/headers";

export const metadata = {
  title: "مدیریت دسته‌بندی‌ها",
};

export default async function CategoriesPage({ searchParams }) {
  const { edit } = await searchParams;

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const cookieHeader = token ? `token=${token}` : "";

  const categories = await getCategories(cookieHeader);
  const categoryToEdit = edit ? categories.find((c) => c._id === edit) : null;

  return (
    <div className="max-w-6xl mx-auto space-y-6">      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-1">
          <CategoryForm key={categoryToEdit?._id || "new"} categoryToEdit={categoryToEdit} />
        </div>
        
        <div className="lg:col-span-2">
          <CategoriesList categories={categories} />
        </div>
      </div>
    </div>
  );
}