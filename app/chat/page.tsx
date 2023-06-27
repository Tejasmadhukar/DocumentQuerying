import ChatSelector from "@/components/ChatPageComponents/ChatSelector"
import { getServerSession } from 'next-auth/next';
export default async function Chat () {
  const session = await getServerSession();
  return (
    <ChatSelector session={session}/>
  )
}
