/* eslint-disable react/jsx-key */
/* eslint-disable no-nested-ternary */

// Libs
import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import jwt from 'jsonwebtoken';

// Components
import Header from '../components/Header';
import Button from '../../../components/Button';
import HeaderModal from '../components/HeaderModal';

// Images
import DocumentUser from '../../../assets/document-user.svg';
import ImageDocument from '../../../assets/document.png';
import magnifyingGlass from '../../../assets/magnifyingGlass.svg';
import DownloadIcon from '../../../assets/download.svg';
import DownloadWhiteIcon from '../../../assets/downloadwhite.svg';
import Exit from '../../../assets/fechar.svg';
import DeleteIcon from '../../../assets/delete.svg';
import DeleteIconWhite from '../../../assets/deleteWhite.svg';
import EditIcon from '../../../assets/edit.svg';
import EditIconWhite from '../../../assets/editWhite.svg';
import documentWhite from '../../../assets/documentWhite.svg';
import ArrowDownIcon from '../../../assets/caminho.svg';
import ArrowUpIcon from '../../../assets/arrow-up.svg';

// Redux
import { addNewDocument, deleteDocument } from '../../../dataflow/modules/documents-modules';

// Api
import {
	createTemplate,
	getAllTemplates,
	deleteTemplate,
	getAllOrganizations,
	getAllDocuments,
	createDocument,
} from '../../../services/api';

const mapStateToProps = state => ({
	documentsList: state.documents.documentsList,
	email: state.onboarding.users.email,
	password: state.onboarding.users.password,
	name: state.onboarding.users.name,
	isAdmin: state.onboarding.users.isAdmin,
	organization: state.organization.tableDatas,
});

const mapDispatchToProps = dispatch => ({
	addNewDocument: info => dispatch(addNewDocument(info)),
	deleteDocument: info => dispatch(deleteDocument(info)),
});

const Container = styled.div`
  width: 100%;
	height: 90%;
	overflow-y: hidden;
	@media (max-width: 648px) {
		height: 45%;
	}
`;

const Content = styled.div`
	width: 100%;
	height: ${props => (props.isAdmin ? 'calc(100vh - -3px - 6.5rem)' : 'calc(100vh - -3px - 8.5rem)')};
	display: flex;
	align-items: center;
	justify-content: center;
	background: #FFFFFF;
	@media(max-width: 1400px) and (max-height: 900px){
		min-height: 83.5vh;
	}
	@media(max-width: 1024px) and (max-height: 1366px){
		min-height: 94vh;
	}
	@media(max-width: 490px){
		min-height: 84vh;
	}
`;

const MaximumWidth = styled.div`
	padding: ${props => (props.isAdmin ? '3rem 1rem 0' : '2rem 0 0')};
	margin-top: ${props => (props.isAdmin ? '0' : '2rem')};
	width: ${props => (props.isAdmin ? '100%' : '96%')};
	min-width: ${props => (props.isAdmin ? '100%' : '95%')};
	max-width: 1440px;
	height: ${props => (props.isAdmin ? '100%' : 'calc(100vh - 0px - 5.8rem - 1.5rem)')};
	display: flex;
	background: #FFF;
	overflow-y: hidden;
	@media(max-width: 768px){
		height: ${props => (props.isAdmin ? '100%' : 'calc(100vh - 0px - 6.8rem - 0px)')};
	}
	@media(max-width: 648px){
		width: 100%;
		height: 84vh;
		padding: 0;
		margin: 0;
	}
`;

const Teste = styled.div`
	width: 64%;
	@media(max-width: 648px) {
		width: 100%;
	}
`;

const ContainerHeader = styled.div`
	padding-right: 3rem;
  display: flex;
  justify-content: flex-end;
	@media (max-width: 1024px) {
		padding-right: 2.7rem;
	}
	@media (max-width: 768px) {
		padding-right: 1.1rem;
	}
	@media (max-width: 648px) {
		padding-right: 0;
		margin: .8rem;
	}
`;

const AddModelImage = styled.img`
	/* width: 180px; */
	margin-bottom: 1.5rem;
	@media (max-width: 1024px) {
		width: 140px;
	}
	@media (max-width: 768px) {
		width: 120px;
	}
	@media (max-width: 648px) {
		display: none;
	}
`;

const TitleSearch = styled.p`
	padding-bottom: 2rem;
  color: #85144B;
  font-size: 2rem;
  font-family: "Overpass", Black;
  font-weight: 900;
	@media (max-width: 1024px) {
		font-size: 1.8rem;
	}
	@media (max-width: 768px) {
		/* width: 60%; */
		font-size: 1.5rem;
		text-align: center;
	}
	@media (max-width: 648px) {
		display: none;
	}
`;

const ContainerContent = styled.div`
	padding-top: 3rem;
	padding-right: 2.4rem;
	width: 100%;
	display: flex;
	justify-content: center;
	@media(max-width: 1024px) {
		padding-right: 1rem;
	}
	@media (max-width: 768px) {
		padding-right: 0;
		padding-top: 2rem;
	}
	@media (max-width: 648px) {
		padding: 0 0.4rem 0 1rem;
		flex-direction: column;
	}
`;

const ContainerAddModel = styled.div`
	width: 34%;
	display: flex;
	align-items: center;
	flex-direction: column;
	${'' /* @media(max-width: 1440px) {
		max-width: 40%;
	} */}
	@media(max-width: 768px){
		width: 35%;
		padding: 0;
	}
	@media (max-width: 648px) {
		display: none;
	}
`;

const ContainerAddModelMob = styled.div`
	display: none;
	@media(max-width: 648px) {
		display: flex;
		width: 100%;
    justify-content: center;
		display: ${props => (props.list === '' ? 'flex' : 'none')};
	}
`;

const InitialAddModel = styled.div`
	width: 100%;
	height: 11rem;
	display: flex;
	text-align: center;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	color: #959595;
	border: 1px solid #959595;
	border-radius: 3px;
	@media (max-width: 1024px) {
		padding: 0 1%;
		width: 95%;
	}
	@media (max-width: 768px) {
		padding: 0 5%;
		width: 100%;
	}
	@media (max-width: 648px) {
		width: 100%;
		padding: 0 6%;
		margin-bottom: 2rem;
	}
`;

const ContainerScroll = styled.div`
	width: 100%;
	max-height: 73vh;
	/* max-height: 65vh; */
	display: ${props => (props.initialModel ? 'none' : 'inline-block')};
	margin-right: 1rem;
	overflow-y: scroll;
	::-webkit-scrollbar {
  width: 7px;
	}
	::-webkit-scrollbar-track {
  background: #fff;
	}
	::-webkit-scrollbar-thumb {
  	background: #FFCFCD;
	}
	::-webkit-scrollbar-thumb:hover {
  	background: #f9bdbb;
	}
	@media (max-width: 1680px) {
		max-height: 69vh;
	}
	@media (max-width: 1440px) {
		max-height: 65vh
	}
	@media(max-width: 768px) {
		max-height: 85vh
	}
	@media (max-width: 648px) {
		min-width: 100%;
		/* min-height: 100vh; */
		padding-bottom: 10rem;
		margin: 0;
		display: flex;
		justify-content: center;
		/* padding: 0 .2rem; */
	}
`;

