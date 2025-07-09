"use client"

import { useState } from "react"

export function MultiStepForm({ onSubmit, className = "" }) {
    const [currentStep, setCurrentStep] = useState(0)
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleNext = () => {
        if (currentStep < 2) {
            setCurrentStep(currentStep + 1)
        }
    }

    const handlePrevious = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit?.(formData)
    }

    return (
        <div className={`wizard-form ${className}`}>
            <div className="wizard-progress">
                {[1, 2, 3].map((step, index) => (
                    <div key={step} className={`progress-step ${index <= currentStep ? "active" : ""}`}>
                        <div className="step-number">{step}</div>
                        {index < 2 && <div className="step-line"></div>}
                    </div>
                ))}
            </div>

            <form onSubmit={handleSubmit}>
                <div className="wizard-content">
                    {currentStep === 0 && (
                        <div className="step-content">
                            <h4>Personal Information</h4>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                placeholder="First Name"
                                className="form-input"
                                required
                            />
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                placeholder="Last Name"
                                className="form-input"
                                required
                            />
                        </div>
                    )}

                    {currentStep === 1 && (
                        <div className="step-content">
                            <h4>Contact Details</h4>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email"
                                className="form-input"
                                required
                            />
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Phone"
                                className="form-input"
                                required
                            />
                        </div>
                    )}

                    {currentStep === 2 && (
                        <div className="step-content">
                            <h4>Confirmation</h4>
                            <p>Please review your information:</p>
                            <div className="review-data">
                                <p>
                                    <strong>Name:</strong> {formData.firstName} {formData.lastName}
                                </p>
                                <p>
                                    <strong>Email:</strong> {formData.email}
                                </p>
                                <p>
                                    <strong>Phone:</strong> {formData.phone}
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                <div className="wizard-actions">
                    {currentStep > 0 && (
                        <button type="button" onClick={handlePrevious} className="btn-secondary">
                            Previous
                        </button>
                    )}
                    {currentStep < 2 ? (
                        <button type="button" onClick={handleNext} className="btn-primary">
                            Next
                        </button>
                    ) : (
                        <button type="submit" className="btn-primary">
                            Submit
                        </button>
                    )}
                </div>
            </form>
        </div>
    )
}
