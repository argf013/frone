/* eslint-disable react/prop-types */
import React, { createContext, useState, useContext } from 'react';
import DialogConfirm from './Dialog';

const DialogContext = createContext();

export const DialogProvider = ({ children }) => {
  const [dialog, setDialog] = useState({
    show: false,
    title: '',
    message: '',
    severity: 'primary',
    onClose: () => {},
    onConfirm: () => {},
    submitLabel: 'Save changes',
    cancelLabel: 'Close',
    submitButtonClass: '',
    cancelButtonClass: '',
  });

  const showDialog = (
    title,
    message,
    severity = 'primary',
    onConfirm = () => {},
    onClose = () => {},
    submitLabel = 'Save changes',
    cancelLabel = 'Close',
    submitButtonClass = '',
    cancelButtonClass = ''
  ) => {
    setDialog({
      show: true,
      title,
      message,
      severity,
      onClose: () => {
        onClose();
        setDialog((prev) => ({ ...prev, show: false }));
      },
      onConfirm: () => {
        onConfirm();
        setDialog((prev) => ({ ...prev, show: false }));
      },
      submitLabel,
      cancelLabel,
      submitButtonClass,
      cancelButtonClass,
    });
  };

  const hideDialog = () => {
    setDialog((prev) => ({ ...prev, show: false }));
  };

  return (
    <DialogContext.Provider value={{ showDialog, hideDialog }}>
      {children}
      {dialog.show && (
        <DialogConfirm
          title={dialog.title}
          message={dialog.message}
          severity={dialog.severity}
          onClose={dialog.onClose}
          onConfirm={dialog.onConfirm}
          submitLabel={dialog.submitLabel}
          cancelLabel={dialog.cancelLabel}
          submitButtonClass={dialog.submitButtonClass}
          cancelButtonClass={dialog.cancelButtonClass}
        />
      )}
    </DialogContext.Provider>
  );
};

export const useDialog = () => useContext(DialogContext);