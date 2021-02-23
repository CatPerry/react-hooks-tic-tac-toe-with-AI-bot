import LoginForm from './login/LoginForm';
import React, { useEffect, useState } from 'react';
import { checkUserAuth } from './../api/apiHandlers';

function MainContainer() {
	const [isAuthorized, setIsAuthorized] = useState(false);
	const handleAuth = () => console.log('Youre good');

	useEffect(() => {
		checkUserAuth();
	}, []);

	return (
		<div>{!isAuthorized ? <LoginForm handleAuth={handleAuth} /> : <div>You are set</div>}</div>
	);
}

export default MainContainer;
