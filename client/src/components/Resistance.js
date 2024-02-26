import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Auth from "../utils/auth";
import { createResistance } from '../utils/API';
import Header from "./Header";
import resistanceIcon from "../assets/images/resistance-w.png";

export default function Resistance() {
    const initialResistanceFormState = {
        name: "",
        weight: "",
        sets: "",
        reps: "",
        date: new Date()
    };

    const [resistanceForm, setResistanceForm] = useState(initialResistanceFormState);
    const [message, setMessage] = useState("");
    const loggedIn = Auth.loggedIn();

    const handleResistanceChange = (event) => {
        const { name, value } = event.target;
        setResistanceForm({ ...resistanceForm, [name]: value });
    };

    const handleDateChange = date => {
        const currentDate = new Date();
        const selectedDate = new Date(date);

        if (selectedDate < currentDate) {
            alert("Please select a future date.");
        } else {
            setResistanceForm({ ...resistanceForm, date });
        }
    };

    const validateForm = () => {
        const { name, weight, sets, reps, date } = resistanceForm;
        return name && weight && sets && reps && date;
    };

    const handleResistanceSubmit = async (event) => {
        event.preventDefault();

        const token = loggedIn ? Auth.getToken() : null;
        if (!token) return false;

        const userId = Auth.getUserId();

        if (validateForm()) {
            try {
                resistanceForm.userId = userId;
                const response = await createResistance(resistanceForm, token);

                if (!response.ok) {
                    throw new Error('Something went wrong!');
                }

                setMessage("Resistance successfully created!");
                setTimeout(() => {
                    setMessage("");
                }, 3000);

                // Clear form fields
                setResistanceForm(initialResistanceFormState);

                // Display success alert
                alert("Exercise added successfully!");
            } catch (err) {
                console.error(err);
            }
        }
    };

    if (!loggedIn) {
        return <Navigate to="/login" />;
    }

    return (
        <div className='resistance w-100  '>
            <Header />
            <div className="d-flex flex-column align-items-center ">
                <h2 className='title text-center'>Add Exercise</h2>
                <form className='resistance-form d-flex flex-column ' onSubmit={handleResistanceSubmit}>
                    <div className='d-flex justify-content-center'><img alt="resistance" src={resistanceIcon} className="exercise-form-icon" /></div>
                    <label>Name:</label>
                    <input type="text" name="name" id="name" placeholder="Bench Press"
                        value={resistanceForm.name} onChange={handleResistanceChange} />
                    <label>Weight (lbs):</label>
                    <input type="number" name="weight" id="weight" placeholder="0"
                        value={resistanceForm.weight} onChange={handleResistanceChange} />
                    <label>Sets:</label>
                    <input type="number" name="sets" id="sets" placeholder="0"
                        value={resistanceForm.sets} onChange={handleResistanceChange} />
                    <label>Reps:</label>
                    <input type="number" name="reps" id="reps" placeholder="0"
                        value={resistanceForm.reps} onChange={handleResistanceChange} />
                    <label >Date:</label>
                    <DatePicker selected={resistanceForm.date} onChange={handleDateChange} placeholderText="mm/dd/yyyy" />
                    <button className='submit-btn' type="submit" disabled={!validateForm()} >Add</button>
                </form>
                {message && <p className='message'>{message}</p>}
            </div>
        </div>
    );
}
