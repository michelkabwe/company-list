import React, { useState } from 'react'
import Button from '@mui/material/Button';
import { makeStyles } from '@material-ui/core/styles';



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
    BtnOnClick:(e: React.MouseEvent<HTMLButtonElement>) => void;
  }

type CompanycardProps = DataProps & AddItemBtn
  
  
const Companycard:React.FC<CompanycardProps>= ({item , index, BtnOnClick}) => {
    
    const classes = useStyles();
    const data = item as Data;
 
    return (
        <div>
            <ul>
                <li className={classes.search_result_wrapper}>
                    <p className={classes.p_info}>{data.symbol}</p>
                    <p className={classes.p_info}>{data.name}</p>
                    <Button onClick={(e) => BtnOnClick(e)} size="large">ADD</Button>
                </li>
            </ul> 
        </div>
    )
}

export default Companycard

const useStyles = makeStyles({
    header: {
        width:'100%',
        height:'2rem',
        backgroundColor:'grey'
   
    },

    search_result_wrapper: {
        display:'flex'

    },

    p_info: {
        marginRight: '2rem'
    }

  });
