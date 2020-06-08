// Libs
import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

// Components
import ImageLogo from '../../../components/ImageLogo';
import Button from '../../../components/Button';
import OscHash from '../../../services/OscHash';

// Images
import sucessImage from '../../../assets/sucess.svg';

// Api
import { createUserAccount } from '../../../services/api';

const mapStateToProps = state => ({
	onboarding: state.onboarding,
});

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #FFCFCD;
  display: flex;
  align-items: center;
  flex-direction: column;
	margin: 0;

	@media (max-width: 648px) {
		padding: 1rem;
		background-color: #fff;
		justify-content: center;
	}

  a{
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		text-decoration: none;
	}
`;

const Content = styled.div`
 	width: 35%;
  min-height: 65vh;
  background: #fff;
	border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  padding: 0 0.5rem;

	@media (max-width: 1030px) {
    width: 47%;
		height: 44vh;
	}

 @media (max-width: 768px) {
		width: 60%;
	}

 @media (max-width: 648px) {
    width: 100%;
    height: 100vh;
    justify-content: space-evenly;
    padding: 0.5rem;
  }
`;

const TitleTerms = styled.h1`
	font-family: Overpass, ExtraBold;
	font-size: 1.25rem;
	margin-top: 1rem;
	font-weight: 900;

	@media(max-width: 648px){
		font-size: 1.3rem;
		text-align: center;
		width: 200px;
	}
`;

const SucessImage = styled.img`
	width: 9rem;
	margin: 1rem 0 3rem;
`;

const TextTerms = styled.p`
	width: 80%;
	font-family: Overpass;
	font-size: 1rem;

	@media(max-width: 768px) {
		padding-bottom: 1rem;
	}

	@media(max-width: 648px) {
		line-height: 1.5rem;
		margin-bottom: 0.8rem;
	}
`;

const TextTermsBold = styled.strong`
	margin-left: 0.5rem;
	text-decoration: underline;
	/* cursor: pointer; */
`;

class CreateUserSucessScreen extends Component {
	state = {
		resendEmail: undefined,
	};

	resendEmail = async () => {
		try {
			const { users } = this.props.onboarding;

			const encodedPassword = OscHash(users.password);

			const credentials = `${users.email}:${encodedPassword}`;

			const base64credentials = Buffer.from(credentials, 'utf-8').toString(
				'base64',
			);

			delete users.email;
			delete users.password;

			await createUserAccount(users, base64credentials);

			this.setState({
				resendEmail: true,
			});
		} catch (error) {
			console.log('err', error);
			console.log('err.response', error.response);
		}
	};

	render() {
		return (
			<Container>
				<ImageLogo margin='5rem 0 3.5rem 0' displayMobile='none'/>
				<Content>
					{this.state.resendEmail ? (
						<TitleTerms>Reenviado com sucesso!</TitleTerms>
					) : (
						<TitleTerms>Cadastro concluído com sucesso!</TitleTerms>
					)}
					<SucessImage src={sucessImage} alt="sucess image" />
					<TextTerms>
						{this.state.resendEmail ? (
							'Reenviado um e-mail de confirmação para'
						) : (
							'Enviamos um e-mail de confirmação para'
						)}
						<TextTermsBold>
							{this.props.onboarding.users.email ? this.props.onboarding.users.email : 'nome@email.com'}
						</TextTermsBold>. Verifique sua caixa de entrada para prosseguir.
					</TextTerms>
					<TextTerms>
						Caso não tenha recebido a confirmação, clique em
						<TextTermsBold onClick={this.resendEmail}>Reenviar e-mail.</TextTermsBold>
					</TextTerms>
					<Link to="/">
						<Button
							width="85%"
							height="3.8rem"
							margin="2rem 0 1.5rem"
							text="fazer login"
							textTransform
						/>
					</Link>
				</Content>
			</Container>
		);
	}
}

export default connect(mapStateToProps)(CreateUserSucessScreen);
