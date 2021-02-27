import React, { useState } from 'react';

const baselineUrl = (action) =>
		`https://d9u7x85vp9.execute-api.us-east-2.amazonaws.com/production/${action}`;

export async function checkUserAuth(email) {
	await fetch(baselineUrl('auth'), {
		method: 'POST',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(email),
	})
		.then((resp) => {
			if (resp.ok) {
				return resp.json();
			}
		})
		.then((data) => {
		sessionStorage.setItem('bearerToken', data.token);
	})
	.catch((err) => console.log(err));
}

export async function setMoveGetNext(boardData, setMoves, setIsXsTurn) {
	const token = sessionStorage.getItem('bearerToken');

	if (token.length) {
		fetch(baselineUrl('engine'), {
			method: 'POST',
			mode: 'cors',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
			body: boardData,
		})
			.then((resp) => {
				if (resp.ok) {
					return resp.json();
				}
			})
			.then((data) => {
				setIsXsTurn(true);
				setMoves(data.board);
				return data.board;
			})
			.catch((err) => console.log(err));
	} else {
 			sessionStorage.setItem('bearerToken', null);
	}

}
