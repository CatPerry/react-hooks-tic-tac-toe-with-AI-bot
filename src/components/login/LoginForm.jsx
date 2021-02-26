import React, { useState } from 'react';

function LoginForm({ handleAuth }) {
	const [state, setState] = useState({
		email: '',
	});

	const handleChange = (evt) => {
		const value = evt.target.value;
		setState({
			...state,
			[evt.target.name]: value,
		});
	};

	return (
		<form onSubmit={(evt) => handleAuth(evt, state)}>
			<h2>Log In</h2>
			<label>
				Email
				<input
					type='email'
					placeholder='me@memail.com'
					name='email'
					value={state.email}
					onChange={handleChange}
					required
				/>
			</label>
			<br />
			<input type='submit' value='Submit' />
		</form>
	);
}

export default LoginForm;
