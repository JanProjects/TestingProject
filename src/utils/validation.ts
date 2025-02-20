import { FormInfo } from '../types/types';

export const validateForm = (formData: FormInfo): { [key: string]: string } => {
    const errors: { [key: string]: string } = {};

    if (!formData.firstName) {
        errors.firstName = 'First Name is required';
    }
    if (!formData.lastName) {
        errors.lastName = 'Last Name is required';
    }
    if (!formData.email) {
        errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.email = 'Invalid email format';
    }
    if (formData.age === null || formData.age === undefined) {
        errors.age = 'Age is required'; 
    }
    if (!formData.photo) {
        errors.photo = 'Photo is required';
    }
    if (!formData.selectedDate) {
        errors.selectedDate = 'Select a date';
    }
    if (!formData.selectedTime) {
        errors.selectedTime = 'Select time';
    }

    return errors;
};