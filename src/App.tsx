import React, { useState, useEffect } from 'react';
import PersonalInfo from './components/PersonalInfo';
import AgeSlider from './components/AgeSlider';
import PhotoUpload from './components/PhotoUpload';
import CalendarComponent from './components/CalendarComponent';
import TimeSlot from './components/TimeSlot';
import Button from './components/Button';
import { FormInfo, Holiday } from './types/types';
import { fetchHolidays } from './utils/api';
import { validateForm } from './utils/validation';

const App: React.FC = () => {
    const [formData, setFormData] = useState<FormInfo>({
        firstName: '',
        lastName: '',
        email: '',
        age: 25,
        photo: null,
        selectedDate: null,
        selectedTime: null,
    });
    const [holidays, setHolidays] = useState<Holiday[]>([]);
    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [availableTimes, setAvailableTimes] = useState<string[]>([]);

    useEffect(() => {
        const currentYear = new Date().getFullYear();
        const fetchData = async () => {
            const fetchedHolidays = await fetchHolidays(currentYear);
            setHolidays(fetchedHolidays);
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (formData.selectedDate) {
            const date = new Date(formData.selectedDate);
            const hours = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];
            const dayString = date.toISOString().slice(0, 10);
            if (!holidays.find(h => h.date === dayString) && date.getDay() !== 0) {
                setAvailableTimes(hours);
            } else {
                setAvailableTimes([]);
            }
        } else {
            setAvailableTimes([]);
        }
    }, [formData.selectedDate, holidays]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAgeChange = (age: number) => {
        setFormData({ ...formData, age });
    };

    const handlePhotoChange = (file: File | null) => {
        setFormData({ ...formData, photo: file });
    };

    const handleDateChange = (date: string) => {
        setFormData({ ...formData, selectedDate: date });
    };

    const handleTimeChange = (time: string) => {
        setFormData({ ...formData, selectedTime: time });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const errors = validateForm(formData);
        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            setIsSubmitting(true);
            try {
                const form = new FormData();
                Object.entries(formData).forEach(([key, value]) => {
                    if (value) {
                        if (value instanceof File) {
                            form.append(key, value);
                        } else {
                            form.append(key, value as string);
                        }
                    }
                });

                const response = await fetch('https://letsworkout.pl/submit', {
                    method: 'POST',
                    body: form,
                });

                if (response.ok) {
                    alert("Form submitted successfully!");
                } else {
                    alert("Form submission failed. Please try again.");
                }
            } catch (error) {
                console.error("Form submission error:", error);
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    return (
        <div className="container mx-auto p-4 flex flex-col items-center">
            <h1 className="text-2xl font-bold mb-4">TEST BOOKING SITE</h1>
            <form onSubmit={handleSubmit} className="space-y-6 w-450">
                <PersonalInfo formData={formData} onChange={handleChange} errors={formErrors} />
                <AgeSlider age={formData.age} onChange={handleAgeChange} errors={formErrors} /><br />
                <PhotoUpload photo={formData.photo} onChange={handlePhotoChange} errors={formErrors} />
                <div className="flex md:flex-row flex-col gap-4 items-start w-full"> 
                   <div className="w-[450px] md:w-[350px]"> {/* Adjust width for mobile and desktop */}
                      <CalendarComponent
                        selectedDate={formData.selectedDate}
                        onSelectDate={handleDateChange}
                        holidays={holidays}
                        errors={formErrors}
                      />
                   </div>
                    {availableTimes.length > 0 && (
                   <div className="flex md:flex-row flex-col gap-4 md:w-[80px] w-[450px] mt-4 md:mt-0"> {/* Flex setup for time slots */}
                     <TimeSlot
                       selectedTime={formData.selectedTime}
                       onSelectTime={handleTimeChange}
                       errors={formErrors}
                   />
        </div>
    )}
</div>

                <Button onClick={()=>handleSubmit} disabled={isSubmitting || Object.keys(formErrors).length > 0}>
                    {isSubmitting ? "Submitting..." : "Send Application"}
                </Button>
            </form>
        </div>
    );
};

export default App;