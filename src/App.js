import React, {useEffect, useMemo, useState} from 'react';
import './App.css';
import { useTable, useSortBy } from 'react-table';
import testData from './testData.json';

function App() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    getData();
  }, [])

  const getData = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users').then((response) => response.json())
    setUserData(response)
    console.log(response)
  }

  // const displayInfo = () => {
  //   return (
  //     userData.map((k, i) => {
  //       return (
  //         <table key={userData[i]?.id}>
  //           <thead>
  //             <tr>
  //               <th>
  //                 Name
  //               </th>
  //               <th>
  //                 Email
  //               </th>
  //               <th>
  //                 Phone
  //               </th>
  //               <th>
  //                 Company
  //               </th>
  //             </tr>
  //           </thead>
  //           <tbody>
  //             <tr>
  //               <td>
  //                 {userData[i]?.name}
  //               </td>
  //               <td>
  //                 {userData[i]?.email}
  //               </td>
  //               <td>
  //                 {userData[i]?.phone}
  //               </td>
  //               <td>
  //                 {userData[i]?.company.name}
  //               </td>
  //             </tr>
  //           </tbody>
  //         </table>
  //       )
  //     })
  //   )
  // }

  const data = useMemo(() => userData.sort((a, b) => a.company.name.localeCompare(b.company.name)), [userData])

  const columns = useMemo(() => [
    {
      Header: "Name",
      accessor: "name"
    },
    {
      Header: "Email",
      accessor: "email"
    },
    {
      Header: "Phone",
      accessor: "phone"
    },
    {
      Header: "Company Name",
      accessor: d => d.company.name
    }
  ], []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data }, useSortBy)

  const handleSort = (accessor) => {
    console.log(accessor)
  }

  return (
    <div className="App">
      {/* {console.log(userData || ['l'])} */}
      {/* {displayInfo()} */}
      <input className='test' />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {
          rows.map((row) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
