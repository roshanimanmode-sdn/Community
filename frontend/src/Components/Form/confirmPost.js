import React from 'react';
import styled from 'styled-components';

export default function ConfirmPost({ isOpen, onClose, onConfirm }) {
    if (!isOpen) return null;

    return (
        <Overlay>
            <Modal>
                <Header>Confirmation</Header>
                <Body>
                    <p>Do you want to make your profile visible to everyone?</p>
                </Body>
                <Footer>
                    <Button onClick={() => onConfirm(true)} primary>Yes</Button>
                    <Button onClick={onClose}>No</Button>
                </Footer>
            </Modal>
        </Overlay>
    );
}

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.3s ease;
`;

const Modal = styled.div`
    background: #fff;
    border-radius: 15px;
    padding: 30px;
    width: 500px;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
    animation: fadeIn 0.5s ease-out;
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

const Header = styled.h2`
    margin-top: 0;
    color: #333;
    font-size: 1.5em;
    text-align: center;
`;

const Body = styled.div`
    margin: 20px 0;
    text-align: center;
    font-size: 1.1em;
    color: #555;
`;

const Footer = styled.div`
    display: flex;
    justify-content: center;
    gap: 15px;
`;

const Button = styled.button`
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    background-color: ${props => (props.primary ? '#4CAF50' : '#f44336')};
    color: white;
    transition: background-color 0.3s ease, transform 0.2s ease;

    &:hover {
        background-color: ${props => (props.primary ? '#45a049' : '#e53935')};
        transform: translateY(-2px);
    }

    &:active {
        transform: translateY(0);
    }
`;
