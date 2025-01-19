import { useState } from 'react';

export default function PopUp() {
    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative">
            

            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Popup Title</h2>

                        <button
                            onClick={togglePopup}
                            className="px-4 py-2 bg-red-500 text-white rounded"
                        >
                            Close Popup
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};