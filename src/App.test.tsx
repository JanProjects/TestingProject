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

function App() {
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

    useEffect(() => {
        const fetchData = async () => {
            const fetchedHolidays = await fetchHolidays(2024);
            setHolidays(fetchedHolidays);
        };
        fetchData();
    }, []);

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
        setFormData(prev => ({ ...prev, selectedTime: null })); // Reset selected time on date change
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
                await submitForm();
                alert("Form submitted successfully!");
            } catch (error) {
                console.error("Form submission error:", error);
                alert("Form submission failed. Please try again.");
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    const submitForm = async () => {
        const response = await fetch('https://letsworkout.pl/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Training Booking</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <PersonalInfo formData={formData} onChange={handleChange} errors={formErrors} />
                <AgeSlider age={formData.age} onChange={handleAgeChange} errors={formErrors} />
                <PhotoUpload photo={formData.photo} onChange={handlePhotoChange} errors={formErrors} />
                <div className="flex flex-col md:flex-row md:space-x-6">
                    <CalendarComponent
                        selectedDate={formData.selectedDate}
                        onSelectDate={handleDateChange}
                        holidays={holidays}
                        errors={formErrors}
                    />
                    {formData.selectedDate && !formErrors.selectedDate && (
                        <TimeSlot
                            selectedTime={formData.selectedTime}
                            onSelectTime={handleTimeChange}
                            errors={formErrors}
                        />
                    )}
                </div>
                <Button onClick={()=>handleSubmit} disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Send Application"}
                </Button>
            </form>
        </div>
    );
}

export default App;