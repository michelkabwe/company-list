import React from 'react'
import { makeStyles } from '@material-ui/core/styles';


type Props = {
  newListItems: string[];

}

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


  const CompanyPortfolio:React.FC<Props>= ({newListItems}) => {
    const classes = useStyles()
    return (
      <div>
          <ul>
              <li className={classes.portfolio_wrapper}>
                <p className={classes.p_info}>{newListItems}</p>
                  
            </li>
          </ul>
      </div>
    )
}

export default CompanyPortfolio

const useStyles = makeStyles({

  portfolio_wrapper: {
  },

  p_info: {
    marginRight:'2rem'
  }



});