const TitleInitialAddModel = styled.h2`
	font-size: 1.5rem;
  font-family: "Overpass", Black;
	font-weight: 900;
	@media (max-width: 768px) {
		font-size: 1.2rem;
	}
`;

const TitleInitialAddDoc = styled.h2`
	font-size: 1.5rem;
  font-family: "Overpass", Black;
	font-weight: 900;
	display: none;
	@media (max-width: 768px) {
		font-size: 1.2rem;
	}
`;

const ParagraphInitialAddModel = styled.p`
	font-size: 1.2rem;
  font-family: "Overpass", Regular;
	font-weight: 300;
	span {
		color: #85144B;
		text-decoration: underline;
		text-underline-position: under;
		cursor: pointer;
	}
	@media (max-width: 768px) {
		font-size: 1rem;
	}
	@media (max-width: 648px) {
		margin-top: 1rem;
	}
`;

const ParagraphInitialAddDoc = styled.p`
	font-size: 1.5rem;
  font-family: "Overpass", Regular;
	font-weight: 900;
	span {
		color: #85144B;
		text-decoration: underline;
		text-underline-position: under;
		cursor: pointer;
	}
	@media (max-width: 768px) {
		font-size: 1rem;
	}
	@media (max-width: 648px) {
		margin-top: 1rem;
	}
`;

const ContainerSearch = styled.div`
	width: 60%;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	margin-right: .5rem;
	@media (max-width: 1024px) {
		width: 65%;
		margin-right: 1.1rem;
	}
	@media (max-width: 768px) {
    width: 90%;
		margin-right: 0;
	}
	@media (max-width: 648px) {
		width: 100%;
		margin-right: 0;
		display: flex;
		justify-content: center;
	}
`;

const SearchText = styled.p`
  color: #231F20;
  font-size: 1.3rem;
  font-family: Overpass, Bold;
	font-weight: 600;
  margin-right: 1rem;
	@media (max-width: 648px) {
		display: none;
	}
`;

const ContainerSearchInput = styled.label`
	width: ${props => (props.isAdmin ? '70%' : '65%')};
	border: 0.5px solid #85144B;
	border-bottom-right-radius: ${props => (props.filter ? '0' : '3px')};
	border-bottom-left-radius: ${props => (props.filter ? '0' : '3px')};
	border-radius: 3px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0.2rem 1rem 0.1rem 1rem;
	/* margin-right: .3rem; */
	position: relative;
	cursor: ${props => (props.isAdmin ? 'none' : 'pointer')};
	img {
		margin: 0.4rem 0 0.5rem 0.5rem;
    width: 1.09rem;
	}
	@media (max-width: 648px) {
		width: 90%;
		margin: 0;
	}
`;

const SearchInput = styled.input`
  width: 100%;
	max-width: 100%;
	border: 0;
	color: #85144B;
	font-size: 0.9rem;
	/* font-size: 1rem; */
	font-family: Overpass, Regular;
	padding-left: .5rem;
	outline: none;
	@media (max-width: 1024px) {
		/* font-size: 0.9rem; */
	}
	@media (max-width: 768px) {
		font-size: .8rem;
	}
	@media (max-width: 648px) {
		font-size: 1rem;
	}
`;

const ContainerModels = styled.div`
	width: 100%;
	display: ${(props => (props.initialModel ? 'none' : 'flex'))};
	flex-direction: column;
	@media (max-width: 648px) {
		width: 90%;
    margin-bottom: 10rem;
	}
	@media (max-width: 648px) {
		width: 90%;
		margin-bottom: 0;
	}
`;

const ContainerModel = styled.div`
	margin-bottom: 1rem;
	padding: 2rem;
	width: 100%;
	border-radius: 3px;
	height: 100%;
	display: flex;
	cursor: pointer;
	position: relative;
	z-index: ${props => (props.zIndex ? '-1' : 0)};
	align-self: center;
	&:hover {
		border: 1px solid #85144B;
		&::before {
			content: '';
			background: #85144B;
			width: 1px;
			height: 100%;
			top: 0;
			right: 12rem;
			position: absolute;
			@media (max-width: 1024px) {
				right: 10.5rem;
			}
			@media (max-width: 768px) {
				right: 9rem;
			}
			@media (max-width: 648px) {
				width: 10rem;
				height: 1px;
				display: ${props => (props.displayBefore ? 'none' : 'flex')};
				margin-top: 20.6%;
    		top: 100%;
				z-index: 1;
				right: 0;
			}
			@media (max-width: 375px) {
				margin-top: 23.2%;
			}
		}
	}
	@media (max-width: 1024px) {
		padding-right: 1.1rem;
		width: 95%;
	}
	@media (max-width: 768px) {
		padding: 1.3rem 1rem 1.3rem 1.3rem;
		width: 100%;
	}
	@media (max-width: 648px) {
		width: 100%;
		padding: 1rem;
		margin: ${props => (props.lastIndex)};
		height: auto;
		order: 3;
		z-index: initial;
	}
`;

const ContainerModelDescription = styled.div`
	width: ${props => (props.modal ? '95%' : '76%')};
	display: flex;
	flex-direction: column;
	justify-content: center;
	cursor: pointer;
	border-radius: 3px;
	border: ${props => (props.isSelected ? '1px solid #85144B' : 'none')};
	padding: ${props => (props.addDocument ? '1rem 0 1rem 0' : '0')};
	@media(max-width: 768px){
		width: ${props => (props.modal ? '100%' : '68%')};
	}
	@media(max-width: 648px){
		width: 100%;
	}
	&:hover {
		border: ${props => (props.hidden ? '1px solid #85144B' : '0')};
		border-radius: ${props => (props.isAdmin ? '0' : '3px')};
	}
	span {
		display: flex;
		padding: ${props => (props.isAdmin ? '0' : '0 1rem')};
		@media (max-width: 648px) {
			width: 100%;
		}
	}
`;

const ModelNumber = styled.h2`
	margin-right: 0.5rem;
	color: #FF4136;
	font-family: "Overpass", Black;
	font-size: 1.5rem;
	@media (max-width: 648px) {
		font-size: 1.2rem;
	}
`;

const ModelTitle = styled.h2`
	margin-bottom: .5rem;
	max-width: 90%;
	word-wrap: break-word;
  color: #85144B;
  font-family: "Overpass", Black;
	@media (max-width: 768px) {
		font-size: 1.3rem;
	}
	@media (max-width: 648px) {
		font-size: 1rem;
	}
`;

const ModelParagraph = styled.p`
  max-width: 95%;
  font-size: 1.2rem;
  font-family: 'Overpass', Regular;
	word-wrap: break-word;
	padding: ${props => (props.isAdmin ? '0' : '0 1rem')};
	@media (max-width: 768px) {
		font-size: 1rem;
	}
	@media (max-width: 648px) {
		width: 100%;
		font-size: .8rem;
		line-height: 1.3rem;
	}
`;

