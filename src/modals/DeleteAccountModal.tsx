import { Button, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import React, { ReactNode } from "react";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import '../assets/DeleteAccountModal.css';

interface ModalType {
  children?: ReactNode;
  isOpen: boolean;
  toggle: () => void;
  modalName?: string;
}

export default function DeleteAccountModal(props: ModalType) {
  if (props.modalName === 'deleteProfile') {
  return (
    <>
      {props.isOpen &&  (
        <div className="delete-account-modal-overlay">
          <div className="delete-account-modal-box">
            <div style={{float: 'right'}} onClick={props.toggle}>
              <IconButton>
               <CloseIcon/>
              </IconButton>
            </div>
           <div>
          <div className="delete-profile-header">You're about to delete your account</div>
          <div className="delete-profile-desc">Are you not entertained?</div>
          
        <div className="button-container">
            <span style={{marginRight: '15px',display:'inline-block'}}>
            <Button variant='contained' sx={{width: 100,backgroundColor: '#808080',borderRadius: 22,':hover': {backgroundColor: '#808080',},}} startIcon={<ThumbUpIcon/>} onClick={props.toggle}>Live</Button>
            </span>
            <span style={{display:'inline-block'}}>
            <Button variant='contained' sx={{width: 100,backgroundColor: 'red',borderRadius: 22,':hover': {backgroundColor: 'red',},}} endIcon={<ThumbDownIcon/>} onClick={props.toggle}>Die</Button> 
            </span>
        </div>
            </div> 
          </div>
        </div>
      )}
    </>
  );
} else {
  return <>
  </>
}}