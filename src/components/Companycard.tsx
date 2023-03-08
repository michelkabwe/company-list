import React, { useState } from "react";
//import Button from '@mui/material/Button';
import { Button } from "@material-ui/core";
import Stack from '@mui/material/Stack';

import { makeStyles } from "@material-ui/core/styles";

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
  BtnOnClick: (index: number, e: React.MouseEvent<HTMLButtonElement>) => void;
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
    <div>
      <ul>
        <li key={index} className={classes.card_results_wrapper}>
          <p className={classes.p_info}>{item.name}</p>
          <p className={classes.p_info}>{item.symbol}</p>
          <Button
            className={classes.add_btn}
            onClick={(e) => BtnOnClick(index, e)}
            size="small"
            variant="contained"
            color="primary"
          >
            ADD
          </Button>
        </li>
      </ul>
    </div>
  );
};

export default Companycard;

const useStyles = makeStyles({
  search_result_wrapper: {
    display: "flex",
  },

  p_info: {
    flex: "1",
    marginRight: "2rem",
  },

  add_btn: {
    marginRight: "2rem",
    width: "100px",
    height: "41px",
  },

  card_results_wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100px",
  },
});
