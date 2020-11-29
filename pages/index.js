import React, { useState } from 'react';
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
import { createMuiTheme, makeStyles, StylesProvider, ThemeProvider } from '@material-ui/core/styles';
import axios from 'axios';
import Head from 'next/head';

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
});

const useStyles = makeStyles({
  display: "flex",
    flexDirection: "column",
    width: "100%",
    fontFamily: "Roboto!important",
    //border: "solid 1px #C4C4C4", OPTIONAL
    borderRadius: "6px",
    marginTop: "24px",
    marginBottom: "24px",
    paddingBottom: "12px",
});

function App () {
  const classes = useStyles();
  
  return (
    <>
    <Head>
      <title>IMDB Api Project</title>
      <link
          rel="preload"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&amp;display=swap"
          as="font"
          type="font/woff2"
      />
   </Head>
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container className={classes.container} fixed>
          <div className={classes.text}>
            selammm
          </div>
        </Container>
      </ThemeProvider>
    </StylesProvider>
    </>
  )
}

export default App