const ContainerOptions = styled.div`
	display: ${props => (props.contOptions ? 'flex' : 'none')};
	width: 25%;
	align-items: flex-end;
	justify-content: center;
	flex-direction: column;
	@media (max-width: 648px) {
		.Edit {
			display: none;
		}
	}
	@media (max-width: 1024px) {
		width: 25%;
		padding: 0 0 0 3.4%;
	}
	@media (max-width: 768px) {
		width: 32%;
		padding: 0 0 0 4.5%;
	}
	@media (max-width: 648px) {
		position: absolute;
		width: 160px;
		height: 130px;
    top: 100%;
		margin-top: .6rem;
    right: 0rem;
    border: 1px solid #85144B;
		z-index: ${props => (props.modal ? '0' : '2')};
		background: #ffffff;
		align-items: center;
		border-radius: 3px;
		padding: 0;
	}
`;

const Option = styled.button`
	margin-bottom: 1rem;
	width: 8rem;
	height: 2.5rem;
	padding: 0 1rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
	background: transparent;
	border: none;
	border-radius: 4px;
	&:hover {
		background: #FF4136;
	}
	@media (max-width: 768px) {
		width: 7rem;
		padding: 0 0.8rem;
	}
	@media (max-width: 648px) {
		align-self: center;
		margin-bottom: 0;
		height: 100%;
		width: 100%;
		padding: 0 15%;
		border-radius: initial;
	}
`;

const OptionImage = styled.img`
`;

const OptionText = styled.span`
	color: ${props => (props.colorTextButton)};
	font-size: 1.2rem;
	font-family: "Overpass", SemiBold;
	p {
		margin-right: 0.8rem;
	}
	@media (max-width: 768px) {
		font-size: 1rem;
	}
	@media (max-width: 648px) {
		font-size: 1.3rem;
    margin-left: 0.8rem;
	}
`;

const ContainerModal = styled.div`
	width: 100%;
	height: 100vh;
	position: fixed;
	top: 0;
	right: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 1;
	background: rgba(112, 112, 112, 0.5);
	@media (max-width: 648px) {
		flex-direction: column;
	}
`;

const ModalAddModel = styled.form`
	width: 660px;
	min-height: 580px;
	background: #FFFFFF;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	border-radius: 4px;
	padding: 1rem 1.5rem;
	@media (max-width: 1024px) {
		height: 540px;
	}
	@media (max-width: 648px) {
		height: 100vh;
		width: 100%;
		position: absolute;
		top: 0%;
		padding: 5%;
	}
`;

// const LogoAndData = styled.div`
// 	display: none;

// 	@media (max-width: 490px) {
// 		display: flex;
// 		justify-content: space-between;
// 		margin-bottom: 10%;
// 	}
// `;

// const ParagraphContainer1 = styled.p`
// 	font-size: 1.25rem;
// 	font-family: "Overpass", Light;
// 	margin-top: 1.2rem;

// 	@media (max-width: 859px) {
// 		font-size: 1rem;
// 	}

// 	@media (max-width: 685px) {
// 		margin-top: 0;
// 	}

// 	@media (max-width: 648px) {
// 		font-size: 0.8rem;
// 	}
// `;

// const ParagraphSair = styled.p`
//   color: #85144B;
//   font-family: Overpass, SemiBold;
// 	font-size: 1rem;
// 	cursor: pointer;
// 	align-self: flex-end;
// 	text-transform: uppercase;
// `;

const HeaderAddModel = styled.div`
	display: flex;
	justify-content: space-between;
	@media (max-width: 648px) {
		margin-top: 2rem;
	}
	img {
		cursor: pointer;
	}
`;

const TitleAddModel = styled.h2`
	color: #85144B;
	font-size: 2rem;
	margin-top: 2%;
	margin-bottom: 1%;
	margin-left: 1rem;
  font-family: "Overpass", Bold;
  font-weight: 900;
	@media (max-width: 648px) {
		font-size: 1.5rem;
		margin-bottom: 1rem;
	}
`;

const ContainerInputs = styled.div`
	display: flex;
	flex-direction: column;
	@media(max-width: 648px){
		height: 80%;
	}
`;

const UploadFile = styled.label`
	width: 100%;
	display: flex;
	margin-bottom: 1rem;
	border-radius: 3px;
	padding: 3% 2.5%;
	border: ${props => (props.isError === true ? '2px solid #F00' : '1px solid #FFCFCD')};
	background: #FAFAFA;
	font-size: 1.1rem;
	font-family: "Overpass", SemiBold;
	@media(max-width: 648px){
		margin-bottom: 2rem;
	}
	input[type='file'] {
		display: none;
	}
	img {
		width: 50px;
	}
`;

const TextUploadFile = styled.div`
	width: 34%;
	display: flex;
	flex-direction: column;
	margin-left: 1rem;
	font-family: "Overpass", SemiBold;
	font-size: .9rem;
	color: #959595;
	h3 {
		font-family: "Overpass", Bold;
		margin-bottom: .5rem;
		font-size: 1.1rem;
		color:${props => (props.file === null ? '#959595' : 'green')};
	}
	span {
		cursor: pointer;
		text-decoration: underline;
		${''}
	}
	@media (max-width: 648px) {
		width: 52%;
	}
`;

const ContainerInput = styled.label`
`;

const TitleInputs = styled.h3`
	color: #85144B;
	font-size: .8rem;
	margin-left: 1rem;
	margin-bottom: 0.2rem;
  font-family: "Overpass", Bold;
  font-weight: 600;
	text-transform: uppercase;
`;

const Input = styled.input`
	width: 100%;
	margin-bottom: 1rem;
	border-radius: 3px;
	padding: 3% 2.5%;
	border: ${props => (props.isError === true ? '2px solid #F00' : '1px solid #FFCFCD')};
	background: #FAFAFA;
	font-size: 1rem;
	font-family: "Overpass", SemiBold;
	@media(max-width: 648px){
		margin-bottom: 2.5rem;
	}
`;

const TextArea = styled.textarea`
	width: 100%;
	height: 150px;
	border-radius: 3px;
	padding: 3% 2.5%;
	margin-bottom: .5rem;
	border: ${props => (props.isError === true ? '2px solid #F00' : '1px solid #FFCFCD')};
	background: #FAFAFA;
	font-size: 1rem;
	font-family: "Overpass", SemiBold;
	resize: none;
	::-webkit-scrollbar {
  width: 7px;
	}
	::-webkit-scrollbar-track {
  background: #fff;
	}
	::-webkit-scrollbar-thumb {
  	background: #FFCFCD;
	}
	::-webkit-scrollbar-thumb:hover {
  	background: #f9bdbb;
	}
	@media (max-width: 648px) {
		height: 9.37rem;
		margin-bottom: 2rem;
		width: 100%;
	}
`;

// const ButtonAdd = styled(Button)`
// 	align-self: flex-end;
// 	width: 18.75rem;
// 	height: 4rem;
// 	font-size: 1.2rem;
// 	margin: 0;
// 	text-transform: uppercase;

