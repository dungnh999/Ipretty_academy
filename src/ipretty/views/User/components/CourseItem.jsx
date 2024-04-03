import React, {  } from 'react';
import { Grid, makeStyles, CardContent, Card, Button, CardActionArea, CardActions, 
    Typography, CardMedia, Avatar } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import contextHelper from 'ipretty/helpers/contextHelper';
import Img from '../../../../public/images/Rectangle 719.png'
import Teacher from '../../../../public/images/teacher.png'
const useStyles = makeStyles(theme => ({
    courseItem: {
        marginBottom : 32,
        fontFamily: 'San Francisco Text',
        boxShadow: '4px 4px 10px rgba(10, 80, 58, 0.1)',
        "& .image" : {
            padding : 0,
            '& img' : {
                width : 312,
                borderRadius : 8,
                [theme.breakpoints.down('sm')]: {
                    width: '100%'
                },
                [theme.breakpoints.down('xs')]: {
                    width : 312,
                },
            }
        },
        '& .courseItem__title': {
            fontSize: '18px',
            color: theme.palette.primary.colorOvewViewTitle,
            fontWeight: '700',
            paddingBottom :'60px'
        },
        '& .courseItem__teacher': {
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            '& .courseItem__teacher__name': {
                padding: '10px',
                fontSize: '12px',
                color : '#395B65',
                fontFamily: 'San Francisco Text',
            },
            '& .MuiAvatar-root' : {
                width : 24,
                height : 24,
            }
        },
        '& .courseItem__betweenElement__centerElement': {
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            '& .courseItem__betweenElement__centerElement__star': {
                fontWeight: '700', 
                color: 'black', 
                fontSize: '14px',
                paddingLeft : 6,
            }
        },
        '& .courseItem__betweenElement': {
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            padding : '0 24px 25px 10px',
        },
        '& .courseItem__betweenElement__textButton': {
            color: '#44AD92',
        } 
    }
}));

function CourseItem(props) {
    const { course } = props;
    const classes = useStyles();
    const { compactText } = contextHelper;
    
    return(
        <>
            <Card className={classes.courseItem}>
                <Grid container>
                    <Grid  item  md={3} sm={5} lg={5} xl={5} className="image">
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="180"
                                width="312px"
                                image={course.course_feature_image}
                                alt="green iguana"
                            />
                        </CardActionArea>
                    </Grid>
                    <Grid  item  md={9} sm={7} lg={7} xl={7} className="courseItem">
                        <CardContent>
                            <Typography className="courseItem__title" color="textSecondary" gutterBottom variant="h5" component="div">
                                {compactText(course.course_name, 85)}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" className="courseItem__teacher" component="div">
                                <Avatar alt="Remy Sharp" src={course.teacher ? course.teacher.avatar : ""} />
                                <span className="courseItem__teacher__name">{course.teacher.name}</span>
                            </Typography>
                        </CardContent>
                        <Grid className="courseItem__betweenElement" container item>
                            <Grid className="courseItem__betweenElement__centerElement">
                                <StarIcon
                                    color="primary"
                                />
                                {
                                    course && course.scoreRating ? 
                                        <span className="courseItem__betweenElement__centerElement__star">{course.scoreRating}</span>
                                    : 
                                        <span className="courseItem__betweenElement__centerElement__star">0</span>
                                }
                            </Grid>
                            <Grid>
                                <div className="courseItem__betweenElement__textButton">
                                    <span className="courseItem__betweenElement__textButton__priceCourse">{ course.course_price}{' đ'}</span>
                                </div>  
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                        
            </Card>
        </>
    )
}

export default CourseItem;