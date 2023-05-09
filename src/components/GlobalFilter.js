import React from 'react';

const GlobalFilter = ({filter, setFilter}) => {
	return (
		<label className='searchLabel' htmlFor='search'>
			Search: &nbsp;
			<input id='search' className='search' value={filter || ''} onChange={(e) => setFilter(e.target.value)} />
			{/* <button className='searchButton' onClick={() => { console.log(search) }}>
				Search
			</button> */}
		</label>
	);
}

export default GlobalFilter;
