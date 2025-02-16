import { SideMenuItemProps } from "./SideMenu"
import { BsFront } from "solid-icons/bs"
import { Component, lazy } from "solid-js"
import { UserRole } from "~/types"
import { FaSolidRocket } from 'solid-icons/fa'
import { AiFillFire } from 'solid-icons/ai'
import { IoHome } from "solid-icons/io"

export type SideMenuItem = SideMenuItemProps & {
  component?: Component
  children?: SideMenuItem[]
}

export const side_menu_items: SideMenuItem[] = [
  {
    title: "article.sidemenu.index",
    icon: BsFront,
    to: "/articles",
    role: UserRole.GUEST,
    component: lazy(() => import("./About")),
  },
  {
    title: "article.sidemenu.gtaol-updates",
    icon: FaSolidRocket,
    to: "/articles/gtaol-updates",
    role: UserRole.GUEST,
    children: [
      {
        title: "article.sidemenu.update213",
        icon: AiFillFire,
        to: "/articles/gtaol-updates/update213",
        role: UserRole.GUEST,
        component: lazy(() => import("./gtaol-updates/update213")),
      },
      {
        title: "article.sidemenu.update206",
        icon: AiFillFire,
        to: "/articles/gtaol-updates/update206",
        role: UserRole.GUEST,
        component: lazy(() => import("./gtaol-updates/update206")),
      },
    ],
  },
  {
    title: "article.sidemenu.game-tips",
    icon: FaSolidRocket,
    to: "/articles/game-tips",
    role: UserRole.GUEST,
    children: [
      {
        title: "article.sidemenu.apartment-heists",
        icon: AiFillFire,
        to: "/articles/gtaol-updates/apartment-heists",
        role: UserRole.GUEST,
        component: lazy(() => import("./game-tips/apartment-heists")),
      },
      {
        title: "article.sidemenu.char",
        icon: AiFillFire,
        to: "/articles/gtaol-updates/char",
        role: UserRole.GUEST,
        component: lazy(() => import("./game-tips/char")),
      },
    ],
  },
  {
    title: "manage.sidemenu.home",
    icon: IoHome,
    to: "/",
    role: UserRole.GUEST,
    external: true,
  },
]
