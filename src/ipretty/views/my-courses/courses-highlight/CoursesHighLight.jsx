import React, {  } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import Carousel from 'react-elastic-carousel'
import CourseHighlightItem from './CourseHighlightItem';

const useStyles = makeStyles(theme => ({
    categories: {
        paddingTop: '10px',
        display: 'flex',
        justifyContent: 'flex-start'
    },
    categoryStart: {
        marginLeft: '10px',
        paddingBottom: '30px',
    },
    categoryItem: {
        // marginLeft: '10px',
        paddingBottom: '30px',
        cursor: 'pointer',
        // marginLeft: '10px',
        marginRight: '10px'
    },
    layoutCenter: {
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between'
    },
    categoryItemAfterFour: {
        display: 'flex',
        flexWrap: 'wrap',
        // marginLeft: '-16px',
        // marginRight: '-16px',
        // padding: '0px 0px 50px 50px',
        [theme.breakpoints.up('lg')]: {
            // padding: '0px 70px 50px 50px'
        },
        [theme.breakpoints.down('md')]: {
            // padding: '0px 70px 50px 50px'
        },
        [theme.breakpoints.down('sm')]: {
            // padding: '0px 70px 50px 50px'
        },
        [theme.breakpoints.down('sm')]: {
            // padding: '0px 0px 50px 50px'
        },
        "& .category__item--wrapper": {
            width: '100%',
            [theme.breakpoints.down('md')]: {

            },
            [theme.breakpoints.down('sm')]: {
                maxWidth: '50%',
                minWidth: '50%',
            },
            [theme.breakpoints.down('xs')]: {
                maxWidth: '100%',
                minWidth: '100%',
                paddingTop: '25px',//fix pading khoa hoc 87
            },
            flex: 1,
            padding: '0 16px',
            maxWidth: '25%',
            minWidth: '25%',
            // marginBottom: 32,
            "& .category__item--box": {
                alignItems: 'center',
                color: theme.palette.primary.colorOvewViewTitle,
                background: theme.palette.background.paper,
                boxShadow: '0px 4px 10px rgba(10, 80, 58, 0.1)',
                borderRadius: 8,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                padding: 24,
                "& .category__item--image": {
                    width: 64,
                    height: 64,
                    position: 'relative',
                    "& img": {
                        width: '100%',
                        maxWidth: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        position: 'relative',
                        borderRadius: '32px',
                    }
                }
            }
        }
    },
    carousel: {
        "& .category__item--wrapper": {
            width: '100%',
            "& img": {
                width: '100%',
            }
        }
    }
}));

function CoursesHighLight(props) {
    const { coursesHighLight } = props;
    const classes = useStyles();
    const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 550, itemsToShow: 2 },
        { width: 768, itemsToShow: 4 },
        { width: 1200, itemsToShow: 4 },
    ]
    return(
        <>
            {
                coursesHighLight.length > 0 && coursesHighLight.length < 4 ?
                <div className={classes.categoryItemAfterFour}>
                    {
                            coursesHighLight.map((course, index) => {
                            return (
                                <div key={index} className="category__item--wrapper">
                                    <CourseHighlightItem
                                        course={course}
                                    />
                                </div>
                            )
                        })
                    }
                </div>
                : coursesHighLight.length >= 4 ?
                        <Carousel breakPoints={breakPoints} itemPadding={[0, 16]} className={classes.carousel}>
                        {
                            coursesHighLight.map((course, index) => {
                                return (
                                    <div key={index} className="category__item--wrapper">
                                        <CourseHighlightItem
                                            course={course}
                                        />
                                    </div>
                                )
                            }) 
                        }
                    </Carousel> : ""
            }
        </>
    )
}

export default CoursesHighLight;