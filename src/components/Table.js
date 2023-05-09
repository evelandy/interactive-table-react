import React, { useMemo } from 'react';
import '../App.css';
import GlobalFilter from './GlobalFilter';
import { useTable, useSortBy, useGlobalFilter } from 'react-table';

function Table({ userData }) {
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

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, state, setGlobalFilter } = useTable({ columns, data }, useGlobalFilter, useSortBy)
	const { globalFilter } = state;

	return (
		<>
		<GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
		<table {...getTableProps()}>
			<thead>
				{headerGroups.map((headerGroup) => (
					<tr {...headerGroup.getHeaderGroupProps()}>
						{
							headerGroup.headers.map((column) => (
								<th {...column.getHeaderProps(column.getSortByToggleProps())}>
									{column.render("Header")}
								</th>
							))
						}
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
		</>
	);
}

export default Table;
