import styled from 'styled-components';
import { ThemeProvider } from '@material-ui/styles';
import theme from '../Theme/theme';
import {
	Container,
	TextField,
	Button,
	Divider,
	CircularProgress,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Helmet } from 'react-helmet';

import axios from 'axios';

const LoginContainer = styled.div`
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const LoginFormContainer = styled.div`
	padding: 32px;
	display: flex;
	flex-direction: column;
	background-color: #222c36;
	border-radius: 16px;
	box-shadow: rgb(0 0 0 / 70%) 0px 0px 1px 0px,
		rgb(0 0 0 / 50%) 0px 3px 4px -2px;
	width: 522px;
	height: 522px;
`;

const FormHeader = styled.h2`
	font-size: 2rem;
	text-transform: uppercase;
`;

const FormSubHeader = styled.h2`
	color: rgb(145, 158, 171);
	line-height: 1.43;
	font-size: 0.875rem;
	margin: 1rem 0;
`;

const FormFooter = styled.h2`
	color: rgb(145, 158, 171);
	line-height: 1.43;
	font-size: 0.875rem;
	margin: 1rem 0;
	&:hover {
		cursor: pointer;
	}
`;

const FormInput = styled(TextField)`
	margin: 10px 0;
`;

function LoginPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [submitError, setSubmitError] = useState(false);
	const [submitErrorMessage, setSubmitErrorMessage] = useState(
		'Something Went Wrong please try again'
	);
	const [emailError, setEmailError] = useState('');
	const [passwordError, setPasswordError] = useState('');
	const [loading, setLoading] = useState(false);
	const history = useHistory();
	const { setUser } = useContext(AuthContext);

	const handleSubmit = () => {
		setPassword('');
		setSubmitError(false);

		if (!emailReg.test(email)) {
			setEmailError('Please Insert a correct Email format');
			return;
		}

		if (!password) {
			setPasswordError(
				'Password must be Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character'
			);
			return;
		}

		// Make Sure that the first Name is filled and more that 3 Characters.
		setLoading(true);
		axios({
			method: 'POST',
			url: `/api/v1/users/login`,
			data: {
				email,
				password,
			},
		})
			.then((res) => {
				setUser(res.data);
				setLoading(false);
				history.push('/todo');
				if (res.status !== 200) {
					setSubmitErrorMessage(res.data);
					setSubmitError(true);
					setLoading(false);
				}
			})
			.catch((err) => {
				if (err.response) {
					setSubmitErrorMessage(err.response.data.message);
					setSubmitError(true);
					setLoading(false);
				}
			});
	};

	return (
		<ThemeProvider theme={theme}>
			<Container maxWidth="md">
				<Helmet>
					<title>QAcart Todo App - Login page</title>
				</Helmet>
				<LoginContainer>
					<LoginFormContainer className="login-container">
						<FormHeader className="header">Login to Application</FormHeader>
						<FormSubHeader>
							Ready to mark some Todos as completed?
						</FormSubHeader>
						<FormInput
							required
							className="email signin-input"
							id="email"
							name="email"
							label="Email"
							variant="outlined"
							type="email"
							onChange={(e) => setEmail(e.target.value)}
							value={email}
							error={emailError ? true : false}
							helperText={emailError ? emailError : null}
							inputProps={{
								'data-testid': 'email',
								className: 'login-input email',
							}}
						/>
						<FormInput
							required
							label="Password"
							id="password"
							name="password"
							variant="outlined"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							error={passwordError ? true : false}
							helperText={passwordError ? passwordError : null}
							inputProps={{
								'data-testid': 'password',
								className: 'login-input password',
							}}
						/>
						{loading ? (
							<Loader />
						) : (
							<Button
								variant="contained"
								className="login-button submit"
								id="submit"
								name="submit"
								color="primary"
								onClick={handleSubmit}
								data-testid="submit"
							>
								Login
							</Button>
						)}
						{submitError ? (
							<Alert severity="error" data-testid="error-alert">
								{submitErrorMessage}
							</Alert>
						) : null}
						<Divider light={true} />
						<FormFooter
							data-testid="signup"
							onClick={() => history.push('/signup')}
						>
							Create a new Account?
						</FormFooter>
					</LoginFormContainer>
				</LoginContainer>
			</Container>
		</ThemeProvider>
	);
}

export default LoginPage;

const Loader = styled(CircularProgress)`
	margin: 0 auto;
`;

const emailReg =
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
