import Header from "@/components/Header/Header"
import ListProducts from "@/components/ListProducts/ListProducts";

import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

export  default async function Home() {

  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/signin')
  }

  return (
    <main className="flex min-h-screen w-full flex-col items-center">
      <Header/>

      <ListProducts/>
    </main>
  );
}