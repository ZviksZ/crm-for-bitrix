import * as yup from "yup";

export const addModalSchema = yup.object().shape({
   date: yup.string().required('Обязательное поле'),
   amount: yup.string().required('Обязательное поле'),
   cost_item: yup.string().required('Обязательное поле'),
   bank_account_in: yup.string().required('Обязательное поле'),
});
export const loginSchema = yup.object().shape({
   login: yup.string().required('Обязательное поле'),
   password: yup.string().required('Обязательное поле'),
   rememberMe: yup.bool()
});
export const registerSchema = yup.object().shape({
   name: yup.string().required('Обязательное поле'),
   surname: yup.string().required('Обязательное поле'),
   email: yup.string().required('Обязательное поле'),
   password: yup.string().required('Обязательное поле')
});
export const projectMemberShema = yup.object().shape({
   date: yup.string().required('Обязательное поле'),
   budget: yup.string().required('Обязательное поле')
});

export const creditShema = yup.object().shape({
   entity: yup.string(),
   title: yup.string().required('Обязательное поле'),
   type: yup.string().required('Обязательное поле'),
   status: yup.string().required('Обязательное поле'),
   currency: yup.string().required('Обязательное поле'),
   balance: yup.string().required('Обязательное поле')
});

export const expenseShema = yup.object().shape({
   expense: yup.string(),
   title: yup.string().required('Обязательное поле')
});
