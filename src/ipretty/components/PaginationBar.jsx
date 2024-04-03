import React, {  } from 'react';
import {makeStyles, Grid} from '@material-ui/core';
import Pagination from "react-js-pagination";
import IconFirstPage from "../../public/icons/ic_chevron_left_double.png";
import IconLastPage from "../../public/icons/ic_chevron_right_double.png";
import IconPrevPage from "../../public/icons/ic_chevron_left_single.png";
import IconNextPage from "../../public/icons/ic_chevron_right_single.png";

import IconImage from "./IconImage";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    [theme.breakpoints.down("xs")]: {
      marginRight: '50px'
    },
    justifyContent: 'center',
    "& .pagination" :{
      display: 'flex',
    }
  },
  pagingItem: {
    margin: 5,
    display: 'flex',
    justifyContent: 'center',
    cursor: 'pointer',
    height: '30px',
    width: '30px',
    alignItems: 'center',
     '&:hover':{
       backgroundColor: theme.palette.primary.colorButton,
       color: theme.palette.background.paper,
       borderRadius: '50%',

       '& a': {
         color: theme.palette.background.paper,
      }
     }
  },
  pagingActive: {
   backgroundColor: theme.palette.primary.colorButton,
    color: theme.palette.background.paper,
   borderRadius: '50%',
   '& a': {
     color: theme.palette.background.paper,
   }
  },
  linkClass: {
    color: theme.palette.primary.colorButton,
    textDecoration: 'none',
    display: 'flex',
  },
  linkFirsthandLast: {
    "& > div": {
      display: 'flex',
    }
  },
  single: {
    width: '7px',
    display: 'flex',
    alignItems: 'center',
    height: '100%'
  },
  // iconPagi: {
  //   display: 'flex',
  //   alignItems: 'center',
  //   height: '100%',
  //   width: '30px',
  // }
}))

function PaginationBar (props) {
    const classes = useStyles();
    const {currentPage, totalItemsCount, handlePageChange, check} = props;
    return (
        <Grid className={classes.root}>
        <Pagination
            activePage={currentPage}
            itemsCountPerPage={check === 'myCourse' ? 8 : 10}
            totalItemsCount={totalItemsCount}
            pageRangeDisplayed={8}
            onChange={handlePageChange}
            itemClass={classes.pagingItem}
            activeClass={classes.pagingActive}
            linkClass={classes.linkClass}
            linkClassLast={classes.linkFirsthandLast}
            linkClassFirst={classes.linkFirsthandLast}
            firstPageText={<IconImage isPagi srcIcon={IconFirstPage}/>}
            lastPageText={<IconImage isPagi srcIcon={IconLastPage}/>}
            prevPageText={<IconImage className={classes.single} isPagi srcIcon={IconPrevPage}/>}
            nextPageText={<IconImage className={classes.single} isPagi srcIcon={IconNextPage}/>}
        />
        </Grid>
    )
}

export default PaginationBar;
