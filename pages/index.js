import React, { useState } from 'react';
import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
import { Container, 
  Button, 
  CircularProgress, 
  Backdrop, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogContentText,
  TextField,
  Link,
  Avatar,
  Chip,
  Divider,
  Paper,
  colors,
  CssBaseline
} from '@material-ui/core';
import axios from 'axios';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#0486FF"
    },
    secondary: {
      main: "#19857b"
    },
    error: {
      main: colors.red.A400
    },
  },
  typography: {
    "fontFamily": `"Roboto", "Helvetica", "Arial", sans-serif`,
    "fontSize": 14,
    "fontWeightLight": 300,
    "fontWeightRegular": 400,
    "fontWeightMedium": 500
   }
})

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    fontFamily: "Roboto",
    border: "solid 1px #C4C4C4",
  }
}))

const App = () => {
  const classes = useStyles()

  return (
    <>
      <CssBaseline />
      <Container className={classes.container} fixed>
        <div>does this work?</div>
      </Container>
    </>
  )
}

export default App