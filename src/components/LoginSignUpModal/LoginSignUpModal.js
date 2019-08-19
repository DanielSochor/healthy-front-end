import React, { useState, useEffect } from '../../../node_modules/react';
import "./LoginSignUpModal.css";
import Modal from '../../../node_modules/react-modal';
import Auth from '../../utilities/authorizer';
import Pubsub from '../../utilities/pubsub';
//import { NOTIF, AUTH_MODAL_TYPES } from '../../utilities/constants';

const changeTypeBtnTextValues = {
    login: 'Don\'t have an account?',
    signup: 'Already have an account?'
};

const loginType = {
    login: 'Log In',
    signup: 'Sign Up'
};

function LoginSignUpModal() {

    const [modalType, setModalType] = useState(loginType.login);
    const [changeTypeBtnText, setChangeTypeBtnText] = useState(changeTypeBtnTextValues.login);
    const [modalIsOpen, setModalIsOpen] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    
    const [usernameVal, setUsernameVal] = useState('');
    const [emailVal, setEmailVal] = useState('');
    const [passwordVal, setPasswordVal] = useState('');
    const [confirmPasswordVal, setConfirmPasswordVal] = useState('');

    useEffect(() => {
        Pubsub.subscribe('login', this, closeModal);
        Pubsub.subscribe('logout', this, openModal);
        Pubsub.subscribe('auth_error', this, handleErrorInfo);
        Auth.checkForExistingSession();
        //setModalIsOpen(true);
        return(() => {
            Pubsub.unsubscribe('login', this);
            Pubsub.unsubscribe('logout', this);
            Pubsub.unsubscribe('auth_error', this);
        });
    }, []);

    const toggleModalType = () => {
        setErrorMessage('');
        let newModalType = modalType === loginType.login ? loginType.signup : loginType.login;
        let newChangeBtnText = modalType === loginType.login ? changeTypeBtnTextValues.signup : changeTypeBtnTextValues.login;
        setModalType(newModalType);
        setChangeTypeBtnText(newChangeBtnText);
    }

    const openModal = () => {
        setModalIsOpen(true);
    }
    const closeModal = () => {
        setModalIsOpen(false);
    }
    const handleUsernameChange = (event) => {
        setUsernameVal(event.target.value);
    }
    const handleEmailChange = (event) => {
        // @TODO implement live validation
        setEmailVal(event.target.value);
    }
    const handlePasswordChange = (event) => {
        // @TODO implement live validation
        setPasswordVal(event.target.value);
    }
    const handleConfirmPasswordChange = (event) => {
        setConfirmPasswordVal(event.target.value);
    }
    const handleErrorInfo = (errorObj) => {
        setErrorMessage(errorObj.message);
    }

    const authSubmit = (event) => {
        event.preventDefault();
        setErrorMessage('');
        if (modalType === loginType.login) {
            let signinObj = {
                username: usernameVal,
                password: passwordVal
            };
            console.log('sign in obj: ');
            console.log(signinObj);
            Auth.sendSigninRequest(signinObj);
        } else if (modalType === loginType.signup) {
            let signupObj = {
                email: emailVal,
                username: usernameVal,
                password: passwordVal,
                password_confirm: confirmPasswordVal
            };
            console.log('sign up obj: ');
            console.log(signupObj);
            Auth.sendSignupRequest(signupObj);
        }
    }

    const generateFormContents = () => {
        if (modalType === loginType.login) {
            return (
                <div className='modal-content'>
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="loginUsername" type="text" className="validate" value={usernameVal} onChange={handleUsernameChange} />
                                <label htmlFor="loginUsername">Username</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="loginPassword" type="password" className="validate" value={passwordVal} onChange={handlePasswordChange} />
                                <label htmlFor="loginPassword">Password</label>
                            </div>
                        </div>
                </div>
            );
        } else if (modalType === loginType.signup) {
            return (
                <div className='modal-content'>
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="signUpEmail" type="email" className="validate" value={emailVal} onChange={handleEmailChange} />
                                <label htmlFor="email">Email</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="signUpUsername" type="text" className="validate" value={usernameVal} onChange={handleUsernameChange} />
                                <label htmlFor="signUpUsername">Username</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="signUpPassword" type="password" className="validate" value={passwordVal} onChange={handlePasswordChange} />
                                <label htmlFor="signUpPassword">Password</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="confirmPassword" type="password" className="validate" value={confirmPasswordVal} onChange={handleConfirmPasswordChange} />
                                <label htmlFor="confirmPassword">Confirm Password</label>
                            </div>
                        </div>
                </div>
            );
        } else {
            console.log('error in authModal type: ' + modalType);
        }
    }

    const generateErrorInfo = () => {
        return (
          <span className='text-danger'>{errorMessage}</span>
        );
      }

    return (
        <Modal
            isOpen={modalIsOpen}
            contentLabel='Login Modal'
            ariaHideApp={false}
        >
            <h5 className='modal-title'>{modalType}</h5>
            <div className='error-info'>
                {generateErrorInfo()}
            </div>
            <form>
                {generateFormContents()}
                <button type='button' className='btn btn-link' onClick={toggleModalType}>{changeTypeBtnText}</button>
                <div className='modal-footer row center'>
                    <button className="btn waves-effect waves-light" type="submit" name="action" id="signUpBtn" onClick={authSubmit}>Submit<i className="material-icons right">send</i></button>
                </div>
                {/* <div className="modal-footer">
                    <a className="modal-close waves-effect waves-green btn-flat" onClick={closeModal}>X</a>
                </div> */}
            </form>
        </Modal>
    )
}

export default LoginSignUpModal;