import React, { useEffect, useState } from 'react';
import { setMoveGetNext } from './../../../api/apiHandlers';
import './TTTBoard.scss';

function TTTBoard() {
	const [moves, setMoves] = useState(Array(3).fill(Array(3).fill('')));
	const [isXsTurn, setIsXsTurn] = useState(true);
	const authToken = sessionStorage.getItem('bearerToken');

	function makeMove(move) {
		if (isXsTurn) {
			if (moves[move] && JSON.stringify(moves[move]) !== JSON.stringify(['', '', ''])) {
				return;
			}
			setMoves((items) => {
				const movesCopy = [...[].concat.apply([], items)];
				movesCopy[move] = 'X';
				return movesCopy;
			});
			return setIsXsTurn(false);
		}
	}

	function chunkMoves(moves) {
		const movesCopy = [...moves];
		let chunkedMoves = [];

		while (movesCopy.length > 0) {
			chunkedMoves.push(movesCopy.splice(0, 3));
		}
		return chunkedMoves;
	}

	function flattenMoves(moves) {
		const formattedMoves = [...[].concat.apply([], moves)];
		setMoves(formattedMoves);
	}

	function getNextMove() {
		return setMoveGetNext(JSON.stringify({ board: chunkMoves(moves) }), flattenMoves, setIsXsTurn);
	}

	useEffect(() => {
		if (!isXsTurn) {
			setTimeout(() => {
				getNextMove();
			}, 1500);
		}
	}, [moves]);

	return (
		<div className='board-container'>
			<table>
				<tbody>
					<tr className={`row-items`}>
						<td className={`single-move`}>
							<button onClick={() => makeMove(0)}>{moves[0]}</button>
						</td>
						<td className={`single-move`}>
							<button onClick={() => makeMove(1)}>{moves[1]}</button>
						</td>
						<td className={`single-move`}>
							<button onClick={() => makeMove(2)}>{moves[2]}</button>
						</td>
					</tr>
					<tr className={`row-items`}>
						<td className={`single-move`}>
							<button onClick={() => makeMove(3)}>{moves[3]}</button>
						</td>
						<td className={`single-move`}>
							<button onClick={() => makeMove(4)}>{moves[4]}</button>
						</td>
						<td className={`single-move`}>
							<button onClick={() => makeMove(5)}>{moves[5]}</button>
						</td>
					</tr>
					<tr className={`row-items`}>
						<td className={`single-move`}>
							<button onClick={() => makeMove(6)}>{moves[6]}</button>
						</td>
						<td className={`single-move`}>
							<button onClick={() => makeMove(7)}>{moves[7]}</button>
						</td>
						<td className={`single-move`}>
							<button onClick={() => makeMove(8)}>{moves[8]}</button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}

export default TTTBoard;
