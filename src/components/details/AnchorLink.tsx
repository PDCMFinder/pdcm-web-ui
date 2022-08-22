import { FC } from "react";

export const AnchorLink: FC<{disabled: boolean, label: string, href?: string}> = ({ disabled, label, href}) => {
    return           <li className="py-3">
    <a
      href={href}
      className={
        disabled
          ? "disabled text-muted text-decoration-none"
          : ""
      }
    >
      {label}
    </a>
  </li>
}