import LoginForm from './login/LoginForm';
import React, { useEffect, useState } from 'react';
import { useApiHandlers } from './../api/apiHandlers';

function MainContainer() {
	const [userEmail, setUserEmail] = useState('');
	// const [isAuthorized, setIsAuthorized] = useState(false);
	const handleAuth = (evt) => {
		evt.preventDefault();
		setUserEmail(evt.target.value);
		useApiHandlers.checkUserAuth({ email: evt.target.value });
	};
	const { isAuthorized, heckUserAuth, setMoveGetNext } = useApiHandlers(userEmail);

	return (
		<div>{!isAuthorized ? <LoginForm handleAuth={handleAuth} /> : <div>You are set</div>}</div>
	);
}

export default MainContainer;
