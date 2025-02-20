import React from 'react';

interface Props {
    selectedTime: string | null;
    onSelectTime: (time: string) => void;
    errors: { [key: string]: string };
}

const TimeSlot: React.FC<Props> = ({ selectedTime, onSelectTime, errors }) => {
    const timeSlots = [
        "08:00", "09:00", "10:00", "11:00", "12:00"
    ];

    return (
        <div>
            <div className="flex md:flex-col flex-wrap gap-2 w-full">
                <h3 className="text-xl font-semibold mb-2">Time</h3>
            </div>
            <div className="flex md:flex-col flex-wrap gap-2 w-full">
                {timeSlots.map(time => (
                    <button
                        key={time}
                        onClick={() => onSelectTime(time)}
                        className={`w-[80px] p-2 rounded-md border text-center ${selectedTime === time ? 'bg-white border-[#761BE4]' : 'bg-white border-gray-300'} hover:bg-gray-100`}
                    >
                        {time}
                    </button>
                ))}
                {errors.selectedTime && <p className="text-red-500 text-sm">{errors.selectedTime}</p>}
            </div>
        </div>
    );
};

export default TimeSlot;