/**
 * This file contains React component for Breadcrumbs.
 *
 * @author Jordan Stirling
 * @author Alex Ilea
 * @author Jake Penny
 * @version 2.0.0
 */

import React, {useState} from 'react';
import Modal from 'jsx/Modal';
import swal from 'sweetalert2';

enum SignInState {
 EmailPrompt,
 PasswordPrompt
};

function LoginModal(props: {
	onClose: () => void,
	BaseURL: string,
}) {
	const [state, setState] = useState<SignInState>(SignInState.EmailPrompt)
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [error, setError] = useState<string>("");
	let form: React.ReactElement;
	switch(state){
	case SignInState.EmailPrompt:
		form = (<div>
				<form onSubmit={(e) => {e.preventDefault(); setState(SignInState.PasswordPrompt)}}>
			<fieldset>
				<legend>Email or username</legend>
				<input style={{width: "100%"}} placeholder="me@example.com" value={username} onChange={(e) => setUsername(e.target.value)} />
				<button>Next</button>
			</fieldset>
			</form>
			<div><a href="/requestaccount/">Request an account</a></div>
			<ol>
				<li>Login with Facebook</li>
				<li>Login with Google</li>
				<li>Login with GitHub</li>
			</ol>
		</div>);
		break;
	case SignInState.PasswordPrompt:
		form = (<div>
			<form onSubmit={async (e) => { e.preventDefault();
				const response = await fetch(props.BaseURL + "/api/v0.0.4-dev/login?setcookie=true", {
					method: "POST",
					body: JSON.stringify({ "username" : username, "password" : password })
				});
				const jsonresp = await response.json(); 
				console.log(jsonresp);
				if(jsonresp.error) {
					setError(jsonresp.error);
					return;
				}
				if(jsonresp.token) {
					window.location.href = props.BaseURL;
				}
		       	}}>
				<fieldset>
					<legend>Password</legend>
					<input type="password" style={{width: "100%"}} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
					<button>Sign in</button>
				</fieldset>
				<div className="error">{error}</div>
			</form>
			<div><a href="/login/forgotpassword/">Forgot password</a></div>
		</div>);
	}
	return <Modal
		title="Sign In to Loris"
		show={true}
		onClose={props.onClose}>{form}
	</Modal>
}
/**
 */
function SignInButton(props: {BaseURL: string}) {
	const [showModal, setShowModal] = useState<boolean>(false);
	const loginClick = () => {
		setShowModal(true);
	};
	const modal = showModal ? <LoginModal onClose={() => setShowModal(false)} BaseURL={props.BaseURL} /> : <span />;
	return <span><button className="login-button" onClick={loginClick}>Sign in</button>{modal}</span>
}

(window as any).SignInButton = SignInButton;

export default SignInButton;
