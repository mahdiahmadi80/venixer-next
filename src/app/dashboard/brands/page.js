import BrandsList from "./_components/BrandsList";
import BrandForm from "./_components/BrandForm";
import { getBrands } from "@/lib/actions/brand.actions";
import { cookies } from "next/headers";

export const metadata = {
  title: "مدیریت برندها",
};

export default async function BrandsPage({ searchParams }) {
  const { edit } = await searchParams;
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const cookieHeader = token ? `token=${token}` : "";

  const brands = await getBrands(cookieHeader);

  const brandToEdit = edit ? brands.find((b) => b._id === edit) : null;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-1">
          <BrandForm key={brandToEdit?._id || "new"} brandToEdit={brandToEdit} />
        </div>
        <div className="lg:col-span-2">
          <BrandsList brands={brands} />
        </div>
      </div>
    </div>
  );
}