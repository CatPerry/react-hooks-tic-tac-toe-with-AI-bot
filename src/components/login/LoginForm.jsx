import React, { useState } from 'react';

function LoginForm({ handleAuth }) {
	const [state, setState] = useState({
		email: '',
		password: '',
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
				<input type='email' name='email' value={state.email} onChange={handleChange} required />
			</label>
			<br />
			<label>
				Password
				<input
					type='password'
					name='password'
					value={state.password}
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
