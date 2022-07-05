import React, { useEffect } from 'react';
import { Typography, Button } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';

import useStyles from './styles';

const Pagination = ({ page, setPage, totalPages }) => {
  const classes = useStyles();

  const handlePrev = () => {
    if (page !== 1) { setPage((previous) => previous - 1); }
  };
  const handleNext = () => {
    if (page !== totalPages) { setPage((previous) => previous + 1); }
  };

  if (totalPages === 0) return null;

  // useEffect(() => () => {
  //   setPage(1);
  // }, []);

  return (
    <div className={classes.container}>
      {page !== 1 && <Button startIcon={<ArrowBack />} onClick={handlePrev} className={classes.button} variant="container" color="primary" type="button" />}
      <Typography variant="h4" className={classes.pageNumber}>{page}</Typography>
      {page !== totalPages && <Button endIcon={<ArrowForward />} onClick={handleNext} className={classes.button} variant="container" color="primary" type="button" />}
    </div>
  );
};

export default Pagination;
