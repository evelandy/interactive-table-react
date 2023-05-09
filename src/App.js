import React, { useEffect, useState } from 'react';
import './App.css';
import Table from './components/Table';


function App() {
	const [userData, setUserData] = useState([]);
	const [search, setSearch] = useState('');

	const handleSearch = (event) => {
		setSearch(event.target.value);
	};

	useEffect(() => {
		getData();
	}, [])

	const getData = async () => {
		const response = await fetch('https://jsonplaceholder.typicode.com/users').then((response) => response.json())
		setUserData(response)
		// console.log(response)
	}

	return (
		<div className="App">
			{/* {console.log(userData || ['l'])} */}
			<Table userData={userData} />
		</div>
	);
}

export default App;
