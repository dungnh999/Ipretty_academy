import React, { useEffect, useState } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import { useAuth } from "ipretty/context/AppProvider";
import CardStatistic from "../components/CardStaistic";
import CategoryDashboard from "../components/CategoryDashboard";
import CourseDashboard from "../components/CourseDashboard";
import TeacherDashboard from "../components/TeacherDashboard";
import UserDashboard from "../components/UserDashboard";
import SellCharts from "../components/SellCharts";
import CourseCharts from "../components/CourseCharts";
import DashboardService from "ipretty/services/DashboardService";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "20px",
    [theme.breakpoints.down("1500")]: {
      padding: "32px 50px",
    },
    [theme.breakpoints.down("xs")]: {
      padding: "32px 16px",
    },
    [theme.breakpoints.up("sm")]: {
      padding: "20px",
    },
    "& .cardStatistic": {
      display: "flex",
      [theme.breakpoints.down("lg")]: {
        flexWrap: "wrap",
      },
    },
    "& .layout__category": {
      display: "flex",
      [theme.breakpoints.down("sm")]: {
        // flexWrap: 'wrap',
        flexDirection: "column",
        // paddingRight : 31
      },
      [theme.breakpoints.down("xs")]: {
        flexDirection: "column",
      },
    },
    "& .charts": {
      display: "flex",
      flexDirection: "column",
      // paddingRight : '31px'
    },
  },
}));

const Home = (props) => {
  const classes = useStyles();
  const { user } = useAuth();
  const [dataOverView, setDataOverView] = useState([]);
  const [dataFeatureCourses, setDataFeatureCourses] = useState([]);
  const [dataFeatureTeachers, setDataFeatureTeachers] = useState([]);
  const [dataFeatureMembers, setDataFeatureMembers] = useState([]);
  const [dataCourseCategories, setDataCourseCategories] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      getListOverView();
      getFeatureCourses();
      getFeatureCoursesCategories();
      getFeatureMembers();
      getFeatureTeachers();
    }
  }, [localStorage.getItem("authToken")]);

  function getListOverView() {
    DashboardService.getOverviewData(
      (res) => {
        setDataOverView(res.data.data);
      },
      (err) => {}
    );
  }

  function getFeatureCourses() {
    DashboardService.getFeatureCourses((res) => {
      if (res.data && res.data.data && res.data.data.length) {
        let dataCourse = res.data.data;
        let courses = [];
        dataCourse.forEach((item) => {
          const course = {
            name: {
              title: item.course_name,
              type: "avatar",
              image: item.course_feature_image,
            },
            view: item.count_viewer,
            register: item.students_count,
            ratio: {
              type: "ratio",
              isRatio: item.rate > 0 ? true : false,
              scoreRatio: item.rate,
            },
          };
          courses.push(course);
        });
        setDataFeatureCourses(courses);
      }
    });
  }

  function getFeatureCoursesCategories() {
    DashboardService.getFeatureCoursesCategories((res) => {
      if (res.data && res.data.data && res.data.data.length) {
        let dataCategories = res.data.data;
        let categories = [];
        dataCategories.forEach((item) => {
          const category = {
            name: {
              title: item.category_name,
              type: "avatar",
              image: item.course_category_attachment,
            },
            view: item.courses_sum_count_viewer,
            register: item.courses_with_students_count,
            ratio: {
              type: "ratio",
              isRatio: item.rate > 0 ? true : false,
              scoreRatio: item.rate,
            },
          };
          categories.push(category);
        });
        setDataCourseCategories(categories);
      }
    });
  }

  function getFeatureMembers() {
    DashboardService.getFeatureMembers((res) => {
      if (res.data && res.data.data && res.data.data.length) {
        let dataMembers = res.data.data;
        let members = [];
        dataMembers.forEach((item) => {
          const member = {
            name: {
              title: item.name,
              type: "avatar",
              image: item.avatar,
            },
            certificate: item.certifacates_count,
            register: item.courses_register_count,
            account: item.role,
          };
          members.push(member);
        });
        setDataFeatureMembers(members);
      }
    });
  }

  function getFeatureTeachers() {
    DashboardService.getFeatureTeachers((res) => {
      if (res.data && res.data.data && res.data.data.length) {
        let dataTeachers = res.data.data;
        let teachers = [];
        dataTeachers.forEach((item) => {
          const teacher = {
            name: {
              title: item.name,
              type: "avatar",
              image: item.avatar,
            },
            star: {
              type: "star",
              scoreRating: item.students_follow_avg_rating,
            },
            register: item.students_follow_count,
            ratio: {
              type: "ratio",
              isRatio: item.rate > 0 ? true : false,
              scoreRatio: item.rate,
            },
          };
          teachers.push(teacher);
        });
        setDataFeatureTeachers(teachers);
      }
    });
  }

  return (
    <div className={classes.root}>
      <div className="cardStatistic">
        <CardStatistic dataOverView={dataOverView} />
      </div>
      <div className="charts">
        <div className="courseCharts">
          <CourseCharts />
        </div>
        <div className="sellCharts">
          <SellCharts />
        </div>
      </div>
      <div className="layout__category">
        <CategoryDashboard dataCourseCategories={dataCourseCategories} />
        <CourseDashboard dataFeatureCourses={dataFeatureCourses} />
      </div>
      <div className="layout__category">
        <TeacherDashboard dataFeatureTeachers={dataFeatureTeachers} />
        <UserDashboard dataFeatureMembers={dataFeatureMembers} />
      </div>
    </div>
  );
};
export default Home;
