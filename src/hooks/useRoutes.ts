import { useMemo } from "react";
import { usePathname  } from "next/navigation";
import { useTheme } from 'next-themes';
import { signOut } from 'next-auth/react';
import {
        faComments,
        faUsers,
        faRightFromBracket,
        faMoon, 
        faSun
} from "@fortawesome/free-solid-svg-icons";

import useConversation from "./useConversation";


const useRoutes = () => {
    const pathName = usePathname();
    const { conversationId } = useConversation();
    const { theme, setTheme } = useTheme()

    const routes = useMemo(() => [
        {
            label: "Chat",
            href: "/conversations",
            icon: faComments,
            active: pathName.endsWith("/conversation") || !!conversationId,
        },
        {
            label: "Users",
            href: "/users",
            icon: faUsers,
            active: pathName.endsWith("/users") || !!conversationId,
        },
        {
            label: "Theme",
            href: '#',
            icon: theme === 'light' ? faMoon : faSun,
            onClick: () => { 
                if (theme === 'light') {
                    setTheme('dark');
                }else if (theme === 'dark') {
                    setTheme('light');
                }
            }
        },
        {
            label: "SignOut",
            href: "#",
            onClick: () => signOut(),
            icon: faRightFromBracket,
        },
    ], [conversationId, pathName, theme, setTheme]);

    return routes;
}

export default useRoutes;