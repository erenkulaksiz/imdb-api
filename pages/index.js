import React, { useState, useEffect, forceUpdate } from 'react';
import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
import { Container, 
  Button, 
  CircularProgress, 
  Backdrop, 
  TextField,
  Link,
  Avatar,
  Chip,
  Divider,
  Paper,
  colors,
  CssBaseline,
  Card,
  ThemeProvider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import { Skeleton, Rating } from '@material-ui/lab'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus, faArrowRight, faSyncAlt } from '@fortawesome/free-solid-svg-icons'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#0486FF"
    },
    secondary: {
      main: "#BB0000"
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
    marginBottom: "24px",
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
  movieInputBtn: {
    marginLeft: "8px",
  },
  headerDataChips: {
    display: "flex",
    width: "100%",
  },
  headerDataChip: {
    marginLeft: "6px",
  },
  headerMovieInfo: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "24px",
  },
  headerMovieList: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "24px",
    width: "100%",
  },
  headerMovieListTitle: {
    fontSize: "18px",
    fontWeight: "500",
  },
  program: {
    display: "flex",
    width: "100%",
    marginTop: "24px",
    flexWrap: "wrap",
  },
  mediaCard: {
    display: "flex",
    flexDirection: "column",
    padding: "12px",
    margin: "12px",
    minWidth: "192px",
  },
  cardHeader: {
    display: "flex", // Title çok büyükse ortala.
    justifyContent: "center",
    alignItems: "center", 
  },
  cardMedia: {
    height: "258px",
    width: "184px",
  },
  cardTitle: {
    fontSize: "24px",
    fontWeight: "500",
    marginTop: "8px",
  },
  cardRating: {
    display: "flex",
    alignItems: "center",
    marginTop: "8px",
    fontSize: "18px",
    fontWeight: "500",
    width: "100%",
  },
  cardRatingSkeleton: {
    marginTop: "12px",
    width: "100%",
  },
  cardChip: {
    marginLeft: "6px",
    fontSize: "16px",
    fontWeight: "650",
  },
  cardChipTime: {
    fontSize: "12px",
  },
  cardLink: {
    display: "flex",
    marginTop: "8px",
    width: "100%",
  },
  cardLinkSkeleton: {
    width: "100%",
  },
  cardLinkLeft: {
    display: "flex",
    flex: "50%",
  },
  cardLinkRight: {
    display: "flex",
    flex: "50%",
    justifyContent: "flex-end",
  },
  infoTitle: {
    width: "100%",
    fontSize: "18px",
    fontWeight: "500",
  },
}))

const SkeletonLoader = () => {
  const classes = useStyles()
  return (
    <Card className={classes.mediaCard}>
      <div className={classes.cardHeader}>
        <Skeleton variant="rect" width={184} height={258} animation="wave"/>
      </div>
      <div className={classes.cardTitle}>
        <Skeleton variant="text" animation="wave"/>
      </div>
      <div className={classes.cardRatingSkeleton}>
        <Skeleton variant="text" animation="wave"/>
      </div>
      <div className={classes.cardLinkSkeleton}>
        <Skeleton variant="text" animation="wave"/>
      </div>
    </Card>
  );
}

const Element = ({imgSrc, title, rating, duration, imdblink }) => {
  const classes = useStyles()
  return (
    <Card className={classes.mediaCard}>
      <div className={classes.cardHeader}>
        <img src={imgSrc} className={classes.cardMedia}/>
      </div>
      <div className={classes.cardTitle}>
        {title}
      </div>
      <div className={classes.cardRating}>
        <Rating name="read-only" value={rating} readOnly />
        <Chip label={rating} className={classes.cardChip} />
      </div>
      <div className={classes.cardLink}>
        <div className={classes.cardLinkLeft}>
          <Chip label={duration} className={classes.cardChipTime} />
        </div>
        <div className={classes.cardLinkRight}>
          <Button color="primary" target="_blank" href={"https://www.imdb.com/title/"+imdblink}>IMDB<FontAwesomeIcon icon={faArrowRight} style={{marginLeft: "8px"}}/></Button>
        </div>
      </div>
    </Card>
  );
}

