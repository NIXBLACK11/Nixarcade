import React from 'react';

interface ConfirmationModalProps {
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onConfirm, onCancel }) => {
    return isOpen ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
                <h1 className='font-custom text-black text-3xl'>Confirm transaction</h1>
                <p className=" font-custom text-2xl text-custom-primary mb-4">
                    This will deduct 0.001 SOL from your in-game wallet. Do you want to proceed?
                </p>
                <div className="flex justify-around mt-4">
                    <button
                        onClick={onConfirm}
                        className="bg-green-500 text-xl text-white font-custom px-4 py-2 rounded hover:bg-green-600 transition duration-200"
                    >
                        Confirm
                    </button>
                    <button
                        onClick={onCancel}
                        className="bg-red-500 text-xl text-white px-4 font-custom py-2 rounded hover:bg-red-600 transition duration-200"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    ) : null;
};

export default ConfirmationModal;
