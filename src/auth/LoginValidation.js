import * as Yup from "yup";

export const LoginValidation = Yup.object({
    email: Yup.string().trim().email("Invalid Email").required("Required"),
    password: Yup.string().required("Required"),
})