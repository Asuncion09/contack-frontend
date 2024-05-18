"use client";

import Navbar from "@/components/Navbar";
import { SessionProvider, useSession } from "next-auth/react";

export interface Props {
  children: React.ReactNode;
}

const SessionAuthProvider = ({ children }: Props) => {

  return (
    <SessionProvider>
      <Navbar />
      {children}
    </SessionProvider>
  )
}

export default SessionAuthProvider
