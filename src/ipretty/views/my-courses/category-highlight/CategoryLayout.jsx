import React, {  } from 'react';
import { Grid, makeStyles, CardContent, Card } from '@material-ui/core';
import Carousel from 'react-elastic-carousel'
import useNavigator from 'ipretty/hook/useNavigator';

const useStyles = makeStyles(theme => ({
    categories: {
        paddingTop: '10px',
        display: 'flex',
        justifyContent: 'flex-start'
    },
    categoryItem: {
        marginLeft: '10px',
        marginRight: '10px',
        paddingBottom: '30px',
        cursor: 'pointer'
    },
    root: {
        // marginLeft: '-16px',
        // marginRight: '-16px',
        "& .rec-carousel-wrapper": {
            marginLeft: '0!important',
            marginRight: '0!important',
        },
        "& .categoryItemAfterFour": {
            display: 'flex',
            flexWrap: 'wrap',
            marginBottom: 32,
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
        },
        "& .category__item--wrapper": {
            // width: '100%',
            "& img" :{
                width: '100%',
            },
            [theme.breakpoints.down('md')]: {

            },
            [theme.breakpoints.down('sm')]: {
                maxWidth: '50%',
                minWidth: '50%',
                marginTop: '10px',//2 button Danh mục sát nhau
            },
            [theme.breakpoints.down('xs')]: {
                maxWidth: '100%',
                minWidth: '100%',
                marginTop: '10px',//2 button Danh mục sát nhau
            },
            flex: 1,
            padding: '0 16px',
            maxWidth: '25%',
            minWidth: '25%',
            // marginBottom: 32,
        },
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
    },
    layoutCenter: {
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'flex-start',
        '& .button.sc-gKseQn.jJKuoL.rec.rec-dot.rec.rec-dot_active': {
            width: '4px',
            height: '4px',
            backgroundColor: '#187865',
            boxShadow: '0 0 1px 3px rgb(66 111 70)',//fix Field Khoá học nổi bật hiển thị navigation UI màu tím không hợp lý
        }
    },
    paddingItem: {
        // paddingLeft: '23px',
        [theme.breakpoints.down('xs')]: {
            // padding: '0px 50px 20px 0px'
        }
    },
    textCategory: {
        fontFamily: 'San Francisco Text', 
        fontSize: '18px', 
        lineHeight: '21px',
        fontWeight: 'bold', 
        marginLeft: '17px',
        flex: 1,
        '-webkit-line-clamp': 2,
        '-webkit-box-orient': 'vertical',
        'text-overflow': 'hidden',
        'max-height': 56,
        'text-overflow': 'ellipsis',
        display: '-webkit-box',
        overflow: 'hidden',
    },
    imageCategory: {
        height: '75px',
        width: '82px'
    }
}));

function CategoryLayout(props) {
    const { categories } = props;
    const classes = useStyles();
    const navigate = useNavigator();
    const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 550, itemsToShow: 2 },
        { width: 768, itemsToShow: 4 },
        { width: 1200, itemsToShow: 4 },
    ]

    const BE_url = process.env.API_URL
    return(
        <div className={classes.root}>
            {
                categories.length > 0 && categories.length < 4 ?
                <div className="categoryItemAfterFour">
                    {
                        categories.map((category, index) => {
                            return(
                                <div key={index} className="category__item--wrapper">
                                    <div className="category__item--box"
                                    style={{cursor: 'pointer'}}
                                     onClick={() => window.open(`${BE_url}/courses-category/${category.category_id}`)}>
                                        <div className="category__item--image">
                                            <img alt="fail" src={category.course_category_attachment} className={classes.imageCategory} />
                                        </div>
                                        <div className={classes.textCategory}>
                                            {category.category_name}
                                        </div>
                                    </div>
                                </div>
                                
                            )
                        })
                    }
                </div>
                :
                categories.length >= 4 ?
                    <Carousel breakPoints={breakPoints} itemPadding={[0, 16]} className={classes.carousel}>
                        {
                            categories.map((category, index) => {
                                return (
                                    <div key={index}>
                                        <div className="category__item--box" 
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => window.open(`${BE_url}/courses-category/${category.category_id}`)}>
                                            <div className="category__item--image">
                                                <img alt="fail" src={category.course_category_attachment} className={classes.imageCategory} />
                                            </div>
                                            <div className={classes.textCategory}>
                                                {category.category_name}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </Carousel>
                :
                ''
            }
        </div>
    )
}

export default CategoryLayout;