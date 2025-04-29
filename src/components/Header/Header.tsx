"use client"

import { Slack } from 'lucide-react';
import { CiLogout } from "react-icons/ci";
import { FaSignOutAlt } from "react-icons/fa";
import { CarProducts } from '../CarProducts/CarProducts';
import SelectProducts from '../SelectProducts/SelectProducts';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { signOut, useSession } from 'next-auth/react';

export default function Header() {

    const { data: session } = useSession();

    const signoutWithGoogle = async () => {
        await signOut({ callbackUrl: "/signin" });
    };

    return (
        <header className="flex items-center justify-between w-full h-16 px-4 md:px-8 lg:px-12 bg-[#111827]">
            <div className="flex flex-row items-center gap-2 mr-4 md:gap-4 lg:gap-6">
                <div className='flex flex-row items-center gap-2'>
                    <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-400">Vistta</h1>
                    <Slack className="text-white w-6 h-6" />
                </div>
                <SelectProducts />
            </div>

            <div className='flex gap-2 md:gap-4 items-center'>

                {session?.user && (
                    <AlertDialog>
                        <div className='flex items-center gap-2'>
                            <p className='text-white text-xs sm:text-sm md:text-base lg:text-md'>{session?.user?.name}</p>
                            <span className='text-white border h-6'></span>
                            <AlertDialogTrigger asChild>
                                <button className=' text-white'>
                                    <CiLogout className="w-6 h-6 cursor-pointer" />
                                </button>
                            </AlertDialogTrigger>
                        </div>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Sign out with Google account?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    If you log out, you will be redirected to the login page.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel className='bg-blue-500 hover:bg-blue-600 hover:text-white text-white '>Cancel</AlertDialogCancel>
                                <AlertDialogAction className='bg-red-500 hover:bg-red-600 hover:text-white text-white ' onClick={signoutWithGoogle}>Continue</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                )}

                <CarProducts />
            </div>

        </header>
    )
}