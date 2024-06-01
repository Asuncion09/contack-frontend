import { Contact } from "@/app/contack/page";
import { useState } from "react";
import { RiUser3Line } from "react-icons/ri";

export function ContactCard({
  contact,
  onSelectContact,
}: {
  contact: Contact;
  onSelectContact: (contact: Contact) => void;
}) {
  const [isSelected, setIsSelected] = useState(false);

  const handleContactSelect = () => {
    setIsSelected(true);
    onSelectContact(contact); // Comunicar la selección al componente padre
  };

  return (
    //{isSelected ? 'border-2 border-blue-500' : ''}
    <div className={`w-full grid grid-cols-5 gap-3`}>
      <button
        className="bg-[#a4ffff30] text-[#282a36] w-56 h-64 mb-6 rounded-2xl text-semibold shadow-lg hover:cursor-pointer relative"
        onClick={handleContactSelect}
      >
        <div className="content-center absolute top-0 pt-2 pb-2 w-full border-b-2 border-b-gray-300">
          <p>{contact.nickname}</p>
        </div>
        <div className="absolute top-16 w-full flex items-center justify-center">
          <div className="w-3/5 h-24 bg-[#d6acffaa] rounded-xl flex items-center justify-center">
            <RiUser3Line className="text-6xl" />
          </div>
        </div>
        <div className="content-center absolute bottom-7 w-full">
          <h2>{contact.name}</h2>
          <p>{contact.phone}</p>
        </div>
      </button>
    </div>
  );
}
