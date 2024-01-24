import { useEffect } from 'react';

export function Modal({ closeModal, img, onBackdropClick }) {
  onBackdropClick = e => {
    if (e.target === e.currentTarget) {
      closeModal('');
    }
  };

  useEffect(() => {
    const onEscClick = e => {
      if (e.code === 'Escape') {
        closeModal('');
      }
    };

    window.addEventListener('keydown', onEscClick);

    return () => {
      window.removeEventListener('keydown', onEscClick);
    };
  }, [closeModal]);

  return (
    <div onClick={onBackdropClick} className="Backdrop">
      <div className="Modal">
        <img src={img} alt="" />
      </div>
    </div>
  );
}
