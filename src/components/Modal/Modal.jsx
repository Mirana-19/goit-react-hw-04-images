import { useEffect } from 'react';

export function Modal({ closeModal, img, onBackdropClick }) {
  onBackdropClick = e => {
    if (e.target === e.currentTarget) {
      closeModal('');
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', onEscClick);

    return () => {
      window.removeEventListener('keydown', onEscClick);
    };
  }, []);

  const onEscClick = e => {
    console.log(e.code);
    if (e.code === 'Escape') {
      closeModal('');
    }
  };

  return (
    <div onClick={onBackdropClick} className="Backdrop">
      <div className="Modal">
        <img src={img} alt="" />
      </div>
    </div>
  );
}
