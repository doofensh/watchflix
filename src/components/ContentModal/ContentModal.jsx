import * as React from 'react';
import axios from 'axios';
import './ContentModal.css';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import { YouTube } from '@material-ui/icons';
import Backdrop from '@mui/material/Backdrop';
import { makeStyles } from '@material-ui/core/styles';
import { img_500, unavailable, unavailableLandscape } from '../../conflg/config';
// import Carousel from './Carousel/Carousel';
// import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: "90%",
    height: "80%",
    color: "gold",
    borderRadius: 10,
    // backgroundColor: "#39445a",
    backgroundColor: "#2C3A47",
    border: "1px solid #282c34",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 1, 3),
  }
}))

export default function ContentModal({ children, media_type, id }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState();
  const [video, setVideo] = useState();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchData = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}?api_key=658a147237a83583b2f1a3512e81784d&language=en-US`);

    setContent(data);
  };
  const fetchVideo = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=658a147237a83583b2f1a3512e81784d&language=en-US`);

    // console.log(data)
    // console.log(data.results[0])
    // console.log(data.results[0]?.key);
    setVideo(data.results[0]?.key);
  }

  useEffect(() => {
    fetchData();
    fetchVideo();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div
        className='media'
        style={{ cursor: "pointer" }}
        color="inherit"
        onClick={handleOpen}
      >
        {children}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open} appear={open}>
          {content && (
            <div className={classes.paper}>
              <div className='ContentModal'>
                <img
                  src={content.poster_path ? `${img_500}/${content.poster_path}` : unavailable}
                  alt={content.name || content.title}
                  className='ContentModal_portrait'
                />
                <img
                  src={content.backdrop_path ? `${img_500}/${content.backdrop_path}` : unavailableLandscape}
                  alt={content.name || content.title}
                  className='ContentModal_landscape'
                />
                <div className='ContentModal_about'>
                  <span className='ContentModal_title'>
                    {content.name || content.title}(
                    {(
                      content.first_air_date ||
                      content.release_date ||
                      "-----"
                    ).substring(0, 4)}
                    )
                  </span>
                  {content.tagline && (
                    <i
                      className='tagline'
                      style={{ fontSize: '1.5vw' }}
                    >
                      {content.tagline}
                    </i>
                  )}
                  <span className='ContentModal_description'>
                    {content.overview}
                  </span>
                  <div>
                    {/* <Carousel media_type={media_type} id={id}/> */}
                  </div>

                  <Button
                    variant="contained"
                    starticon={<YouTube />}
                    color="primary"
                    target="__new"
                    href={`https://www.youtube.com/watch?v=${video}`}
                  >
                    Watch the Trailer
                  </Button>

                </div>
              </div>
            </div>
          )}
        </Fade>
      </Modal>
    </>
  );
}
