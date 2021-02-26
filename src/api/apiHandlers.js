import React, { useEffect, useState } from 'react';

export function useApiHandlers(email) {
	const [isAuthorized, setIsAuthorized] = useState(false);

	const baselineUrl = (action) =>
		`https://d9u7x85vp9.execute-api.us-east-2.amazonaws.com/production/${action}`;

	useEffect(() => {
		email ? checkUserAuth(email) : setMoveGetNext();
	}, []);

	function checkUserAuth(email) {
		fetch(baselineUrl('auth'), {
			method: 'POST',
			mode: 'cors',
			body: JSON.stringify(email),
		})
			.then((resp) => {
				resp.json();
			})
			.then((data) => {
				console.log(data);
				if (data.success === true) {
					setIsAuthorized(true);
					sessionStorage.setItem('bearerToken', data.token);
				}
			})
			.catch((err) => console.log(err));
	}

	function setMoveGetNext(boardData) {
		const token = sessionStorage.getItem('bearerToken');
		if (isAuthorized && token.length) {
			fetch(baselineUrl('engine'), {
				method: 'POST',
				mode: 'cors',
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(boardData),
			})
				.then((resp) => {
					resp.json();
				})
				.then((data) => {
					console.log(data);
					if (data.success === true) {
						return data.board;
					}
				})
				.catch((err) => console.log(err));
		}
	}

	return {
		isAuthorized,
		checkUserAuth,
		setMoveGetNext,
	};
}

