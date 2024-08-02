import * as Yup from 'yup';

export const initialValues = {
    fullName: '',
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
    community: '',
    phone: '',
    country: '',
    state: '',
    city: '',
    zipcode: '',
    age: '',
    dob: '',
    qualification: '',
    gender: '',
    profilePhoto: null
};

export const validationSchema = Yup.object({
    fullName: Yup.string().required('Full Name is required'),
    userName: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
    phone: Yup.string().required('Phone No. is required'),
    country: Yup.string().required('Country is required'),
    state: Yup.string().required('State is required'),
    city: Yup.string().required('City is required'),
    zipcode: Yup.string().required('Zipcode is required'),
    age: Yup.number().min(0, 'Age must be a positive number').required('Age is required'),
    dob: Yup.string().required('Date of Birth is required'),
    qualification: Yup.string().required('Qualification is required'),
    community: Yup.string().required('Community is required'),
    gender: Yup.string().required('Gender is required'),
    profilePhoto: Yup.mixed().required('Profile Photo is required')
});