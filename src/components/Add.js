import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
const Add = () => {
	const [ dogData, setDogData ] = useState([]);
	const [ filteredData, setFilteredData ] = useState([]);
	const [ myDogs, setMyDogs ] = useState([]);

	useEffect(() => {
		axios
			.get('https://dog.ceo/api/breeds/list')
			.then((res) =>
				res.data.message.map((e) => {
					setDogData((prevState) => [ ...prevState, e ]);
				})
			)
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const handleFilter = (e) => {
		let key = e.target.value;
		let filteredArr = [];
		let tempDogData = dogData;
		tempDogData.map((e, i) => {
			for (let i = 0; i < key.length; i++) {
				if (key[i] === e[i] && i === key.length - 1) {
					filteredArr.push(e);
				}
			}
		});
		setFilteredData(filteredArr);
	};

	const handleAdd = (name) => {
		setMyDogs((prevState) => [ ...prevState, name ]);
	};

	useEffect(() => {
		handleDelete();
	}, []);
	const handleDelete = (ind) => {
		let currDogs = myDogs;
		currDogs.splice(ind, 1);

		setMyDogs(currDogs);
	};
	console.log(myDogs);

	//handle add should grab data from the filtered list

	return (
		<Fragment>
			<h1>Welcome to the DOG API</h1>
			<p>Here to can add and remove dogs to a list</p>
			<input type="text" onChange={handleFilter} />

			<ul>
				{filteredData.map((element) => (
					<li>
						{' '}
						{element} <button onClick={() => handleAdd(element)}>Add</button>{' '}
					</li>
				))}
			</ul>

			<h2>My Dog List</h2>
			<ul>
				{myDogs.map((dog, index) => (
					<li>
						{dog}
						<button onClick={() => handleDelete(index)}>Delete</button>{' '}
					</li>
				))}
			</ul>
		</Fragment>
	);
};

export default Add;
