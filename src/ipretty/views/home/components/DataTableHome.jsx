import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import { AutoSizer, Column, Table } from "react-virtualized";
import { TableCell, Paper, Tooltip } from "@material-ui/core";
import StarIcon from "@material-ui/icons/Star";
import IconImage from "ipretty/components/IconImage";
import Down from "../../../../public/icon_svg/Arrow - Down.svg";
import Up from "../../../../public/icon_svg/Arrow - Up.svg";
import Avatar from "../../../../public/icon_svg/Avatar.svg";
import contextHelper from "ipretty/helpers/contextHelper";

const styles = (theme) => ({
  flexContainer: {
    display: "flex",
    alignItems: "center",
    boxSizing: "border-box",
  },
  MuiTableCell: {
    padding: '10px 15px',
  },
  table: {
    // temporary right-to-left patch, waiting for
    // https://github.com/bvaughn/react-virtualized/issues/454
    "& .ReactVirtualized__Table__headerRow": {
      flip: false,
      paddingRight: theme.direction === "rtl" ? "0 !important" : undefined,
    },
  },
  tableRow: {
    cursor: "pointer",
  },
  tableRowHover: {
    "&:hover": {
      backgroundColor: theme.palette.grey[200],
    },
  },
  tableCell: {
    flex: 1,
    "& .MuiTableCell-head": {
      background: "#F4F6F3",
      color: "#576F84",
    },
  },
  noClick: {
    cursor: "initial",
  },
  rowStyle: {
    fontFamily: "San Francisco Text",
    fontSize: 14,
    color: "#395B65",
    marginLeft: "10px",
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      justifyContent: 'center',
      marginLeft: "-13px",
    },
  },
  headerStyle: {
    backgroundColor: "#F4F6F3",
    color: "#576F84",
    fontWeight: "600",
    fontSize: 12,//fix size thanh vien nổi bật 
    fontFamily: "San Francisco Text",
  },
  avatar: {
    display: "flex",
    alignItems: "center",
    "& img": {
      width: 35,
      height: 35,
      borderRadius: "50px",
      objectFit: "cover",
    },
    "& .title--name": {
      paddingLeft: 18,
      fontFamily: "San Francisco Text",
      fontWeight: "600",
      fontSize: 14,
      color: "#395B65",
      width: "100px",
      [theme.breakpoints.down("xs")]: {
        width: "81px",
        fontSize: 11,// fix Danh mục nổi bật: Table list size chữ lớn
      }, //fix lỗi responsive màn 11,15,17
    },
  },
  star: {
    display: "flex",
    alignItems: "center",
    "& svg": {
      width: 16,
    },
    "& .scoreRating": {
      fontSize: 14,
      paddingLeft: 5,
      paddingTop: 2,
    },
  },
  ratio: {
    display: "flex",
    alignItems: "center",
    "& img": {
      width: 14,
      height: 14,
    },
    "& .scoreRatioUp": {
      color: "#147B65",
      fontWeight: 600,
      fontSize: 14,
      // paddingBottom: 6,
      width: "38px", //fix lỗi responsive màn 11,15
      overflow: 'hidden',
      display: '-webkit-box',
      WebkitBoxOrient: 'vertical',
      WebkitLineClamp: 1,
      'text-overflow': 'ellipsis',
      'word-break': 'break-all',
    },
    "& .scoreRatioDown": {
      color: "#DC4F68",
      fontWeight: 600,
      fontSize: 14,
      // paddingBottom: 6,
      width: "38px",
      overflow: 'hidden',
      display: '-webkit-box',
      WebkitBoxOrient: 'vertical',
      WebkitLineClamp: 1,
      'text-overflow': 'ellipsis',
      'word-break': 'break-all',
    },
  },
});

class MuiVirtualizedTable extends React.PureComponent {
  static defaultProps = {
    headerHeight: 72,
    rowHeight: 72,
  };

  getRowClassName = ({ index }) => {
    const { classes, onRowClick } = this.props;

    return clsx(classes.tableRow, classes.flexContainer, {
      [classes.tableRowHover]: index !== -1 && onRowClick != null,
    });
  };

