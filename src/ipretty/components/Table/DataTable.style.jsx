import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  rootTable: {
    width: '100%',
    position: "relative",
    "& table": {
      opacity: (props) => (props.loading ? 0.4 : 1),   
      [theme.breakpoints.down("xs")]: {
        paddingLeft: '18px',//fix bug 57 lỗi pading quan ly thong bao 
     },
      "& .MuiTableCell-head": {
        backgroundColor: "#147B65",
        "& .icon": {
          marginRight: 7
        }
      },
      "& .MuiTableCell-root:first-child": {
        paddingLeft: 17,
        textAlign: "center"
      },
      "& .MuiTableCell-head:first-child": {
        borderTopLeftRadius: 10,
        "& .MuiIconButton-root": {
          color: theme.palette.background.main
        }
      },
      "& .MuiTableCell-head:last-child": {
        borderTopRightRadius: 10,
      },
    },
    "& .MuiTableRow-root": {
      "& .MuiTableCell-body" : {
        fontFamily : "San Francisco Text !important",
        fontSize :14,
        fontWeight : 400,
        color : "#3D423C",
        "& img" : {
          width : 3
        },
        '& .makeStyles-tableCellStatus-87' : {
          fontFamily : "San Francisco Text !important",
        }
      },
      "&:hover": {
        backgroundColor: "#e2e2e2 !important",
        "& .MuiTableCell-root.MuiTableCell-body": {
          background: "transparent !important",
        },
      },
    },
    "& .MuiTableRow-head" : {
      "& th" : {
        fontFamily : "San Francisco Text Semibold",
        fontSize :14,
        fontWeight : 600,
        color : "#FFFFFF"
      }
    },

    "& .MuiInputBase-root.MuiInput-root": {
      padding: 0,
    },
    "& .MuiSelect-root.MuiSelect-select.MuiInput-input": {
      paddingLeft: 5,
    },
    "& span[class^='Pagination-rowsLabel']": {
      fontSize: 14,
      color: "#6A6F81",
    },
    "& .MuiTableSortLabel-root": {
      fontFamily: "San Francisco Text !important",
      fontWeight: 400,
      
      "&:hover": {
        color: "#fff",
      },
    },
    "& .MuiTableSortLabel-root.MuiTableSortLabel-active": {
      color: "#fff",
    },
    "& .MuiTableSortLabel-root .MuiTableSortLabel-icon": {
      color: "#fff !important",
    },
    "& .MuiButtonBase-root.MuiIconButton-root": {
      color: "#6A6F81",
      padding: 0,
      "&:hover": {
        // backgroundColor: "rgba(0, 0, 0, 0.04)",
        boxShadow: "0px 0px 5px 1px #00000015",
        zIndex: "1",
      },
    },
    "& .MuiButtonBase-root.MuiButton-root": {
      padding: 0,
      backgroundColor: "transparent",
      color: "#6A6F81",
      margin: "0 3",
      padding: 3,
      borderRadius: "50%",
      "&:hover": {
        backgroundColor: "rgba(0, 0, 0, 0.04)",
        boxShadow: "0px 0px 5px 1px #00000015",
        zIndex: "1",
      },
      "& .MuiButton-label": {
        width: 16,
        height: 16,
      },
    },
    "&.tableBorder": {
      "& .MuiTableBody-root .MuiTableCell-root": {
        borderBottom: "1px solid #ddd",
        borderLeft: "1px solid #ddd",
        "&:last-child": {
          borderRight: "1px solid #ddd",
        },
      },
    }
  },
  viewMore: {
    '& span.MuiTypography-root.MuiListItemText-primary.MuiTypography-body1.MuiTypography-displayBlock': {
      fontWeight: 'bold !important',
      fontSize: 20,
      color: '#395B65',
      fontFamily: 'San Francisco Text semibold',
    }
  },
  cellIdName: {
    display: "flex",
    alignItems: "center",
  },
  cellCenter: {
    justifyContent: "center",
  },
  cellAddressActions: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    whiteSpace: "normal",
  },
  cellActions: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    whiteSpace: "normal",
  },
  alignCenter: {
    "& div": {
      justifyContent: "center",
    },
  },
  tableCell: {
    whiteSpace: "nowrap",
    // width: "250px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    color: theme.palette.primary.submain,
    maxHeight: "21px",
    "& .MuiSvgIcon-colorPrimary": {
      fontSize: 7,
    },
    "& #myQuestion": {
      width: "250px",
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
    },
    "& #myQuestion > span": {
      width: "250px",
      overflow: "hidden",
      whiteSpace: "nowrap !important",
      textOverflow: "ellipsis",
      color: "#6A6F8E !important",
      backgroundColor: "transparent !important",
      fontFamily:
        '"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol",Dancing Script !important',
    },
    "& .imageCell__wrapper": {
      
    }
  },
  tableCellImage: {
    whiteSpace: "nowrap",
    // width: "250px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    color: theme.palette.primary.submain,
    "& .imageCell__wrapper": {
      "& .MuiAvatar-square": {
        justifyContent: 'flex-start',
        width: "77%",
        height: "127px",
        "& .MuiAvatar-img": {
          justifyContent: 'flex-start',
          width: "77%",
        }
      }
    }
  },
  tableCellStatus: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    color: theme.palette.primary.submain,
    maxHeight: "21px",
    "& .MuiSvgIcon-colorPrimary": {
      fontSize: 7,
    },
  },
  tableCellResult: {
    "& .img": {
      width: '13px !important',
      height: '13px !important'
    },
  },
  mRight8: {
    marginRight: theme.spacing(1),
  },
  firstCol: {
    display: "flex",
    alignItems: "center",
  },
  databaseMenu: {
    "& .memu-item": {
      color: '#395B65',
      fontWeight: 600,
      marginLeft: 10
    }
  },
  tableHead: {
    background: theme.palette.background.backgroundTableHead,
    color: "#FFFFFF",
    textTransform: "none",
    fontWeight: "400",
  },
  loading: {
    display: "flex",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  cell: {
    maxWidth: "350px",
  },
  cellError: {
    textDecoration: "line-through",
  },
  cellImgCertificate: {
    border: "2px outset",
    objectFit: "cover",
  },
  detailCell: {
    color: theme.palette.primary.main,
  },
  editColl :{
      '& img' :{
        width: "16px !important",
      }
  },
}));

