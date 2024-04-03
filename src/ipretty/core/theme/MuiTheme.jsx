import { createTheme } from '@material-ui/core/styles'
import { grey, red } from "@material-ui/core/colors";
import createBreakpoints from "@material-ui/core/styles/createBreakpoints";
const breakpoints = createBreakpoints({});
import { color } from './theme';

const COLORS = {
  background: "linear-gradient(180deg, #395B65 0%, #147B65 100%)",
  backgroundMain: "#F5F6FB 0% 0% no-repeat padding-box",
  backgroundMenuSide: "#F3F9FF",
  backgroundTableHead: "#147B65",
  backgroundTableBody: "#E8F3FF",
  bacgroundInput: "#F7F8FD",
  colorButton: "#147B65",
  colorText: "#FFFFFF",
  colorTextSelected: "#191717",
  colorTextTypo: "#707070",
  mainColor: "#147B65",
  paperColor: "#fff",
  checkedBox : '#6F9396',
  hoverColor: '#44AD92',
  textColorHide: '#DADFD9',
  ovewViewTitle: '#395B65',
  colorNameLesson: '#1A1A1A',
  colorTextTitle : '#27384C',
  colorTextHeader : '#3D423C',
  colorReply: '#075740',
  colorError: '#C80024',
  backgroundBtnLike: '#F3F3F3',
};

