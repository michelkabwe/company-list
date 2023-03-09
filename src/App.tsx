import React, { useState, useEffect } from "react";
import axios from "axios";
import csv from "csvtojson";
import Header from "./components/Header";
import "./App.css";
import { StylesProvider } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import CompanyList from "./components/CompanyList";
import CompanyPortfolio from "./components/CompanyPortfolio";
import { ThemeProvider } from "@mui/material";
import { theme } from "./Styles/Styles";

type JsonData = {
  symbol: string;
  name: string;
  status: string;
};

const App: React.FC = () => {
  const classes = useStyles();
  const [jsonData, setJsonData] = useState<JsonData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState<JsonData[]>([]);
  const [selectedItem, setSelectedItem] = useState(jsonData);
  const [updatedList, setUpdatedList] = useState({});
  const [newListItems, setNewListItems] = useState<JsonData[]>([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setFilteredData(
      jsonData.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.symbol.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  const addItemToList = (index: number, e: React.MouseEvent<SVGElement>) => {
    const selected = jsonData[index];
    if (!selected) {
      console.log(`Item at index ${index} not found in the data`);
      return;
    }
    setSelectedItem([...selectedItem, selected]);
    setUpdatedList((prevState) => ({ ...prevState, updatedList: updatedList }));
    setNewListItems(
      [...newListItems, selected].sort((a, b) => a.name.localeCompare(b.name))
    ); // add the new item to the list
    //spread operator creates new array that includes the new selected, Sort() sorts the new array..passing a comparison function, that compares the name with localCompare(), that does a case sensesative comparison sorting alaphabetically ..Sorted value get sets to new value nelistitems..

    //setCountedItems(newListItems.length + 1); // update the count of items in the array
    //setCountedItems((prevCount) => prevCount + 1);
  };

  useEffect(() => {
    axios
      .get(
        "https://www.alphavantage.co/query?function=LISTING_STATUS&date=2014-07-10&state=delisted&apikey=LXM1FFLL6565JQ3C&datatype=json"
      )
      .then((response) => {
        const csvData = response.data;
        csv()
          .fromString(csvData)
          .then((data) => {
            setJsonData(data);
            setFilteredData(data);
          });
      });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <StylesProvider>
        <div className="App">
          <Header />
          <Container className={classes.box_container}>
            <Box className={classes.col_left}>
              <Box>
                <Box className={classes.search_results_wrapper}>
                  <Typography variant="h6" className={classes.heading}>
                    Search results{" "}
                  </Typography>

                  <Box className={classes.search_results}>
                    <TextField
                      className={classes.search_input}
                      label="Search..."
                      variant="outlined"
                      value={searchTerm}
                      onChange={handleSearch}
                    />

                    <CompanyList
                      jsonData={jsonData}
                      filteredData={filteredData}
                      handleClick={addItemToList}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box className={classes.col_right}>
              <Box className={classes.search_results_wrapper}>
                <Typography variant="h6">Your Portfolio</Typography>
                <Box className={classes.search_container_portfolio}>
                  <CompanyPortfolio newListItems={newListItems} />
                </Box>
              </Box>
            </Box>
          </Container>
        </div>
      </StylesProvider>
    </ThemeProvider>
  );
};
export default App;

const useStyles = makeStyles((theme) => ({
  header: {
    width: "100%",
    backgroundColor: "grey",
  },

  box_container: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
    },
  },
  col_left: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100vh",
    padding: "2rem",
  },

  col_right: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100vh",
    padding: "2rem",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },

  search_results_wrapper: {},

  /*search_wrapper: {
    [theme.breakpoints.down('md')]: {
      width:'75%',
      margin:'auto'
    }
    
  },*/

  search_results: {
    height: "500px",
    width: "100%",
    border: "solid 1px #3f50b5",
    borderRadius: "4.5px",
    overflow: "auto",
    [theme.breakpoints.down("md")]: {
      width: "75%",
      margin: "auto",
    },
  },
  search_input: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "2rem",
    paddingRight: "2rem",
    marginTop: "2rem",
    marginLeft: "2rem",
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#3f51b5",
      },
      "&:hover fieldset": {
        borderColor: "#3f51b5",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#3f51b5",
      },
      //.MuiInputLabel-formControl
    },
    [theme.breakpoints.down("md")]: {
      textAlign: "center",
    },
  },
  search_container_portfolio: {
    justifyContent: "center",
    alignItems: "center",
    height: "500px",
    width: "500px",
    border: "solid 1px #3f50b5",
    overflow: "auto",
    borderRadius: "4.5px",
    [theme.breakpoints.down("md")]: {
      marginTop: "0rem",
    },
  },

  heading: {
    [theme.breakpoints.down("md")]: {
      textAlign: "center",
    },
  },
}));
