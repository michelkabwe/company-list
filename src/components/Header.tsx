import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { theme } from "../Styles/Styles";
import NavResponsive from "./NavResponsive";

const Header: React.FC = () => {
  const classes = useStyles();
  const [open, setOpen] = useState<boolean>(false);

  const handleNav = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div className={classes.header}>
      <ShoppingCartOutlinedIcon
        onClick={handleNav}
        className={classes.cart}
        fontSize="large"
      ></ShoppingCartOutlinedIcon>
      {open && <NavResponsive />}
    </div>
  );
};

export default Header;

const useStyles = makeStyles((theme) => ({
  header: {
    width: "100%",
    height: "4rem",
    backgroundColor: "grey",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },

  cart: {
    marginRight: "2rem",
  },
}));
