import * as React from "react";

export const useDisclosure = (initialState = false) => {
  const [isOpen, setIsOpen] = React.useState(initialState);
  const onClose = React.useCallback(() => setIsOpen(false), []);
  const onOpen = React.useCallback(() => setIsOpen(true), []);
  const onToggle = React.useCallback(() => setIsOpen(!isOpen), [isOpen]);
  return { isOpen, onOpen, onClose, onToggle };
};
