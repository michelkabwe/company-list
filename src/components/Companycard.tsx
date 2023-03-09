import React, { useState } from "react";
//import Button from '@mui/material/Button';
import { Button } from "@material-ui/core";
import { theme } from "../Styles/Styles";
import { makeStyles } from "@material-ui/core/styles";
import AddBoxIcon from "@mui/icons-material/AddBox";

interface DataProps {
  item: Data;
  index: number;
}
interface Data {
  symbol: string;
  name: string;
  exchange: string;
}

type AddItemBtn = {
  BtnOnClick: (index: number, e: React.MouseEvent<SVGElement>) => void;
};

type CompanycardProps = DataProps & AddItemBtn;

const Companycard: React.FC<CompanycardProps> = ({
  item,
  index,
  BtnOnClick,
}) => {
  const classes = useStyles();

  //const data = item as Data;s

  return (
    <div key={index} className={classes.card_results_wrapper}>
      <div className={classes.text_container}>
        <p className={classes.p_info}>{item.name}</p>
      </div>
      <div className={classes.text_container}>
        <p className={classes.p_info}>{item.symbol}</p>
      </div>

      <div className={classes.btn_wrapper}>
        <AddBoxIcon
          className={classes.add_btn}
          onClick={(e: React.MouseEvent<SVGElement, MouseEvent>) =>
            BtnOnClick(index, e)
          }
        >
          ADD
        </AddBoxIcon>
      </div>
    </div>
  );
};

export default Companycard;

const useStyles = makeStyles((theme) => ({
  search_result_wrapper: {
    /*display: "flex",*/
  },

  text_container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: "2rem",
    flex: "1",
    wordWrap: "break-word",
    overflow: "auto",
    fontSize: "0.8rem",
  },

  btn_wrapper: {
    width: "25%",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },

  p_info: {
    flex: "1",
    marginRight: "2rem",
  },

  add_btn: {
    marginRight: "2rem",
    width: "100%",
    height: "41px",
    [theme.breakpoints.down("md")]: {
      width: "25%",
      height: "32px",
    },
  },

  card_results_wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100px",
  },
}));
