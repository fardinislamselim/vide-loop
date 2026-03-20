import api from "@/lib/axios";

export const getUserProfile = (userName: string) => {
  return api.get(`/user/${userName}`);
};

// export const updateProfile = (data: any) => {
//   return api.patch("/users/me", data);
// };

// export const followUser = (id: string) => {
//   return api.post(`/users/follow/${id}`);
// };

