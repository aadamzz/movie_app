import React, { useState } from 'react';
import { Box, CircularProgress, useMediaQuery, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { MoviesList, Pagination, FeaturedMovie } from '../index';

import { useGetMoviesQuery } from '../../services/TMDB';

const Movies = () => {
  const [page, setPage] = useState(1);
  const { genreIdOrCategoryName, searchQuery } = useSelector((state) => state.currentGenreOrCategory);
  const { data, error, isFetching } = useGetMoviesQuery({ genreIdOrCategoryName, page, searchQuery });
  const lg = useMediaQuery((theme) => theme.breakpoints.only('lg'));

  const numberOfMovies = lg ? 17 : 19;

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  if (!data.results.length) {
    return (
      <Box display="flex" alignItems="center" mt="20px">
        <Typography variant="h4">No movies match that name.
          <br />
          Please search for somethins else.
        </Typography>

      </Box>
    );
  }

  if (error) return 'An error has occured';

  return (
    <div>
      <FeaturedMovie movie={data.results[0]} />
      <Pagination page={page} setPage={setPage} totalPages={data.total_pages} />
      <MoviesList movies={data} numberOfMovies={numberOfMovies} excludeFirst />
      <Pagination page={page} setPage={setPage} totalPages={data.total_pages} />
    </div>
  );
};

export default Movies;