// 	@media (max-width: 1024px) {
// 		font-size: .9rem;
// 		width: 55%;
// 		padding: .8rem;
// 	}

// 	@media (max-width: 768px) {
// 		width: 45%;
// 		padding: 1rem;
// 		font-size: 1.3rem;
// 		margin: 0;
// 	}

// 	@media (max-width: 490px) {
// 		width: 90%;
// 		font-size: 1.2rem;
// 		align-self: center;
// 	}
// `;

const ContainerModalDelete = styled(ContainerModal)`
	@media (max-width: 648px) {
		background: #ffffff;
	}
`;

const ModalDelete = styled.div`
	background: #FFF;
	width: 480px;
	padding: 1em 1.5rem;
	@media (max-width: 648px) {
		width: 100%;
		height: 100vh;
		padding: 5%;
		display: flex;
    justify-content: space-between;
    flex-direction: column;
	}
`;

const TitleModal = styled(HeaderAddModel)`
	img {
		cursor: pointer;
	}
`;

const TitleDelete = styled(TitleAddModel)`
	margin-left: 0;
`;

const WrapTextModal = styled.div`
	width: 100%;
	@media (max-width: 648px) {
		height: 30%;
    display: flex;
		justify-content: space-around;
    flex-direction: column;
	}
`;

const TextModal = styled.p`
	width: ${props => (props.width && '79%')};
	margin: 1.5rem  0;
	font-size: 1rem;
	font-family: 'Overpass', Regular;
	color: #404040;
	strong {
		max-width: 30%;
		word-wrap: break-word;
		font-family: 'Overpass', Bold;
		color: #404040;
	}
	@media (max-width: 648px) {
		width: 100%;
		margin: 0;
		font-size: 1.3rem;
	}
`;

const ButtonsModal = styled.div`
	display: flex;
	margin-top: 5%;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	@media (max-width: 648px) {
		width: 100%;
		margin: 0;
	}
`;

const ButtonCancel = styled.button`
	width: 50%;
	height: 3.5rem;
	color: #F00;
	border-radius: 4px;
	border: none;
	background: #FFF;
	font-size: 1.2rem;
	font-family: "Overpass", Bold;
	font-weight: 600;
	margin-right: 1rem;
	@media (max-width: 648px) {
		margin: 0;
	}
`;

// const ButtonConfirm = styled(Button)`
// 	margin: 5% 0 0 0;
// 	width: 50%;
// 	height: 3.5rem;

// 	@media (max-width: 1024px) {
// 		margin: 5% 0 0 0;
// 		width: 50%;
// 	}

// 	@media (max-width: 490px) {
// 		margin: 0;
// 		position: initial;
// 		width: 100%;
// 	}
// `;

const ErrorText = styled.p`
	color: #f00;
	width: 100%;
	text-align: right;
	margin-bottom: .5rem;
	font-size: .9rem;
	font-family: Overpass;
`;

const BoxOrgs = styled.div`
	width: 100%;
	max-height: 35vh;
	overflow-y: ${props => (props.orgs.length < '5' ? 'none' : 'scroll')};
	display: flex;
	flex-direction: column;
	border-radius: 3px;
	border: 1px solid #85144B;
	/* border-right: 2px; */
	position: absolute;
	right: 0;
	left: 0;
	top: 1.8rem;
	border-top-left-radius: ${props => (props.isBoxOrgs ? 0 : '3px')};
	border-top-right-radius: ${props => (props.isBoxOrgs ? 0 : '3px')};
	background: #FFF;
	z-index: 999;
	::-webkit-scrollbar {
  	width: 7px;
	}
	::-webkit-scrollbar-track {
  	background: #fff;
	}
	::-webkit-scrollbar-thumb {
  	background: #FFCFCD;
	}
	::-webkit-scrollbar-thumb:hover {
  	background: #f9bdbb;
	}
	@media (max-width: 648px) {
		z-index: 6;
	}
`;

const Org = styled.div`
	color: #85144B;
	font-size: .9rem;
	font-family: 'Overpass', Regular;
	font-weight: 400;
	cursor: pointer;
	width: 100%;
	padding: .5rem 1rem;
	:hover{
		background: #FFCFCD;
		border: .5px solid #85144B;
	}
`;

const TextOrg = styled.p`
	font-size: .9rem;
	color: ${props => (props.select === '' ? '#959595' : '#85144B')};
	font-family: 'Overpass', Regular;
`;

const Modal = styled.div`
	width: 45.3rem;
	height: 90vh;
	background: #FFF;
	border-radius: 4px;
	display: flex;
	flex-direction: column;
	padding: .5rem 1.5rem;
	@media (max-width: 768px) {
		width: 40rem;
	}
	@media (max-width: 648px) {
		width: 100%;
		height: 100%;
		z-index: 10;
		padding: .5rem 1rem;
	}
`;

const BoxTitle = styled.span`
	width: 100%;
	display: flex;
	flex-direction: column;
	padding: 1rem 1rem 0 1rem;
	@media(max-width: 648px) {
		padding: 2rem 1rem 0 1rem;
	}
`;

const SubtitleModal = styled.p`
	font-size: 1.1rem;
	color: #959595;
	font-family: 'Overpass', Regular;
	margin-bottom: 1rem;
`;

const TitleModalList = styled.h2`
	color: #85144B;
	font-size: 2rem;
	font-family: Overpass;
	margin: 1rem 0 .5rem 0;
	@media (max-width: 648px) {
		font-size: 1.8rem;
	}
`;

const BoxModelsDoc = styled.span`
	width: 100%;
	height: 80%;
	display: flex;
	flex-direction: column;
	overflow-y: scroll;
	margin-bottom: 1rem;
	::-webkit-scrollbar {
  width: 10px;
	}
	::-webkit-scrollbar-track {
  background: #fff;
	}
	::-webkit-scrollbar-thumb {
  	background: #FFCFCD;
	}
	::-webkit-scrollbar-thumb:hover {
  	background: #f9bdbb;
	}
`;

const ButtonModalList = styled.button`
	width: 18rem;
	height: 3.5rem;
	background: #FF4136;
	color: #FFF;
	text-transform: uppercase;
	border-radius: 3px;
	border: none;
	align-self: flex-end;
	margin-top: 1rem;
	font-weight: bold;
	font-size: 1rem;
	@media (max-width: 648px) {
		width: 100%;
		height: 4.5rem;
	}
`;

const ImageExit = styled.img`
	/* width: 20px; */
	align-self: flex-end;
	position: absolute;
	margin-top: .5rem;
	cursor: pointer;
	@media(max-width: 648px){
		top: 6rem;
		right: 1.5rem;
	}
`;

const SpanButton = styled.span`
	width: 100%;
	display: flex;
	justify-content: flex-end;
`;

