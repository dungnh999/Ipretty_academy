import React, { useEffect, useMemo, useState, useCallback } from "react";
import { makeStyles, Link } from "@material-ui/core";
import { useAuth } from "ipretty/context/AppProvider";
import Filter from "ipretty/components/Filter";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import LinkImg from "./LinkImg";
import { useHistory } from "react-router-dom";
import { initialPramsCourse } from "ipretty/helpers/contextHelper";
import DashboardService from "ipretty/services/DashboardService";
import queryString from "query-string";
import IconMenu from "ipretty/components/IconMenu";
import Down from "../../../../public/icon_svg/download.svg";
import { useCurrentPng } from "recharts-to-png";
import FileSaver from "file-saver";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
// import { makeStyles } from '@material-ui/core'
import IconImage from "ipretty/components/IconImage";
const useStyles = makeStyles((theme) => ({
  managementView: {
    // marginRight: 32,
    // width: '100%',
    marginBottom: 32,
    "& .view": {
      backgroundColor: "#fff",
      borderRadius: theme.spacing(1),
      padding: "10px 0px 52px",
      "& .title": {
        fontSize: 20,
        fontWeight: "bold",
        fontFamily: "San Francisco Text bold",
        color: "#27384C",
        paddingLeft: 32,
      },
      "& .title__label": {
        fontFamily: "San Francisco Text",
        fontSize: 14,
        color: "#27384C",
        paddingLeft: 32,
      },
      "& .button__action": {
        display: "flex",
        justifyContent: "end",
        "& .button__action--link": {
          display: "flex",
          padding: 14,
          justifyContent: "end",
        },
      },
      "& .filter": {
        display: "flex",
        justifyContent: "end",
        paddingRight: 34,
      },
      "& .legendBar": {
        display: "flex",
        justifyContent: "center",
      },
      "& .barChart": {
        overflow: "auto",
        marginLeft: "18px", //fix Lỗi canh lê destop màn 1
        [theme.breakpoints.down("xs")]: {
          marginLeft: "1px", //fix Lỗi Responsive màn 10
        },
      },
    },
  },
  passOrLearning: {
    borderRadius: "4px",
    height: "13px",
    width: "13px",
    backgroundColor: "#44AD92",
    marginRight: "5px",
  },
  root: {
    "& img": {
      height: 24,
      marginTop: 4,
    },
  },
  viewMore: {
    width: 153,
    fontSize: 16,
    fontFamily: "San Francisco Text Bold",
    color: "#395B65",
    textAlign: "center",
  },
  isCompleted: {
    borderRadius: "4px",
    height: "13px",
    width: "13px",
    backgroundColor: "#395B65",
    marginRight: "5px",
  },
  centerLayout: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 56,
    "&:last-child": {
      marginBottom: 0,
    },
  },
  fontSize14: {
    color: "#27384C",
    fontSize: 14,
    fontFamily: "San Francisco Text",
  },
}));

const ITEM_HEIGHT = 38;

