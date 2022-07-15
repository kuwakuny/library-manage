import * as Yup from 'yup'

export const userSchema = Yup.object().shape({
    nameKanji: Yup.string().required('名前を入力してください'),
    nameKana: Yup.string().required(),
    birthday: Yup.string().required(),
    gender: Yup.string().required(),
    email: Yup.string().required(),
    phone: Yup.string().required(),
    post: Yup.string().required(),
    address: Yup.string().required()
})