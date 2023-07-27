// "use client"
// import React from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { useRouter } from 'next/navigation';

// const Signup = () => {
//     const router = useRouter();
//     const handleSubmit = (values, { setSubmitting }) => {
//         fetch('/api/users', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(values),
//         })
//         .then((response) => {
//             if (response.ok) {
//             console.log('Registration successful');
//             // Registration successful
//             // Redirect the user or perform other actions

//             router.push('/dashboard');
//             } else {
//             // Registration failed
//             // Handle error case
//             console.log('Registration failed');
//             }
//         })
//         .catch((error) => {
//             console.log('Error registering:', error);
//         })
//         .finally(() => {
//             setSubmitting(false);
//         });
//     };

    
//     const formik = useFormik({
//         initialValues: {
//             firstName: '',
//             lastName: '',
//             address: '',
//             city: '',
//             state: '',
//             phone: '',
//             email: '',
//             username: '',
//             password: '',
//             confirmPassword: '',
//         },
//         validationSchema: Yup.object({
//             firstName: Yup.string().required('First Name is required'),
//             lastName: Yup.string().required('Last Name is required'),
//             address: Yup.string().required('Address is required'),
//             city: Yup.string().required('City is required'),
//             state: Yup.string().required('State is required'),
//             phone: Yup.string().required('Phone is required'),
//             email: Yup.string().email('Invalid email address').required('Email is required'),
//             username: Yup.string().required('Username is required'),
//             password: Yup.string().required('Password is required'),
//             confirmPassword: Yup.string()
//                 .oneOf([Yup.ref('password'), null], 'Passwords must match')
//                 .required('Confirm Password is required'),
//         }),
//         onSubmit: handleSubmit, 

//     });

    
//     return (
//         <div className="container mx-auto">
//             <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
//             <form onSubmit={formik.handleSubmit}>
//                 <div className="mb-4">
//                     <label htmlFor="firstName" className="block mb-2 font-semibold">
//                         First Name
//                     </label>
//                     <input
//                         type="text"
//                         id="firstName"
//                         name="firstName"
//                         onChange={formik.handleChange}
//                         value={formik.values.firstName}
//                         className="w-full px-4 py-2 border rounded focus:outline-none focus:border-indigo-500"
//                     />
//                     {formik.errors.firstName && (
//                         <div className="text-red-500">{formik.errors.firstName}</div>
//                     )}
//                 </div>
//                 <div className="mb-4">
//                     <label htmlFor="lastName" className="block mb-2 font-semibold">
//                         Last Name
//                     </label>
//                     <input
//                         type="text"
//                         id="lastName"
//                         name="lastName"
//                         onChange={formik.handleChange}
//                         value={formik.values.lastName}
//                         className="w-full px-4 py-2 border rounded focus:outline-none focus:border-indigo-500"
//                     />
//                     {formik.errors.lastName && (
//                         <div className="text-red-500">{formik.errors.lastName}</div>
//                     )}
//                 </div>
//                 <div className="mb-4">
//                     <label htmlFor="address" className="block mb-2 font-semibold">
//                         Address
//                     </label>
//                     <input
//                         type="text"
//                         id="address"
//                         name="address"
//                         onChange={formik.handleChange}
//                         value={formik.values.address}
//                         className="w-full px-4 py-2 border rounded focus:outline-none focus:border-indigo-500"
//                     />
//                     {formik.errors.address && (
//                         <div className="text-red-500">{formik.errors.address}</div>
//                     )}
//                 </div>
//                 <div className="mb-4">
//                     <label htmlFor="city" className="block mb-2 font-semibold">
//                         City
//                     </label>
//                     <input
//                         type="text"
//                         id="city"
//                         name="city"
//                         onChange={formik.handleChange}
//                         value={formik.values.city}
//                         className="w-full px-4 py-2 border rounded focus:outline-none focus:border-indigo-500"
//                     />
//                     {formik.errors.city && (
//                         <div className="text-red-500">{formik.errors.city}</div>
//                     )}
//                 </div>
//                 <div className="mb-4">
//                     <label htmlFor="state" className="block mb-2 font-semibold">
//                         State
//                     </label>
//                     <input
//                         type="text"
//                         id="state"
//                         name="state"
//                         onChange={formik.handleChange}
//                         value={formik.values.state}
//                         className="w-full px-4 py-2 border rounded focus:outline-none focus:border-indigo-500"
//                     />
//                     {formik.errors.state && (
//                         <div className="text-red-500">{formik.errors.state}</div>
//                     )}
//                 </div>
               
//                 <div className="mb-4">
//                     <label htmlFor="phone" className="block mb-2 font-semibold">
//                         Phone
//                     </label>
//                     <input
//                         type="text"
//                         id="phone"
//                         name="phone"
//                         onChange={formik.handleChange}
//                         value={formik.values.phone}
//                         className="w-full px-4 py-2 border rounded focus:outline-none focus:border-indigo-500"
//                     />
//                     {formik.errors.phone && (
//                         <div className="text-red-500">{formik.errors.phone}</div>
//                     )}
//                 </div>
//                 <div className="mb-4">
//                     <label htmlFor="email" className="block mb-2 font-semibold">
//                         Email
//                     </label>
//                     <input
//                         type="email"
//                         id="email"
//                         name="email"
//                         onChange={formik.handleChange}
//                         value={formik.values.email}
//                         className="w-full px-4 py-2 border rounded focus:outline-none focus:border-indigo-500"
//                     />
//                     {formik.errors.email && (
//                         <div className="text-red-500">{formik.errors.email}</div>
//                     )}
//                 </div>
//                 <div className="mb-4">
//                     <label htmlFor="username" className="block mb-2 font-semibold">
//                         Username
//                     </label>
//                     <input
//                         type="text"
//                         id="username"
//                         name="username"
//                         onChange={formik.handleChange}
//                         value={formik.values.username}
//                         className="w-full px-4 py-2 border rounded focus:outline-none focus:border-indigo-500"
//                     />
//                     {formik.errors.username && (
//                         <div className="text-red-500">{formik.errors.username}</div>
//                     )}
//                 </div>
//                 <div className="mb-4">
//                     <label htmlFor="password" className="block mb-2 font-semibold">
//                         Password
//                     </label>
//                     <input
//                         type="password"
//                         id="password"
//                         name="password"
//                         onChange={formik.handleChange}
//                         value={formik.values.password}
//                         className="w-full px-4 py-2 border rounded focus:outline-none focus:border-indigo-500"
//                     />
//                     {formik.errors.password && (
//                         <div className="text-red-500">{formik.errors.password}</div>
//                     )}
//                 </div>
//                 <div className="mb-4">
//                     <label htmlFor="confirmPassword" className="block mb-2 font-semibold">
//                         Confirm Password
//                     </label>
//                     <input
//                         type="password"
//                         id="confirmPassword"
//                         name="confirmPassword"
//                         onChange={formik.handleChange}
//                         value={formik.values.confirmPassword}
//                         className="w-full px-4 py-2 border rounded focus:outline-none focus:border-indigo-500"
//                     />
//                     {formik.errors.confirmPassword && (
//                         <div className="text-red-500">{formik.errors.confirmPassword}</div>
//                     )}
//                 </div>
//                 <button type="submit" className="px-4 py-2 bg-indigo-500 text-white font-semibold">
//                     Sign Up
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default Signup;
