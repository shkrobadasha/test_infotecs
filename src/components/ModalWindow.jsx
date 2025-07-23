import React from "react";
import ReactModal from "react-modal";
import close from './close.png'
import styled from "styled-components";

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #f0f0f0;
`;
const ModalContainer = styled.div`
  background: white;
  border-radius: 16px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  overflow: hidden;
`;

const UserProfile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Avatar = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 20px;
  border: 3px solid #f8f9fa;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const UserName = styled.h2`
  margin: 0;
  font-size: 24px;
  color: #333;
`;

const UserAge = styled.span`
  font-size: 16px;
  color: #666;
  margin-top: 5px;
`;

const UserDetails = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  padding: 20px;
  background: #f8f9fa;
`;

const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const DetailLabel = styled.span`
  font-size: 12px;
  color: #888;
  text-transform: uppercase;
  margin-bottom: 4px;
`;

const DetailValue = styled.span`
  font-size: 16px;
  color: #333;
  font-weight: 500;
`;

const ModalWindow = ({isOpen, onClose, user}) => {

    return (
            <ReactModal isOpen ={isOpen} style={{
                overlay: {position: 'fixed',
                        top: '0',
                        left: '0',
                        right: '0',
                        bottom: '0',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        zIndex: '1000',
                    },
                content: {position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        background: 'white',
                        padding: '20px',
                        borderRadius: '8px',
                        maxWidth: '500px',
                        width: '90%',
                        outline: 'none',
                        }
                }}>
                    {user? <ModalContainer>
                        <ModalHeader>
                            <h3>Профиль пользователя</h3>
                            <CloseButton onClick={onClose}>
                                <img src={close} alt="Закрыть" width={20} />
                            </CloseButton>
                        </ModalHeader>

                        <UserProfile>
                            <Avatar src={user.image} alt={`${user.firstName} ${user.lastName}`} />
                            <UserName>
                                {user.lastName} {user.firstName} {user.middleName}
                            </UserName>
                            <UserAge>{user.age} лет</UserAge>
                        </UserProfile>

                        <UserDetails>
                            <DetailItem>
                                <DetailLabel>Телефон</DetailLabel>
                                <DetailValue>{user.phone}</DetailValue>
                            </DetailItem>

                            <DetailItem>
                                <DetailLabel>Email</DetailLabel>
                                <DetailValue>{user.email}</DetailValue>
                            </DetailItem>

                            <DetailItem>
                                <DetailLabel>Адрес</DetailLabel>
                                <DetailValue>
                                {user.address.city}, {user.address.address}
                                </DetailValue>
                            </DetailItem>

                            <DetailItem>
                                <DetailLabel>Страна</DetailLabel>
                                <DetailValue>{user.address.country}</DetailValue>
                            </DetailItem>

                            <DetailItem>
                                <DetailLabel>Рост</DetailLabel>
                                <DetailValue>{user.height} см</DetailValue>
                            </DetailItem>

                            <DetailItem>
                                <DetailLabel>Вес</DetailLabel>
                                <DetailValue>{user.weight} кг</DetailValue>
                            </DetailItem>
                        </UserDetails>
                    </ModalContainer>  : <div>Loading...</div>}
            </ReactModal>
    )
}

export default ModalWindow