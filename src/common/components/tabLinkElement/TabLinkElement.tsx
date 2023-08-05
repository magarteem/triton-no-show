import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface CustomNextLinkType {
 href: string;
}

interface CustomNextLinkTypeNested {
 children: ReactNode;
}

export const TabLinkElement =
 ({ href }: CustomNextLinkType) =>
 ({ children, ...rest }: CustomNextLinkTypeNested | any) =>
  (
   <Link to={href} {...rest}>
    {children}
   </Link>
  );
