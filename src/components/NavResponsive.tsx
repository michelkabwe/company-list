import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { theme } from "../Styles/Styles";

const NavResponsive: React.FC = () => {
  const classes = useStyles();

  return <div className={classes.nav}></div>;
};

export default NavResponsive;

const useStyles = makeStyles((theme) => ({
  nav: {
    position: "absolute",
    zIndex: 10,
    top: "0",
    bottom: "bottom",
    marginTop: "4rem",
    background: "red",
    height: "400px",
    width: "100%",
  },
}));
