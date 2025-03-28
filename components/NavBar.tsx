import React from "react";
import Image from "next/image";
import Link from "next/link";
import { signIn, signOut, auth } from "@/auth";
import { Session } from "next-auth";
import { BadgePlus, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const NavBar = async () => {
  const session: Session | null = await auth();
  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/" className="flex flex-row">
          <Image src="/logo.png" alt="Logo" width={110} height={25} className="-mt-3"/>
        </Link>

        <div className="flex items-center gap-5 text-black">
          {session && session?.user ? (
            <>
              <Link href="/startup/create">
                <span className="max-sm:hidden">Create</span>
                <BadgePlus className="size-6 self-center sm:hidden"/>
              </Link>

              <form
                action={async () => {
                  "use server";
                  await signOut({redirectTo:'/'});
                }}
              >
                <button type="submit">
                  <span className="max-sm:hidden">Logout</span>
                  <LogOut className="size-6 mt-1 sm:hidden self-center text-red-500"/>
                  </button>
              </form>

              <Link href={`/user/${session?.id}`}>
               <Avatar className="size-10">
                <AvatarImage src={session?.user?.image || ""} 
                alt={session?.user?.name || ""}/>
                <AvatarFallback>AV</AvatarFallback>
               </Avatar>
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn("github");
              }}
            >
              <button type="submit">Login</button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
