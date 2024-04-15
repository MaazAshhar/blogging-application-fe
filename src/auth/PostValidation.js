import * as Yup from 'yup';

export const CreatePostValidation=Yup.object({
    title: Yup.string().trim()
     .min(3, 'Title should be min of 3 characters!')
     .max(50, 'Title is too long')
     .required('Please enter the title'),
   category: Yup.string().trim().required('Please select a category'),
   content: Yup.string().trim().required("Please enter your content")
});