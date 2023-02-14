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


interface Data {
  symbol: string;
  name: string;
  exchange: string;
  assetType: string;
  ipoDate: string;
  delistingDate: string | null;
  status: string;
}


const App: React.FC= () =>  {
  const classes = useStyles();
  const [jsonData , setJsonData ] = useState<Data[]>([])
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState<Data[]>([]);
 

  const myData = {
    jsonData: jsonData,
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setFilteredData(
        jsonData.filter((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) 
        )

    );


}
  


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
                <Box className={classes.search_container}>
                  <TextField className={classes.search_input}
                  label="Search..."
                  variant="outlined"
                  value={searchTerm}
                  onChange={handleSearch}
                  
                  />
                  <Box className={classes.search_results_wrapper}>
                      <Typography variant="h6">
                          Search results
                       </Typography> 
                       <Box className={classes.search_results}>
                       <CompanyList {...myData} filteredData={filteredData}/>
                       </Box>
            
                  </Box>
                </Box>
              </Box>
              <Box className={classes.col}>
                <Container className={classes.box_container}>
                  <Typography variant="h6">Your Portfolio</Typography>
                  <CompanyPortfolio />

                </Container>

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

  search_container: {},
  search_results_wrapper: {},
  search_results: {
    height:'100px',
    width:'500px',
    border:'solid 1px',
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
});

