import React, { useEffect, useState } from 'react'
import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { userSchema } from './UserValidation'
// eslint-disable-next-line
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

export default function Edit() {
    const regID = '100000'
    const getMemberID = '505532'

    const [memberID, setMemberID] = useState('')
    const [password, setPassword] = useState('')
    const [nameKanji, setNameKanji] = useState('')
    const [nameKana, setNameKana] = useState('')
    const [birthday, setBirthday] = useState()
    const [gender, setGender] = useState('男性')
    const handleRadio = (event) => { setGender(event.target.value) }
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [postCode, setPostCode] = useState('')
    const [address, setAddress] = useState('')
    const [authorityCODE, setAuthorityCODE] = useState(0)

    const navigate = useNavigate()

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(userSchema),
    })

    useEffect(() => {
        Axios.get('http://localhost:3001/get', { params: { getMemberID: getMemberID } }).then((response) => {
            if (response.data.error) {
                alert('失敗')
            } else {
                const r = response.data[0]
                setPassword(r.password)
                setNameKanji(r.nameKanji)
                setNameKana(r.nameKana)
                setBirthday(getYmd(r.birthday))
                // setGender(r.gender)
                setEmail(r.email)
                setPhone(r.phone)
                setPostCode(r.postCode)
                setAddress(r.address)
                setAuthorityCODE(r.authorityCODE)
                reset()
            }
        })
    }, [reset])

    const addMember = () => {
        Axios.post('http://localhost:3001/register', {
            memberID: memberID, password: password, nameKanji: nameKanji, nameKana: nameKana, birthday: birthday, gender: gender, email: email, phone: phone, postCode: postCode, address: address, authorityCODE: authorityCODE, regID: regID
        }).then((response) => {
            if (response.data.message) {
                alert('登録完了')
                navigate('/manager')
            } else {
                alert('IDが重複しています。登録をもう一度やり直してください。')
                handleClose()
            }
        })
    }

    const getYmd = (birthday) => {
        let d = new Date(birthday)
        return d.getFullYear() + '-' + ((d.getMonth() + 1) > 9 ? (d.getMonth() + 1).toString() : '0' + (d.getMonth() + 1)) + '-' + (d.getDate() > 9 ? d.getDate().toString() : '0' + d.getDate().toString())
    }

    const authorityText = () => {
        if (authorityCODE === 0) {
            return '一般会員'
        }
        return '管理者'
    }

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    return (
        <div className="card my-5 mx-auto" style={{ width: "25rem" }}>
            <div className="card-body">
                <h4 className="mt-1">会員情報修正</h4>
                <div className="border-bottom mt-3" style={{ margin: "-16px" }}></div>
                <form noValidate name="allForm" onSubmit={handleSubmit((() => {
                    // setMember()
                    handleShow()
                }))}>
                    <Form.Group className="mt-4 mb-3">
                        <Form.Label className="fw-bold">名前（漢字）</Form.Label>
                        <Form.Control defaultValue={nameKanji} {...register('nameKanji')} type="text" placeholder="図書タロウ" onChange={(event) => {
                            setNameKanji(event.target.value)
                        }} />
                        <span className="errors">{errors?.nameKanji?.message}</span>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="fw-bolder">名前（カタカナ）</Form.Label>
                        <Form.Control defaultValue={nameKana}  {...register('nameKana')} type="text" placeholder="トショタロウ" onChange={(event) => {
                            setNameKana(event.target.value)
                        }} />
                        <span className="errors">{errors?.nameKana?.message}</span>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">生年月日</Form.Label>
                        <div className="col-md-auto">
                            <Form.Group >
                                <Form.Control defaultValue={birthday} type="date" name="dob" {...register('birthday')} onChange={(event) => {
                                    setBirthday(event.target.value)
                                    setPassword(event.target.value.replace(/-/g, ''))
                                }} />
                                <span className="errors">{errors?.birthday?.message}</span>
                            </Form.Group>
                        </div>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">性別</Form.Label>
                        <div>
                            <div className="form-check form-check-inline">
                                <input checked={gender === '男性'} className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value='男性' onChange={handleRadio} />
                                <label className="form-check-label" htmlFor="inlineRadio1">男性</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input checked={gender === '女性'} className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value='女性' onChange={handleRadio} />
                                <label className="form-check-label" htmlFor="inlineRadio2">女性</label>
                            </div>
                            <div className="errors">{errors?.gender?.message}</div>
                        </div>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">メールアドレス</Form.Label>
                        <Form.Control defaultValue={email} {...register('email')} type="email" placeholder="mirine@global.com" onChange={(event) => {
                            setEmail(event.target.value)
                        }} />
                        <span className="errors">{errors?.email?.message}</span>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">電話番号</Form.Label>
                        <Form.Control defaultValue={phone}{...register('phone')} type="tel" placeholder="09012345678" onChange={(event) => {
                            setPhone(event.target.value)
                        }} />
                        <span className="errors">{errors?.phone?.message}</span>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">郵便番号</Form.Label>
                        <Form.Control defaultValue={postCode} {...register('post')} type="number" placeholder="1350051" onChange={(event) => {
                            setPostCode(event.target.value)
                        }} />
                        <span className="errors">{errors?.post?.message}</span>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">住所</Form.Label>
                        <Form.Control defaultValue={address}{...register('address')} type="text" placeholder="東京都豊島区駒込１ー２ー３ミリネビル２０１" onChange={(event) => {
                            setAddress(event.target.value)
                        }} />
                        <span className="errors">{errors?.address?.message}</span>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="flexCheckDefault" onChange={(event) => {
                                if (event.target.checked === false) {
                                    setAuthorityCODE(0)
                                } else {
                                    setAuthorityCODE(1)
                                }
                            }} />
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                登録者に管理者権限を与える。
                            </label>
                        </div>
                    </Form.Group>
                    <div className="border-bottom mt-3" style={{ margin: "-16px" }}></div>
                    <div className="float-end" style={{ marginTop: "30px" }}>
                        <Button variant="secondary" onClick={(() => {
                            reset()
                        })}>リセット</Button>
                        <Button type="submit" className="ms-2" variant="primary">登録</Button>
                    </div>
                </form>
                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>登録情報確認</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Container>
                            <Row className="mb-2">
                                <Col sm={4} className="text-end text-secondary">ユーザーID&nbsp;&nbsp;|</Col>
                                <Col sm={6}>{memberID} </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col sm={4} className="text-end text-secondary">パスワード&nbsp;&nbsp;|</Col>
                                <Col sm={6}>{password}</Col>
                            </Row>
                            <Row className="mb-2">
                                <Col sm={4} className="text-end text-secondary">名前(漢字)&nbsp;&nbsp;|</Col>
                                <Col sm={6}>{nameKanji}</Col>
                            </Row>
                            <Row className="mb-2">
                                <Col sm={4} className="text-end text-secondary">名前(カタカナ)&nbsp;&nbsp;|</Col>
                                <Col sm={6}>{nameKana}</Col>
                            </Row>
                            <Row className="mb-2">
                                <Col sm={4} className="text-end text-secondary">生年月日&nbsp;&nbsp;|</Col>
                                <Col sm={6}>{birthday}</Col>
                            </Row>
                            <Row className="mb-2">
                                <Col sm={4} className="text-end text-secondary">性別&nbsp;&nbsp;|</Col>
                                <Col sm={6}>{gender}</Col>
                            </Row>
                            <Row className="mb-2">
                                <Col sm={4} className="text-end text-secondary">メールアドレス&nbsp;&nbsp;|</Col>
                                <Col sm={6}>{email}</Col>
                            </Row>
                            <Row className="mb-2">
                                <Col sm={4} className="text-end text-secondary">電話番号&nbsp;&nbsp;|</Col>
                                <Col sm={6}>{phone}</Col>
                            </Row>
                            <Row className="mb-2">
                                <Col sm={4} className="text-end text-secondary">郵便番号&nbsp;&nbsp;|</Col>
                                <Col sm={6}>{postCode}</Col>
                            </Row>
                            <Row className="mb-2">
                                <Col sm={4} className="text-end text-secondary">住所&nbsp;&nbsp;|</Col>
                                <Col sm={6}>{address}</Col>
                            </Row>
                            <Row className="mb-2">
                                <Col sm={4} className="text-end text-secondary">権限&nbsp;&nbsp;|</Col>
                                <Col sm={6}>{authorityText()}</Col>
                            </Row>
                        </Container>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>戻る</Button>
                        <Button variant="primary" onClick={addMember}>確定</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div >
    )
}