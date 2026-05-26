export const allowedOrigins = [
    /^http:\/\/localhost:\d+$/
];

export const corsOptions = {
    origin: (origin, callback) => {
        // allow requests with no origin (like Postman, mobile apps)
        if (!origin) return callback(null, true);

        const isAllowed = allowedOrigins.some(pattern =>
            pattern.test(origin)
        );

        if (isAllowed) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
};

// REGULAR EXPRESSIONS
export const firstNamePattern = /^[a-zA-Z0-9 !@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{2,15}$/;
export const lastNamePattern = /^[a-zA-Z0-9 !@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{2,15}$/;
export const emailPattern = /^[a-zA-Z0-9!#$%&'*+-/=?^_`{|}~]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
export const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)(?!.*\s{2})[a-zA-Z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{8,24}$/;
export const otpPattern = /^[a-zA-Z0-9]{6}$/
export const phoneNumberPattern = /^\+(?:[0-9]?){6,14}[0-9]$/ // any international phone number
export const postalCodePattern = /^[A-Za-z0-9][A-Za-z0-9\s\-]*[A-Za-z0-9]$/

// JWT EXPIRY
export const initialSessionInDays = 15;
export const extendedSessionInDays = 30;

// SCHEMA STATUS
export const userStatusOptions = ["Active", "Pending", "Rejected", "Disabled", "Suspended"]
export const userStatusArray = userStatusOptions.map((option) => option?.toUpperCase())

export const rolesEnum = ["ADMIN", "STAFF", "CUSTOMER"]
export const loginStatuses = ["INVALID_PASSWORD", "INVALID_OTP", "SUCCESSFULL"]
export const loginSources = ["GOOGLE", "FACEBOOK", "EMAIL", "CNIC", "TWO FACTOR"]

export const profilePictureSizeLimit = 20000000 // 2_mb
export const profilePicture = "https://res.cloudinary.com/do6sd9nyx/image/upload/v1706343891/we-app-nextjs/Assets/profile-picture_ufgahm.png"
