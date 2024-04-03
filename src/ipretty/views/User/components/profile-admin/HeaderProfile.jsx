import React, { useMemo } from "react";
import { makeStyles, Avatar, Link } from "@material-ui/core";
import ImageBanner from "../../../../../public/images/bg_banner_student.png";
import ImageBanner1 from "../../../../../public/images/bg1.png";
import { useHistory } from "react-router-dom";
import BreadCrumbs from "ipretty/components/BreadCrumbs";
import Goback from "ipretty/components/Goback";
import AddButton from "ipretty/components/AddButton";
import IconImage from "ipretty/components/IconImage";
import Edit from "../../../../../public/icons_ipretty/Edit.svg";
import Password from "../../../../../public/icons_ipretty/Password.svg";
import { ArrowBackIos } from "@material-ui/icons";
import Skeleton from "ipretty/components/Skeleton";

const useStyles = makeStyles((theme) => ({
  bannerDetail: {
    position: "relative",
    "& .bannerDetail__banner": {
      backgroundImage: `url(${ImageBanner})`,
      height: "377px",
      backgroundRepeat: "round",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      [theme.breakpoints.down("xs")]: {
        backgroundImage: `url(${ImageBanner1})`,
        marginLeft: "-27px",
      }, //fix background biến dạng màn 6
      "& .bannerDetail__banner_url": {
        position: "absolute",
        left: "135px",
        top: "16px",
        [theme.breakpoints.up("sm")]: {
          left: "31px",
        },
        [theme.breakpoints.down("xs")]: {
          left: "18px",
        },
        "& .header__bread-crumd": {
          "& .MuiBreadcrumbs-ol": {
            "& .MuiTypography-root": {
              color: "#FFFFFF",
              fontSize: 14,
              fontFamily: "San Francisco Text Bold",
            },
          },
          "& svg ": {
            color: "#FFF",
          },
        },
        "& .bannerDetail__banner__buttonGoback": {
          padding: "4px 13px",
          display: "flex",
          fontFamily: "San Francisco Text",
          color: theme.palette.primary.colorText,
        },
      },
      "& .bannerDetail__banner__name": {
        position: "absolute",
        top: "65px",
        "& .bannerDetail__banner__avatar": {
          "& .bannerDetail__banner__avatar--img": {
            margin: "auto",
            width: "160px",
            height: "160px",
          },
        },
        "& .skeleton__avatar": {
          "& span": {
            margin: "auto",
          },
        },
        "& .skeleton__text": {
          paddingTop: 32,
        },
        "& .bannerDetail__banner__content": {
          fontSize: "32px",
          fontWeight: "700",
          fontFamily: "San Francisco Text",
          color: theme.palette.primary.colorText,
          marginTop: "13px",
          textAlign: "center",
        },
        "& .bannerDetail__banner__title": {
          fontFamily: "San Francisco Text",
          fontStyle: "normal",
          fontWeight: "normal",
          fontSize: "18px",
          lineHeight: "1px", // fix lineHeight khoảng cách dư hơi nhiều
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          color: "#FFFFFF",
          paddingTop: "13px",
        },
      },
      "& .skeleton__button": {
        position: "absolute",
        right: "80px",
        display: "flex",
        top: "37px",
        flexDirection: "column",
      },
      "& .bannerDetail__banner__button": {
        position: "absolute",
        right: "80px",
        display: "flex",
        top: "37px",
        [theme.breakpoints.up("sm")]: {
          right: "36px",
          top: "16px",
        },
        [theme.breakpoints.down("xs")]: {
          right: "5px",
          top: "35px",
        },
        flexDirection: "column",
        "& img": {
          width: "16px",
          paddingTop: "5px",
        },
        "& .MuiButton-label": {
          [theme.breakpoints.down("xs")]: {
            "& div": {
              display: "none",
            },
          },
        },
        "& .button": {
          display: "flex",
          border: "2px solid #FFF !important",
          color: "#FFF",
          fontWeight: "600",
          fontSize: "16px",
          marginTop: "6px",
          width: "144px",
          height: "36px",
          [theme.breakpoints.down("xs")]: {
            width: "32vw",
            height: "36px",
            fontSize: "14px",
          },
        },
      },
    },
  },
  backLink: {
    display: "flex",
    fontWeight: "600",
    fontSize: "16px",
    color: "#fff",
    "& .MuiSvgIcon-fontSizeSmall": {
      marginTop: "2px",
      fontSize: "1.1rem",
    },
    [theme.breakpoints.down("xs")]: {
      //   margin: '42px auto 0px auto'
      paddingLeft: "18px",
      display: "none",
    },
  },
}));

function HeaderProfile(props) {
  const classes = useStyles();
  const { getTranslation, dataUser, titlePage, isTransactionHistory, loading } =
    props;
  let history = useHistory();
  const links = useMemo(
    () => [{ title: getTranslation("Home"), path: "/" }],
    []
  );

  function redirectEdit() {
    history.push(`/students/edit`);
  }

  function redirectPassword() {
    history.push(`/users/changePassword`);
  }

  return (
    <div className={classes.bannerDetail}>
      <div className="bannerDetail__banner">
        <div className="bannerDetail__banner_url">
          <div className="header__bread-crumd">
            <BreadCrumbs
              classes={classes}
              links={links}
              titleCurrent={titlePage}
            />
          </div>
          <Link
            id="linkBack"
            component="button"
            variant="body2"
            classes={{
              root: classes.backLink,
            }}
            onClick={() => {
              history.push("/");
            }}
          >
            <ArrowBackIos fontSize="small" />
            {getTranslation("Back")}
          </Link>
        </div>
        <div className="bannerDetail__banner__name">
          {loading ? (
            <div className="skeleton__avatar">
              <Skeleton type="circle" width={160} height={160} />
            </div>
          ) : (
            <div className="bannerDetail__banner__avatar">
              <Avatar
                className="bannerDetail__banner__avatar--img"
                alt="Remy Sharp"
                src={dataUser.avatar}
              />
            </div>
          )}
          {loading ? (
            <div className="skeleton__text">
              <Skeleton type="text" />
            </div>
          ) : (
            <div className="bannerDetail__banner__content">{dataUser.name}</div>
          )}
          {isTransactionHistory ? (
            <div className="bannerDetail__banner__title">
              {dataUser && dataUser.position ?(
                getTranslation("Position") + ": " + dataUser.position
              ) : (
                null
               
              )}
              {/* {getTranslation("Position")}: {dataUser ? dataUser.position : ""} */}
            </div>
          ) : (
            ""
          )}
        </div>
        {loading ? (
          <div className="skeleton__button">
            <Skeleton type="button" />
            <Skeleton type="button" />
          </div>
        ) : (
          <div className="bannerDetail__banner__button">
            <AddButton
              label={getTranslation("Edit")}
              id="update-button"
              buttonClass="button banners__button--edit"
              onClick={redirectEdit}
              variant="outlined"
              iconButton={<IconImage srcIcon={Edit} />}
            />
            <AddButton
              label={getTranslation("Password")}
              id="update-button"
              buttonClass="button banners__button--password"
              onClick={redirectPassword}
              variant="outlined"
              iconButton={<IconImage srcIcon={Password} />}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default HeaderProfile;