const FONTS = {
  textFont: 'San Francisco Text',
  textBoldFont: 'San Francisco Text Bold',
  textBoldG1Font: 'San Francisco Text Bold G1',
  textSemiBoldFont: 'San Francisco Text Semibold',
  textDisplayFont: 'San Francisco Display',
}
const theme = createTheme({
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      `"${FONTS.textFont}"`,
      `"${FONTS.textBoldFont}"`,
      `"${FONTS.textBoldG1Font}"`,
      `"${FONTS.textSemiBoldFont}"`,
      `"${FONTS.textDisplayFont}"`,
      '"Montserrat"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
      "Dancing Script",
    ].join(","),
    body2: {
      color: "#6A6F81",
      fontSize: 15,
    },
    h6: {
      fontSize: 26,
      fontWeight: 400,
      color: COLORS.colorTextHeader,
      fontFamily: FONTS.textSemiBoldFont,
    },
    h3: {
      color: COLORS.mainColor,
      fontFamily: FONTS.textBoldG1Font,
    },
    h1: {
      color: COLORS.mainColor,
      fontSize: 32,
      fontFamily: FONTS.textSemiBoldFont,
    },
    subtitle2: {
      fontSize: 14,
      fontWeight: "bold",
      textTransform: "uppercase",
    },
  },
  overrides: {
    // Name of the component ⚛️ / style sheet
    MuiTypography: {
      root: {
        color: COLORS.colorTextTypo,
        fontFamily: FONTS.textFont
      },
      body1: {
        fontSize: 16,
      },
      body2: {
        fontSize: 14,
        color: COLORS.textColorHide
      },
      h2: {
        fontSize: 20,
        fontWeight: 700,
        lineHeight: '28px'
      },
      subtitle1: {
        fontSize: 14,
        color: "#AFBBC8",
      },
      subtitle2: {
        fontSize: 12,
        color: "#395B65",
        textTransform: 'initial',
        fontWeight: 400
      },
    },
    MuiTextField: {
      root: {
        "& .Mui-disabled": {
          // color: '#6A6F81'
        },
      },
    },
    MuiInputBase: {
      root: {
        color: "#6A6F81",
        fontSize: 16,
        background: COLORS.paperColor,
        // padding: "8px 24px", 
      },
    },
    MuiInput: {
      root: {
        borderRadius: 5,
        padding: "2px 16px", 
        marginRight: "0px !important", //fixbug86
        background: COLORS.paperColor,
        fontSize: 14,
        "& input::placeholder": {
          fontStyle: "normal",
        },
        "& .MuiInputBase-input": {
          // padding: '9px 0px 9px 9px',
          // padding: '6px 7px 7px',//pading seach
        },
      },
      underline: {
        background: COLORS.bacgroundInput,
        padding: 0,
        "&:before": {
          border: "none",
          borderBottom: "none",
        },
        "&.Mui-disabled:before": {
          borderBottomStyle: "solid",
        },
        underline: {
          background: COLORS.bacgroundInput,
          padding: 0,
          "&:before": {
            border: "none",
            borderBottom: "none",
          },
          "&.Mui-disabled:before": {
            borderBottomStyle: "none",
          },
          "&.MuiInput-underline:hover:not(.Mui-disabled):before": {
            borderColor: COLORS.colorButton,
          },
          "&:after": {
            // borderBottomStyle: 'solid'
            background: COLORS.background,
          },
        },
      },
    },
    MuiDrawer: {
      root: {
        "& .MuiListItemText-primary": {
          color: "#6A6F81",
        },
      },
    },
    MuiPaper: {
      elevation1: {
        boxShadow: '0px 4px 10px rgb(10 80 58 / 10%)'

      }
    },
    MuiPopover: {
      root : {
        '& .MuiPopover-paper' : {
          overflowX: "hidden",//Lỗi UI viền trắng dưới pop-up menu
          overflowY: "auto",//fix Lỗi UI viền trắng dưới pop-up menu
          '& ul ' : {
            maxHeight: 340,//fix thanh nav 
            // overflow:"auto",//fix bug 74 Không hiển thị đủ danh sách giảng viên đang có 
          }
        }
      }
    },
    MuiButton: {
      // Name of the rule
      root: {
        textTransform: "unset",
        boxShadow: "none",
        fontSize: 16,
        color: "#6A6F81",
        borderRadius: 5,
        "&.Mui-disabled": {
          "& .MuiButton-label span.labelLoading": {
            visibility: 'hidden'
          },
          "& .MuiButton-label .loading_spinner": {
            display: 'flex',
            flexDirection: 'row',
            "& > div:not(.MuiCircularProgress-root)": {
              visibility: 'hidden',
            },
            "& .MuiCircularProgress-root": {
              position: 'absolute',
              left: 0,
              right: 0,
              marginLeft: 'auto',
              marginRight: 'auto',
              "&.MuiCircularProgress-colorPrimary": {
                color: 'rgba(0, 0, 0, 0.26)'
              }
            },
          },
          "& .MuiCircularProgress-root": {
            position: 'absolute',
            left: 0,
            right: 0,
            marginLeft: 'auto',
            marginRight: 'auto',
            "&.MuiCircularProgress-colorPrimary": {
              color: 'rgba(0, 0, 0, 0.26)'
            }
          },
        },

      },
      textPrimary: {
        background: COLORS.paperColor,
      },
      textSecondary: {
        background: COLORS.paperColor,
      },
      text: {
        background: "#00B0B9", // ???
        color: COLORS.paperColor, // ???
        padding: "8px 16px", // ???
      },
      contained: {
        backgroundColor: COLORS.mainColor,
        color: COLORS.paperColor,
        fontSize: 14,//fix size button khogn dong nhat
        fontWeight: "bold",
        minWidth: 120,
        boxShadow: "none",
        fontFamily: FONTS.textSemiBoldFont,
        "&.Mui-disabled": {
          color: COLORS.paperColor
        },       
      },
      outlined: {
        padding: "8px 16px",
        // color: '#00B0B9',
        // borderColor: '#00B0B9'
        color: COLORS.colorButton,
        borderColor: COLORS.colorButton,
      },
    },
    MuiToolbar: {
      root: {
        "& .MuiPickersToolbarButton-toolbarBtn": {
          background: "#147B65",
        },
      },
    },
    MuiTable: {
      root: {
        tableLayout: "auto!important",
      },
    },
    MuiTableRow: {
      root: {
        cursor: "pointer",
        "& .MuiTableCell-root:first-child": {
          paddingLeft: 17,
        },
      },
      head: {
        "& .MuiTableCell-head:first-child": {
          borderTopLeftRadius: 10,
        },
        "& .MuiTableCell-head:last-child": {
          borderTopRightRadius: 10,
        },
      },
    },
    MuiTableHead: {
      root: {
        "& .MuiTableCell-head": {
          backgroundColor: COLORS.backgroundTableHead,
        },
      },
    },
    MuiTableBody: {
      root: {
        "& .MuiTableRow-root:nth-child(even) .MuiTableCell-root": {
          backgroundColor: COLORS.backgroundTableBody,
        },
        "& .MuiTableRow-root:nth-child(odd) .MuiTableCell-root": {
          backgroundColor: COLORS.paperColor,
        },
      },
    },
    MuiTableCell: {
      root: {
        borderBottom: "none",
        padding: "10px 16px",
        cursor: "pointer",
        "& .MuiCheckbox-colorSecondary.Mui-checked": {
          color: "#6e7172",
        },
      },
      body: {
        fontSize: 15,
        color: "#6A6F81",
        background: COLORS.paperColor,
        borderBottom: "1px solid #F3F4F5",
      },
      head: {
        backgroundColor: "#eff6f8",
        color: "#c9cbcb",
      },
    },
    TableHeaderCell: {
      cell: {
        color: "#4C5A6A",
        fontSize: 14,
        textTransform: "uppercase",
        fontWeight: 600,
        backgroundColor: COLORS.backgroundTableHead,
      },
    },
    MuiDialogContent: {
      root: {
        padding: "0 24px",
        "@media screen and (max-height: 750)": {
          padding: "0 9px",//fix ma giam gia
        },
        "@media screen and (min-height: 850px)": {
          padding: "0 25px",//fix ma giam gia
        },
        "& .MuiGrid-container": {
          marginTop: 0,
          marginBottom: 0,
        },
      },
    },
    MuiSkeleton: {
      root: {
        backgroundColor: "rgb(50 50 50 / 0.2)",
      },
    },
    MuiCssBaseline: {
      "@global": {
        "*": {
          "scrollbar-width": "thin",
        },
        "*::-webkit-scrollbar": {
          width: "5px",
        },
        "*::-webkit-scrollbar-track": {
          boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
          webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
        },
        "*::-webkit-scrollbar-thumb": {
          backgroundColor: "rgba(136,136,136,.5)",
          // outline: '1px solid slategrey',
          zIndex: "999",
        },
        h6: {
          fontWeight: 400,
          color: COLORS.colorTextHeader,
          fontFamily: FONTS.textSemiBoldFont,
        },
        h3: {
          color: COLORS.mainColor,
          fontFamily: FONTS.textBoldG1Font,
        },
        h1: {
          color: COLORS.mainColor,
          fontSize: 32,
          fontFamily: FONTS.textBoldFont,
        },
      },
    },
    MuiSwitch: {
      root: {
        "& .MuiSwitch-colorSecondary.Mui-checked": {
          color: COLORS.paperColor,
        },
        "& .MuiSwitch-track": {
          backgroundColor: "#DDD",
          opacity: 1,
        },
        "& .MuiSwitch-colorSecondary.Mui-checked + .MuiSwitch-track": {
          backgroundColor: COLORS.colorButton,
          opacity: 1,
        },
      },
    },
    MuiSelectSelect: {
      paddingRight: 5,
    },
    // PageSizeSelector: {
    //     padding: 0
    // }
  },
  palette: {
    primary: {
      // main: '#00B0B9',
      main: COLORS.mainColor,
      light: "#6A6F81",
      background: COLORS.paperColor,
      header: "#444444",
      tab: "000",
      colorText: COLORS.colorText,
      colorTextSelected: COLORS.colorTextSelected,
      colorButton: COLORS.colorButton,
      backgroundGradient: COLORS.background,
      backgroundMenuSide: COLORS.backgroundMenuSide,
      backgroundTableHead: COLORS.backgroundTableHead,
      checked: COLORS.checkedBox,
      colorHoverButton: COLORS.hoverColor,
      colorHideText: COLORS.textColorHide,
      colorOvewViewTitle: COLORS.ovewViewTitle,
      colorNameLesson: COLORS.colorNameLesson,
      colorTextHeader: COLORS.colorTextHeader,
      colorReply: COLORS.colorReply,
      colorError: COLORS.colorError,
      backgroundBtnLike: COLORS.backgroundBtnLike,
    },
    secondary: {
      main: "#6A6F81",
      light: "#fff9f3",
      submain: COLORS.paperColor,
      selectmain: "#bdbdbd",
    },
    background: {
      main: COLORS.paperColor,
      default: "#E5E5E5",
      white: COLORS.paperColor,
      opacity: "#E9ECEF",
      backgroundMain: COLORS.backgroundMain,
      backgroundTableHead: COLORS.backgroundTableHead,
      backgroundGradient: COLORS.background,
      backgroundMenuSide: COLORS.backgroundMenuSide,
    },
    error: red,
    success: {
      main: "#4caf50",
    },
    grey,
    type: "light",
  },
});

export default theme;