function SellCharts(props) {
  const classes = useStyles();
  const { getTranslation } = useAuth();
  const [loadingFilter, setLoadingFilter] = useState(false);
  const [dataCourse, setDataCourse] = useState([]);
  const [params, setParams] = useState(
    initialPramsCourse(
      queryString.parse(location.search, { arrayFormat: "comma" })
    )
  );
  const [isFilterData, setIsFilterData] = useState(false);
  const [getAreaPng, { ref: areaRef }] = useCurrentPng();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const month = useMemo(
    () => [
      { id: "", name: "Tháng" },
      { id: 1, name: "Tháng 1" },
      { id: 2, name: "Tháng 2" },
      { id: 3, name: "Tháng 3" },
      { id: 4, name: "Tháng 4" },
      { id: 5, name: "Tháng 5" },
      { id: 6, name: "Tháng 6" },
      { id: 7, name: "Tháng 7" },
      { id: 8, name: "Tháng 8" },
      { id: 9, name: "Tháng 9" },
      { id: 10, name: "Tháng 10" },
      { id: 11, name: "Tháng 11" },
      { id: 12, name: "Tháng 12" },
    ],
    []
  );

  const year = useMemo(
    () => [
      { id: "", name: "Năm" },
      { id: 2021, name: "Năm 2021" },
      { id: 2022, name: "Năm 2022" },
    ],
    []
  );

  const filters = [
    {
      id: 1,
      list: year,
      fieldFilter: "year",
      isStatic: true,
      placeholder: getTranslation("year"),
      widthItem: 100,
    },
    {
      id: 2,
      list: month,
      fieldFilter: "month",
      isStatic: true,
      placeholder: getTranslation("month"),
      widthItem: 94,
    },
  ];

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      getStatisticalCourses(params);
    }
  }, [localStorage.getItem("authToken")]);

  useEffect(() => {
    let mounted = true;
    const runAsync = async () => {
      try {
        if (mounted) {
          if (isFilterData) {
            // console.log(params)
            getStatisticalCourses(params);
          }
        }
      } catch (e) {
        if (mounted) {
          throw e;
        }
      }
    };
    runAsync();
    return () => (mounted = false);
  }, [isFilterData]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function getStatisticalCourses(params) {
    DashboardService.getStatisticalCourses({ ...params }, (res) => {
      const dataCourse = res.data.data;
      let dataCourses = [];
      dataCourse.forEach((item) => {
        const course = {
          name: item.month_or_day,
          KHB: item.business_courses,
          KHP: item.published_courses,
        };
        dataCourses.push(course);
      });

      setDataCourse(dataCourses);
      setLoadingFilter(false);
      setIsFilterData(false);
    }),
      (err) => {
        console.log(err);
      };
  }

  const handlePng = useCallback(async () => {
    const png = await getAreaPng();
    if (png) {
      FileSaver.saveAs(png, "area-chart.png");
    }
  }, [getAreaPng]);

  function handleExcel() {
    DashboardService.getFileBusinessCourse(
      { ...params, export: 1 },
      (res) => {
        handleAfterExport(res.data, "Thống kê khóa học");
      },
      (err) => {
        handleError(err);
      }
    );
  }

  const handleAfterExport = (data, nameFile) => {
    var blob = new Blob([data]);
    var downloadUrl = window.URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = downloadUrl;
    a.setAttribute("download", nameFile + ".xlsx");
    document.body.appendChild(a);
    a.click();
    makeShortMessage(getTranslation("Fileexportsuccessful"), "success");
  };

  function handleData(nameField, value) {
    if (nameField == "year") {
      let ids = getListId(year, value);
      let result = [ids[ids.length - 1]];
      setParams({ ...params, [nameField]: result });
    } else if (nameField == "month") {
      let ids = getListId(month, value);
      let result = [ids[ids.length - 1]];
      setParams({ ...params, [nameField]: result });
    }
  }
  function getListId(list, listChild) {
    let datas = list.filter((val) => listChild.includes(val.name));
    return datas.map((item) => item.id);
  }

  function handleActionFilter() {
    setIsFilterData(true);
    setLoadingFilter(true);
  }

  return (
    <div className={classes.managementView}>
      <div className="view">
        <div className="button__action">
          <div className={classes.root}>
            <IconButton
              aria-label="more"
              aria-controls="long-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <IconImage srcIcon={Down} />
            </IconButton>
            <Menu
              id="long-menu"
              anchorEl={anchorEl}
              keepMounted
              open={open}
              onClose={handleClose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: "18ch",
                },
              }}
            >
              <MenuItem className={classes.viewMore} onClick={handlePng}>
                Download PNG
              </MenuItem>
              <MenuItem className={classes.viewMore} onClick={handleExcel}>
                Download Excel
              </MenuItem>
            </Menu>
          </div>
          <div className="button__action--link">
            <LinkImg link="/report-course-business/?business=false" />
          </div>
        </div>
        <div className="title">{getTranslation("Coursestatistics")}</div>
        <div className="title__label">
          {getTranslation("Numberofcoursesreleasedandsold")}
        </div>
        <div className="filter">
          <Filter
            isSearch={false}
            // isActionFilter={true}
            filters={filters}
            handleData={handleData}
            loadingButton={loadingFilter}
            handleActionFilter={handleActionFilter}
          />
        </div>
        <div className="barChart">
          <ResponsiveContainer width="100%" height={360}>
            <BarChart
             style={{
              fontSize:'15px',    
          }}
              ref={areaRef}
              data={dataCourse}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid horizontal="true" vertical="" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#395B65",
                  color: "#fff",
                  borderRadius: 10,
                }}
                itemStyle={{ color: "#fff" }}
              />
              {/* <Legend /> */}
              <Bar barSize={35} dataKey="KHB" stackId="a" fill="#395B65" />
              <Bar barSize={35} dataKey="KHP" stackId="a" fill="#44AD92" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="legendBar">
          <div className={classes.centerLayout}>
            <div className={classes.passOrLearning}></div>
            <div className={classes.fontSize14}>
              {getTranslation("CourseReleased") + " (KHP)"}{" "}
            </div>
          </div>
          <div className={classes.centerLayout}>
            <div className={classes.isCompleted}></div>
            <div className={classes.fontSize14}>
              {getTranslation("Coursesold") + " (KHB)"}{" "}
            </div>
          </div>
          {/* <button onClick={handlePng}>Dowload</button> */}
        </div>
      </div>
    </div>
  );
}
export default SellCharts;
