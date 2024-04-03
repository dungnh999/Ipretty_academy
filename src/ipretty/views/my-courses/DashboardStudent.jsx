import React, { useState, useEffect, useMemo } from "react";
import { Typography, makeStyles, Hidden } from "@material-ui/core";
import BannerStudent from "./banner-statistic-student/BannerStudent";
import TabBasic from "../../components/TabBasic/TabBasic";
import CoursesLearning from "./courses-type/CoursesLearning";
import CoursesFinished from "./courses-type/CoursesFinished";
import CoursesFree from "./courses-type/CoursesFree";
import CoursesAll from "./courses-type/CoursesAll";
import CategoryLayout from "./category-highlight/CategoryLayout";
import FooterStudent from "../../components/Footer-student/FooterStudent";
import CoursesHighLight from "./courses-highlight/CoursesHighLight";
import { useAuth } from "../../context/AppProvider";

import { initialPrams } from "ipretty/helpers/contextHelper";
import queryString from "query-string";
import MyCoursesService from "ipretty/services/MyCoursesService";
import Skeleton from "ipretty/components/Skeleton";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .main__overview": {
      padding: "64px 208px 0 208px",
      // padding: '64px 14.444vw 0 14.444vw',
      [theme.breakpoints.down("lg")]: {
        padding: "64px 14.444vw 0 14.444vw",
      },
      [theme.breakpoints.down("md")]: {
        padding: "40px 6.9vw 0 6.9vw",
      },
      [theme.breakpoints.down("sm")]: {
        padding: "35px 20px 0 20px",
      },
      [theme.breakpoints.down("sm")]: {
        padding: "35px 16px 0 16px",//pading doi voi man mobile
      },
      "& .rec-dot_active": {
        backgroundColor: '#187865',//fix Field Khoá học nổi bật hiển thị navigation UI màu tím không hợp lý
        boxShadow: '0 0 1px 3px rgb(66 111 70)',
      },
    },   
  },
  myCourse: {
    fontSize: "32px",
    color: "#27384C",
    //textTransform: 'uppercase',
    fontWeight: "600",
    fontFamily: "San Francisco Text",
    lineHeight: "38px",
  },
  paddingLayout: {
    paddingBottom: "24px",
    [theme.breakpoints.down("sm")]: {
      // padding: '35px 20px 20px 20px'
    },
    [theme.breakpoints.down("md")]: {
      // padding: '40px 6.9vw 20px 6.9vw'
    },
    // [theme.breakpoints.down('md')]: {
    //     padding: '40px 0px 40px 140px'
    // },
    // [theme.breakpoints.down('sm')]: {
    //     padding: '40px 40px 24px 40px'
    // },
    // [theme.breakpoints.down('xs')]: {
    //     padding: '35px 25px 24px 25px'
    // }
  },
  categories: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    marginTop: 40,
    marginBottom: 32,
    marginRight: "-16px",
    marginLeft: "-16px",
    // padding: '0 9.8vw 0 9.8vw',
    [theme.breakpoints.down("lg")]: {
      // padding: '0 8.681vw 0 8.681vw',
    },
    [theme.breakpoints.down("md")]: {
      // padding: '0px 0px 0px 0px'
      marginTop: 0,//Button Danh mục làm đẹp Lỗi UI
      marginBottom: 0,
    },
    [theme.breakpoints.down("sm")]: {
      // padding: '0px 0px 0px 0px'
      marginTop: 0,//Button Danh mục làm đẹp Lỗi UI
      marginBottom: 0,
    },
    [theme.breakpoints.down("xs")]: {
      // padding: '0px 0px 0px 0px'
      marginTop: 0,//Button Danh mục làm đẹp Lỗi UI
      marginBottom: 0,
    },
    "& .rec-carousel-wrapper": {
      "& .rec-carousel": {
        position: "relative",
      },
      "& .rec-arrow": {
        position: "absolute",
      },
      "& .rec-arrow:hover:enabled": {
        backgroundColor: "#44AD92",
      },
      "& .rec-arrow-left": {
        left: "-16px",
        zIndex: 1,
        [theme.breakpoints.down('xs')]: {
          left: "0px",//responsive arrow bug 80
        },
      },
      "& .rec-arrow-right": {
        right: "-16px",
        [theme.breakpoints.down('xs')]: {
          right: "0px",//responsive arrow bug 80
        },
      },
      "& .rec-slider-container": {
        margin: 0,
        "& .rec-carousel-item": {
          // padding: '0 16px',
          // maxWidth: '25%',
          // minWidth: '25%',
          marginBottom: 32,
          flex: 1,
        },
      },
    },
    // "& .rec-slider-container": {
    //     marginLeft: '-16px',
    //     marginRight: '-16px',
    //     "& .rec-carousel-item": {
    //         [theme.breakpoints.down('md')]: {

    //         },
    //         [theme.breakpoints.down('sm')]: {
    //             maxWidth: '50%',
    //             minWidth: '50%',
    //         },
    //         [theme.breakpoints.down('xs')]: {
    //             maxWidth: '100%',
    //             minWidth: '100%',
    //         },
    //         flex: 1,
    //         padding: '0 16px',
    //         maxWidth: '25%',
    //         minWidth: '25%',
    //         marginBottom: 32,
    //     }
    // },
    // "& .rec-arrow": {
    //     position: 'absolute',
    // }
  },
  categoryStart: {
    paddingBottom: "30px",
  },
  categoryItem: {
    paddingLeft: "20px",
    paddingBottom: "30px",
  },
  categoryTitle: {
    // paddingLeft: '70px',
    fontSize: "32px",
    color: "#27384C",
    //textTransform: 'uppercase',
    fontWeight: "600",
    fontFamily: "San Francisco Text",
    marginBottom: "24px",
    lineHeight: "38px",
    paddingLeft: 16,
  },
}));

