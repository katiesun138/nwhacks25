import './index.css';

export default function BlockingPage() {

    const closeTab = () => {
        chrome.runtime.sendMessage({ type: "CLOSE_TAB" }, (response) => {
            if (response?.success) {
                console.log("Tab closed successfully.");
            } else {
                console.error("Failed to close tab:", response?.error);
            }
        });
    };

    return (
        <div className='flex items-center justify-center min-h-screen flex-col gap-8'>
        <p className='text-5xl mb-8 font-bold text-center text-white-600'>Let's get back on track!</p>
        <button onClick={closeTab} className='bg-black px-4 py-1 h-12 w-32 hover:bg-white border-black:hover border-2 border-black hover:text-black text-white rounded-2xl'>Close Tab</button>
        <button className='underline bg-transparent text-black hover:text-opacity-50'>I'm working on a different project now</button>
        </div>
    );
}
