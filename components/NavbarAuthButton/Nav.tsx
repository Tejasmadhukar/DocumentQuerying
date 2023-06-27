import { Navbar } from './navbar';
import { getServerSession } from 'next-auth/next';
import { use } from "react";

async function getSession() {
  return await getServerSession();
}

export default function Nav() {
  const session = use(getSession());
  return <Navbar session={session} />;
}