import React, { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const ModalBase = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)]" onClick={onClose}>
      <div className="bg-white w-[220px] p-[20px] flex flex-col items-center gap-[16px] rounded-[12px] shadow-[var(--shadow-12)]" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

const modalTextStyle = "text-neutral-900 text-center text-regular-16 leading-[140%] tracking-[-0.32px]";

export const FittingCompleteModal = ({ isOpen, onClose, onConfirm }: ModalProps & { onConfirm: () => void }) => (
  <ModalBase isOpen={isOpen} onClose={onClose}>
    <p className={modalTextStyle}>가상피팅이 완료되었습니다.</p>
    <button onClick={onConfirm} className="flex w-full p-[8px] justify-center items-center bg-primary-600 text-neutral-50 rounded-[10px] text-regular-14 font-bold cursor-pointer active:opacity-90">
      확인하러 가기
    </button>
  </ModalBase>
);

export const LogoutConfirmModal = ({ isOpen, onClose, onLogout }: ModalProps & { onLogout: () => void }) => (
  <ModalBase isOpen={isOpen} onClose={onClose}>
    <p className={modalTextStyle}>로그아웃 하시겠습니까?</p>
    <div className="flex w-full gap-[10px]">
      <button onClick={onClose} className="flex-1 min-w-[75px] p-[8px] flex items-center justify-center bg-neutral-400 text-neutral-50 rounded-[8px] text-regular-14 font-bold cursor-pointer active:opacity-90">
        아니오
      </button>
      <button onClick={onLogout} className="flex-1 p-[8px] flex items-center justify-center bg-primary-600 text-neutral-50 rounded-[8px] text-regular-14 font-bold cursor-pointer active:opacity-90">
        예
      </button>
    </div>
  </ModalBase>
);