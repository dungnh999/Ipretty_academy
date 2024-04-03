

import React, { useEffect, useState } from "react";
import { makeStyles, Hidden, Badge } from "@material-ui/core";
import DashboardWhiteIcon from "public/icons/dashboard_white.png";
import IconChatFeature from "public/icons/chatt.png";
import EnWhiteIcon from "public/icons/en_white.png";
import ViWhiteIcon from "public/icons/vi_white.png";
import AccountSettingAdmin from "./AccountSettingAdmin";
// import NotificationNew from "./../../NotificationNew";
import { MenuItem, Select } from "@material-ui/core";
import IconImage from "ipretty/components/IconImage";
// import LeftPanelMini from "ipretty/core/layout/LeftPanelMini";
import { useAuth } from "ipretty/context/AppProvider";
import useNavigator from "ipretty/hook/useNavigator";

const useStyles = makeStyles((theme) => ({
  dFLexCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& .MuiAvatar-root": {
      [theme.breakpoints.down("sm")]: {
      width: '25px',
      height: '25px', 
      } 
    },
    "& .MuiIconButton-edgeEnd": {
      [theme.breakpoints.down("xs")]: {
        marginRight: '0px'
      },
    }
  },
  language: {
    background: "none",
    "& .MuiSelect-select.MuiSelect-select": {
      [theme.breakpoints.down("xs")]: {
        paddingRight: '0px',
        "& .MuiList-root": {
          marginRight: '-8px',
          marginLeft: '-8px'
        }
      }, 
    },
  },
}));

function HeaderAdmin(props) {
  const classes = useStyles();
  const { user, changeLanguage, getTranslation } = useAuth();
  const [lang, setLang] = useState(user && user.lang || "vi");
  const navigate = useNavigator()
  const handleChange = (event) => {
    const value = {
      lang: event.target.value,
    };
    setLang(value.lang);
    changeLanguage(value);
  };

  const onClick = () => {
    navigate("/forum");
  };
  const chatFeature = () => {
    navigate("/chat");
  };
 
  return (
    <>
      <Hidden smDown>
        <div className={classes.dFLexCenter}>
          <AccountSettingAdmin />
        </div>
      </Hidden>
      <div style={{ marginLeft: "-40px" }}>
        {/* <Hidden mdUp>
        <LeftPanelMini/>
      </Hidden> */}
      </div>
      <div className={classes.dFLexCenter}>
        
        <Badge badgeContent={4} color="secondary">
          <IconImage
            isMr10
            title={getTranslation("Message")}
            srcIcon={IconChatFeature}
            onClick={() => chatFeature()}
          />
        </Badge>
        <IconImage
          isMr10
          title={getTranslation("Diễn đàn")}
          srcIcon={DashboardWhiteIcon}
          onClick={() => { navigate('/published-faqs') }}
        />
        {/* <NotificationNew /> */}
        {/* <IconImage isMr10 title={'NotifiWhiteIcon'} srcIcon={NotifiWhiteIcon} /> */}
        <Select
          value={lang}
          onChange={(e) => handleChange(e)}
          disableUnderline
          className={classes.language}
          IconComponent={() => null}
        >
          <MenuItem value="en" style={{ background: "#147B65" }}>
            <img src={EnWhiteIcon} />
          </MenuItem>
          <MenuItem value="vi" style={{ background: "#147B65" }}>
            <img src={ViWhiteIcon} />
          </MenuItem>
        </Select>
        <Hidden mdUp>
          <div className={classes.dFLexCenter}>
            <AccountSettingAdmin />
          </div>
        </Hidden>
      </div>
    </>
  );
}
export default HeaderAdmin;