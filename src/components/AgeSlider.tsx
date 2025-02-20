import React, { useState, useEffect, useRef } from 'react';

interface Props {
    age: number | undefined;
    onChange: (age: number) => void;
    errors: { [key: string]: string };
}

const AgeSlider: React.FC<Props> = ({ age, onChange, errors }) => {
    const [sliderValue, setSliderValue] = useState(age || 1);
    const [isDragging, setIsDragging] = useState(false);
    const sliderRef = useRef<HTMLInputElement>(null); // Ref for the slider element

    useEffect(() => {
        setSliderValue(age || 1);
    }, [age]);

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseInt(e.target.value, 10);
        setSliderValue(newValue);
        onChange(newValue);
    };

    const handleSliderMouseDown = () => {
        setIsDragging(true);
    };

    const handleSliderMouseUp = () => {
        setIsDragging(false);
    };

    const handleSliderMouseLeave = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (isDragging && sliderRef.current) {
            const slider = sliderRef.current;
            const rect = slider.getBoundingClientRect();
            const mouseX = e.clientX;
            let newValue = ((mouseX - rect.left) / rect.width) * 99 + 1;
            newValue = Math.max(1, Math.min(100, newValue));
            setSliderValue(Math.round(newValue));
            onChange(Math.round(newValue));
        }
    };

    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleSliderMouseUp);
        }
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleSliderMouseUp);
        };
    }, [isDragging]);

    return (
        <div className="mb-4 w-full max-w-[450px]">
            <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                Age
            </label>
            <div className="mt-2 relative">
                <input
                    type="range"
                    id="age"
                    name="age"
                    min="1"
                    max="100"
                    value={sliderValue}
                    onChange={handleSliderChange}
                    onMouseDown={handleSliderMouseDown}
                    onMouseUp={handleSliderMouseUp}
                    onMouseLeave={handleSliderMouseLeave}
                    className="w-full h-1 rounded-lg appearance-none cursor-pointer range-slider"
                    ref={sliderRef}
                    style={{
                        background: `linear-gradient(to right, #761BE4 ${((sliderValue - 1) / 99) * 100}%, #d1d5db ${((sliderValue - 1) / 99) * 100}%)`,
                    }}
                />

                {/* Revised SVG Tooltip */}
                <div
                    className={`absolute -bottom-7 left-0 -translate-x-1/2 transition-opacity duration-200 ${isDragging ? 'opacity-100' : 'opacity-100'}`}
                    style={{ left: `${(sliderValue - 1) / 99 * 100}%` }}
                >
                    <svg width="37" height="31" viewBox="0 0 37 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <mask id="path-1-inside-1_805_585" fill="white">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M22.3971 6L18.5 0L14.6029 6H4C1.79086 6 0 7.79086 0 10V27C0 29.2091 1.79086 31 4 31H33C35.2091 31 37 29.2091 37 27V10C37 7.79086 35.2091 6 33 6H22.3971Z"/>
                        </mask>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M22.3971 6L18.5 0L14.6029 6H4C1.79086 6 0 7.79086 0 10V27C0 29.2091 1.79086 31 4 31H33C35.2091 31 37 29.2091 37 27V10C37 7.79086 35.2091 6 33 6H22.3971Z" fill="#FAF9FA"/>
                        <path d="M18.5 0L19.3386 -0.544705L18.5 -1.83586L17.6614 -0.544705L18.5 0ZM22.3971 6L21.5585 6.5447L21.8542 7H22.3971V6ZM14.6029 6V7H15.1458L15.4415 6.5447L14.6029 6ZM17.6614 0.544705L21.5585 6.5447L23.2357 5.4553L19.3386 -0.544705L17.6614 0.544705ZM15.4415 6.5447L19.3386 0.544705L17.6614 -0.544705L13.7643 5.4553L15.4415 6.5447ZM4 7H14.6029V5H4V7ZM1 10C1 8.34315 2.34315 7 4 7V5C1.23858 5 -1 7.23858 -1 10H1ZM1 27V10H-1V27H1ZM4 30C2.34315 30 1 28.6569 1 27H-1C-1 29.7614 1.23858 32 4 32V30ZM33 30H4V32H33V30ZM36 27C36 28.6569 34.6569 30 33 30V32C35.7614 32 38 29.7614 38 27H36ZM36 10V27H38V10H36ZM33 7C34.6569 7 36 8.34315 36 10H38C38 7.23858 35.7614 5 33 5V7ZM22.3971 7H33V5H22.3971V7Z" fill="#CBB6E5" mask="url(#path-1-inside-1_805_585)"/>
                        <text x="18.5" y="24" textAnchor="middle" fill="#761BE4" fontSize="12" fontWeight="bold">{sliderValue}</text>
                    </svg>
                </div>
            </div>
            {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
        </div>
    );
};

export default AgeSlider;