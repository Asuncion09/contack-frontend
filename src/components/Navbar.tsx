"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { HiMiniHome } from "react-icons/hi2";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="w-screen flex justify-center pt-4">
      <div className="bg-[#d6acff] w-[60%]  p-2.5 rounded-lg h-13 shadow content-end">
        <Link
          href="/"
          className=" p-1 text-[#282a36] rounded-lg decoration-solid mx-1 float-left"
        >
          <HiMiniHome className="text-2xl" />
        </Link>
        {session?.user ? (
          <>
            <button
              onClick={() => signOut()}
              className="py-1 px-1.5 bg-[#ff6e6e] text-[#282a36] rounded-lg decoration-solid mx-1 float-right"
            >
              salir
            </button>
            <Link
              href="/"
              className="py-1 px-1.5 bg-[#69ff94] text-[#282a36] rounded-lg decoration-solid mx-1 float-right"
            >
              Añadir
            </Link>

          </>
        ) : (
          <>
            <Link
              href="/login"
              className="py-1 px-1.5 bg-[#69ff94] text-[#282a36] rounded-lg decoration-solid mx-1 float-right"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="py-1 px-1.5 bg-[#69ff94] text-[#282a36] rounded-lg decoration-solid mx-1 float-right"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
