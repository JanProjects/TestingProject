import React from 'react';

interface HolidayInfoProps {
  date: string;
  holidays: any[];
}

const HolidayInfo: React.FC<HolidayInfoProps> = ({ date, holidays }) => {
  const holiday = holidays.find(holiday => holiday.date === date);

  return (
    <div className="mb-4 text-red-500">
      {holiday ? (
        <p>This day is a holiday: {holiday.name}</p>
      ) : (
        <p>This day is a Sunday. No training can be scheduled.</p>
      )}
    </div>
  );
};

export default HolidayInfo;