function DashboardStudent(props) {
  const {} = props;
  const { getTranslation } = useAuth();
  const classes = useStyles();
  const labels = useMemo(
    () => [
      getTranslation("Learning"),
      getTranslation("Completed"),
      getTranslation("Free"),
      getTranslation("All"),
    ],
    []
  );
  // const labels = useState([ getTranslation('Learning'), getTranslation('Completed'), getTranslation('Free'), getTranslation('All') ]);
  const [params, setParams] = useState(
    initialPrams(
      queryString.parse(props.location.search, { arrayFormat: "comma" })
    )
  );
  const [coursesHighLight, setCoursesHighLight] = useState();

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      getCategoryHighlight();
      getCourseHighLight();
    }
  }, [localStorage.getItem("authToken")]);

  const components = [
    <CoursesLearning params={params} setParams={setParams} />,
    <CoursesFinished params={params} setParams={setParams} />,
    <CoursesFree params={params} setParams={setParams} />,
    <CoursesAll params={params} setParams={setParams} />,
  ];

  const getCategoryHighlight = () => {
    MyCoursesService.getListCategoryHighlight(
      (responses) => getCategoryHighlightSuccess(responses),
      (errors) => getCategoryHighlightError(errors)
    );
  };

  const [categories, setCategories] = useState();

  const getCategoryHighlightSuccess = (responses) => {
    if (
      responses &&
      responses.data &&
      responses.data.data &&
      responses.data.data.length &&
      responses.data.data.length > 0
    ) {
      setCategories(responses.data.data);
    } else {
      setCategories([]);
    }
  };

  const getCategoryHighlightError = () => {};

  const onSearch = (value) => {
    setParams({ ...params, keyword: value, page: 1 });
  };

  const getCourseHighLight = () => {
    MyCoursesService.getListCourseHighlight(
      (responses) => {
        if (
          responses &&
          responses.data &&
          responses.data.data &&
          responses.data.data.length &&
          responses.data.data.length > 0
        ) {
          responses.data.data.forEach((course) => {
            course.title = course.course_name.course_name;
            course.image = course.course_feature_image;
            course.teacher = {
              avatar: course.course_name.teacher_name.avatar,
              name: course.course_name.teacher_name.name,
            };
            course.star = (parseFloat(course.count_rating / course.count_rater)).toFixed(1);//fix so thap phan
            course.isText = true;
            course.price = course.course_price;
          });
          setCoursesHighLight(responses.data.data);
        } else {
          setCoursesHighLight([]);
        }
      },
      (errors) => {}
    );
  };

  return (
    <div className={classes.root}>
      <BannerStudent />
      <div className="main__overview">
        <div className={classes.paddingLayout}>
          <Typography className={classes.myCourse} display="block">
            {getTranslation("MyCourses")}
          </Typography>
        </div>
        <div>
          <TabBasic
            labels={labels}
            components={components}
            onSearch={onSearch}
            setParams={setParams}
            params={params}
          />
        </div>
        <div className={classes.categories}>
          <Typography className={classes.categoryTitle} display="block">
            {getTranslation("Featuredcategories")}
          </Typography>
          {categories ? (
            categories.length > 0 && <CategoryLayout categories={categories} />
          ) : (
            <Skeleton type="list" numberItems={3} />
          )}
        </div>
        <div className={classes.categories}>
          <Typography className={classes.categoryTitle} display="block">
            {getTranslation("Featuredcourse")}
          </Typography>
          {coursesHighLight ? ( //fix lỗi căn lề màn2
            coursesHighLight.length ? (
              <CoursesHighLight coursesHighLight={coursesHighLight} />
            ) : (
              "" //fix lỗi căn lề màn2
            )
          ) : (
            <Skeleton type="list" numberItems={4} height={342} />
          )}
        </div>
      </div>
      <br />
      <FooterStudent />
    </div>
  );
}

export default DashboardStudent;
