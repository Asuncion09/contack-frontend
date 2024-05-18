import { Contact } from "@/app/contack/page";

export function ContactCard({ contact }: { contact: Contact }) {
  return (
    <div className="relative w-auto ml-16">
      <div className="bg-[#a4ffff] w-40 h-10 rounded-xl z-10 absolute top-[-15px] shadow-lg">
        <p className="text-semibold text-[#282a36] text-center">{contact.nickname}</p>
      </div>
      <div className="bg-[#a4ffff] text-[#282a36] w-[12rem] h-[6rem] mb-6 rounded-2xl p-1 relative left-9 pt-8 pl-14 text-semibold shadow-lg">
        <h2>{contact.name}</h2>
        <p>{contact.phone}</p>
      </div>
    </div>
  );
}
