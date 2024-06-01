"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AddContact = () => {
  const { data: session, status } = useSession();
  const [errors, setErrors] = useState<string[]>([]);
  const [name, setName] = useState<string>();
  const [nickname, setNickname] = useState<string>();
  const [phone, setPhone] = useState<string>();
  const router = useRouter();

  if (status === "loading") {
    return <div className="text-center">Loading...</div>;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors([]);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/contacts`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${session?.user?.token}`,
        },
        body: JSON.stringify({
          name,
          phone,
          nickname,

        }),
      }
    );

    const responseAPI = await res.json();

    if (!res.ok) {
      setErrors(responseAPI.message);
      return;
    }
    router.push("/contack");
  };


  return (
    <div className="h-screen items-center w-screen justify-center flex">
      <div className="h-[60%] mt-[-60px] w-2/5 grid shadow-xl rounded-xl">
        <form onSubmit={handleSubmit}>
          <div className="grid col-auto px-auto py-3 bg-[#d6acff] rounded-t-xl text-xl font-semibold text-[#282a36] text-center">
            <h1>Añadir contacto</h1>
          </div>

          <div className="grid col-auto">
            <label >Apodo:</label>
            <input
              type="text"
              placeholder="nick..."
              name="nickname"
              className="form-control mb-2"
              value={nickname}
              onChange={(event) => setNickname(event.target.value)}
            />
          </div>

          <div className="grid col-auto">
            <label >Nombre:</label>
            <input
              type="text"
              placeholder="Nombre Apellido..."
              name="name"
              className="form-control mb-2"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>

          <div className="grid col-auto">
            <label >Telefono:</label>
            <input
              type="number"
              placeholder="0000000000"
              name="phone"
              className="form-control mb-2"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
            />
          </div>

          <button
            type="submit"
            className="p-2 rounded-lg bg-[#69ff94]"
          >
            Añadir
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddContact
