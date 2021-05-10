import React, { useState } from "react";


import { makeStyles } from "@material-ui/core/styles";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography,
} from "@material-ui/core";
import { getMatchDetail } from "../api/Api";
import { CardGiftcardSharp } from "@material-ui/icons";

const MyCard = ({ match }) => {
  const [detail, setDetail] = useState({});
  const [open, setOpen] = useState(false);

  const handleClick = (id) => {
    getMatchDetail(id)
    .then((data)=> { 
      console.log("Match data", data);
      setDetail(data);
      handleClickOpen();
    })
    .catch((error) => console.log(error));
  }

  const getMatchCard = () => (
    <div>
      <Card
        style={{
          background: match.matchStarted ? "#e2e2e2" : "",
          marginTop: 15,
        }}
      >
        <CardContent>
          <Grid container justify="center" alignItems="center" spacing={4}>
            <Grid item>
              <Typography variant="h5">{match["team-1"]}</Typography>
            </Grid>
            <Grid item>
              <img
                style={{ width: 85 }}
                src={require("../img/final.jpg")}
                alt=""/>
            </Grid>
            <Grid item>
              <Typography variant="h5">{match["team-2"]}</Typography>
            </Grid>
          </Grid>
        </CardContent>

        <CardActions>
          <Grid container justify="center">
            <Button
              onClick={() => {
                handleClick(match.unique_id);
              }}
              variant="contained"
              color="primary"
            >
              Show Detail
            </Button>
            <Button
              style={{ marginLeft: 5 }}
              variant="contained"
              color="primary"
            >
              Starting time {new Date(match.dateTimeGMT).toLocaleString()}
            </Button>
          </Grid>
        </CardActions>
      </Card>
    </div>
  );

  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getDailog = () => { 
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">

        <DialogTitle id="alert-dialog-title">{"Match Detail..."}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Typography>{detail.stat}</Typography>
            <Typography>
              Match
              <span style={{ fontStyle: "italic", fontWeight: "bold" }}>
                {detail.matchStarted ? "Started" : "Still not started"}{" "}
              </span>
            </Typography>
            <Typography>
              Score
              <span style={{ fontStyle: "italic", fontWeight: "bold" }}>
                {" "}
                {detail.score}
              </span>
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
  };

  return
    <React.Fragment>
      {getMatchCard()}
      {getDailog()}
    </React.Fragment>
};


export default MyCard;