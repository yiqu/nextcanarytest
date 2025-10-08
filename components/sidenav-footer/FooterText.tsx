import { UserProfile } from "@/models/user/user.model";
import { getUserCached } from "@/server/user/user.server";

export default async function FooterText() {
  const user: UserProfile | null = await getUserCached();
  return <div>{user?.name}</div>;
}
