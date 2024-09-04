import React from 'react';
import PropTypes from 'prop-types';

const DialogConfirm = ({
  title,
  message,
  onClose,
  onConfirm,
  severity = 'primary',
  submitLabel = 'Save changes',
  cancelLabel = 'Close',
  submitButtonClass,
  cancelButtonClass
}) => {
  const titleClass = severity === 'danger' ? 'text-danger' : 'text-primary';
  const defaultSubmitButtonClass = severity === 'danger' ? 'btn-danger' : 'btn-primary';
  const defaultCancelButtonClass = 'btn-secondary';

  return (
    <div className="modal border-0" tabIndex="-1" style={{ display: 'block' }}>
      <div className="modal-dialog border-0">
        <div className="modal-content border-0">
          <div className="modal-header border-0">
            <h5 className={`modal-title ${titleClass}`}>{title}</h5>
          </div>
          <div className="modal-body border-0">
            <p>{message}</p>
          </div>
          <div className="modal-footer border-0">
            <button
              type="button"
              className={`btn ${cancelButtonClass || defaultCancelButtonClass}`}
              onClick={onClose}
            >
              {cancelLabel}
            </button>
            <button
              type="button"
              className={`btn ${submitButtonClass || defaultSubmitButtonClass}`}
              onClick={onConfirm}
            >
              {submitLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

DialogConfirm.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  severity: PropTypes.oneOf(['primary', 'danger']),
  submitLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
  submitButtonClass: PropTypes.string,
  cancelButtonClass: PropTypes.string,
};

export default DialogConfirm;