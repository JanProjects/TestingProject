export interface Holiday {
    date: string; //"YYYY-MM-DD"
    name: string;
    type: string; //"NATIONAL_HOLIDAY" or "OBSERVANCE"
}

export interface FormInfo {
    firstName: string;
    lastName: string;
    email: string;
    age: number;
    photo: File | null;
    selectedDate: string | null; // "YYYY-MM-DD"
    selectedTime: string | null; // e.g., "10:00"
}