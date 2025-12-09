import React, {ReactNode, useState, useCallback, useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import PaginationLinks from 'jsx/PaginationLinks';
import {CTA} from 'jsx/Form';

// FIXME: Sorting broken :(
// FIXME: DynamicTable??
// FIXME: Confirm nullTableShow not used
// FIXME: Download CSV
// FIXME: No result found.
// FIXME: Figure out why rendering slower than class component

type TableCellData = (string|null)
type TableRowData = TableCellData[]

type Field = {
    show: boolean
    label: string
}

type Action = {
	show: boolean
	name?: string
	label: string
	action: () => void
}
type hideOptions = {
    rowsPerPage: boolean
    downloadCSV: boolean
    defaultColumn: boolean
}
type DataTableProps = {
    data: TableRowData[]
    rowNumLabel?: string
    getFormattedCell: (label: string,
        data: TableCellData,
        row: TableRowData,
        headers: string[],
        fieldNo: number) => ReactNode
    hide?: hideOptions
    fields: Field[]
    nullTableShow?: boolean // Does not appear to be used
    noDynamicTable?: boolean
    actions?: Action[]
    getMappedCell?: (
        label: string,
        data: TableCellData,
        row: TableRowData,
        headers: string[],
        fieldNo: number) => string|(string|null)[]|null
}

type DataPager = {
	start: number
	end: number
	select: React.ReactElement
	displayed: string
	pages: React.ReactElement

};

function usePager(data: TableRowData[]): DataPager {
	const {t} = useTranslation()
	const [rowsPerPage, setRowsPerPage] = useState<number>(20)
	const [pageNum, setPageNum] = useState<number>(1);

	const dataSlice = data.slice(
		(pageNum-1) * rowsPerPage, 
		(pageNum) * (rowsPerPage)
	);


	return {
		'start': (pageNum-1) * rowsPerPage, 
		'end': (pageNum) * (rowsPerPage),
		'select': (<span>{t('Maximum rows per page:', {ns: 'loris'})}
			   <select
			     className="input-sm perPage"
			     onChange={
				     (e) => {setRowsPerPage(parseInt(e.target.value)); setPageNum(1);}
			     }
			   value={rowsPerPage}>
                              <option>20</option>
                              <option>50</option>
                              <option>100</option>
                              <option>1000</option>
                              <option>5000</option>
                              <option>10000</option>
			      </select>
			   </span>),
                'displayed': t('{{pageCount}} rows displayed of {{totalCount}}.', {pageCount: dataSlice.length, totalCount: data.length, ns: 'loris'}),
		'pages': (<PaginationLinks
			  	Total={data.length}
				onChangePage={(i) => setPageNum(i)}
				RowsPerPage={rowsPerPage}
				Active={pageNum}
			  />)
	};
}

function TableFooter(props: {
	rows: TableRowData[],
	pager: DataPager
}): React.ReactElement {
	const {t} = useTranslation();
	const totalRows=props.rows.length;
	const pager = props.pager;
	return <div className="table-header">
	  <div className="row">
	    <div style={{
              display: 'flex',
	      justifyContent: 'space-between',
	      alignItems: 'center',
	      flexWrap: 'wrap',
	      padding: '5px 15px'
	    }}>
	      <div style={{
		      order: '1',
		      padding: '5px 0'
	      }}>
	      {pager.displayed}
	      {pager.select}
	      </div>
	      <div style={{
		      order: '2',
		      display: 'flex',
		      justifyContent: 'flex-end',
		      alignItems: 'center',
		      flexWrap: 'wrap',
		      padding: '5px 0',
		      marginLeft: 'auto',
	      }}>
	         {pager.pages}
	       </div>
	    </div>
	  </div> 
	</div>
}

function TableHeader(props: {
	hide: hideOptions,
	rows: TableRowData[],
	pager: DataPager,
	actions?: Action[],
}): React.ReactElement {
	const {t} = useTranslation();
	const totalRows=props.rows.length;
	const pager = props.pager;
	if (props.hide.rowsPerPage === true){
		return <div />;
}

        const actions = props.actions ? props.actions.filter(
		(action) => action.show !== false).map(
		(action, key) => <CTA 
		   key={key}
		   label={action.label}
		   onUserInput={action.action}
		   />
	) : null;
	return <div className="table-header">
	  <div className="row">
	    <div style={{
              display: 'flex',
	      justifyContent: 'space-between',
	      alignItems: 'center',
	      flexWrap: 'wrap',
	      padding: '5px 15px'
	    }}>
	      <div style={{
		      order: '1',
		      padding: '5px 0'
	      }}>
	      {pager.displayed}
	      {pager.select}
	      </div>
	      <div style={{
		      order: '2',
		      display: 'flex',
		      justifyContent: 'flex-end',
		      alignItems: 'center',
		      flexWrap: 'wrap',
		      padding: '5px 0',
		      marginLeft: 'auto',
	      }}>
	         {actions}
	         {pager.pages}
	       </div>
	    </div>
	  </div> 
	</div>
}

function TableRow(props: {
	hide: hideOptions
	row: TableRowData
	fields: Field[],
	getFormattedRow?: (data: TableRowData, fields: Field[] ) => React.ReactElement,
	getFormattedCell?: (label: string,
		data: TableCellData,
		row: TableRowData,
		headers: string[],
		fieldNo: number) => ReactNode
}): React.ReactElement {
  if(props.getFormattedRow) {
    return props.getFormattedRow(props.row, props.fields);
  }

  return <tr>
    {props.row.map(
      (val: TableCellData, colidx: number) => {
        if(props.fields[colidx] && props.fields[colidx].show === false) {
		return null;
	}
	if(props.getFormattedCell) {
		return props.getFormattedCell(props.fields[colidx].label, props.row[colidx], props.row, props.fields.map( (field) => field.label), colidx);
      }
        return <td key={colidx}>{val}</td>;
      }
    )
  }
  </tr>;
}

function sortData(data: TableRowData[]) {
}
function useDataSorter(data: TableRowData[]) {
  const [sortColumn, setSortColumn] = useState<number>(0);
  const [sortAsc, setSortAsc] = useState<boolean>(true);
  const conv = useCallback( (val: TableCellData) => {
    const isString = (typeof val === 'string');
    const isNumber = !isNaN(Number(val)) && typeof val !== 'object';
    if(val === '.')
      return null;
    if (isNumber) {
      return Number(val);
    }
    if (isString) {
      return val.toLowerCase();
    }
    return null;
  }, []);
  const compare = useCallback(
	  (a: TableRowData, b: TableRowData) => {
	  const aVal: string|number|null = conv(a[sortColumn]);
	  const bVal: string|number|null = conv(b[sortColumn]);

	  if(sortAsc) {
		  if (aVal  === bVal) {
			  return 0;
		  }
		  if(aVal === null) return -1;
		  if(bVal === null) return 1;

		  if (aVal < bVal) {
			  return -1 ;
		  }
		  if (aVal > bVal) {
			  return 1;
		  }
	  } else {
		  if (aVal === bVal) {
			  return 0;
		  }
		  if(aVal === null) return 1;
		  if(bVal === null) return -1;
		  if (aVal < bVal) {
			  return 1 ;
		  }
		  if (aVal > bVal) {
			  return -1;
		  }
	  }
	  console.error(a[sortColumn], b[sortColumn]);
	  return 0;
  }, [sortColumn, sortAsc]);

  return {
	  sortColumn: sortColumn,
	  ascending: sortAsc,
	  setSortColumn: (i: number, ascending: boolean) => {
		  setSortColumn(i);
		  setSortAsc(ascending);
	  },
	  sortFn: compare,
  };
}

function useSyntheticRowNum(data: TableRowData[]) {
}

function DataTable(props: DataTableProps): React.ReactElement {
  const data = useMemo( () => {
    return props.data.map(
      (row: TableRowData, idx: number): TableRowData => {
        const newdata: TableRowData = ['' + (idx + 1)];
        return newdata.concat(row);
      }
    )
  }, [props.data]) 
  const sorter = useDataSorter(data);
  const pager = usePager(data);

  const hideOptions: hideOptions = props.hide || {
    rowsPerPage: false,
    downloadCSV: false,
    defaultColumn: false
  };

  // Add implicit No. column for a row number that
  // is stable across sorting and filters.
  //
  // Always add it for simplicity, but set "hide"
  // to true if it's in the hideOptions.
  const fields: Field[] = [{
    label: 'No.',
    show: (hideOptions.defaultColumn === true) ? false  : true,
  }].concat(props.fields);
    
  const headers = fields
    .map( (val: Field, idx: number) => val.show === false ? null : <th
	 onClick={() => {
	   if(sorter.sortColumn == idx) {
		   sorter.setSortColumn(idx, !sorter.ascending);
	   } else {
		   sorter.setSortColumn(idx, true);
	   }
	 }} key={idx}>{val.label}</th>);

  data.sort(sorter.sortFn).slice(pager.start, pager.end);
  return <div style={{margin: '14px'}}>
      <TableHeader hide={hideOptions} rows={props.data} pager={pager} actions={props.actions} />
      <table className="table table-hover table-primary table-bordered dynamictable">
        <thead>
          <tr className="info">{headers}</tr>
        </thead>
        <tbody>
        {data.map((row: TableRowData, idx: number) =>
                    <TableRow
          key={idx}
                      hide={hideOptions}
                      row={row}
                      fields={fields}
                      getFormattedCell={props.getFormattedCell}
                    />)}
        </tbody>
      </table>
      <TableFooter rows={props.data} pager={pager} />
  </div>;
}

export default DataTable;
