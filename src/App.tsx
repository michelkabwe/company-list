import React, { useState, useEffect} from 'react';
import axios from 'axios'
import csv from 'csvtojson';
import Header from './components/Header'
import './App.css'
import { StylesProvider } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CompanyList from './components/CompanyList'
import CompanyPortfolio from './components/CompanyPortfolio'


type JsonData = {
  symbol: string;
  name: string;
  status: string;
}

/*
interface NewItemProps  {
  items: JsonData
 
};*/






const App: React.FC=() =>  {
  const classes = useStyles();
  const [jsonData , setJsonData] = useState<JsonData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState<JsonData[]>([]);
  const [selectedItem, setSelectedItem] = useState(jsonData);
  const [updatedList, setUpdatedList] = useState({});
  const [newListItems, setNewListItems] = useState<string[]>([]);

    console.log(jsonData)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setFilteredData(
        jsonData.filter((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) 
        )
    );
}

      const addItemToList = (index: number, e: React.MouseEvent<HTMLButtonElement>) => {
        const selected = jsonData[index];
        if (!selected) {
          console.log(`Item at index ${index} not found in the data`);
          return;
        }
        setSelectedItem([...selectedItem, selected]);
        setUpdatedList((prevState) => ({ ...prevState, updatedList: updatedList })); 
        setNewListItems([...newListItems, selected.symbol]); // add the new item to the list
        console.log(updatedList,'updatedlist')
        const arr = { ...updatedList, newListItems };
        console.log(newListItems,'NLI')

        console.log(selectedItem,' selectedItem')
        console.log(selected, ' selected')

        //for (const newListItem in newList) {
        //}

      };



  useEffect(() => {
    axios.get('https://www.alphavantage.co/query?function=LISTING_STATUS&date=2014-07-10&state=delisted&apikey=LXM1FFLL6565JQ3C&datatype=json')
        .then(response => {
           const csvData = response.data;
            csv()
              .fromString(csvData)
              .then((data) => {
                setJsonData(data)
                setFilteredData(data)
            })    
    })         

}, []);




  return (
    <StylesProvider>
          <div className="App">
            <Header />
            <Container className={classes.box_container}>
              <Box className={classes.col}>
                <Box>
                  <TextField className={classes.search_input}
                  label="Search..."
                  variant="outlined"
                  value={searchTerm}
                  onChange={handleSearch}
                  
                  />
                  <Box className={classes.search_results_wrapper}>
                      <Typography variant="h6">Search results </Typography> 
                       <Box className={classes.search_results}>
                       <CompanyList 
                            jsonData={jsonData} 
                              filteredData={filteredData}
                                    handleClick={addItemToList} />
                       </Box>
            
                  </Box>
                </Box>
              </Box>
              <Box className={classes.col}>
                <Box className={classes.search_results_wrapper}>
                  <Typography variant="h6">Your Portfolio</Typography>
                      <Box className={classes.search_container_portfolio}>
                  <CompanyPortfolio  newListItems={newListItems}/>
                </Box>
                </Box>
              </Box>
            </Container> 
          </div>
    </StylesProvider>
  )
}
export default App;

const useStyles = makeStyles({
  header: {
      width:'100%',
      backgroundColor:'grey'
 
  },

  box_container: {
    display:'flex',
    width:'100%',
    justifyContent:'center',
    alignItems:'center'
  },
  col: {
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    width:'100%',
    height:'100vh'

  },

  search_results_wrapper: {},
  search_results: {
    height:'100px',
    width:'500px',
    border:'solid 1px #3f50b5',
    borderRadius: '4.5px',
    overflow:'auto'
  },
  search_input: {
    width: '100%',
    margin: '20px 0',
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#3f51b5',
      },
      '&:hover fieldset': {
        borderColor: '#3f51b5',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#3f51b5',
      },
    },
  },
  search_container_portfolio: {
    marginTop:'6rem',
    justifyContent:'center',
    alignItems:'center',
    height:'100px',
    width:'500px',
    border:'solid 1px #3f50b5',
    overflow:'auto',
    borderRadius: '4.5px',


    
  },

});