export const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    minHeight: 0,
    // marginBottom: "15px",
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          paddingRight: "0 !important",
        }
      : {
          color: theme.palette.text.primary,
          paddingRight: "0 !important",
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
  mRight12: {
    marginRight: theme.spacing(1.5),
  },
  btnReject: {
    borderRadius: "10px !important",
    padding: "10px !important",
    width: "150px",
    color: "white !important",
    background: "#147B65 !important",
    "& .MuiButton-label": {
      width: "90px !important",
    },
  },
  btnAccept: {
    borderRadius: "10px !important",
    padding: "10px !important",
    background: "#147B65 !important",
    width: "150px",
    color: "white !important",
    "& .MuiButton-label": {
      width: "90px !important",
    },
  },
  titleAccept: {
    fontSize: "20px",
    fontWeight: "600",
    textAlign: "center",
  },
  contentAccept: {
    padding: "6px 30px",
    textAlign: "center",
  },
  pd0: {
    padding: 0,
  },
  btnConfirm: {
    border: "none !important",
    borderRadius: "5px !important",
    backgroundColor: "#144a82 !important",
    color: "#fff !important",
    fontWeight: 400,
    margin: "5px 0px !important",
    "& .MuiButton-label": {
      width: "100px !important",
      height: "30px  !important",
    },
  },
  buttonPopup: {
    display: "flex",
    justifyContent: "center",
    paddingBottom: "30px",
  },
  titlePopup: {
    display: "flex",
    justifyContent: "center",
  },
}));
