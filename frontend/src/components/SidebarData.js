import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const SidebarData = [
  {
    title: "Dashboard",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Patient Tables",
    path: "/patients",
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text",
  },
  {
    title: "To Do",
    path: "/todos",
    icon: <FaIcons.FaCartPlus />,
    cName: "nav-text",
  },
  {
    title: "Schedule",
    path: "/schedule",
    icon: <FaIcons.FaCartPlus />,
    cName: "nav-text",
  },
];
