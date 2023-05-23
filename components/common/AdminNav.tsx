import Link from "next/link";
import { FC, useState, useRef, useEffect } from "react";
import Logo from "./Logo";
import { IconType } from "react-icons";
import { RiMenuFoldFill, RiMenuUnfoldFill } from "react-icons/ri";

interface Props {
  navItems: { href: string; icon: IconType; label: string }[];
}

const AdminNav: FC<Props> = ({ navItems }): JSX.Element => {
  const navRef = useRef<HTMLElement>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const NAV_OPEN_WIDTH = "w-60";
  const NAV_CLOSE_WIDTH = "w-12";
  const COLLAPSED_STATE = "collapsed_state";

  function toggleAdminBar(isCollapsed: boolean) {
    const navClassList = navRef.current?.classList;

    if (!navClassList) return;

    if (isCollapsed) {
      // Change width of admin bar to min-width and change collapsed state
      navClassList.remove(NAV_CLOSE_WIDTH);
      navClassList.add(NAV_OPEN_WIDTH);
    } else {
      // not collapsed
      navClassList.remove(NAV_OPEN_WIDTH);
      navClassList.add(NAV_CLOSE_WIDTH);
    }
  }

  function toggleAdminState() {
    console.log(isCollapsed);
    toggleAdminBar(isCollapsed);
    const newCollapsedState = !isCollapsed;
    localStorage.setItem(COLLAPSED_STATE, JSON.stringify(newCollapsedState));
    setIsCollapsed(newCollapsedState);
  }

  useEffect(() => {
    // This is used to let admin bar remain collapsed when route changes
    const collapsedState = localStorage.getItem(COLLAPSED_STATE);
    if (collapsedState !== null) {
      const currentCollapsedState = JSON.parse(collapsedState);
      setIsCollapsed(currentCollapsedState);
      toggleAdminBar(!currentCollapsedState);
    } else {
      setIsCollapsed(false);
    }
  }, []);

  return (
    <nav
      className="h-screen w-60 shadow-sm bg-secondary-light dark:bg-secondary-dark
    flex flex-col justify-between"
      ref={navRef}
    >
      {/* Logo */}
      <div>
        <Link href="/admin" className="flex items-center space-x-2 p-3 mb-10">
          <Logo className="fill-highlight-light dark:fill-highlight-dark w-5 h-5" />
          {!isCollapsed && (
            <span className="text-highlight-light dark:text-highlight-dark text-xl font-semibold">
              Admin
            </span>
          )}
        </Link>

        {/* Nav Items */}
        <div className="space-y-5">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center text-highlight-light
        dark:text-highlight-dark text-xl p-3 hover:scale-[0.98] transition
        "
            >
              <item.icon size={24} />
              {!isCollapsed && <span className="ml-2">{item.label}</span>}
            </Link>
          ))}
        </div>
      </div>

      {/* nav toggler */}
      <button
        className="text-highlight-light dark:text-highlight-dark 
      hover:scale-[0.98] transition self-end"
        onClick={toggleAdminState}
      >
        {isCollapsed ? (
          <RiMenuUnfoldFill size={25} />
        ) : (
          <RiMenuFoldFill size={25} />
        )}
      </button>
    </nav>
  );
};

export default AdminNav;
