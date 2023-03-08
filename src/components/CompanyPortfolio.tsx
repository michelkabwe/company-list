import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { removeItemAtIndex } from "../hooks/api";

interface DataProps {
  item: Data;
  index: number;
}
interface Data {
  symbol: string;
  name: string;
  exchange: string;
}

type CompanyPortfolio = DataProps & Data;

interface Props {
  newListItems: JsonData[];
  
}
interface JsonData {
  name:string;
  symbol:string;
  
}

const CompanyPortfolio: React.FC<Props> = ({ newListItems }) => {
  const classes = useStyles();

  const [items, setItems] = useState<JsonData[]>(newListItems);

  const handleDelete = (index: number) => {
    setItems(removeItemAtIndex(items, index));
  };


  useEffect(() => {
    setItems(newListItems);
  }, [newListItems]);
  return (
    <div>
      <ul>
        {items.map((item, index) => (
          <li className={classes.portfolio_wrapper} key={index}>
            <p className={classes.p_info}>{item.name}</p>
            <p className={classes.p_info}>{item.symbol}</p>
            <p
              onClick={() => handleDelete(index)}
              className={classes.delete_btn}
            >
              ❌
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompanyPortfolio;

const useStyles = makeStyles({
  portfolio_wrapper: {
    display: "flex",
    listStyleType: "none",
  },

  p_info: {
    flex: 1,
    marginRight: "2rem",
    paddingRight: "2rem",
    textAlign: "left",
  },

  delete_btn: {
    marginRight:'2rem',
    cursor: "pointer"
  },
});
