import React, { useState, useEffect, useMemo } from "react";
import { useAuth } from "ipretty/context/AppProvider";
import { Avatar, makeStyles, Link } from "@material-ui/core";
import UserService from "ipretty/services/UserService";
import ImageBanner from "../../../../public/images/bg_banner_student.png";
import AddButton from "ipretty/components/AddButton";
import Edit from "../../../../public/icons_ipretty/Edit.svg";
import Chat from "../../../../public/icons_ipretty/Chat_white.png";
import { useHistory } from "react-router-dom";
import IconImage from "ipretty/components/IconImage";
import Information from "ipretty/views/User/components/profile-admin/Information";
import Certificate from "ipretty/views/User/components/profile-admin/Certificate";
import InfoCourse from "ipretty/views/User/components/profile-admin/InfoCourse";
import BreadCrumbs from "ipretty/components/BreadCrumbs";
import queryString from "query-string";
import { ArrowBackIos } from "@material-ui/icons";

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
          lineHeight: "24px",
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          color: "#FFFFFF",
          paddingTop: "13px",
        },
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
  contextInfo: {
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.down("xl")]: {
      padding: "0 calc((100% - 928px)/2) 84px",
    },
    [theme.breakpoints.down("lg")]: {
      padding: "0 calc((100% - 928px)/2) 84px",
    },
    [theme.breakpoints.down("md")]: {
      padding: "0 calc((100% - 928px)/2) 84px",
    },
    [theme.breakpoints.down("sm")]: {
      padding: "0 calc((100% - 700px)/2) 84px",
    },
    [theme.breakpoints.down("xs")]: {
      padding: "0 calc((100% - 365px)/2) 84px",
    },
    "& .contextInfo__container": {
      position: "relative",
      display: "flex",
      marginTop: "-40px",
      paddingBottom: "32px",
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
      },
      "& .contextInfo__info": {
        marginRight: "32px",
        flex: 1,
        display: "flex",
        position: "relative",
        [theme.breakpoints.down("sm")]: {
          paddingBottom: "32px",
          marginRight: 0,
        },
      },
      "& .contextInfo__certificate": {
        flex: 1,
        display: "flex",
        position: "relative",
      },
    },
    "& .contextInfo__infoCourse": {},
  },
  backLink: {
    display: "flex",
    fontFamily: "San Francisco Text",
    fontWeight: "600",
    fontSize: "16px",
    color: "#FFFFFF",
    "& .MuiSvgIcon-fontSizeSmall": {
      marginTop: "2px",
      fontSize: "1.1rem",
    },
    [theme.breakpoints.up("sm")]: {
      paddingLeft: "80px",
    },
    [theme.breakpoints.down("xs")]: {
      paddingLeft: "18px",
    },
  },
}));

function AdminDetail(props) {
  const classes = useStyles();
  const { getTranslation, user } = useAuth();
  const id = props.match.params.id;
  const [loading, setLoading] = useState(false);
  let history = useHistory();
  const links = useMemo(
    () => [
      { title: getTranslation("Home"), path: "/" },
      { title: getTranslation("MemberManagement"), path: "/users" },
    ],
    []
  );
  const titlePage = getTranslation("Profile");
  const [dataUser, setDataUser] = useState({});
  const { type } = queryString.parse(props.location.search);
  const isEdit = window.location.href.includes("detail");
  useEffect(() => {
    let mounted = true;
    const runAsync = async () => {
      try {
        if (mounted) {
          getDetailUser(id);
        }
      } catch (e) {
        if (mounted) {
          throw e;
        }
      }
    };
    runAsync();
    return () => (mounted = false);
  }, []);
  const getDetailUser = (id) => {
    UserService.detail(
      id,
      (res) => {
        setDataUser(res.data.data);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  function handleChangePage(item) {
    history.push(item.path);
  }

  function redirectEdit() {
    history.push(`/users/${id}/edit?type=${type}`);
  }

  function redirectChat() {
    history.push(`/chat/${id}`);
  }
  return (
    <>
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
            <div className="bannerDetail__banner__buttonGoback">
              <Link
                id="linkBack"
                component="button"
                variant="body2"
                classes={{
                  root: classes.backLink,
                }}
                onClick={() => {
                  history.goBack();
                }}
              >
                <ArrowBackIos fontSize="small" />
                {getTranslation("Back")}
              </Link>
            </div>
          </div>
          <div className="bannerDetail__banner__name">
            <div className="bannerDetail__banner__avatar">
              <Avatar
                className="bannerDetail__banner__avatar--img"
                alt="Remy Sharp"
                src={dataUser.avatar}
              />
            </div>
            <p className="bannerDetail__banner__content">{dataUser.name}</p>
          </div>
          <div className="bannerDetail__banner__button">
            {user.role == "admin" ? (
              <AddButton
                label={getTranslation("Edit")}
                id="update-button"
                buttonClass="button banners__button--edit"
                onClick={redirectEdit}
                variant="outlined"
                iconButton={<IconImage srcIcon={Edit} />}
              />
            ) : (
              ""
            )}
            {user.role == "admin" ? (
              ""
            ) : (
              <AddButton
                label={getTranslation("chat")}
                id="update-button"
                buttonClass="button banners__button--chat"
                onClick={redirectChat}
                variant="outlined"
                iconButton={<IconImage srcIcon={Chat} />}
              />
            )}
          </div>
        </div>
      </div>
      <div className={classes.contextInfo}>
        <div className="contextInfo__container">
          <div className="contextInfo__info">
            <Information dataUser={dataUser} location={props.location} />
          </div>
          <div className="contextInfo__certificate">
            <Certificate dataUser={dataUser} />
          </div>
        </div>
        <div className="contextInfo__infoCourse">
          <InfoCourse dataUser={dataUser} location={props.location} />
        </div>
      </div>
    </>
  );
}
export default AdminDetail;
