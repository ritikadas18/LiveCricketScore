import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import MyCard from "./components/MyCard";
import { getMatches } from "./api/Api";
import { Container, Grid, Typography } from "@material-ui/core";

function App() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    getMatches()
      .then((data) => {
        setMatches(data.matches);
        console.log(matches);
      })    
        .catch((error) => alert("could not load data"));
  
  }, []);

 

  return (
    <div className="App">
      <Navbar />
        <Typography variant="h3" style= {{marginTop: 20}}>Welcome To My Live Cricket Score App</Typography>
        <Grid container>
        <Grid item sm="2"></Grid>
          <Grid item sm="8">
              {matches.map((match) => (
                  <MyCard match="match" />
              
            ))}
          </Grid>
        </Grid>
    </div>
  );
}

export default App;