import React, { useState } from "react";
import PropTypes from "prop-types";
import {
    IntegratedSorting,
    SortingState,
    SelectionState,
    IntegratedSelection,
    PagingState,
    CustomPaging,
    IntegratedPaging,
} from "@devexpress/dx-react-grid";
import {
    Grid,
    Table,
    TableHeaderRow,
    TableSelection,
    PagingPanel,
} from "@devexpress/dx-react-grid-material-ui";
import { useStyles } from "./DataTable.style";
import Cell from "./Cell";
import HeaderCell from "./HeaderCell";
import EnhancedTableToolbar from "./EnhancedTableToolbar";
import TableRow from "./TableRow";
import TableLoading from "./TableLoading";
import { useAuth } from "ipretty/context/AppProvider";

function DataTable(props) {
    const {
        rows,
        loading,
        columns,
        pathname,
        defaultSorting,
        optPaging,
        handleClickRow,
        selectByRowClick,
        selected,
        fieldId,
        pageSizes,
        classeNameCustom,
        lang,
        handleDeleteById,
        handlePageChange,
        redirectDetail,
        handleDelete,
        noSelection,
        handleDetail,
        dataImport,
        setDataImport,
        handleEdit,
        paging
    } = props;

    const getRowId = (row) => (fieldId ? row[fieldId] : row.id);
    const classes = useStyles(props);
    const { getTranslation } = useAuth()
    const sortingStateColumnExtensions = [
        { columnName: "company_id", sortingEnabled: false },
        { columnName: "course_id", sortingEnabled: false },
        { columnName: "project_id", sortingEnabled: false },
        { columnName: "classroom_id", sortingEnabled: false }
    ];
    const [selection, setSelection] = useState(() =>
        selected ? selected.map((item) => item[fieldId || "id"]) : []
    );
    const [selectionArray, setSelectionArray] = useState(selected || []);

    const onChangePage = (page) => {
        handlePageChange({ ...optPaging, page: +page + 1 });
    };
    const onChangePageSize = (limit) => {
        const currentFirstRow = (optPaging.page - 1) * +optPaging.perpage + 1;
        optPaging.page = Math.ceil(currentFirstRow / limit);
        handlePageChange({ ...optPaging, perpage: limit });
    };

    const onChangePageSizeNoPaging = (limit) => {
        handlePageChange(limit);
    }

    const resetSelects = () => {
        setDataImport([])
        setSelection([]);
    };

    const onSelectChange = (selects) => {
        if (selected) {
            const selectObj = {};
            const typeSelect = selects.length - selection.length;
            if (typeSelect === 1) {
                selectObj.type = "select";
                selectObj.id = selects.find((x) => !selection.includes(x));
            } else if (typeSelect === -1) {
                selectObj.type = "deselect";
                selectObj.id = selection.find((x) => !selects.includes(x));
            } else if (typeSelect > 1) {
                selectObj.type = "selectAll";
                selectObj.ids = selects.filter((x) => !selection.includes(x));
            } else if (typeSelect < -1) {
                selectObj.type = "deselectAll";
                selectObj.ids = selection.filter((x) => !selects.includes(x));
            }

            switch (selectObj.type) {
                case "select": {
                    const objSelects = rows.find(
                        (row) => row[fieldId || "id"] === selectObj.id
                    );
                    setSelectionArray([...selectionArray, objSelects]);
                    break;
                }
                case "deselect": {
                    const newSelectionArray = selectionArray.filter(
                        (s) => s[fieldId || "id"] !== selectObj.id
                    );
                    setSelectionArray([...newSelectionArray]);
                    break;
                }
                case "selectAll": {
                    const newSelections = rows.filter((row) =>
                        selectObj.ids.includes(row[fieldId || "id"])
                    );
                    setSelectionArray([...selectionArray, ...newSelections]);
                    break;
                }
                case "deselectAll": {
                    const newSelectionArray = selectionArray.filter(
                        (s) => !selectObj.ids.includes(s[fieldId || "id"])
                    );
                    setSelectionArray([...newSelectionArray]);
                    break;
                }
            }
        }
        setDataImport && setDataImport(selects)
        setSelection(selects);
    };

    return (
        <div className={`${classes.rootTable} ${classeNameCustom}`}>
            <Grid rows={rows} columns={columns} getRowId={getRowId}>
                <TableLoading loading={loading} />

                <SortingState
                    columnExtensions={sortingStateColumnExtensions}
                    defaultSorting={defaultSorting || []}
                />
                {optPaging ? (
                    <PagingState
                        currentPage={optPaging.page - 1}
                        onCurrentPageChange={onChangePage}
                        pageSize={+optPaging.perpage}
                        onPageSizeChange={onChangePageSize}
                    />
                ) : (
                    <PagingState
                        defaultCurrentPage={0}
                        pageSize={paging.total}
                        onPageSizeChange={onChangePageSizeNoPaging}
                    />
                )}

                <SelectionState
                    selection={selection}
                    onSelectionChange={onSelectChange}
                />

                {optPaging && <CustomPaging totalCount={+optPaging.total} />}

                <IntegratedSorting />

                {!optPaging && <IntegratedPaging />}

                <IntegratedSelection />

                <Table
                    messages={{ noData: loading ? "" : getTranslation("noData") }}
                    cellComponent={(row) => (
                        <Cell
                            row={row}
                            lang={lang}
                            handleDeleteById={handleDeleteById}
                            pathname={pathname}
                            getTranslation={getTranslation}
                            redirectDetail={redirectDetail}
                            handleDetail={handleDetail}
                            handleEdit={handleEdit}
                        />
                    )}
                    rowComponent={({ children, row }) => (
                        <TableRow
                            row={row}
                            children={children}
                            handleClickRow={handleClickRow}
                        />
                    )}
                />

                <EnhancedTableToolbar
                    rows={rows}
                    selection={selection}
                    selected={selected || []}
                    fieldId={fieldId || "id"}
                    selectionArray={selectionArray}
                    handleDelete={handleDelete}
                    resetSelects={resetSelects}
                />

                <TableHeaderRow
                    showSortingControls
                    messages={{ sortingHint: "" }}
                    cellComponent={HeaderCell}
                />

                {!noSelection && <TableSelection
                    showSelectAll={true}
                    showSelectionColumn={true}
                    selectByRowClick={selectByRowClick}
                />}

                {optPaging ? (
                    <PagingPanel
                        pageSizes={pageSizes || [5, 10, 20, 30, 50, 100]}
                        messages={{
                            rowsPerPage: "",
                            info: `[{from} - {to}] / ${optPaging.total}`,
                            showAll: "214",
                        }}
                    />
                ) : (
                    <PagingPanel
                        pageSizes={pageSizes || [5, 10, 20, 30, 50, 100]}
                        messages={{
                            rowsPerPage: "",
                            info: `[{from} - {to}] / ${rows.length}`,
                            showAll: "214",
                        }}
                    />
                )}
            </Grid>
        </div>
    );
}

DataTable.defaultProps = {
    lang: "en",
};

DataTable.propTypes = {
    rows: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    lang: PropTypes.string,
    addressWithActions: PropTypes.bool,
    withFilter: PropTypes.bool,
    defaultSorting: PropTypes.array,
    handlePageChange: PropTypes.func,
    handleDelete: PropTypes.func,
    handleExport: PropTypes.func,
    handleClickRow: PropTypes.func,
    handleDeleteById: PropTypes.func,
};

export default DataTable;
