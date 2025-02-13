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

export type SideMenuItem = SideMenuItemProps & {
  component?: Component
  children?: SideMenuItem[]
}


export const side_menu_items: SideMenuItem[] = [
  {
    title: "article.sidemenu.test1",
    icon: BsGearFill,
    to: "/@article/test1",
    children: [
      {
        title: "article.sidemenu.test10",
        icon: BsWindow,
        to: "/@article/test1/test10",
        component: lazy(() => import("./test1/test10")),
      },
      {
        title: "article.sidemenu.style",
        icon: BsPaletteFill,
        to: "/@article/test1/test11",
        component: lazy(() => import("./test1/test11")),
      },
    ],
  },
  {
    title: "article.sidemenu.about",
    icon: BsFront,
    to: "/@article/about",
    role: UserRole.GUEST,
    component: lazy(() => import("./About")),
  },

]
