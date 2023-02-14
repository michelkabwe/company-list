import React, { useState } from 'react'
import Button from '@mui/material/Button';
import { makeStyles } from '@material-ui/core/styles';



interface Props {
    item: Data;
    index: number;
    
}




interface Data {
    symbol: string;
    name: string;
    exchange: string;
    assetType: string;
    ipoDate: string;
    delistingDate: string | null;
    status: string;
  }
  
const Companycard:React.FC<Props>= ({item , index}) => {
    
    const classes = useStyles();
    const data = item as Data;
 
    return (
        <div>
            <ul>
                <li className={classes.search_result_wrapper}>
                    <p className={classes.p_info}>{data.symbol}</p>
                    <p className={classes.p_info}>{data.name}</p>
                    <Button size="large">ADD</Button>
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
