import { Button, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import React, { ReactNode,  useRef, useState } from "react";
import '../assets/EditProfilePicModal.css';
import AvatarEditor from 'react-avatar-editor'
import Dropzone from 'react-dropzone'

interface ModalType {
  children?: ReactNode;
  isOpen: boolean;
  toggle: () => void;
  modalName?: string;
}

export default function EditProfilePicModal(props: ModalType) {
  // Had to declare editor this way since getImage() won't accept it any other way
  const editor = useRef<any>(null);

  const [image, setImage] = useState<File | string>('https://img.freepik.com/premium-vector/female-user-profile-avatar-is-woman-character-screen-saver-with-emotions_505620-617.jpg?w=826');

  if (props.modalName === 'editPic') {
  return (
    <>
      {props.isOpen && (
        <div className="edit-account-modal-overlay">
          <div className="edit-account-modal-box">
            <div style={{float: 'right'}} onClick={props.toggle}> <IconButton> <CloseIcon/> </IconButton></div>
        
        <div>
            <div className="edit-profile-header"><p>Edit Profile Picture</p></div>
            <div className="edit-profile-desc">Drag 'n' drop a pic here, or click Update to select files</div>
            {/* Need to disable noClick after a new file is updated */}
            <div className="dropzone-container">
            <Dropzone onDrop={acceptedFiles => setImage(acceptedFiles[0])} noClick noKeyboard >
                {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()}>
                    <AvatarEditor width={250} height={250} image={image} border={50} scale={1.2} borderRadius={125}/>
                    <input {...getInputProps()} />
                    <div className="update-pic-btn">
                    <Button variant='contained' sx={{ width: 110, backgroundColor: '#1F1F1F', borderRadius: 22,':hover': {backgroundColor: '#1F1F1F',}}}>Update</Button>
                    </div>
                    <div className="save-btn-container">
                      <Button variant='contained' sx={{ width: 110, backgroundColor: '#1F1F1F', borderRadius: 22,':hover': {backgroundColor: '#1F1F1F',}}} 
                        onClick={() => {
                        // Close Modal on Save
                        props.toggle();
                        // Accessing the resulting cropped image
                        if (editor) {
                        // This returns a HTMLCanvasElement, it can be made into a data URL or a blob,
                        // drawn on another canvas, or added to the DOM.
                        console.log(image);
                        const canvas = editor.current.getImage();
                      
                        // If you want the image resized to the canvas size (also a HTMLCanvasElement)
                        const canvasScaled = editor.current.getImageScaledToCanvas();
                        console.log(canvasScaled, canvas);
                      }}}>Save</Button>
                    </div>
                    </div>
                )}
            </Dropzone>
            </div>
        </div> 
          </div>
        </div>
      )}
    </>
  );
}
else {
  return <>
  </>
}}
