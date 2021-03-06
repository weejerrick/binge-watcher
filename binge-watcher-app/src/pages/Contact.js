import React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Helmet } from "react-helmet";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";

// const useStyles = makeStyles({
//   btn: {
//     marginTop: 25,
//   },
// });

const useStyles = makeStyles((theme) => ({
  root: {
    "& > svg": {
      margin: theme.spacing(1),
    },
  },
  btn: {
    marginTop: 25,
  },
  social: {
    marginLeft: 15,
  },
}));

export default function Contact() {
  const classes = useStyles();

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Binge Watcher - Contact</title>
      </Helmet>

      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "50vh" }}
      >
        <Typography variant="h6" gutterBottom>
          Made with love in Singapore.
        </Typography>
        <Typography>
          This site is created using React and Material-UI.
          <br />
        </Typography>
        <Typography>
          Film and TV data by{" "}
          {
            <a
              href="https://www.themoviedb.org/"
              target="_blank"
              style={{ color: "black" }}
              rel="noopener noreferrer"
            >
              TMDB API
            </a>
          }
          . Favicon by{" "}
          {
            <a
              href="https://www.flaticon.com/authors/iconixar"
              target="_blank"
              style={{ color: "black" }}
              rel="noopener noreferrer"
            >
              iconixar
            </a>
          }
          .
        </Typography>
        <div className={classes.btn}>
          <Button
            // className={classes.btn}
            href="https://www.linkedin.com/in/wee-jerrick/"
            target="_blank"
            type="submit"
            variant="contained"
            color="primary"
            startIcon={<LinkedInIcon />}
            style={{textTransform: 'none'}}
          >
            LinkedIn
          </Button>
          <Button
            className={classes.social}
            href="https://github.com/weejerrick"
            target="_blank"
            type="submit"
            variant="contained"
            color="primary"
            startIcon={<GitHubIcon />}
            style={{textTransform: 'none'}}
          >
            GitHub
          </Button>
        </div>
      </Grid>
    </>
  );
}
