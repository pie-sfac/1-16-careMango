import React from 'react';

interface ModalProps {
  isOpen: boolean;
  content: React.ReactNode;
  onClose: () => void;
  onConfirm: () => void;
  width?: string;
  isDisabled?: boolean;
  onlyConfirm?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  content,
  onClose,
  onConfirm,
  width,
  isDisabled = false,
  onlyConfirm = false,
}) => {
  if (!isOpen) {
    return null;
  }

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50"
      role="button"
      onClick={onClose}
      onKeyDown={handleKeyDown}
      tabIndex={0}>
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */}
      <div className="p-10 bg-white rounded shadow-md" onClick={stopPropagation}>
        {content}
        <div className="flex justify-end mt-4">
          {!onlyConfirm && (
            <button className={`${width} px-4 py-2 mr-2 bg-gray-300 rounded`} onClick={onClose} type="button">
              취소
            </button>
          )}
          <button
            className={`${width} px-4 py-2 ${isDisabled ? 'bg-gray-300' : 'text-white bg-blue-500'} rounded`}
            onClick={handleConfirm}
            type="button"
            disabled={isDisabled}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
