import { useState } from "react";

export default function useModal() {
  const [isOpen, setisOpen] = useState(false);
  let [modalName, selectedModal] = useState();

  // Toggles Modals on and off
  const toggle = (modal?: any) => {
    modalName = modal;
     console.log(modal, 'myname')
     selectedModal(modal);
    setisOpen(!isOpen); 
  };

  return {
    isOpen,
    modalName,
    toggle,
  };
}