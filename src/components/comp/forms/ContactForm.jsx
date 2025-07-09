"use client"
import { useState } from "react"
import "./ContactForm.css"

export function ContactForm({ onSubmit, className = "" }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    })
    const [errors, setErrors] = useState({})

    const validate = () => {
        const newErrors = {}
        if (!formData.name) newErrors.name = "Name is required"
        if (!formData.email) {
            newErrors.email = "Email is required"
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid"
        }
        if (!formData.message) newErrors.message = "Message is required"
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
        // Clear error for the field as user types
        if (errors[e.target.name]) {
            setErrors((prev) => ({ ...prev, [e.target.name]: undefined }))
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (validate()) {
            onSubmit?.(formData)
            setFormData({ name: "", email: "", message: "" }) // Clear form on successful submit
        }
    }

    return (
        <form className={`cosmic-contact-form ${className}`} onSubmit={handleSubmit}>
            <h3 className="cosmic-contact-form__title">Example</h3>
            <div className="cosmic-contact-form__group">
                <label htmlFor="name" className="cosmic-contact-form__label">
                    Name
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your cosmic name"
                    className={`cosmic-contact-form__input ${errors.name ? "error" : ""}`}
                    aria-invalid={errors.name ? "true" : "false"}
                    aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && (
                    <span id="name-error" className="cosmic-contact-form__error">
            {errors.name}
          </span>
                )}
            </div>

            <div className="cosmic-contact-form__group">
                <label htmlFor="email" className="cosmic-contact-form__label">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@galaxy.com"
                    className={`cosmic-contact-form__input ${errors.email ? "error" : ""}`}
                    aria-invalid={errors.email ? "true" : "false"}
                    aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                    <span id="email-error" className="cosmic-contact-form__error">
            {errors.email}
          </span>
                )}
            </div>

            <div className="cosmic-contact-form__group">
                <label htmlFor="message" className="cosmic-contact-form__label">
                    Message
                </label>
                <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Type anything..."
                    className={`cosmic-contact-form__textarea ${errors.message ? "error" : ""}`}
                    aria-invalid={errors.message ? "true" : "false"}
                    aria-describedby={errors.message ? "message-error" : undefined}
                />
                {errors.message && (
                    <span id="message-error" className="cosmic-contact-form__error">
            {errors.message}
          </span>
                )}
            </div>

            <button type="submit" className="cosmic-contact-form__submit">
                Send Message
            </button>
        </form>
    )
}
