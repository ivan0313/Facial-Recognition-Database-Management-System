import { Grid, Paper, Typography, Zoom } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import ResizeObserver from 'react-resize-observer';
import FaceCards from "../components/FaceCards";
import ImageAnnotator from "../components/ImageAnnotator";


const MIN_GRID_HEIGHT = 400;


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    justify: "center"
  },
  imgWrapperGrid: {
    height: '100%',
  },
  imageWrapper: {
    padding: theme.spacing(2),
  },
  result: {
    padding: theme.spacing(2),
    height: "100%",
  },
  scroll: {
    overflowY: 'scroll',
  },
}));


export default function ImageAnalytics({image, data}) {
  const classes = useStyles();
  const [imgGridHeight, setImgGridHeight] = useState(0);

  const updateImgGridHeight = (gridHeight) => {
    const height = window.innerWidth >= 960 ? (
      Math.max(MIN_GRID_HEIGHT, gridHeight)
    ) : '100%';
    setImgGridHeight(height);
  }

  return (
    <div>
      <Grid container spacing={4} className={classes.root}>
        <Zoom in >
          <Grid item xs={12} md={4} className={classes.imgWrapperGrid}>
            <ResizeObserver
              onReflow={(rect) => updateImgGridHeight(rect.height)}
            />
            <Paper className={classes.imageWrapper}>
              <ImageAnnotator src={image} faceLocations={data.map(face => face.location)}/>
            </Paper>
          </Grid>
        </Zoom>
        <Zoom in style={{transitionDelay: '10ms'}}>
        <Grid 
          item xs={12} 
          md={4} 
          style={{maxHeight: imgGridHeight}}
        >
          <Paper className={classes.result} >
            {`${data.length} face${data.length > 1? 's':''} found`}
            <FaceCards 
              img={image}
              data={data}
            />
          </Paper>
        </Grid>
        </Zoom>
        <Zoom in style={{transitionDelay: '20ms'}}>
        <Grid item xs={12} md={4}>
          <Paper className={classes.result}>
            <Typography>
              Some Analytical results
            </Typography>
          </Paper>
        </Grid>
        </Zoom>
      </Grid>
    </div>
  )
}
