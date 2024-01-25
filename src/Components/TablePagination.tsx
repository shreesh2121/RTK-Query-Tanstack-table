import * as React from "react";
import './table.css';

import {
  createColumnHelper,
  flexRender,
  getPaginationRowModel,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
  getFilteredRowModel,
  ColumnResizeDirection,
  ColumnResizeMode,
  
} from "@tanstack/react-table";
import { useGetUsersQuery } from "../ReduxQuery/jsonServerApi";
   
interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  rating: {
    rate: number;
    count: number;
}
}

const columnHelper = createColumnHelper<Product>();

const columns = [


  columnHelper.accessor("id", {
    header: () => "ID",
    cell: (info) => info.renderValue(),
    size: 10,
    footer: (info) => info.column.id,
    // size?: 3,

  }),
  columnHelper.accessor("title", {
    header: "Title",
    size: 500,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("price", {
    header: () => "Price",
    size:10,
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("category", {
    header: "Category",
    footer: (info) => info.column.id,
  }),
  columnHelper.group({
    id: 'rating',
    header: () => <span>Rating</span>,
    // footer: props => props.column.id,
    columns: [
        columnHelper.accessor((row)=>row.rating.rate, {
            header: 'Rate',
            footer: info => info.column.id,
          }),
          columnHelper.accessor((row) => row.rating.count, {
            header: 'Count',
            footer: (info) => info.column.id,
        }),
       
    ],
}),

];

export default function TablePagination() {

    const [columnResizeMode, setColumnResizeMode] =
    React.useState<ColumnResizeMode>('onChange')

  const [columnResizeDirection, setColumnResizeDirection] =
    React.useState<ColumnResizeDirection>('ltr')
  const { data, error, isLoading } = useGetUsersQuery();
  const products = data || []; // Provide a default value (empty array) if data is undefined

  // const rerender = React.useReducer(() => ({}), {})[1];

//   To perform sorting we have to create kind of state inside our application
const [sorting,setSorting]=React.useState<SortingState>([])
const [filtering, setFiltering]=React.useState('')

const [columnVisibility, setColumnVisibility] = React.useState({})

  const table = useReactTable({
    data:products,
    columns,
    columnResizeMode,
    columnResizeDirection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel:getSortedRowModel(),
    getFilteredRowModel:getFilteredRowModel(),
    state:{
        sorting,
        globalFilter: filtering,
        columnVisibility,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
    onColumnVisibilityChange:setColumnVisibility,
  });

  return (
    <div>

<div className="inline-block border border-black shadow rounded">
        <div className="px-1 border-b border-black">
          <label>
            <input
              {...{
                type: 'checkbox',
                checked: table.getIsAllColumnsVisible(),
                onChange: table.getToggleAllColumnsVisibilityHandler(),
              }}
            />{' '}
            Toggle All
          </label>
        </div>
        {table.getAllLeafColumns().map(column => {
          return (
            <div key={column.id} className="px-1">
              <label>
                <input
                  {...{
                    type: 'checkbox',
                    checked: column.getIsVisible(),
                    onChange: column.getToggleVisibilityHandler(),
                  }}
                />{' '}
                {column.id}
              </label>
            </div>
          )
        })}
      </div>
         <select
        value={columnResizeMode}
        onChange={e => setColumnResizeMode(e.target.value as ColumnResizeMode)}
        className="border p-2 border-black rounded"
      >
        <option value="onEnd">Resize: "onEnd"</option>
        <option value="onChange">Resize: "onChange"</option>
      </select>
      <select
        value={columnResizeDirection}
        onChange={e =>
          setColumnResizeDirection(e.target.value as ColumnResizeDirection)
        }
        className="border p-2 border-black rounded"
      >
        <option value="ltr">Resize Direction: "ltr"</option>
        <option value="rtl">Resize Direction: "rtl"</option>
      </select>
        <input type="text" value={filtering} onChange={(e)=>setFiltering(e.target.value)} />
       {isLoading ? (
            <div>Loading...</div>
        ):error ? (
            <div>Error fetching data</div>
        ):(
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                // <th key={header.id} colSpan={header.colSpan} onClick={header.column.getToggleSortingHandler()} >
                <th
                      {...{
                        key: header.id,
                        colSpan: header.colSpan,
                        onClick: header.column.getToggleSortingHandler(),
                        style: {
                          width: header.getSize(),
                        },
                      }}
                    >
                  {header.isPlaceholder
                    ? null
                    : (
                        <div
                        // {...{
                        //   className: header.column.getCanSort()
                        //     ? 'cursor-pointer select-none'
                        //     : '',
                        //   onClick: header.column.getToggleSortingHandler(),
                        // }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}


                        {{
                          asc: ' 🔼',
                          desc: ' 🔽',
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    
                      )}

                  <div
                        {...{
                          onDoubleClick: () => header.column.resetSize(),
                          onMouseDown: header.getResizeHandler(),
                          onTouchStart: header.getResizeHandler(),
                          className: `resizer ${
                            table.options.columnResizeDirection
                          } ${
                            header.column.getIsResizing() ? 'isResizing' : ''
                          }`,
                          style: {
                            transform:
                              columnResizeMode === 'onEnd' &&
                              header.column.getIsResizing()
                                ? `translateX(${
                                    (table.options.columnResizeDirection ===
                                    'rtl'
                                      ? -1
                                      : 1) *
                                    (table.getState().columnSizingInfo
                                      .deltaOffset ?? 0)
                                  }px)`
                                : '',
                          },
                        }}
                      />
    
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                 <td
                 {...{
                   key: cell.id,
                   style: {
                     width: cell.column.getSize(),
                   },
                 }}
               >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
       
      </table>
      

)}
<div>
    <button onClick={()=>table.setPageIndex(0)}>First page</button>
    <button disabled={!table.getCanPreviousPage()} onClick={()=>table.previousPage()}>Previous page</button>
    <button disabled={!table.getCanNextPage()} onClick={()=>table.nextPage()}>Next page</button>
    <button onClick={()=>table.setPageIndex(table.getPageCount()-1)}>Last page</button>

</div>
    </div>
  );
}
