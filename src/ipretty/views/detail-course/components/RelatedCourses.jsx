import React, {  } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import CourseHighlightItem from 'ipretty/views/my-courses/courses-highlight/CourseHighlightItem';

const useStyles = makeStyles(theme => ({
    relatedCourse: {
        padding: '72px 74px 72px 50px',
        [theme.breakpoints.down('md')]: {
        },
        [theme.breakpoints.down('sm')]: {
        },
        [theme.breakpoints.down('xs')]: {
            padding: '25px 35px 25px 35px',
        },
        '& .relatedCourse__title': {
            paddingLeft: '30px', 
            fontFamily: 'San Francisco Text', 
            fontSize: '32px', 
            fontWeight: '600', 
            color: '#27384C',
            [theme.breakpoints.down('xs')]: {
                paddingLeft : '0px'//fix bug 60 CHi tiết khóa học , lỗi pading lệch 
            },
        },
        '& .relatedCourse__content': {
            paddingTop: '24px',
            '& .relatedCourse__content__item': {
                paddingLeft: '30px',
                [theme.breakpoints.down('md')]: {
                },
                [theme.breakpoints.down('sm')]: {
                    paddingBottom: '30px'
                },
                [theme.breakpoints.down('xs')]: {
                    paddingBottom: '30px',
                    paddingLeft : '0px'
                },
            }
        }
    }
}));

function RelatedCourses(props) {
    const { relatedCourses  , getTranslation} = props;
    const classes = useStyles();
    
    return(
        <>
            <Grid className={classes.relatedCourse} container item xs={12} md={12} sm={12} lg={12} xl={12}>
                <Grid item xs={12} md={12} sm={12} lg={12} xl={12}>
                    <div className="relatedCourse__title">
                        {getTranslation('RelatedCourses')}
                    </div>
                </Grid>
                <Grid className="relatedCourse__content" container item xs={12} md={12} sm={12} lg={12} xl={12}>
                    {
                        relatedCourses.map((course, index) => {
                            return(
                                <Grid key={index} item xs={12} md={3} sm={6} lg={3} xl={3} className="relatedCourse__content__item">
                                    <CourseHighlightItem
                                        course={course}
                                    />
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Grid>
        </>
    )
}

export default RelatedCourses;