import React, { useEffect, useMemo, useState, useCallback } from "react";
import { makeStyles, Link } from "@material-ui/core";
import { useAuth } from "ipretty/context/AppProvider";
import Filter from "ipretty/components/Filter";
import { initialPramsCourse } from "ipretty/helpers/contextHelper";
import DashboardService from "ipretty/services/DashboardService";
import queryString from "query-string";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import LinkImg from "./LinkImg";
import { useHistory } from "react-router-dom";
import moment from "moment";
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
    "& .view": {
      backgroundColor: "#fff",
      borderRadius: theme.spacing(1),
      padding: "10px 0px 32px",
      "& .title": {
        fontSize: 20,
        fontWeight: "bold",
        fontFamily: "San Francisco Text bold",
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
      "& .areaChart": {
        height: "400px",
        marginLeft: "-55px", //fix Lỗi Desktop màn 2
        [theme.breakpoints.down("xs")]: {
          marginLeft: "-60px", //fix Lỗi Responsive màn 10
        },
      },

      "& .filter": {
        display: "flex",
        justifyContent: "end",
        paddingRight: 34,
      },
    },
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
  fontSize14: {
    color: "#27384C",
    fontSize: 14,
    fontFamily: "San Francisco Text",
  },
  centerLayout: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 8,
    "&:last-child": {
      marginBottom: 0,
    },
  },
}));
const ITEM_HEIGHT = 38;

