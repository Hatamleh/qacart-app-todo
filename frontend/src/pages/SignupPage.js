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
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';

function SignupPage() {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [firstNameError, setFirstNameError] = useState('');
	const [lastNameError, setLastNameError] = useState('');
	const [emailError, setEmailError] = useState('');
	const [passwordError, setPasswordError] = useState('');
	const [confirmPasswordError, setConfirmPasswordError] = useState('');
	const [submitError, setSubmitError] = useState(false);
	const [submitErrorMessage, setSubmitErrorMessage] = useState(
		'Something Went Wrong please try again'
	);
	const [loading, setLoading] = useState(false);
	const { setUser } = useContext(AuthContext);
	const history = useHistory();

	const handleSubmit = () => {
		setPassword('');
		setConfirmPassword('');
		setFirstNameError('');
		setLastNameError('');
		setEmailError('');
		setPasswordError('');
		setConfirmPasswordError('');
		setSubmitError(false);

		// Make Sure that the first Name is filled and more that 3 Characters
		if (!firstName || firstName.length < 3) {
			setFirstNameError(
				'First Name is required, and it should be more than 3 characters'
			);
			return;
		}

		if (!lastName || lastName.length < 3 || lastName.length > 16) {
			setLastNameError(
				'Last Name is required, and it should be more than 3 characters'
			);
			return;
		}

		if (!emailReg.test(email)) {
			setEmailError('Please Insert a correct Email format');
			return;
		}

		if (!password || password.length < 8 ) {
			setPasswordError(
				'Password must be Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character'
			);
			return;
		}

		if (password !== confirmPassword) {
			setConfirmPasswordError(
				'Second password does not match the first Password'
			);
			return;
		}

		setLoading(true);
		axios({
			method: 'POST',
			url: '/api/v1/users/register',
			data: {
				email,
				password,
				firstName,
				lastName,
			},
		})
			.then((res) => {
				if (res.status === 201) {
					setUser(res.data);
					setLoading(false);
					history.push('/todo');
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
					<title>QAcart Todo App - Signup page</title>
				</Helmet>
				<LoginContainer>
					<LoginFormContainer>
						<FormHeader data-testid="header">
							Register to Application
						</FormHeader>
						<FormSubHeader>
							Ready to mark some Todos as completed?
						</FormSubHeader>
						<FormInput
							required
							label="FirstName"
							variant="outlined"
							type="text"
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
							error={firstNameError ? true : false}
							helperText={firstNameError ? firstNameError : null}
							inputProps={{
								'data-testid': 'first-name',
							}}
						/>
						<FormInput
							required
							label="LastName"
							variant="outlined"
							type="text"
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
							error={lastNameError ? true : false}
							helperText={lastNameError ? lastNameError : null}
							inputProps={{
								'data-testid': 'last-name',
							}}
						/>
						<FormInput
							required
							label="Email"
							variant="outlined"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							error={emailError ? true : false}
							helperText={emailError ? emailError : null}
							inputProps={{
								'data-testid': 'email',
							}}
						/>
						<FormInput
							required
							label="Password"
							variant="outlined"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							error={passwordError ? true : false}
							helperText={passwordError ? passwordError : null}
							inputProps={{
								'data-testid': 'password',
							}}
						/>
						<FormInput
							required
							label="Confirm Password"
							variant="outlined"
							type="password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							error={confirmPasswordError ? true : false}
							helperText={confirmPasswordError ? confirmPasswordError : null}
							inputProps={{
								'data-testid': 'confirm-password',
							}}
						/>
						{loading ? (
							<Loader />
						) : (
							<Button
								variant="contained"
								color="primary"
								onClick={handleSubmit}
								data-testid="submit"
							>
								Signup
							</Button>
						)}

						{submitError ? (
							<Alert severity="error" data-testid="error">
								{submitErrorMessage}
							</Alert>
						) : null}

						<Divider light={true} />
						<FormFooter
							onClick={() => history.push('/login')}
							data-testid="go-login"
						>
							Do you have an Account?
						</FormFooter>
					</LoginFormContainer>
				</LoginContainer>
			</Container>
		</ThemeProvider>
	);
}

export default SignupPage;

const LoginContainer = styled.div`
	min-height: 100vh;
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
	min-height: 522px;
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

const Loader = styled(CircularProgress)`
	margin: 0 auto;
`;

const emailReg =
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
