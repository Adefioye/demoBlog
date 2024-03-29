import { FC, ReactNode } from "react";
import Link from "next/link";
import AdminNav from "../AdminNav";
import {
  AiOutlineDashboard,
  AiOutlineContainer,
  AiOutlineTeam,
  AiOutlineMail,
  AiOutlineContacts,
  AiOutlineFileAdd,
} from "react-icons/ai";

interface Props {
  children: ReactNode;
}

const AdminLayout: FC<Props> = ({ children }): JSX.Element => {
  const navItems = [
    { href: "/admin", icon: AiOutlineDashboard, label: "Dashboard" },
    { href: "/admin/posts", icon: AiOutlineContainer, label: "Posts" },
    { href: "/admin/users", icon: AiOutlineTeam, label: "Users" },
    { href: "/admin/comments", icon: AiOutlineMail, label: "Comments" },
    { href: "/admin/contacts", icon: AiOutlineContacts, label: "Contacts" },
  ];
  return (
    <div className="flex">
      <AdminNav navItems={navItems} />
      <div className="flex-1 p-4">{children}</div>

      {/* Create button */}
      <Link
        href="/admin/post/create"
        className="bg-secondary-dark dark:bg-secondary-light text-highlight-light dark:text-highlight-dark
      fixed z-10 right-10 bottom-10 p-3 rounded-full hover:scale-90 shadow-sm transition"
      >
        <AiOutlineFileAdd size={25} />
      </Link>
    </div>
  );
};

export default AdminLayout;
