import { notFound } from "next/navigation";
import api from "@/lib/axios";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileTabs from "@/components/profile/ProfileTabs";
import { get } from "http";
import { getUserProfile } from "@/lib/api";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  try {
    const response = await getUserProfile(username);


    const user = response.data?.data || response.data;

    if (!user) {
      notFound();
    }

    return (
      <div className="max-w-6xl mx-auto px-6 py-10">
        <ProfileHeader user={user} />
        <ProfileTabs posts={user.posts || []} />
      </div>
    );
  } catch (err: any) {
    console.error("Axios 404 Details:", {
      message: err.message,
      status: err.response?.status,
      responseData: err.response?.data,
      code: err.code, // যেমন: ERR_BAD_REQUEST
      requestedUrl: err.config?.url,
      fullUrl: `${api.defaults.baseURL}${err.config?.url || ""}`,
    });

    if (err.response?.status === 404) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6 text-center">
          <div>
            <h2 className="text-3xl font-bold text-red-600 mb-4">
              404 - Profile Not Found
            </h2>
            <p className="text-lg mb-6">
              Username <strong>@{username}</strong> এর প্রোফাইল পাওয়া যায়নি।
            </p>
            <p className="text-muted-foreground mb-4">
              Requested URL:{" "}
              <code>{`${api.defaults.baseURL || "missing baseURL"}/user/${username}`}</code>
            </p>
            <p>Backend endpoint চেক করুন বা server চালু আছে কি না দেখুন।</p>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        <p>Error: {err.message || "API call failed"}</p>
      </div>
    );
  }
}
