import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import { makeStyles } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles({
  question: {
    marginTop: 10,
  },
  radio: {
    marginBottom: 10,
    display: "block",
  },
  info: {
    textDecoration: "italics"
  },
  counter: {
    marginTop: 30
  }
});

let choice = "";

export default function Medium(props) {
  const classes = useStyles();

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "60vh" }}
    >
      <Fade in={true} timeout={1000}>
        <Typography variant="body2" className={classes.info}>
          Just a few questions to get us going..
        </Typography>
        </Fade>

        <Fade in={true} timeout={1000} style={{ transitionDelay: '500ms' }}>
      <Typography variant="h6" gutterBottom className={classes.question}>
        What is your preferred medium?
      </Typography>
      </Fade>
      <Fade in={true} timeout={1000} style={{ transitionDelay: '500ms' }}>
      <FormControl className={classes.radio}>
        <RadioGroup onChange={(event) => (choice = event.target.value)} row>
          <FormControlLabel
            value="movie"
            control={<Radio color="primary" />}
            label="Movies"
          />
          <FormControlLabel
            value="tv"
            control={<Radio color="primary" />}
            label="TV Series"
          />
        </RadioGroup>
      </FormControl>
      </Fade>
      <Fade in={true} timeout={1000} style={{ transitionDelay: '500ms' }}>
      <Button
        // className={classes.btn}
        type="submit"
        variant="contained"
        color="primary"
        onClick={() => props.handleMedium(choice)}
        endIcon={<KeyboardArrowRightIcon />}
      >
        Next
      </Button>
      </Fade>
      <Fade in={true} timeout={1000} style={{ transitionDelay: '500ms' }}>
      <Typography variant="body2" className={classes.counter}>
          1/3
        </Typography>
        </Fade>
    </Grid>
  );
}
