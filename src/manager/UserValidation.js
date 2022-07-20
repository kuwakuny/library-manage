import * as Yup from 'yup'
import 'yup-phone'

export const userSchema = Yup.object().shape({
    nameKanji: Yup
        .string()
        .max(50, '50文字以下を入力してください。')
        .required('名前（漢字）を入力してください。')
        .matches(/^[^\x20-\x7e]*$/, '全角文字のみ')
    ,
    nameKana: Yup
        .string()
        .max(50, '50文字以下を入力してください。')
        .required('名前（カタカナ）を入力してください。')
        .matches(/^[ァ-ー]+$/, '全角カタカナのみ')
    ,
    birthday: Yup
        .date()
        .typeError('正しい日付を入力してください。')
        .required('生年月日を入力してください。')
    ,
    email: Yup
        .string()
        .max(50, '50文字以下を入力してください。')
        .email('正しいメールアドレスを入力してください。')
        .required('メールアドレスを入力してください。')
    ,
    phone: Yup
        .string()
        .phone('JP', true, '正しい電話番号を入力してください。')
        .required('電話番号を入力してください。')
    ,
    post: Yup
        .string()
        .matches(/^\d{7}$/, '正しい郵便番号を入力してください。')
        .required('郵便番号を入力してください。')
    ,
    address: Yup
        .string()
        .required('住所を入力してください。')
        .max(70, '70文字以下を入力してください。')
        .matches(/^[^\x20-\x7e]*$/, '全角文字のみ')
    ,
})