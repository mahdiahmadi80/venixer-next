export default function EmptyState({ message = "هیچ موردی یافت نشد." }) {
  return (
    <div className="bg-white p-12 rounded-xl border border-gray-200 text-center w-full mt-8">

      <p className="text-lg text-gray-500 font-medium">{message}</p>
    </div>
  );
}