import * as Yup from 'yup';

export const SignUpValidation=Yup.object({
    name: Yup.string().trim()
     .min(3, 'Name should be min of 3 characters!')
     .max(50, 'Too Long!')
     .required('Required'),
   email: Yup.string().trim().email('Invalid email').required('Required'),
   password: Yup.string().trim().min(6,"min 6 characters required").max(12,"Too long").required("Required"),
   about: Yup.string().trim().required("Required"),
   phone: Yup.string().trim().min(10,"Enter valid phone no").max(10,"Enter without country code").required("Required"),
   city: Yup.string().trim().required("Required"),
});