import React from "react";
import { makeStyles, Tooltip } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  icon: {
    "& img": {
      // width: "100%",//fix bug icon quản lý thông báo to
      maxWidth: "100%",
      height: "auto",
      objectFit: "contain",
    },
  },
  iconPagi: {
    width: "12px",
    height: "12px",

    "& img": {
      maxWidth: "100%",
      width: "100%",
      height: "auto",
      objectFit: "contain",
    },
  },
  icon16: {
    width: "16px",
    height: "20px",
    [theme.breakpoints.down("xs")]: {
      width: "14px",//bug 98 
    },

    "& img": {
      maxWidth: "100%",
      width: "100%",
      height: "auto",
      objectFit: "contain",
    },
  },
  mr10: {
    [theme.breakpoints.up("sm")]: {
      margin: "10px",
      marginRight: 25,
    },
    [theme.breakpoints.down("xs")]: {
      margin: "2px",
    },

    "&:hover": {
      cursor: "pointer",
    },
  },
  icon24: {
    [theme.breakpoints.up("sm")]: {
      width: "24px",
      height: "24px",
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    [theme.breakpoints.down("xs")]: {
      width: "24px",
      height: "24px",
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
  icon20: {
    width: '24px',
    height: '24px',//fix bug 30 icon Huy bị nhỏ trên mobileheader-dialog
  },
}));

function IconImage(props) {
  const classes = useStyles();
  const {
    icon,
    srcIcon,
    title,
    isMr10,
    isPagi,
    className,
    onClick,
    icon20,
    icon16,
  } = props;

  return (
    <>
      <div
        className={
          isMr10
            ? classes.mr10 + " " + classes.icon + " " + classes.icon24
            : isPagi && className
            ? classes.iconPagi + " " + className
            : isPagi
            ? classes.iconPagi
            : icon16
            ? classes.icon16
            : icon20
            ? classes.icon20 + " " + classes.icon
            : classes.icon24 + " " + classes.icon
        }
      >
        {title ? (
          <Tooltip title={title} onClick={onClick}>
            <img src={srcIcon} alt={title}></img>
          </Tooltip>
        ) : (
          <img onClick={onClick} src={srcIcon} alt={""}></img>
        )}
      </div>
    </>
  );
}

export default IconImage;
