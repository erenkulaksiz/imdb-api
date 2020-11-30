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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#42BBBD"
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
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
    padding: "24px",
    border: "solid 1px #C4C4C4",
    borderRadius: "6px",
    marginTop: "24px",
  },
  header: {
    display: "flex",
    flexDirection: "column",
    width:  "100%",
  },
  headerTitle: {
    width: "100%",
    fontSize: "28px",
    fontWeight: "500",
  },
  headerDesc: {
    width: "100%",
    fontSize: "16px",
    color: "#535353",
  },
  headerInputs: {
    display: "flex",
    marginTop: "24px",
    marginBottom: "24px",
  },
  headerDataChips: {
    display: "flex",
    width: "100%",
  },
  headerDataChip: {
    marginLeft: "6px",
  },
  program: {
    display: "flex",
    width: "100%",
    marginTop: "24px",
  },
}))

const App = () => {
  const classes = useStyles()

  return (
    <>
      <CssBaseline />
      <Container className={classes.container} fixed>
        <div className={classes.wrapper}>
          <div className={classes.header}>
            <div className={classes.headerTitle}>
              IMDB API Project
            </div>
            <div className={classes.headerDesc}>
              This script uses IMDB API to fetch data and display it.
            </div>
            <div className={classes.headerInputs}>
              <Button variant="contained" color="primary">
                Reload
              </Button>
              <div className={classes.headerDataChips}>
                <Chip label="Film Count: 24" className={classes.headerDataChip} />
                <Chip label="Success Fetch: 24" className={classes.headerDataChip} />
              </div>
            </div>
          </div>
          <Divider/>
          <div className={classes.program}>
          
            <div className='card'>
              <div className='card__media'>
                <div className='card__media--placeholder'></div>
              </div>
              <div className='card__title'>
                <div className='card__title--placeholder'></div>
              </div>
              <div className='card__rating'>
                <div className='card__title--placeholder'></div>
              </div>
            </div>

            <a href='#' onClick={() => {alert("onclick test")}}>
              <div className='card__new'>
                <div className='card__new--icon'>
                  <FontAwesomeIcon icon={faPlus} />
                  <div className='card__new--title'>
                    Add New Movie
                  </div>
                </div>
              </div>
            </a>
            

          </div>
        </div>
      </Container>
    </>
  )
}

export default App