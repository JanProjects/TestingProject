import React, { useState, useEffect } from 'react';
import { Holiday } from '../types/types';

interface Props {
    selectedDate: string | null;
    onSelectDate: (date: string) => void;
    holidays: Holiday[];
    errors: { [key: string]: string };
}

const CalendarComponent: React.FC<Props> = ({ selectedDate, onSelectDate, holidays, errors }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [disabledDates, setDisabledDates] = useState<string[]>([]);
    const [holidayInfo, setHolidayInfo] = useState<Holiday | null>(null);

    useEffect(() => {
        const disabled = holidays.reduce<string[]>((acc, holiday) => {
            if (holiday.type === "NATIONAL_HOLIDAY") {
                acc.push(holiday.date);
            }
            return acc;
        }, []);
        const sundays = getSundaysInMonth(currentMonth);
        setDisabledDates([...disabled, ...sundays]);
    }, [holidays, currentMonth]);

    useEffect(() => {
        const holiday = holidays.find(h => h.date === selectedDate);
        setHolidayInfo(holiday || null);
    }, [selectedDate, holidays]);

    const getSundaysInMonth = (date: Date): string[] => {
        const sundays: string[] = [];
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);

        for (let day = firstDay; day <= lastDay; day.setDate(day.getDate() + 1)) {
            if (day.getDay() === 0) {
                sundays.push(day.toISOString().slice(0, 10));
            }
        }
        return sundays;
    };

    const getDaysInMonth = (date: Date): Date[] => {
        const days: Date[] = [];
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);

        for (let day = firstDay; day <= lastDay; day.setDate(day.getDate() + 1)) {
            days.push(new Date(day));
        }
        return days;
    };

    const handleDayClick = (day: Date) => {
        const dateString = day.toISOString().slice(0, 10);
        if (!disabledDates.includes(dateString)) {
            onSelectDate(dateString);
        }
    };

    const daysInMonth = getDaysInMonth(currentMonth);
    const startingDayOfWeek = daysInMonth[0].getDay();
    const monthName = currentMonth.toLocaleString('default', { month: 'long' });
    const year = currentMonth.getFullYear();

    return (
        <div className="mb-4 w-full"> {/* Use full width for Container */}
            <h3 className="text-xl font-semibold mb-2">Date</h3>
            <div className="mb-0 w-full bg-[#F0EAF8] border border-[#CBB6E5] rounded-[8px]">
                <div className="flex bg-[#FFFFFF] items-center justify-between mb-0 rounded-tl-[8px] rounded-tr-[8px] p-2">
                    <button 
                        onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}
                        className="p-2 bg-[#FFFFFF] rounded-full hover:bg-gray-200 transition"
                    >
                        &lt;
                    </button>
                    <span className="text-lg font-medium">{monthName} {year}</span>
                    <button 
                        onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
                        className="p-2 bg-[#FFFFFF] rounded-full hover:bg-gray-200 transition"
                    >
                        &gt;
                    </button>
                </div>
                <div className="grid bg-[#FFFFFF] grid-cols-7 gap-1 p-2 rounded-bl-[8px] rounded-r-[8px]">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className="text-center text-sm font-medium text-gray-500">
                            {day}
                        </div>
                    ))}
                    {Array(startingDayOfWeek).fill(null).map((_, index) => (
                        <div key={`blank-${index}`} className="text-center text-sm"></div>
                    ))}
                    {daysInMonth.map(day => {
                        const dateString = day.toISOString().slice(0, 10);
                        const isDisabled = disabledDates.includes(dateString);
                        const isSelected = selectedDate === dateString;

                        return (
                            <div
                                key={dateString}
                                onClick={() => handleDayClick(day)}
                                className={`text-center p-2 rounded-full hover:bg-gray-200 cursor-pointer transition ${isDisabled ? 'text-gray-400' : ''} ${isSelected ? 'bg-[#761BE4] text-white' : ''}`}
                            >
                                {day.getDate()}
                            </div>
                        );
                    })}
                </div>
            </div>
            
            {errors.selectedDate && <p className="text-red-500 text-sm">{errors.selectedDate}</p>}
            {holidayInfo && (
                <div className="mt-2 p-2 bg-yellow-100 border border-yellow-300 rounded-md">
                    <p className="font-semibold">Holiday:</p>
                    <p>{holidayInfo.name}</p>
                </div>
            )}
        </div>
    );
};

export default CalendarComponent;