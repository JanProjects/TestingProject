import React, { useState, useRef } from 'react';

interface Props {
    photo: File | null;
    onChange: (file: File | null) => void;
    errors: { [key: string]: string };
}

const PhotoUpload: React.FC<Props> = ({ photo, onChange, errors }) => {
    const [dragActive, setDragActive] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            onChange(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            onChange(e.target.files[0]);
        }
    };

    return (
        <div 
            className="mb-4" 
            style={{ width: '450px' }} 
            onDragEnter={handleDrag} 
            onDragOver={handleDrag} 
            onDragLeave={handleDrag} 
            onDrop={handleDrop} 
        >
            <label className="block text-sm font-medium text-gray-700" style={{ textAlign: 'left' }}>
                Photo Upload
            </label>
            <div className={`mt-1 bg-[#FFFFFF] flex flex-col justify-center items-center p-6 border-2 border-gray-300 rounded-md ${dragActive ? 'bg-gray-200' : ''}`}>
                <div className="space-y-1 text-center">
                    {photo ? (
                        <div>
                            <img src={URL.createObjectURL(photo)} alt="Uploaded" className="h-20 w-20 object-cover rounded-full mx-auto" />
                            <button onClick={() => onChange(null)} className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-700">
                                Remove
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="flex text-sm text-gray-600 justify-center">
                                <label 
                                    htmlFor="file-upload" 
                                    className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 underline"
                                >
                                    <span>Upload a file</span>
                                    <input 
                                        id="file-upload" 
                                        name="file-upload" 
                                        type="file" 
                                        className="sr-only" 
                                        onChange={handleChange} 
                                        ref={inputRef} 
                                    />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                            </div>
                        </>
                    )}
                </div>
            </div>
            {errors.photo && (
                <div className="flex items-center text-red-500 text-sm text-left">
                    {/* SVG Icon */}
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                        <path d="M8 0C6.41775 0 4.87104 0.469192 3.55544 1.34824C2.23985 2.22729 1.21447 3.47672 0.608967 4.93853C0.00346629 6.40034 -0.15496 8.00887 0.153721 9.56072C0.462403 11.1126 1.22433 12.538 2.34315 13.6569C3.46197 14.7757 4.88743 15.5376 6.43928 15.8463C7.99113 16.155 9.59966 15.9965 11.0615 15.391C12.5233 14.7855 13.7727 13.7602 14.6518 12.4446C15.5308 11.129 16 9.58225 16 8C16 5.87827 15.1571 3.84344 13.6569 2.34315C12.1566 0.842855 10.1217 0 8 0ZM7.00667 4C7.00667 3.73478 7.11203 3.48043 7.29956 3.29289C7.4871 3.10536 7.74145 3 8.00667 3C8.27189 3 8.52624 3.10536 8.71378 3.29289C8.90131 3.48043 9.00667 3.73478 9.00667 4V8.59333C9.00667 8.72465 8.9808 8.85469 8.93055 8.97602C8.88029 9.09734 8.80664 9.20758 8.71378 9.30044C8.62092 9.3933 8.51068 9.46696 8.38935 9.51721C8.26803 9.56747 8.13799 9.59333 8.00667 9.59333C7.87535 9.59333 7.74531 9.56747 7.62399 9.51721C7.50266 9.46696 7.39242 9.3933 7.29956 9.30044C7.2067 9.20758 7.13305 9.09734 7.08279 8.97602C7.03254 8.85469 7.00667 8.72465 7.00667 8.59333V4ZM8 13C7.77321 13 7.55152 12.9327 7.36295 12.8068C7.17438 12.6808 7.02741 12.5017 6.94062 12.2921C6.85383 12.0826 6.83113 11.8521 6.87537 11.6296C6.91961 11.4072 7.02882 11.2029 7.18919 11.0425C7.34955 10.8822 7.55387 10.7729 7.7763 10.7287C7.99873 10.6845 8.22929 10.7072 8.43881 10.794C8.64834 10.8807 8.82743 11.0277 8.95342 11.2163C9.07942 11.4048 9.14667 11.6265 9.14667 11.8533C9.14667 12.1574 9.02586 12.4491 8.81082 12.6641C8.59578 12.8792 8.30412 13 8 13Z" fill="#ED4545"/>
                    </svg>
                    {errors.photo}
                </div>
            )}
        </div>
    );
};

export default PhotoUpload;