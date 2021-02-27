import { checkUserAuth } from './../api/apiHandlers';
import Header from './Header';
import LoginForm from './login/LoginForm';
import React from 'react';
import TTTBoard from './../components/game/tic-tac-toe/TTTBoard';

function MainContainer() {
	const authToken = sessionStorage.getItem('bearerToken');

	const handleAuth = (evt, data) => {
		evt.preventDefault();
		checkUserAuth(data);
	};

	return (
		<main>
			<Header />
			{!authToken ? <LoginForm handleAuth={handleAuth} /> : <TTTBoard />}
		</main>
	);
}

export default MainContainer;
