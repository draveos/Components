"use client"
import { useState } from "react"
import "./LoginForm.css"

export function LoginForm({ onSubmit, className = "" }) {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })
    const [errors, setErrors] = useState({})

    const validate = () => {
        const newErrors = {}
        if (!formData.email) {
            newErrors.email = "Email is required"
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid"
        }
        if (!formData.password) newErrors.password = "Password is required"
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
        if (errors[e.target.name]) {
            setErrors((prev) => ({ ...prev, [e.target.name]: undefined }))
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (validate()) {
            onSubmit?.(formData)
            setFormData({ email: "", password: "" }) // Clear form on successful submit
        }
    }

    return (
        <div className={`cosmic-login-form ${className}`}>
            <h3 className="cosmic-login-form__title">Example</h3>
            <form onSubmit={handleSubmit}>
                <div className="cosmic-login-form__group">
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email Address"
                        className={`cosmic-login-form__input ${errors.email ? "error" : ""}`}
                        required
                        aria-invalid={errors.email ? "true" : "false"}
                        aria-describedby={errors.email ? "email-error" : undefined}
                    />
                    {errors.email && (
                        <span id="email-error" className="cosmic-login-form__error">
              {errors.email}
            </span>
                    )}
                </div>
                <div className="cosmic-login-form__group">
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        className={`cosmic-login-form__input ${errors.password ? "error" : ""}`}
                        required
                        aria-invalid={errors.password ? "true" : "false"}
                        aria-describedby={errors.password ? "password-error" : undefined}
                    />
                    {errors.password && (
                        <span id="password-error" className="cosmic-login-form__error">
              {errors.password}
            </span>
                    )}
                </div>
                <button type="submit" className="cosmic-login-form__submit">
                    Sign In
                </button>
                <div className="cosmic-login-form__footer">
                    <a href="#" className="cosmic-login-form__link">
                        Forgot password?
                    </a>
                    <span className="cosmic-login-form__separator">|</span>
                    <a href="#" className="cosmic-login-form__link">
                        Sign Up
                    </a>
                </div>
            </form>
        </div>
    )
}
