import React from 'react'
import { makeStyles } from '@material-ui/core/styles';



const Header: React.FC = () => {
    const classes = useStyles();

    return (
        <div className={classes.header}>
        </div>
    )
}

export default Header

const useStyles = makeStyles({
    header: {
        width:'100%',
        height:'2rem',
        backgroundColor:'grey'
   
    },
  });
