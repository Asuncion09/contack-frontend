"use client";

import { ContactCard } from "@/components/ContactCard";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { GoXCircle, GoX } from "react-icons/go";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiUser3Line } from "react-icons/ri";
import { FaCheck } from "react-icons/fa";

export type Contact = {
  id: number;
  name: string;
  phone: string;
  nickname?: string;
  isFavorite?: boolean;
  userEmail: string;
};

const Contact = () => {
  const { data: session, status } = useSession();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState<Contact>();
  const [showContact, setShowContact] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [name, setName] = useState(selectedContact?.name);
  const [nickname, setNickname] = useState(selectedContact?.nickname);
  const [phone, setPhone] = useState(selectedContact?.phone);
  nickname;
  useEffect(() => {
    if (status === "authenticated") {
      const getContact = async () => {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/contacts`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${session?.user?.token}`,
              },
            },
          );

          if (!res.ok) {
            throw new Error("Failed to fetch data");
          }

          const data = await res.json();
          setContacts(data);
        } catch (err) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError("An unknown error occurred");
          }
        } finally {
          setLoading(false);
        }
      };

      getContact();
    }
  }, [session, status]);

  if (status === "loading" || loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const handleContactSelect = (contact: Contact) => {
    setSelectedContact(contact);
    setShowContact(true);
    console.log(contact);
  };

  const handleDelete = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/contacts/${selectedContact?.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${session?.user?.token}`,
        },
      },
    );

    const responseAPI = await res.json();
    console.log(responseAPI);

    if (!res.ok) {
      setError(responseAPI.message);
      return;
    }
    setShowDelete(false);
    location.reload();
  };

  const handleUpdate = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/contacts/${selectedContact?.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${session?.user?.token}`,
        },
        body: JSON.stringify({
          nickname,
          name,
          phone,
        }),
      },
    );
    const responseAPI = await res.json();

    if (!res.ok) {
      setError(responseAPI.message);
      return;
    }
    location.reload();
  };

  return (
    <div className="transition-all">
      <div className="text-2xl text-center pt-5">
        <h1>Contactos</h1>
      </div>
      <div className="mt-8 flex justify-center items-center">
        {contacts.length > 0 ? (
          <div className="grid grid-cols-5 w-[90%]">
            {contacts.map((contact: Contact) => (
              <ContactCard
                contact={contact}
                key={contact.id}
                onSelectContact={handleContactSelect}
              />
            ))}
          </div>
        ) : (
          <p className="w-3/4 float-right">No contacts found</p>
        )}
      </div>

      {showContact != false ? (
        <div className="absolute top-0 bg-white/30 w-full h-screen z-20 flex items-center justify-center backdrop-blur-md">
          <div className="bg-[#f8f8f2] w-2/5 h-1/2 relative rounded-3xl shadow">
            <div
              className="h-8 w-8 bg-blue-200 absolute top-2 right-2 rounded-full flex justify-center items-center"
              onClick={() => setShowContact(false)}
            >
              <GoXCircle className="text-2xl" />
            </div>
            <div className="flex justify-center items-center w-full h-full">
              <div className=" w-4/5 h-4/5 grid grid-flow-row-dense grid-cols-3">
                <div className="col-span-2 ">
                  <div className="w-[90%] h-4/5 rounded-2xl shadow text-center">
                    <h1 className="pt-2 pb-2 border-b-2 border-b-gray-200">
                      {selectedContact?.nickname}
                    </h1>
                    <p className="mt-6">nombre:</p>
                    <p>{selectedContact?.name}</p>
                    <p className="mt-3">Telefono:</p>
                    <p>{selectedContact?.phone}</p>
                  </div>
                  <div className="w-4/5 h-1/5 flex items-end">
                    <div
                      className="h-10 w-10 bg-blue-400 hover:bg-blue-500 rounded-lg ml-4 shadow flex items-center justify-center"
                      onClick={() => {
                        setShowEdit(true);
                        setShowContact(false);
                      }}
                    >
                      <MdOutlineModeEdit className="text-2xl" />
                    </div>

                    <div
                      className="h-10 w-10 bg-[#ff6e6e] hover:bg-[#ff5555] rounded-lg ml-4 shadow flex items-center justify-center "
                      onClick={() => {
                        setShowDelete(true);
                        setShowContact(false);
                      }}
                    >
                      <MdOutlineDeleteOutline className="text-2xl" />
                    </div>
                  </div>
                </div>

                <div className="mt-6 h-3/5 w-full rounded-2xl shadow flex items-center justify-center">
                  <RiUser3Line className="text-6xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {showDelete != false ? (
        <div className="absolute top-0 bg-white/30 w-full h-screen z-20 flex items-center justify-center backdrop-blur-md">
          <div className="bg-[#f8f8f2] w-1/5 h-1/4 relative rounded-3xl shadow">
            <h1 className="text-center pt-2 pb-2 border-b-2 border-b-gray-200">
              Quiere eliminar el contacto?
            </h1>
            <div className="flex justify-center items-center pt-10 gap-6">
              <button
                className="h-10 w-10 bg-[#ff6e6e] rounded-lg ml-4 shadow flex items-center justify-center"
                onClick={handleDelete}
              >
                <FaCheck className="text-2xl" />
              </button>
              <button
                className="h-10 w-10 bg-gray-400 rounded-lg ml-4 shadow flex items-center justify-center"
                onClick={() => {
                  setShowDelete(false);
                  setShowContact(true);
                }}
              >
                <GoX className="text-3xl" />
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {showEdit != false ? (
        <div className="absolute top-0 bg-white/30 w-full h-screen z-20 flex items-center justify-center backdrop-blur-md">
          <div className="bg-[#f8f8f2] w-2/5 h-1/2 relative rounded-3xl shadow">
            <h1 className="text-center pt-2 pb-2 border-b-2 border-b-gray-200">
              Editar contacto
            </h1>

            <div>
              <form>
                <div className="grid col-auto">
                  <label>Apodo:</label>
                  <input
                    type="text"
                    placeholder={`${selectedContact?.nickname}`}
                    name="nickname"
                    className="form-control mb-2"
                    value={nickname}
                    onChange={(event) => setNickname(event.target.value)}
                  />
                </div>

                <div className="grid col-auto">
                  <label>Nombre:</label>
                  <input
                    type="text"
                    placeholder={`${selectedContact?.name}`}
                    name="name"
                    className="form-control mb-2"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                </div>

                <div className="grid col-auto">
                  <label>Telefono:</label>
                  <input
                    type="number"
                    placeholder={`${selectedContact?.phone}`}
                    name="phone"
                    className="form-control mb-2"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                  />
                </div>

                <button
                  className="p-2 rounded-lg bg-[#69ff94] hover:bg-[#50fa7b]"
                  onClick={() => {
                    setShowEdit(false);
                    handleUpdate();
                  }}
                >
                  <FaCheck className="text-2xl" />
                </button>

                <button
                  className="p-2 rounded-lg bg-gray-400 hover:bg-gray-500"
                  onClick={() => {
                    setShowEdit(false);
                    setShowContact(true);
                  }}
                >
                  <GoX className="text-2xl" />
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Contact;