const App = () => {
  const classes = useStyles()

  const [formMovieID, setFormMovieID] = useState(null);
  const [movieList, setMovieList] = useState(["tt4574334", "tt5290382", "tt0371746"]);
  const [movieData, setMovieData] = useState(null);
  const [isLoaded, setLoaded] = useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  let currResponse = {};

  const handleMovieSubmit = (event) => {
    event.preventDefault();
    console.log("form: "+formMovieID);
    if(!formMovieID || formMovieID == ""){
      setDialogOpen(true);
      return;
    }
    let list = movieList;
    list.push(formMovieID);
    setMovieList(list);
    handleRefresh();
  }

  const fetchData = (movieID) => {
    return new Promise(resolve => {
      axios({
        "method":"GET",
        "url":"https://imdb-internet-movie-database-unofficial.p.rapidapi.com/film/"+movieID,
        "headers":{
          "content-type":"application/octet-stream",
          "x-rapidapi-host":"imdb-internet-movie-database-unofficial.p.rapidapi.com",
          "x-rapidapi-key":"2ffec75a0cmsh6d416e1011b4ac0p103487jsn3c217ec29241",
          "useQueryString":true
        }
        })
        .then((response)=>{
          console.log(response)
          if(response.status == '200'){
            currResponse = response;
            resolve(true);
          }
        })
        .catch((error)=>{
          console.log(error)
        })
    });
  }

  const handleRefresh = async () => {
    let movieListData = [];
    setLoaded(false);
    for(let element of movieList){
      await fetchData(element);
      movieListData.push(currResponse);
    }
    setMovieData(movieListData);
    setLoaded(true);
  }

  const handleMovieRemove = (event, index) => {
    movieList.splice(index, 1);
    handleRefresh();
  }

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  useEffect(() => {
    handleRefresh();
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container className={classes.container} fixed>
        <div className={classes.wrapper}>
          <div className={classes.header}>
            <div className={classes.headerTitle}>
              IMDB API Project
            </div>
            <div className={classes.headerDesc}>
              This script uses Axios to fetch data, React & MUI to display it.
            </div>
            <div className={classes.headerInputs}>
              <Button variant="contained" color="primary" onClick={handleRefresh}>
                <FontAwesomeIcon icon={faSyncAlt} style={{marginRight: "8px"}}/> Refresh 
              </Button>
              <div className={classes.headerDataChips}>
                <Chip label={"Film Count: "+(movieList.length)} className={classes.headerDataChip} />
              </div>
            </div>
          </div>
          <div className={classes.headerMovieInfo}>
            <div className={classes.infoTitle}>
              How to add a movie?
            </div>
            <div className={classes.infoDesc}>
              Enter a film name to add movie form or enter an id of the film.
              <br/>
              You can go to <Link href="http://www.imdb.com" target="_blank">IMDB.COM</Link> then find a movie, you can find movie id from the url in movie. Example, https://www.imdb.com/title/tt0816692/ this movie's id is tt0816692 
            </div>
          </div>
          <div className={classes.headerMovieList}>
            <div className={classes.headerMovieListTitle}>
              Movies list
            </div>
            <List>
              
              {movieList.map((movieID, index) => (<React.Fragment>
                <ListItem button>
                <ListItemText><strong>{isLoaded ? movieData[index].data.title : movieID}</strong></ListItemText> 
                <Button variant="contained" color="secondary" className={classes.movieInputBtn} onClick={e => handleMovieRemove(e, index)}>
                  <FontAwesomeIcon icon={faMinus} style={{marginRight: "8px"}}/> Remove 
                </Button>
                </ListItem>
              </React.Fragment>))}

              <ListItem button> 
                <form onSubmit={handleMovieSubmit}>
                  <TextField
                    label="Add Movie"
                    id="outlined-size-normal"
                    variant="outlined"
                    size="small"
                    placeholder="e.g. Gravity"
                    onChange={event => setFormMovieID(event.target.value)}
                  />
                  <Button type="submit" variant="contained" color="primary" className={classes.movieInputBtn}>
                    <FontAwesomeIcon icon={faPlus} style={{marginRight: "8px"}}/> Add 
                  </Button>
                </form>
              </ListItem>
            </List>
          </div>
          <Divider/>
          <div className={classes.program}>

            {isLoaded ? movieData.map((movie) => (<Element 
              imgSrc={movie.data.poster}
              title={movie.data.title}
              rating={movie.data.rating}
              duration={movie.data.length}
              imdblink={movie.data.id}
            />)) : movieList.map((movie) => (<SkeletonLoader />))}

          </div>
        </div>

        <Dialog
          open={dialogOpen}
          onClose={handleDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Error"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Please enter a valid movie name or id.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="primary" autoFocus>
              Okay
            </Button>
          </DialogActions>
        </Dialog>

      </Container>
    </ThemeProvider>
  )
}

export default App