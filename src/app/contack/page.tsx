
"use client"

import { ContactCard } from "@/components/ContactCard";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export type Contact = {
  id: number;
  name: string;
  phone: string;
  nickname?: string;
  isFavorite?: boolean;
  userEmail: string;
}

const Contact = () => {
  const { data: session, status } = useSession();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState<Contact>();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "authenticated") {
      const getContact = async () => {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/contacts`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${session?.user?.token}`,
            },
          });

          if (!res.ok) {
            throw new Error('Failed to fetch data');
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
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const handleContactClick = (contact: Contact) => {
    setSelectedContact(contact);
  };

  return (
    <div className="">
      <div className="text-2xl text-center pt-4">
        <h1>Contactos</h1>
      </div>
      <div className="mt-16">
        {contacts.length > 0 ? (
          <div className="w-3/4 float-right flex gap-x-2">
            {contacts.map((contact: Contact) => (
              <ContactCard contact={contact} key={contact.id} />
            ))}
          </div>
        ) : (
          <p>No contacts found</p>
        )}
        {selectedContact && (
          <div style={{ marginTop: '20px' }}>
            <h2>Selected Contact</h2>
            <p><strong>Name:</strong> {selectedContact.name}</p>
            <p><strong>Phone:</strong> {selectedContact.phone}</p>
            <p><strong>Nickname:</strong> {selectedContact.nickname}</p>
            <p><strong>Favorite:</strong> {selectedContact.isFavorite ? 'Yes' : 'No'}</p>
            <p><strong>Email:</strong> {selectedContact.userEmail}</p>
          </div>
        )}
      </div>

      <div className="shadow-lg h-4/5 w-[22%] bg-gray-200 absolute top-[6.5rem] left-4 rounded-3xl">

      </div>

    </div>
  );
};

export default Contact;

