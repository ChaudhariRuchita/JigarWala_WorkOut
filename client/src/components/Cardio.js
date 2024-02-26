import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Auth from "../utils/auth";
import { createCardio } from '../utils/API';
import Header from "./Header";
import cardioIcon from "../assets/images/cardio-w.png";

export default function Cardio() {
    const initialCardioFormState = {
        name: "",
        distance: "",
        duration: "",
        date: new Date()
    };

    const [cardioForm, setCardioForm] = useState(initialCardioFormState);
    const [message, setMessage] = useState("");
    const loggedIn = Auth.loggedIn();

    const handleCardioChange = (event) => {
        const { name, value } = event.target;
        setCardioForm({ ...cardioForm, [name]: value });
    };

    const handleDateChange = date => {
        const currentDate = new Date();
        const selectedDate = new Date(date);

        if (selectedDate < currentDate) {
            alert("Please select a future date.");
        } else {
            setCardioForm({ ...cardioForm, date });
        }
    };

    const validateForm = () => {
        const { name, distance, duration, date } = cardioForm;
        return name && distance && duration && date;
    };

    const handleCardioSubmit = async (event) => {
        event.preventDefault();

        const token = loggedIn ? Auth.getToken() : null;
        if (!token) return false;

        const userId = Auth.getUserId();

        if (validateForm()) {
            try {
                cardioForm.userId = userId;
                const response = await createCardio(cardioForm, token);

                if (!response.ok) {
                    throw new Error('Something went wrong!');
                }

                setMessage("Cardio successfully added!");
                setTimeout(() => {
                    setMessage("");
                }, 3000);

                // Clear form fields
                setCardioForm(initialCardioFormState);

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
        <div className='cardio'>
            <Header />
            <div className="d-flex flex-column align-items-center">
                <h2 className='title text-center'>Add Exercise</h2>
                <form className='cardio-form d-flex flex-column' onSubmit={handleCardioSubmit}>
                    <div className='d-flex justify-content-center'><img alt="cardio" src={cardioIcon} className="exercise-form-icon" /></div>
                    <label>Name:</label>
                    <input type="text" name="name" id="name" placeholder="Running"
                        value={cardioForm.name} onChange={handleCardioChange} />
                    <label>Distance (miles):</label>
                    <input type="number" name="distance" id="distance" placeholder="0"
                        value={cardioForm.distance} onChange={handleCardioChange} />
                    <label>Duration (minutes):</label>
                    <input type="number" name="duration" id="duration" placeholder="0"
                        value={cardioForm.duration} onChange={handleCardioChange} />
                    <label>Date:</label>
                    <DatePicker selected={cardioForm.date} onChange={handleDateChange} placeholderText="mm/dd/yyyy" />
                    <button className='submit-btn cardio-submit-btn' type="submit" disabled={!validateForm()} >Add</button>
                </form>
                {message && <p className='message'>{message}</p>}
            </div>
        </div>
    );
}