function SellCharts(props) {
  const classes = useStyles();
  const { getTranslation } = useAuth();
  const [loadingFilter, setLoadingFilter] = useState(false);
  const [dataSell, setDataSell] = useState([]);
  const [params, setParams] = useState(
    initialPramsCourse(
      queryString.parse(location.search, { arrayFormat: "comma" })
    )
  );
  const [isFilterData, setIsFilterData] = useState(false);
  const [getAreaPng, { ref: areaRef }] = useCurrentPng();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [loading, setLoading] = useState(false);

  const week = useMemo(
    () => [
      { id: "", name: "Tuần" },
      { id: 1, name: "Tuần 1" },
      { id: 2, name: "Tuần 2" },
      { id: 3, name: "Tuần 3" },
      { id: 4, name: "Tuần 4" },
      { id: 5, name: "Tuần 5" },
      { id: 6, name: "Tuần 6" },
      { id: 7, name: "Tuần 7" },
      { id: 8, name: "Tuần 8" },
      { id: 9, name: "Tuần 9" },
      { id: 10, name: "Tuần 10" },
      { id: 11, name: "Tuần 11" },
      { id: 12, name: "Tuần 12" },
      { id: 13, name: "Tuần 13" },
      { id: 14, name: "Tuần 14" },
      { id: 15, name: "Tuần 15" },
      { id: 16, name: "Tuần 16" },
      { id: 17, name: "Tuần 17" },
      { id: 18, name: "Tuần 18" },
      { id: 19, name: "Tuần 19" },
      { id: 20, name: "Tuần 20" },
      { id: 21, name: "Tuần 21" },
      { id: 22, name: "Tuần 22" },
      { id: 23, name: "Tuần 23" },
      { id: 24, name: "Tuần 24" },
      { id: 25, name: "Tuần 25" },
      { id: 26, name: "Tuần 26" },
      { id: 27, name: "Tuần 27" },
      { id: 28, name: "Tuần 28" },
      { id: 29, name: "Tuần 29" },
      { id: 30, name: "Tuần 30" },
      { id: 31, name: "Tuần 31" },
      { id: 32, name: "Tuần 32" },
      { id: 33, name: "Tuần 33" },
      { id: 34, name: "Tuần 34" },
      { id: 35, name: "Tuần 35" },
      { id: 36, name: "Tuần 36" },
      { id: 37, name: "Tuần 37" },
      { id: 38, name: "Tuần 38" },
      { id: 39, name: "Tuần 39" },
      { id: 40, name: "Tuần 40" },
      { id: 41, name: "Tuần 41" },
      { id: 42, name: "Tuần 42" },
      { id: 43, name: "Tuần 43" },
      { id: 44, name: "Tuần 44" },
      { id: 45, name: "Tuần 45" },
      { id: 46, name: "Tuần 46" },
      { id: 47, name: "Tuần 47" },
      { id: 48, name: "Tuần 48" },
      { id: 49, name: "Tuần 49" },
      { id: 50, name: "Tuần 50" },
      { id: 51, name: "Tuần 51" },
      { id: 52, name: "Tuần 52" },
    ],
    []
  );
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
  const [disableFilter, setDisableFilter] = useState({
    month: false,
    week: false,
  });
  const filters = useMemo(() => {
    return [
      {
        id: 1,
        list: year,
        fieldFilter: "year",
        isStatic: true,
        placeholder: getTranslation("year"),
        widthItem: 94,
      },
      {
        id: 2,
        list: month,
        fieldFilter: "month",
        isStatic: true,
        placeholder: getTranslation("month"),
        widthItem: 94,
        disabled: disableFilter.month,
      },
      {
        id: 3,
        list: week,
        fieldFilter: "week",
        isStatic: true,
        placeholder: getTranslation("week"),
        widthItem: 100,
        disabled: disableFilter.week,
      },
    ];
  }, [disableFilter]);

  const options = [
    { id: 1, name: "Download PNG", action: handlePng },
    { id: 2, name: "Download excel", action: handleExcel },
  ];

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      getAnalysisBusiness(params);
    }
  }, [localStorage.getItem("authToken")]);

  useEffect(() => {
    let mounted = true;
    const runAsync = async () => {
      try {
        if (mounted) {
          if (isFilterData) {
            setLoading(true);
            getAnalysisBusiness(params);
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

  function getAnalysisBusiness(params) {
    DashboardService.getAnalysisBusiness({ ...params }, (res) => {
      const dataSell = res.data.data;
      let dataSells = [];
      for (const key in dataSell) {
        const data = {
          name: getTranslation(`${key}`),
          SOLD: dataSell[key],
        };
        dataSells.push(data);
      }
      setDataSell(dataSells);
      setLoadingFilter(false);
      setIsFilterData(false);
      setLoading(false);
    }),
      (err) => {
        console.log(err);
      };
  }

  function handleData(nameField, value) {
    if (nameField == "year") {
      let ids = getListId(year, value);
      let result = [ids[ids.length - 1]];
      setParams({ ...params, [nameField]: result });
      setDisableFilter({
        week: false,
        month: false,
      });
    } else if (nameField == "month") {
      let ids = getListId(month, value);
      let result = [ids[ids.length - 1]];
      if (result[0] === "") {
        setDisableFilter({
          ...disableFilter,
          week: false,
        });
      } else {
        setDisableFilter({
          ...disableFilter,
          week: true,
        });
      }
      setParams({ ...params, [nameField]: result });
    } else {
      setDisableFilter({
        ...disableFilter,
        month: true,
      });
      let ids = getListId(week, value);
      let result = [ids[ids.length - 1]];
      if (result[0] === "") {
        setDisableFilter({
          ...disableFilter,
          month: false,
        });
      } else {
        setDisableFilter({
          ...disableFilter,
          month: true,
        });
      }
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

  const handlePng = useCallback(async () => {
    const png = await getAreaPng();
    if (png) {
      FileSaver.saveAs(png, "area-chart.png");
    }
  }, [getAreaPng]);

  function handleExcel() {
    DashboardService.getFileBusinessSales(
      { ...params, export: 1 },
      (res) => {
        handleAfterExport(res.data, "Phân tích bán hàng");
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
            <LinkImg link="/report-course-business/?business=true" />
          </div>
        </div>
        <div className="title"> {getTranslation("salesanalysis")}</div>
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
        <div className="areaChart">
          <ResponsiveContainer width="100%" height="100%" >
            <AreaChart
              ref={areaRef}
              data={dataSell}          
              style={{
                fontSize:'15px'       
            }}
              margin={{
                top: 10,
                right: 30,
                left: 50,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid horizontal="true" vertical="true" />
              <XAxis dataKey="name" />
              <YAxis width={100} allowDuplicatedCategory="true" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#395B65",
                  color: "#fff",
                  borderRadius: 10,
                }}
                itemStyle={{ color: "#fff" }}
              />
              <Area
                type="monotone"
                dataKey="SOLD"
                stroke="#44AD92"
                fillOpacity={1}
                fill="url(#colorPv)"
                activeDot={{
                  fill: "#fff",
                  stroke: "#44AD92",
                  strokeWidth: 5,
                  r: 5,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="legendBar">
          <div className={classes.centerLayout}>
            <div className={classes.passOrLearning}></div>
            <div className={classes.fontSize14}>
              {getTranslation("turnover") + " (SOLD)"}{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SellCharts;
