import MediaManager from "./_components/MediaManager";
import { getMediaAction } from "@/lib/actions/media.actions";
import { cookies } from "next/headers";

export const metadata = {
  title: "مدیریت رسانه‌ها",
};

export default async function MediaPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const cookieHeader = token ? `token=${token}` : "";

  const media = await getMediaAction(cookieHeader);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <MediaManager initialMedia={media} />
    </div>
  );
}   