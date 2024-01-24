import * as React from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo } from "react";
import { useGetUsersQuery } from "../ReduxQuery/jsonServerApi";
import { table } from "console";
   
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
    // size: 2,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("title", {
    header: "Title",
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("price", {
    header: () => "Price",
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
            header: 'Rating',
            footer: info => info.column.id,
          }),
          columnHelper.accessor((row) => row.rating.count, {
            header: 'Count',
            footer: (info) => info.column.id,
        }),
       
    ],
}),


];

export default function Table02() {
  const { data, error, isLoading } = useGetUsersQuery();
  const products = data || []; // Provide a default value (empty array) if data is undefined


  const rerender = React.useReducer(() => ({}), {})[1];

  const table = useReactTable({
    data:products,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
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
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>

)}
    </div>
  );
}
