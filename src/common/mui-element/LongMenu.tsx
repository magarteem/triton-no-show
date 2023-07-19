import { MouseEvent, useContext, useState, ReactNode } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Link } from "react-router-dom";
import { ColorModeContext } from "../../contextProvider/MuiThemeContext";
import cn from "classnames";
import s from "./LongMenu/longMenu.module.scss";

export interface OptionLongMenuType {
 label: string;
 link: string;
 action: () => void | any;
}

interface LongMenuType {
 moreButtonCircle?: string | ReactNode;
 options?: OptionLongMenuType[];
}

const optionsTemp: OptionLongMenuType[] = [
 {
  label: "Редактировать",
  link: ``,
  action: () => {},
 },
 {
  label: "Скопировать ссылку",
  link: "",
  action: () => {},
 },
 { label: "Удалить", link: "#", action: () => {} },
];

const ITEM_HEIGHT = 48;

export const LongMenu = ({ moreButtonCircle, options = optionsTemp }: LongMenuType) => {
 const { mode } = useContext(ColorModeContext);
 const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
 const open = Boolean(anchorEl);

 const handleClick = (event: MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);

 const handleClose = () => setAnchorEl(null);

 return (
  <div>
   <IconButton
    aria-label="more"
    id="long-button"
    aria-controls={open ? "long-menu" : undefined}
    aria-expanded={open ? "true" : undefined}
    aria-haspopup="true"
    onClick={handleClick}
   >
    {moreButtonCircle ? (
     moreButtonCircle && typeof moreButtonCircle === "string" ? (
      <img src={moreButtonCircle} alt="moreButtonCircle" />
     ) : (
      <span className={cn({ [s.imgIcon]: mode === "dark" })}>{moreButtonCircle}</span>
     )
    ) : (
     <MoreVertIcon className={cn({ [s.imgIcon]: mode === "dark" })} />
    )}

    {/*{moreButtonCircle ? (
     <img src={moreButtonCircle} alt="moreButtonCircle" />
    ) : (
     <MoreVertIcon className={cn({ [s.imgIcon]: mode === "dark" })} />
    )}*/}
   </IconButton>
   <Menu
    id="long-menu"
    MenuListProps={{
     "aria-labelledby": "long-button",
    }}
    anchorEl={anchorEl}
    open={open}
    onClose={handleClose}
    PaperProps={{
     style: {
      maxHeight: ITEM_HEIGHT * 4.5,
      width: "20ch",
     },
    }}
    sx={{
     "& .MuiList-root": {
      background: "linear-gradient(0deg, rgba(42, 108, 4, 0.08), rgba(42, 108, 4, 0.08)), #FDFDF5",
      boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.3), 0px 2px 6px 2px rgba(0, 0, 0, 0.15)",
      borderRadius: "4px",
     },
    }}
   >
    {options.map((option) => (
     <Link to={option.link} key={option.label}>
      <MenuItem
       key={option.label}
       onClick={option.action}
       sx={{
        fontSize: "16px",
        color: "#1A1C18",
        height: "45px",
       }}
      >
       {option.label}
      </MenuItem>
     </Link>
    ))}
   </Menu>
  </div>
 );
};