let newList = [];
class DocumentsScreen extends Component {
	state = {
		changeColorLabel: false,
		options: false,
		selectedOptions: undefined,
		modalDelete: false,
		addModel: false,
		downloadExport: DownloadIcon,
		downloadEdit: EditIcon,
		downloadDelete: DeleteIcon,
		modelSelect: '',
		search: '',
		searching: false,
		hoverExport: '',
		hoverEdit: '',
		hoverDelete: '',
		colorTextExport: '',
		colorTextEdit: '',
		colorTextDelete: '',
		redirect: false,
		template: null,
		templateData: {
			templateName: '',
			description: '',
			id: 0,
		},
		isError: false,
		isErrorDescription: false,
		isErrorTitle: false,
		isErrorFile: false,
		isErrorTitleQtd: false,
		isBoxOrgs: false,
		ishovering: false,
		modalListDoc: false,
		listDocs: [],
		selectOrg: '',
		isOrg: false,
		isMobileButton: false,
		userSelectDoc: '',
		isErrorDoc: false,
		isErrorDocClear: false,
		templateList: [],
		organizationUser: [],
	};

	componentDidMount() {
		this.renderTemplate();
		this.getAllOrgs();
		this.getAllDocuments();
		this.renderMobileButton();
	}


	getAllOrgs = async () => {
		try {
			const token = await localStorage.getItem('token');

			const userID = jwt.decode(token).id;

			const response = await getAllOrganizations(userID, token);

			this.setState({
				organizationUser: response.data,
			});
		} catch (error) {
			console.log('error', error.response);
		}
	}

	getAllDocuments = async () => {
		try {
			const token = await localStorage.getItem('token');

			// const response = await createDocument(token);
			console.log('response', response);
			const response = await getAllDocuments(token);
			console.log('response documents', response.data);
			this.setState({
				allDocuments: response.data,
			});
		} catch (error) {
			console.log('erro', error);
			console.log('erro.response', error.response);
		}
	}

	createTemplate = async (templateData) => {
		try {
			const token = await localStorage.getItem('token');

			const response = await createTemplate(templateData, token);

			console.log('reponse', response);
		} catch (error) {
			console.log('error', error);
		}
	}

	deleteTemplate = async () => {
		try {
			const templateId = this.state.modelSelect;

			const token = await localStorage.getItem('token');

			const response = await deleteTemplate(templateId, token);
			console.log('response delete', response);

			console.log('response', response);

			this.handleCancelDelete();
		} catch (error) {
			console.log('error', error.response);
		}
	}

	renderTemplate = async () => {
		try {
			const token = await localStorage.getItem('token');

			const response = await getAllTemplates(token);
			this.setState({
				templateList: response.data,
			});
			
		} catch (error) {
			console.log('error', error.response);
		}
	}

	createDoc = async () => {
		try {
			const docs = {
				template_id: this.state.isSelected.templateId,
				org_id: this.state.orgID,
				doc: this.state.isSelected.template,
			};
			console.log(docs);

			const token = await localStorage.getItem('token');

			const response = await createDocument(docs, token);

			console.log('response', response);
		} catch (error) {
			console.log('erro', error);
		}
	}

	handleOnOptions = (doc) => {
		this.setState({
			options: true,
			selectedOptions: doc,
		});
	}


	handleOnOptionsUser = (doc, index) => {
		this.setState({
			options: true,
			selectedOptions: index,
		});
	}

	handleOffOptions = () => {
		this.setState({
			options: false,
			selectedOptions: '',
		});
	}

	handleAddModel = () => {
		this.setState({
			addModel: true,
		});
	}

	handleCancelAddModel = () => {
		this.setState({
			templateData: {
				templateName: '',
				description: '',
			},
			addModel: false,
			isError: false,
			template: null,
			isErrorDescription: false,
			isErrorFile: false,
			isErrorTitle: false,
			isErrorTitleQtd: false,
		});
	}

	handleModalDelete = (doc, index) => {
		this.setState({
			modalDelete: true,
			options: false,
			clickedModel: index,
		});
	}

	handleCancelDelete = () => {
		this.setState({
			modalDelete: false,
		});
	}

	handleModelChange = (field, e) => {
		const { templateData } = this.state;
		templateData[field] = e.target.value;
		this.setState({
			templateData,
			isError: false,
			isErrorFile: false,
			isErrorTitle: false,
			isErrorDescription: false,
			isErrorTitleQtd: false,
			file: this.state.template,
		});
	}

	handleChangeColorExport = (doc) => {
		this.setState({
			downloadExport: DownloadWhiteIcon,
			hoverExport: doc,
			colorTextExport: '#ffffff',
		});
	}

	handleChangeColorExportUser = (docs) => {
		this.setState({
			downloadExport: DownloadWhiteIcon,
			hoverExport: docs,
			colorTextExport: '#ffffff',
		});
	}

	handleChangeColorLeaveExport = () => {
		this.setState({
			downloadExport: DownloadIcon,
			hoverExport: '',
			colorTextExport: '#85144B',
		});
	}

	handleChangeColorEditUser = (docs) => {
		this.setState({
			downloadEdit: EditIconWhite,
			hoverEdit: docs,
			colorTextEdit: '#ffffff',
		});
	}

	handleChangeColorLeaveEdit = () => {
		this.setState({
			downloadEdit: EditIcon,
			hoverEdit: '',
			colorTextEdit: '#85144B',
		});
	}

	handleChangeColorDelete = (doc) => {
		this.setState({
			downloadDelete: DeleteIconWhite,
			hoverDelete: doc,
			colorTextDelete: '#ffffff',
		});
	}

	handleChangeColorLeaveDelete = () => {
		this.setState({
			downloadDelete: DeleteIcon,
			hoverDelete: '',
			colorTextDelete: '#85144B',
		});
	}

	handleChangeColorDeleteUser = (docs) => {
		this.setState({
			downloadDelete: DeleteIconWhite,
			hoverDelete: docs,
			colorTextDelete: '#FFF',
		});
	}

	handleChangeColorEdit = (docs) => {
		this.setState({
			downloadEdit: EditIconWhite,
			hoverEdit: docs,
			colorTextEdit: '#FFF',
		});
	}

	handleChangeColorLeaveEdit = () => {
		this.setState({
			downloadEdit: EditIcon,
			hoverEdit: '',
			colorTextEdit: '#85144B',
		});
	}

	handleChangeColorLeaveDelete = () => {
		this.setState({
			downloadDelete: DeleteIcon,
			hoverDelete: '',
			colorTextDelete: '#85144B',
		});
	}

	uploadFile = (e) => {
		e.preventDefault();
		// eslint-disable-next-line no-undef
		const reader = new FileReader();
		const file = e.target.files[0];

		reader.onloadend = () => {
			this.setState({
				template: reader.result,
				isErrorFile: false,
			});
		};
		reader.readAsDataURL(file);
	}

	handleSelected = (doc) => {
		this.setState({
			modelSelect: doc,
		});
	}

	handleSearch = (e) => {
		this.setState({
			search: e.target.value,
		});
	}

	handleOnKey = (ev) => {
		if (ev.key === 'Enter') {
			this.setState({
				searching: true,
			});
		} else if (this.state.search === '') {
			this.setState({
				searching: false,
			});
		}
	}

	handleOnKeySeach = () => {
		this.setState({
			searching: true,
		});
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.handleErrors();
	}

