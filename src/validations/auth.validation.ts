import Joi from "joi";

export const registerValidation = Joi.object({
    fullName: Joi.string()
        .min(3)
        .max(100)
        .required()
        .messages({
            "string.empty": "Name is required",
            "any.required": "Name is required",
            "string.min": "Name must be at least 3 characters",
            "string.max": "Name cannot exceed 100 characters",
        }),

    email: Joi.string()
        .email()
        .required()
        .messages({
            "string.email": "Please enter a valid email",
            "string.empty": "Email is required",
            "any.required": "Email is required",
        }),

    password: Joi.string()
        .min(4)
        .required()
        .messages({
            "string.min": "Password must be at least 4 characters long",
            "string.empty": "Password is required",
            "any.required": "Password is required",
        }),

    confirmPassword: Joi.string()
        .valid(Joi.ref("password"))
        .required()
        .messages({
            "any.only": "Passwords do not match",
            "string.empty": "Confirm Password is required",
            "any.required": "Confirm Password is required",
        }),

    role: Joi.string()
        .valid("student", "recruiter")
        .required()
        .messages({
            "any.only": "Invalid role",
            "any.required": "Role is required",
        }),

    phoneNumber: Joi.string()
        .pattern(/^[0-9]{10}$/)
        .required()
        .messages({
            "string.pattern.base":
                "Please enter a valid 10-digit phone number",
            "string.empty": "Phone number is required",
            "any.required": "Phone number is required",
        }),
});

export const loginValidation = Joi.object({
    email: Joi.string()
        .email()
        .required()
        .messages({
            "string.email": "Please enter a valid email",
            "string.empty": "Email is required",
            "any.required": "Email is required",
        }),

    password: Joi.string()
        .min(4)
        .required()
        .messages({
            "string.min": "Password must be at least 4 characters long",
            "string.empty": "Password is required",
            "any.required": "Password is required",
        }),
});