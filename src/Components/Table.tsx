import * as React from 'react'
// import ReactDOM from 'react-dom/client'

// import { useGetUsersQuery } from "../ReduxQuery/jsonServerApi";



// import './index.css'
// import {
//     createColumnHelper,
//     flexRender,
//     getCoreRowModel,
//     useReactTable,
//   } from '@tanstack/react-table'

// interface Person {
//     id: number;
//     name: string;
//     username: string;
//     email: string;
//     address: {
//         street: string;
//         city: string;
//         zipcode: string;
//       }
    
//   }



// const columnHelper = createColumnHelper<Person>()

// const columns = [
//     columnHelper.accessor('id', {
//         header: () => 'UserId',
//         cell: info => info.renderValue(),
//         footer: info => info.column.id,
//       }),
//   columnHelper.accessor('name', {
//     cell: info => info.getValue(),
//     footer: info => info.column.id,
//   }),
//   columnHelper.accessor(row => row.username, {
//     id: 'username',
//     cell: info => <i>{info.getValue()}</i>,
//     header: () => <span>Last Name</span>,
//     footer: info => info.column.id,
//   }),

//   // columnHelper.accessor('email', {
//   //   header: 'Eamil',
//   //   // footer: info => info.column.id,
//   //   footer:info=>info.column.id,
//   // }),
//   columnHelper.accessor('email',{
//     header:'Email',
//     footer:info=>info.column.id,
//   }),


// //   columnHelper.group({
// //     id: 'address',
// //     header: () => <span>Address</span>,
// //     // footer: props => props.column.id,
// //     columns: [
// //         columnHelper.accessor((row)=>row.address.street, {
// //             header: 'Street',
// //             footer: info => info.column.id,
// //           }),
// //           columnHelper.accessor((row) => row.address.city, {
// //             header: 'City',
// //             footer: (info) => info.column.id,
// //         }),
// //         columnHelper.accessor((row) => row.address.zipcode, {
// //             header: 'Zipcode',
// //             footer: (info) => info.column.id,
// //         }),
// //     ],
// // }),

// ]

// function Table() {

//     const { data:users, error, isLoading } = useGetUsersQuery();

//     const [data, setData] = React.useState<Person[]>([]);
//     const rerender = React.useReducer(() => ({}), {})[1]

//   React.useEffect(() => {
//     // If data is fetched successfully, update the state
//     if (users) {
//       setData(users);
//     }
//   }, [users]);

//   const table = useReactTable({
//     data,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//   })

//   return (
//     <div className="p-2">
//         {isLoading ? (
//             <div>Loading...</div>
//         ):error ? (
//             <div>Error fetching data</div>
//         ):(
//       <table>
//       <thead>
//           {table.getHeaderGroups().map(headerGroup => (
//             <tr key={headerGroup.id}>
//               {headerGroup.headers.map(header => (
//                 <th key={header.id} colSpan={header.colSpan}>
//                   {header.isPlaceholder
//                     ? null
//                     : flexRender(
//                         header.column.columnDef.header,
//                         header.getContext()
//                       )}
//                 </th>
//               ))}
//             </tr>
//           ))}
//         </thead>
//         <tbody>
//           {table.getRowModel().rows.map(row => (
//             <tr key={row.id}>
//               {row.getVisibleCells().map(cell => (
//                 <td key={cell.id}>
//                   {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
       
//       </table>

// )}
     
//     </div>
//   )
// }

//   export default Table;