	renderMobileButton = () => {
		if (window.innerWidth < '500') {
			this.setState({
				isMobileButton: true,
			});
		} else {
			this.setState({
				isMobileButton: false,
			});
		}
	}

	handleErrors = () => {
		const { templateName, description } = this.state.templateData;
		const { template } = this.state;

		if (template === null) {
			this.setState({
				isErrorFile: true,
			});
		} else {
			this.setState({
				isErrorFile: false,
			});
		}
		if (description === '') {
			this.setState({
				isErrorDescription: true,
			});
		} else {
			this.setState({
				isErrorDescription: false,
			});
		}
		if (description.length > 250) {
			this.setState({
				isErrorDescriptionQtd: true,
			});
		} else {
			this.setState({
				isErrorDescriptionQtd: false,
			});
		}
		if (templateName === '') {
			this.setState({
				isErrorTitle: true,
				isErrorTitleQtd: false,
			});
		} else {
			this.setState({
				isErrorTitle: false,
			});
		}
		if (templateName.length < 4 && templateName.length > 0) {
			this.setState({
				isErrorTitleQtd: true,
			});
		} else {
			this.setState({
				isErrorTitleQtd: false,
			});
		}
		if (templateName === '' && description === '' && template === null) {
			this.setState({
				isError: true,
				isErrorTitle: false,
				isErrorDescription: false,
				isErrorFile: false,
				isErrorTitleQtd: false,
			});
		}
		if (templateName !== '' && templateName.length > 4 && description !== '' && description.length <= 250 && template !== null) {
			const templateData = { description, template, templateName };
			this.props.addNewDocument(templateData);
			this.createTemplate(templateData);
			this.setState({
				templateData: {},
				template: null,
			});

			this.handleCancelAddModel();
		}
	}

	handleRedirect = () => {
		this.setState({ redirect: true });
	}

	openBoxOrgs = (ev) => {
		ev.stopPropagation();
		this.setState({
			isBoxOrgs: !this.state.isBoxOrgs,
		});
	}

	closeBoxOrgs = () => {
		this.setState({
			isBoxOrgs: false,
		});
	}

	openModalListDoc = () => {
		this.setState({
			modalListDoc: true,
		});
	}

	closeModalListDoc = () => {
		this.setState({
			modalListDoc: false,
			isErrorDocClear: false,
		});
	}

	selecetedDocUser = (docs) => {
		newList = this.state.listDocs.concat(docs);
		this.setState({
			isSelected: docs,
		});
	}

	handleDocsUser = (e) => {
		e.preventDefault();
		if (this.state.templateList.length <= 0) {
			this.setState({
				isErrorDocClear: true,
				modalListDoc: true,
			});
		} else {
			this.setState({
				modalListDoc: false,
				listDocs: newList,
				isSelected: '',
				isErrorDoc: false,
				isErrorDocClear: false,
			});
		}
		this.createDoc();
	}

	handleSelectOrg = (orgs) => {
		this.setState({
			selectOrg: orgs.tradingName,
			isBoxOrgs: false,
			orgID: orgs.orgId,
		});
	}

	userSelectedDoc = (docs, index) => {
		this.setState({
			userSelectDoc: docs,
			userDeleteDoc: index,
		});
	}

	deleteUserDoc = () => {
		this.setState({
			listDocs: this.state.listDocs.filter((doc, index) => index !== this.state.clickedModel),
			modalDelete: false,
		});
	}

	delete = () => {
		if (this.props.isAdmin === true) {
			this.deleteTemplate();
		} else {
			this.deleteUserDoc();
		}
	}


	renderModalModels = () => {
		const Messages = [
			'Adicione um nome ao seu modelo',
			'Adicione uma descrição para o seu modelo',
			'Adicione um modelo',
			'Preencha todos os campos',
			'Nome do modelo deve ter no mínimo 4 letras',
			'você excedeu o número máximo de caracteres',
		];
		return (
			<ContainerModal onClick={this.handleCancelAddModel}>
				<ModalAddModel
					onSubmit={this.handleSubmit}
					onClick={ev => ev.stopPropagation()}
				>
					<HeaderModal />

					<HeaderAddModel>
						<TitleAddModel>Adicionar Modelo</TitleAddModel>
						<img onClick={this.handleCancelAddModel} src={Exit} alt="Sair" />
					</HeaderAddModel>
					<ContainerInputs>
						<UploadFile
							validationModel={this.state.validationModel}
							htmlFor='upload-file'
							isError={this.state.isError}
						>
							<input
								onChange={this.uploadFile}
								id='upload-file'
								type="file"
							/>
							<img src={documentWhite} alt="Anexar Documento" />
							<TextUploadFile file={this.state.template}>
								<h3>{this.state.template === null ? 'Adicionar modelo' : 'Modelo adicionado'}</h3>
								<p>
									<span>Clique aqui</span>
									{this.state.template !== null && ' para adicionar outro.'}
								</p>
							</TextUploadFile>
						</UploadFile>
						{this.state.isErrorFile && <ErrorText>{Messages[2]}</ErrorText>}
						<ContainerInput>
							<TitleInputs>Nome do modelo</TitleInputs>
							<Input
								required
								validationModel={this.state.validationModel}
								value={this.state.templateName}
								onChange={e => this.handleModelChange('templateName', e)}
								type="text"
								placeholder="Digitar o nome do documento"
								isError={this.state.isError}
							/>
							{this.state.isErrorTitleQtd && <ErrorText>{Messages[4]}</ErrorText>}
							{this.state.isErrorTitle && <ErrorText>{Messages[0]}</ErrorText>}
						</ContainerInput>
						<ContainerInput>
							<TitleInputs>Descrição</TitleInputs>
							<TextArea
								// maxLength="250"
								validationModel={this.state.validationModel}
								value={this.state.description}
								onChange={e => this.handleModelChange('description', e)}
								type="text"
								placeholder="Como esse documento é usado"
								isError={this.state.isError}
							/>
							{this.state.isErrorDescription && <ErrorText>{Messages[1]}</ErrorText>}
							{this.state.isErrorDescriptionQtd && <ErrorText>{Messages[5]}</ErrorText>}
						</ContainerInput>
					</ContainerInputs>
					<span>
						{this.state.isError && <ErrorText>{Messages[3]}</ErrorText>}
					</span>
					<SpanButton>
						<Button
							width="20.25rem"
							height="3.5rem"
							text="Adicionar"
							type="submit"
							widthMobileSmall="100%"
							onClick={this.handleSubmit}
							fontSize="1.2rem"
						/>
					</SpanButton>
				</ModalAddModel>
			</ContainerModal>
		);
	}

