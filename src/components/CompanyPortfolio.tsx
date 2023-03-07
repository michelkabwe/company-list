import React,{useState, useEffect} from 'react'
import axios from 'axios'
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

type CompanyPortfolio = DataProps & Data

interface Props {
  newListItems: string[];
}

const CompanyPortfolio: React.FC<Props> = ({ newListItems }) => {
  const classes = useStyles()

    const [items, setItems] = useState<string[]>(newListItems);

    const handleDelete = (index:number) => {
      const updatedList = [...items
      ]; // create a new copy of the original array
      updatedList.splice(index,1); // remove one element at the specified index
      setItems(updatedList);
      console.log(updatedList,'ul');


    }

    
    useEffect(() => {
      setItems(newListItems);
      
    }, [newListItems]);
    return (
      <div>
          <ul>
            {items.map((item , index) => ( 
               <li className={classes.portfolio_wrapper} key={index}>
               <p className={classes.p_info}>{item}</p>
               <p onClick={() => handleDelete(index)} className={classes.delete_btn}>❌</p>
               </li>
            ))}
             
                  
        
          </ul>
      </div>
    )
}

export default CompanyPortfolio

const useStyles = makeStyles({

  portfolio_wrapper: {
    display: 'flex',
    listStyleType:'none'
  },

  p_info: {
    marginRight:'2rem',
    paddingRight:'2rem'
  },

  delete_btn: {
    cursor:'pointer',
  
  }




});
