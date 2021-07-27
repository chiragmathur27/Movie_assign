import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { IconButton, CircularProgress, Box } from "@material-ui/core";
import red from "@material-ui/core/colors/red";

const IMG_API = "https://image.tmdb.org/t/p/w500";

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
    maxHeight: 450,
  },
  icon: {
    position: "absolute",
    right: "12px",
    top: "6px",
    zIndex: "999",
    height: "24px",
    width: "24px",
  },
  media: { height: "355px", width: "300px" },
  content: { display: "flex", flexDirection: "row", flex: "1 0 auto" },
});

export default function Card2({ title, poster_path, vote_average, id }) {
  const classes = useStyles();

  return (
    <Card className={classes.root} style={{ position: "absolute" }}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          alt={title}
          component="img"
          title={title}
          image={IMG_API + poster_path}
        />
        <CardContent className={classes.content}>
          <Box className={classes.content}>
            <Typography
              variant="h6"
              component="h2"
              style={{ display: "flex", flex: "1 1 " }}
            >
              {title}
            </Typography>
            <IconButton className={classes.icon}>
              <FavoriteIcon style={{ color: red[700] }} />
            </IconButton>
            <CircularProgress
              variant="determinate"
              value={vote_average * 10}
              color={vote_average > 6 ? "primary" : "secondary"}
            />
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