	renderModalDelete = () => (
		<ContainerModalDelete onClick={this.handleCancelDelete}>
			<ModalDelete onClick={e => e.stopPropagation()}>
				<TitleModal>
					<TitleDelete>Excluir Modelo</TitleDelete>
					<img onClick={this.handleCancelDelete} src={Exit} alt="Sair" />
				</TitleModal>
				<WrapTextModal>
					<TextModal>
						Após ser excluido, um modelo não pode ser recuperado.
					</TextModal>
					<TextModal>
						Você deseja excluir o
						<strong style={{ marginLeft: '.5rem' }}>
							{this.props.isAdmin ? (
								this.state.modelSelect.templateName
							) : (
								this.state.userSelectDoc.templateName
							)}
						</strong> permanentemente?
					</TextModal>
				</WrapTextModal>
				<ButtonsModal>
					<ButtonCancel onClick={this.handleCancelDelete}>Cancelar</ButtonCancel>
					<Button
						onClick={() => this.delete()}
						width="50%"
						height="3.5rem"
						text="Confirmar"
						fontSize="1.2rem"
					/>
				</ButtonsModal>
			</ModalDelete>
		</ContainerModalDelete>
	)

	renderModalListDoc = () => (
		<ContainerModal onClick={this.closeModalListDoc}>
			<Modal onClick={ev => ev.stopPropagation()}>
				{this.state.isMobileButton ? <HeaderModal /> : null}
				<ImageExit src={Exit} alt="exit" onClick={this.closeModalListDoc} />
				<BoxTitle>
					<TitleModalList>Adicionar Documento</TitleModalList>
					<SubtitleModal>Escolha um modelo da lista abaixo</SubtitleModal>
				</BoxTitle>
				<BoxModelsDoc>
					{this.state.templateList.map((doc, index) => (
						<ContainerModelDescription
							modal={this.state.modalListDoc}
							list={this.state.listDocs}
							hidden={this.state.modalListDoc}
							addDocument={this.state.modalListDoc}
							onClick={() => this.selecetedDocUser(doc)}
							isSelected={doc === this.state.isSelected}
						>
							<span key={index}>
								<ModelNumber>{index + 1}</ModelNumber>
								<ModelTitle>{doc.templateName}</ModelTitle>
							</span>
							<ModelParagraph isAdmin={this.state.isAdmin}>{doc.description}</ModelParagraph>
						</ContainerModelDescription>
					))}
				</BoxModelsDoc>
				{this.state.isErrorDoc && <ErrorText>Documento já adicionado</ErrorText>}
				{this.state.isErrorDocClear && <ErrorText>Não há documento para ser escolhido</ErrorText>}
				<ButtonModalList onClick={this.handleDocsUser}>Escolher</ButtonModalList>
			</Modal>
		</ContainerModal>
	)

	renderDocAdmin = () => {
		const templateList = (this.state.search !== '' && this.state.searching === true)
			? this.state.templateList.filter(model => model.templateName.match(new RegExp(this.state.search, 'i')))
			: this.state.templateList;
		// MAP DOCUMENTS ADM
		return (
			templateList && templateList.length > 0 ? (
				templateList.map((doc, index) => (
					<ContainerModel
						// MARGEM ULTIMO ITEM DA LISTA, ATE O MOBILE
						style={{ margin: index === templateList.length - 1 && '0 0 7rem 0' }}
						// MARGEM ULTIMO ITEM LISTA MOBILE
						lastIndex={(window.innerWidth <= 490) && index === templateList.length - 1 ? '0 0 20rem 0 !important' : '0 0 1rem 0'}
						key={index}
						zIndex={this.state.addModel}
						displayBefore={this.state.modalDelete}
						onMouseEnter={() => this.handleOnOptions(doc, index)}
						onClick={() => this.handleOnOptions(doc, index)}
						onMouseLeave={this.handleOffOptions}>
						<ContainerModelDescription>
							<span>
								<ModelNumber>{index + 1}</ModelNumber>
								<ModelTitle>{doc.templateName}</ModelTitle>
							</span>
							<ModelParagraph>{doc.description}</ModelParagraph>
						</ContainerModelDescription>
						<ContainerOptions
							modal={this.state.modalDelete}
							contOptions={this.state.options && (this.state.selectedOptions === doc)}>
							<Option
								onMouseEnter={() => this.handleChangeColorExport(doc)}
								onMouseLeave={this.handleChangeColorLeaveExport}
							>
								<OptionImage
									src={this.state.hoverExport === doc ? this.state.downloadExport : DownloadIcon}
									alt="Exportar" />
								<OptionText
									colorTextButton={
										this.state.hoverExport === doc ? this.state.colorTextExport : '#85144B'
									}
								>
									Exportar
								</OptionText>
							</Option>
							<Option
								onMouseEnter={() => this.handleChangeColorDelete(doc)}
								onMouseLeave={this.handleChangeColorLeaveDelete}
								onClick={this.handleModalDelete}
							>
								<OptionImage
									src={this.state.hoverDelete === doc ? this.state.downloadDelete : DeleteIcon}
									alt="Deletar" />
								<OptionText
									colorTextButton={
										this.state.hoverDelete === doc ? this.state.colorTextDelete : '#85144B'
									}
									onClick={() => this.handleSelected(doc)}
								>
									<p>Excluir</p>
								</OptionText>
							</Option>
						</ContainerOptions>
					</ContainerModel>
				))
			) : (
			// QUANDO NÃO TEM DOC NO ADM
				<InitialAddModel>
					{this.state.search === '' ? (
						<TitleInitialAddModel>
								Você ainda não possui um modelo
						</TitleInitialAddModel>
					) : null}
					{this.state.search !== this.props.documentsList && this.state.search !== '' ? (
						<TitleInitialAddModel>
								Esse modelo de documento não existe !
						</TitleInitialAddModel>
					) : undefined}
					<ParagraphInitialAddModel>
							Escolha um modelo de documento
			clicando em <span onClick={this.handleAddModel}>Adicionar Modelo</span>
					</ParagraphInitialAddModel>
				</InitialAddModel>
			)
		);
	}

