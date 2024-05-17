"use client";

import { useSession } from "next-auth/react";

const Dashboard = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  const getContact = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/contacts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${session?.user?.token}`,
      }
    })
    const data = await res.json()
    console.log(data)
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <pre>
        <code>{JSON.stringify(session, null, 2)}</code>
      </pre>
      <button onClick={getContact} className="btn btn-primary">Get Contact</button>
    </div>
  );
};
export default Dashboard;
