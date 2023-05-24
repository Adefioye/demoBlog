import Link from "next/link";
import { FC, useState, useRef, useEffect } from "react";
import Logo from "./Logo";
import { IconType } from "react-icons";
import { RiMenuFoldFill, RiMenuUnfoldFill } from "react-icons/ri";

interface Props {
  navItems: { href: string; icon: IconType; label: string }[];
}

const NAV_OPEN_WIDTH = "w-60";
const NAV_CLOSE_WIDTH = "w-12";
const COLLAPSED_STATE = "collapsed_state";

const AdminNav: FC<Props> = ({ navItems }): JSX.Element => {
  const navRef = useRef<HTMLElement>(null);
  const [notCollapsed, setNotCollapsed] = useState(true);

  function toggleAdminBar(notCollapsed: boolean) {
    const currentNav = navRef.current;
    if (!currentNav) return;

    const { classList } = currentNav;

    if (notCollapsed) {
      // hide nav bar
      classList.remove(NAV_OPEN_WIDTH);
      classList.add(NAV_CLOSE_WIDTH);
    } else {
      // reveal nav bar
      classList.add(NAV_OPEN_WIDTH);
      classList.remove(NAV_CLOSE_WIDTH);
    }
  }

  function toggleAdminState() {
    toggleAdminBar(notCollapsed);
    const newCollapsedState = !notCollapsed;
    setNotCollapsed(newCollapsedState);
    localStorage.setItem(COLLAPSED_STATE, JSON.stringify(newCollapsedState));
  }

  useEffect(() => {
    // This is used to let admin bar remain collapsed when route changes
    const collapsedState = localStorage.getItem(COLLAPSED_STATE);
    if (collapsedState !== null) {
      const currentCollapsedState = JSON.parse(collapsedState);
      setNotCollapsed(currentCollapsedState);
      toggleAdminBar(!currentCollapsedState);
    } else {
      setNotCollapsed(true);
    }
  }, []);

  return (
    <nav
      className="h-screen w-60 shadow-sm bg-secondary-light dark:bg-secondary-dark
    flex flex-col justify-between transition-width overflow-hidden sticky top-0"
      ref={navRef}
    >
      {/* Logo */}
      <div>
        <Link href="/admin" className="flex items-center space-x-2 p-3 mb-10">
          <Logo className="fill-highlight-light dark:fill-highlight-dark w-5 h-5" />
          {notCollapsed && (
            <span className="text-highlight-light dark:text-highlight-dark text-xl font-semibold leading-none">
              Admin
            </span>
          )}
        </Link>

        {/* Nav Items */}
        <div className="space-y-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center text-highlight-light dark:text-highlight-dark text-xl p-3 hover:scale-[0.98] transition"
            >
              <item.icon size={24} />
              {notCollapsed && (
                <span className="ml-2 leading-none">{item.label}</span>
              )}
            </Link>
          ))}
        </div>
      </div>

      {/* nav toggler */}
      <button
        className="text-highlight-light dark:text-highlight-dark p-3 hover:scale-[0.98] transition self-end"
        onClick={toggleAdminState}
      >
        {notCollapsed ? (
          <RiMenuFoldFill size={25} />
        ) : (
          <RiMenuUnfoldFill size={25} />
        )}
      </button>
    </nav>
  );
};

export default AdminNav;