	renderDocUser = () => (
		// MAP DOCUMENTS USER
		this.state.listDocs && this.state.listDocs.length > 0 ? (
			this.state.listDocs.map((doc, index) => (
				<ContainerModel
					// MARGEM ULTIMO ITEM DA LISTA, ATÉ O MOBILE
					style={{ margin: index === this.state.listDocs.length - 1 && '0 0 9rem 0' }}
					// MARGEM ATÉ O ULTIMO ITEM LISTA MOBILE
					lastIndex={(window.innerWidth <= 490) && index === this.state.listDocs.length - 1 ? '0 0 20rem 0 !important' : '0 0 1rem 0'}
					key={index}
					zIndex={this.state.modalListDoc}
					displayBefore={this.state.modalDelete}
					onMouseEnter={() => this.handleOnOptionsUser(doc, index)}
					onMouseLeave={this.handleOffOptions}
					onClick={() => this.handleOnOptionsUser(doc, index)}
					option={this.state.option}
				>
					<ContainerModelDescription>
						<span>
							<ModelNumber>{index + 1}</ModelNumber>
							<ModelTitle>{doc.templateName}</ModelTitle>
						</span>
						<ModelParagraph>{doc.description}</ModelParagraph>
					</ContainerModelDescription>
					<ContainerOptions modal={this.state.modalDelete}
						contOptions={this.state.options && (this.state.selectedOptions === index)}>
						<Option
							onMouseEnter={() => this.handleChangeColorExportUser(doc)}
							onMouseLeave={this.handleChangeColorLeaveExport}
						>
							<OptionImage
								src={this.state.hoverExport === doc ? this.state.downloadExport : DownloadIcon}
								alt="Exportar" />
							<OptionText
								colorTextButton={
									this.state.hoverExport === doc ? this.state.colorTextExport : '#85144B'
								}
							>
								Exportar
							</OptionText>
						</Option>

						{/* <Option
							onMouseEnter={() => this.handleChangeColorEditUser(doc)}
							onMouseLeave={this.handleChangeColorLeaveEdit}
							onClick={this.openEditor}
						>
							<OptionImage src={this.state.hoverEdit === doc ? this.state.downloadEdit : EditIcon} />
							<OptionText
								colorTextButton={this.state.hoverEdit === doc ? this.state.colorTextEdit : '#85144B'}
							>
								<p>Editar</p>
							</OptionText>

						</Option> */}
						<Option
							onMouseEnter={() => this.handleChangeColorDeleteUser(doc)}
							onMouseLeave={this.handleChangeColorLeaveDelete}
							onClick={() => this.handleModalDelete(doc, index)}
						>
							<OptionImage
								src={this.state.hoverDelete === doc ? this.state.downloadDelete : DeleteIcon}
								alt="Deletar" />
							<OptionText
								colorTextButton={this.state.hoverDelete === doc
									? this.state.colorTextDelete : '#85144B'}
								onClick={() => this.userSelectedDoc(doc, index)}
							>
								<p>Excluir</p>
							</OptionText>
						</Option>
					</ContainerOptions>
				</ContainerModel>
			))
		) : (
			<InitialAddModel>
				<TitleInitialAddDoc>
					Você ainda não tem nenhum documento
				</TitleInitialAddDoc>
				<ParagraphInitialAddDoc>
					{this.state.selectOrg === '' ? (
						'Selecione uma organização para adicionar um documento'
					) : (
						<>
							Escolha um modelo de documento clicando em
							<span style={{ marginLeft: '.3rem' }} onClick={this.openModalListDoc}>
							Adicionar Documento
							</span>
						</>
					)}
				</ParagraphInitialAddDoc>
			</InitialAddModel>
		)
	)

	render() {
		const { isAdmin } = this.props;
		return (
			<Container onClick={this.handleClickedLabelLeave || this.closeBoxOrgs}>
				<Header/>
				<Content isAdmin={this.props.isAdmin} isMobileButton={this.state.isMobileButton}>
					<MaximumWidth isAdmin={this.props.isAdmin}>
						<ContainerAddModel>
							{isAdmin ? <TitleSearch>Modelos de Documentos</TitleSearch> : <TitleSearch>Documentos</TitleSearch>}
							{
								isAdmin ? (
									<AddModelImage src={ImageDocument} />
								) : (
									<AddModelImage src={DocumentUser} />
								)}
							{isAdmin
								? (
									<Button
										width="17.5rem"
										widthMobile="85%"
										widthTablet="14rem"
										height="4.5rem"
										bottomMobile='0'
										positionMobile="fixed"
										margin="1rem 0 0 0"
										fontSize="1.3rem"
										// left="11px"
										text="Adicionar Modelo"
										hidden={this.state.addModel || this.state.deleteModal}
										onClick={this.handleAddModel}
									/>
								) : (
									this.state.selectOrg !== '' ? (
										<Button
											width="17.5rem"
											height="4.5rem"
											margin="1rem 0 0 0"
											onClick={this.openModalListDoc}
											hidden={this.state.modalListDoc}
											text="Adicionar Documento"
											widthTablet="14rem"
											fontSize="1.3rem"
										/>
									) : null
								)}
						</ContainerAddModel>
						<Teste>
							<ContainerHeader>
								<ContainerSearch>
									<SearchText>
										{isAdmin ? 'Pesquisar' : 'Organização'}
									</SearchText>
									<ContainerSearchInput
										filter={this.state.isBoxOrgs}
										onClick={this.openBoxOrgs}
									>
										{isAdmin
											? <SearchInput
												onChange={this.handleSearch}
												onKeyUp={this.handleOnKey}
												placeholder="Digite aqui para pesquisar"
											/> : <TextOrg
												isOrg={this.state.isOrg}
												select={this.state.selectOrg}
											>
												{this.state.selectOrg === '' ? 'Selecionar organizações' : this.state.selectOrg}
											</TextOrg>}
										{isAdmin
											? <img
												onClick={this.handleOnKeySeach}
												src={magnifyingGlass}
												alt="Lupa"
												style={{ cursor: 'pointer' }}
											/>
											: this.state.isBoxOrgs
												? <img src={ArrowUpIcon}
													alt="arrow"
													style={{ cursor: 'pointer' }}
													onClick={this.openBoxOrgs}
												/> : <img src={ArrowDownIcon}
													alt="arrow"
													style={{ cursor: 'pointer' }}
													onClick={this.openBoxOrgs}
												/>
										}
										{this.state.isBoxOrgs && isAdmin === false ? (
											<BoxOrgs
												onClick={ev => ev.stopPropagation()}
												isBoxOrgs={this.state.isBoxOrgs}
												orgs={this.state.organizationUser}
											>
												<Org onClick={() => this.setState({ selectOrg: '' })}>Selecionar organizações</Org>
												{this.state.organizationUser.map((orgs, index) => (
													<Org
														key={index}
														onClick={() => this.handleSelectOrg(orgs)}
													>
														{orgs.tradingName}
													</Org>
												))}
											</BoxOrgs>
										) : null}
									</ContainerSearchInput>
								</ContainerSearch>
							</ContainerHeader>
							<ContainerContent>
								<ContainerScroll>
									<ContainerModels>
										{isAdmin ? this.renderDocAdmin() : this.renderDocUser()}
										{isAdmin ? (
											this.state.isMobileButton === true && this.state.addModel !== true ? (
												<Button
													width="17.5rem"
													height="4.5rem"
													marginMobile="0 0 1rem 0"
													widthMobile="85%"
													bottomMobile="0"
													// left="11px"
													positionMobile="fixed"
													onClick={this.handleAddModel}
													text="Adicionar Modelo"
													fontSizeMobile="1.2rem"
												/>
											) : (
												null
											)
										) : (
											this.state.isMobileButton === true
													&& this.state.modalListDoc !== true && this.state.selectOrg !== '' ? (
													<Button
														width="17.5rem"
														height="4.5rem"
														marginMobile="0 0 1rem 0"
														widthMobile="85%"
														bottomMobile="0"
														positionMobile="fixed"
														onClick={this.openModalListDoc}
														text="Adicionar Documento"
														fontSizeMobile="1.2rem"
													/>
												) : (
													null))}
										{this.state.addModel && this.renderModalModels()}
										{this.state.modalDelete && this.renderModalDelete()}
										{this.state.modalListDoc && this.renderModalListDoc()}
									</ContainerModels>
								</ContainerScroll>
							</ContainerContent>
						</Teste>
					</MaximumWidth>
				</Content>
			</Container>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(DocumentsScreen);
