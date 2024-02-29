import { useState } from 'react';

export default function useModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalName, setModalName] = useState();

  // Toggles Modals on and off
  const toggle = (modal?: any) => {
    setModalName(modal);
    setIsOpen(!isOpen);
  };

  return {
    isOpen,
    modalName,
    toggle,
  };
}