  cellRenderer = ({ cellData, columnIndex }) => {
    const { columns, classes, rowHeight, onRowClick } = this.props;
    const { compactText } = contextHelper;

    return (
      <TableCell
        component="div"
        className={clsx(
          classes.tableCell,
          classes.flexContainer,
          classes.rowStyle,
          {
            [classes.noClick]: onRowClick == null,
          }
        )}
        variant="body"
        style={{ height: rowHeight }}
        align={
          (columnIndex != null && columns[columnIndex].numeric) || false
            ? "center"
            : "left"
        }
      >
        {cellData ? (
          cellData.type === "avatar" ? (
            <span className={classes.avatar}>
              <img alt="Fail" src={cellData.image ? cellData.image : Avatar} />
              <Tooltip title={cellData.title || ""}>
                <span className="title--name">
                  {compactText(cellData.title, 20)}
                </span>
              </Tooltip>
            </span>
          ) : cellData.type === "star" ? (
            <span className={classes.star}>
              
              <StarIcon color="primary" />
              <Tooltip title={cellData.scoreRating || ""}>
              <span className="scoreRating">
                {cellData.scoreRating
                  ? parseFloat(cellData.scoreRating).toFixed(1)
                  : "0.0"}
              </span>
              </Tooltip>
            </span>
          ) : cellData.type === "ratio" ? (
            cellData.isRatio ? (
              <span className={classes.ratio}>
                <IconImage srcIcon={Up} />
                <Tooltip title={cellData.scoreRatio || ""}>
                <span className="scoreRatioUp">
                  {compactText(cellData.scoreRatio,1)}%</span>
                </Tooltip>
              </span>
            ) : (
              <span className={classes.ratio}>
                <IconImage className="imgDow" srcIcon={Down} />
                <Tooltip title={cellData.scoreRatio || ""}>
                <span className="scoreRatioDown">
                {compactText(cellData.scoreRatio,1)}%</span>
                
                </Tooltip>
                
              </span>
            )
            
          ) : (
            cellData
          )
        ) : (
          ""
        )}
      </TableCell>
    );
  };

  headerRenderer = ({ label, columnIndex }) => {
    const { headerHeight, columns, classes } = this.props;

    return (
      <TableCell
        component="div"
        className={clsx(
          classes.tableCell,
          classes.flexContainer,
          classes.noClick,
          classes.headerStyle
        )}
        variant="head"
        style={{ height: headerHeight }}
        align={columns[columnIndex].numeric || false ? "center" : "left"}
      >
        <span>{label}</span>
      </TableCell>
    );
  };

  render() {
    const { classes, columns, rowHeight, headerHeight, ...tableProps } =
      this.props;
    return (
      <AutoSizer>
        {({ height, width }) => (
          <Table
            height={height}
            width={width}
            rowHeight={rowHeight}
            gridStyle={{
              direction: "inherit",
            }}
            headerHeight={headerHeight}
            className={classes.table}
            {...tableProps}
            rowClassName={this.getRowClassName}
          >
            {columns.map(({ dataKey, ...other }, index) => {
              return (
                <Column
                  key={dataKey}
                  headerRenderer={(headerProps) =>
                    this.headerRenderer({
                      ...headerProps,
                      columnIndex: index,
                    })
                  }
                  className={classes.flexContainer}
                  cellRenderer={this.cellRenderer}
                  dataKey={dataKey}
                  {...other}
                />
              );
            })}
          </Table>
        )}
      </AutoSizer>
    );
  }
}

const VirtualizedTable = withStyles(styles)(MuiVirtualizedTable);

export default function ReactVirtualizedTable(props) {
  const { rows, columns } = props;
  return (
    <Paper style={{ height: 300, width: "100%" }}>
      <VirtualizedTable
        rowCount={rows.length}
        rowGetter={({ index }) => rows[index]}
        columns={columns}
      />
    </Paper>
  );
}

MuiVirtualizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      dataKey: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      numeric: PropTypes.bool,
      width: PropTypes.number.isRequired,
    })
  ).isRequired,
  headerHeight: PropTypes.number,
  onRowClick: PropTypes.func,
  rowHeight: PropTypes.number,
};
