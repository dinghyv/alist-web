import { SideMenuItemProps } from "./SideMenu"
import {
  BsGearFill,
  BsPaletteFill,
  BsCameraFill,
  BsWindow,
  BsPersonCircle,
  BsJoystick,
  BsMedium,
  BsFingerprint,
  BsFront,
  BsCloudUploadFill,
  BsSearch,
  BsBucket,
  BsHddNetwork,
} from "solid-icons/bs"
import { FiLogIn } from "solid-icons/fi"
import { SiMetabase } from "solid-icons/si"
import { CgDatabase } from "solid-icons/cg"
import { OcWorkflow2 } from "solid-icons/oc"
import { IoCopy, IoHome, IoMagnetOutline } from "solid-icons/io"
import { Component, lazy } from "solid-js"
import { Group, UserRole } from "~/types"
import { FaSolidBook, FaSolidDatabase } from "solid-icons/fa"
import { TbArchive } from "solid-icons/tb"
import { FaSolidRocket } from 'solid-icons/fa'
import { HiOutlineArrowUpCircle } from 'solid-icons/hi'

export type SideMenuItem = SideMenuItemProps & {
  component?: Component
  children?: SideMenuItem[]
}


export const side_menu_items: SideMenuItem[] = [
  {
    title: "article.sidemenu.gtaol-updates",
    icon: FaSolidRocket,
    to: "/articles/gtaol-updates",
    role: UserRole.GUEST,
    children: [
      {
        title: "article.sidemenu.update213",
        icon: HiOutlineArrowUpCircle,
        to: "/articles/gtaol-updates/update213",
        role: UserRole.GUEST,
        component: lazy(() => import("./gtaol-updates/update213")),
      },
      {
        title: "article.sidemenu.update206",
        icon: HiOutlineArrowUpCircle,
        to: "/articles/gtaol-updates/update206",
        role: UserRole.GUEST,
        component: lazy(() => import("./gtaol-updates/update206")),
      },
    ],
  },
  {
    title: "article.sidemenu.index",
    icon: BsFront,
    to: "/articles/index",
    role: UserRole.GUEST,
    component: lazy(() => import("./About")),
  },

]
