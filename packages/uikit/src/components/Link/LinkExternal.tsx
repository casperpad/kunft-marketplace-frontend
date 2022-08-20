import React from "react";
import OpenNewIcon from "../Svg/Icons/OpenNew";
import Link from "./Link";
import { LinkProps } from "./types";

const LinkExternal: React.FC<React.PropsWithChildren<LinkProps>> = ({ children, ...props }) => {
  return (
    <Link external {...props}>
      {children}
      <OpenNewIcon color={props.color ? props.color : "primary"} ml="4px" />
    </Link>
  );
};

export default LinkExternal;
