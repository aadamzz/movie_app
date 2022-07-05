import React, { useState } from 'react';
import { Typography, Button, ButtonGroup, Grid, Box, CircularProgress } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useGetActorsDetailsQuery, useGetMoviesByActorIdQuery } from '../../services/TMDB';
import useStyles from './styles';
import { MoviesList, Pagination } from '..';

const Actors = () => {
  const { id } = useParams();
  const history = useHistory();
  const { data, isFetching, error } = useGetActorsDetailsQuery(id);
  const classes = useStyles();
  const [page, setPage] = useState(1);

  const { data: movies } = useGetMoviesByActorIdQuery({ id, page });

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress size="5rem" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Button startIcon={<ArrowBack />} onClick={() => history.goBack()} color="primary">
          Go back
        </Button>
      </Box>
    );
  }

  return (
    <>
      <Grid container spacing={3}>
        <Grid item lg={5} xl={4}>
          <img
            className={classes.image}
            src={`https://image.tmdb.org/t/p/w780/${data?.profile_path}`}
            alt={data?.name}
          />
        </Grid>
        <Grid item lg={7} xl={8} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'center', flexDirection: 'column' }}>
          <Typography variant="h2" gutterBottom>
            {data?.name}
          </Typography>
          <Typography variant="h5" gutterBottom>
            Born: {new Date(data?.birthday).toDateString()}
          </Typography>
          <Typography variant="body2" gutterBottom align="justify" paragraph>
            {data?.biography || 'Sorry, no biography yet...'}
          </Typography>
          <Box marginTop="2rem" display="flex" justifyContent="space-around">
            <Button variant="contained" color="primary" target="_blank" href={`https://www.imdb.com/name/${data?.imdb_id}`}>
              IMDB
            </Button>
            <Button startIcon={<ArrowBack />} onClick={() => history.goBack()} color="primary">
              Back
            </Button>
          </Box>
        </Grid>
      </Grid>
      {movies && (
      <Box margin="2rem 0">
        <Typography variant="h2" gutterBottom align="center">
          Movies
        </Typography>
        <Pagination page={page} setPage={setPage} totalPages={movies?.total_pages} />
        <MoviesList movies={movies} numberOfMovies={12} />
        <Pagination page={page} setPage={setPage} totalPages={movies?.total_pages} />
      </Box>
      )}
    </>
  );
};

export default Actors;
