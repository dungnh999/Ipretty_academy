import React from "react";
import PropTypes from "prop-types";
import { Link, Hidden , makeStyles} from "@material-ui/core";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  imgStyle: {
    objectFit: "contain",
      [theme.breakpoints.down("sm")]: {
        "& > img":{
        objectFit: "contain",
      },
    }
  },
}));

function Logo({ size, variant, logoSrc, history, user, match, isAdminPage }) {
  const classes = useStyles();
  switch (variant) {
    case "headerStudent":
      return (
        <Link
          component="button"
          onClick={() => {
            history.push("/");
          }}
        >
          <img
            className={classes.imgStyle}
            alt="ipretty logo"
            src={logoSrc}
            width={size}
            height={size}
          />
        </Link>
      );
    case "textLess":
      return (
        <Link
          component="button"
          onClick={() => {
            // history.push("/overview/student");
            history.push("/overview");
          }}
        >
          <img
            alt="Ipretty Education Logo"
            src={logoSrc}
            width={size}
            height={size}
            className={classes.imgStyle}
          />
        </Link>
      );
    case "animated":
      return (
        <Link
          component="button"
          onClick={() => {
            isAdminPage ? history.push('/login-admin') : history.push('/')
          }}
        >
          <img alt="Ipretty Education Logo" src={logoSrc} height={size} className={classes.imgStyle}/>
        </Link>
      );
    case "mobile":
      return (
        <Link
        component="button"
        onClick={() => {
          history.push("/");
        }}
      >
        <img
          alt="Ipretty Education Logo"
          src={logoSrc}
          width='100px'
          height='auto'
          className={classes.imgStyle}
        />
      </Link>
      ); 
    default:
      return (
        <Link
          component="button"
          onClick={() => {
            history.push("/")
          }}
        >
          <Hidden smDown>
            <img alt="Ipretty Education Logo" src={logoSrc} height="50px" width="120px" />
          </Hidden>
          <Hidden mdUp>
            <span className={classes.imgStyle}>
              <img
                alt="Ipretty Education Logo"
                src={logoSrc}
                width="100%"
                height={size}
                className={classes.imgStyle}
              />
            </span>
          </Hidden>
        </Link>
      );
  }
}

Logo.defaultProps = {
  size: 'auto',
  variant: "default",
};

Logo.propTypes = {
  // size: PropTypes.isRequired,
  variant: PropTypes.oneOf(["default", "textLess", "animated", 'headerStudent', 'mobile']),
};

export default withRouter(Logo);