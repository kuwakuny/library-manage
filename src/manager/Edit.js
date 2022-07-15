import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Axios from 'axios';

function Edit() {
    const [id, setId] = useState('')
    const [password, setPassword] = useState('')
    const [nameKanji, setNameKanji] = useState('')
    const [nameKana, setNameKana] = useState('')
    const [birthday, setBirthday] = useState()
    const [gender, setGender] = useState(0)
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [post, setPost] = useState('')
    const [address, setAddress] = useState('')
    const [authority, setAuthority] = useState(0)
    const [memberList, setMemberList] = useState([])

    const Clear = () => {
        document.allForm.reset();
    }

    const setMember = () => {
        setMemberList([...memberList, {
            id: id, password: password, nameKanji: nameKanji, nameKana: nameKana, birthday: birthday, gender: gender, email: email, phone: phone, post: post, address: address, authority: authority
        }])
    };

    const addMember = () => {
        Axios.post('http://localhost:3001/create', {
            id: id, password: password, nameKanji: nameKanji, nameKana: nameKana, birthday: birthday, gender: gender, email: email, phone: phone, post: post, address: address, authority: authority
        })
    }

    const getMember = () => {
        Axios.get('http://localhost:3001/members').then((response) => {
            setMemberList(response.data)
        });
    };

    const getYmd = () => {
        let d = new Date(birthday);
        return d.getFullYear() + '/' + ((d.getMonth() + 1) > 9 ? (d.getMonth() + 1).toString() : '0' + (d.getMonth() + 1)) + '/' + (d.getDate() > 9 ? d.getDate().toString() : '0' + d.getDate().toString());
    }

    const genderText = () => {
        if (gender === 0) {
            return '男性'
        }
        return '女性'
    }

    const authorityText = () => {
        if (authority === 0) {
            return '一般会員'
        }
        return '管理者'
    }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className="card my-5 mx-auto" style={{ width: "25rem" }}>
            <div className="card-body">
                <h4 >会員情報登録</h4>
                <div className="border-bottom mt-3" style={{ margin: "-16px" }}></div>
                <Form name="allForm">
                    <Form.Group className="mt-4 mb-3">
                        <Form.Label className="fw-bold">名前（漢字）</Form.Label>
                        <Form.Control type="text" placeholder="図書タロウ" onChange={(event) => {
                            setNameKanji(event.target.value);
                        }} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="fw-bolder">名前（カタカナ）</Form.Label>
                        <Form.Control type="text" placeholder="トショタロウ" onChange={(event) => {
                            setNameKana(event.target.value);
                        }} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">生年月日</Form.Label>
                        <div className="col-md-auto">
                            <Form.Group>
                                <Form.Control type="date" name="dob" onChange={(event) => {
                                    setBirthday(event.target.value);
                                    setPassword(event.target.value.replace(/-/g, ''));
                                }} />
                            </Form.Group>
                        </div>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">性別</Form.Label>
                        <div>
                            <p className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" />
                                <label className="form-check-label" htmlFor="inlineRadio1">男性</label>
                            </p>
                            <p className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="1" onChange={(event) => {
                                    if (event.target.checked === true) {
                                        setGender(event.target.value);
                                    }
                                }} />
                                <label className="form-check-label" htmlFor="inlineRadio2">女性</label>
                            </p>
                        </div>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">メールアドレス</Form.Label>
                        <Form.Control type="text" placeholder="mirine@global.com" onChange={(event) => {
                            setEmail(event.target.value);
                        }} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">電話番号</Form.Label>
                        <Form.Control type="number" placeholder="09012345678" onChange={(event) => {
                            setPhone(event.target.value);
                        }} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">郵便番号</Form.Label>
                        <Form.Control type="number" placeholder="1350051" onChange={(event) => {
                            setPost(event.target.value);
                        }} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">住所</Form.Label>
                        <Form.Control type="text" placeholder="東京都豊島区駒込１ー２ー３ミリネビル２０１" onChange={(event) => {
                            setAddress(event.target.value);
                        }} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="1" id="flexCheckDefault" onChange={(event) => {
                                if (event.target.checked === true)
                                    setAuthority(event.target.value);
                            }} />
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                登録者に管理者権限を与える。
                            </label>
                        </div>
                    </Form.Group>
                    <div className="alert alert-danger mb-3" role="alert">
                        erroredFormを正しく入力してください。
                    </div>
                    <div className="border-bottom mt-3" style={{ margin: "-16px" }}></div>
                </Form>
                <div className="float-end" style={{ marginTop: "30px" }}>
                    <Button variant="secondary" onClick={Clear}>クリア</Button>
                    <Button className="ms-2" variant="primary" onClick={() => {
                        setId(Math.floor(Math.random() * 900000) + 100000);
                        setMember();
                        handleShow();
                    }}>
                        登録
                    </Button>
                </div>
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
                        <Container className="fs-5">
                            <Row className="mb-2">
                                <Col sm={4} className="text-end text-secondary">ユーザーID</Col>
                                <Col sm={6}>{id} </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col sm={4} className="text-end text-secondary">パスワード</Col>
                                <Col sm={6}>{password}</Col>
                            </Row>
                            <Row className="mb-2">
                                <Col sm={4} className="text-end text-secondary">名前(漢字)</Col>
                                <Col sm={6}>{nameKanji}</Col>
                            </Row>
                            <Row className="mb-2">
                                <Col sm={4} className="text-end text-secondary">名前(カタカナ)</Col>
                                <Col sm={6}>{nameKana}</Col>
                            </Row>
                            <Row className="mb-2">
                                <Col sm={4} className="text-end text-secondary">生年月日</Col>
                                <Col sm={6}>{getYmd()}</Col>
                            </Row>
                            <Row className="mb-2">
                                <Col sm={4} className="text-end text-secondary">性別</Col>
                                <Col sm={6}>{genderText()}</Col>
                            </Row>
                            <Row className="mb-2">
                                <Col sm={4} className="text-end text-secondary">メールアドレス</Col>
                                <Col sm={6}>{email}</Col>
                            </Row>
                            <Row className="mb-2">
                                <Col sm={4} className="text-end text-secondary">電話番号</Col>
                                <Col sm={6}>{phone}</Col>
                            </Row>
                            <Row className="mb-2">
                                <Col sm={4} className="text-end text-secondary">郵便番号</Col>
                                <Col sm={6}>{post}</Col>
                            </Row>
                            <Row className="mb-2">
                                <Col sm={4} className="text-end text-secondary">住所</Col>
                                <Col sm={6}>{address}</Col>
                            </Row>
                            <Row className="mb-2">
                                <Col sm={4} className="text-end text-secondary">権限</Col>
                                <Col sm={6}>{authorityText()}</Col>
                            </Row>
                        </Container>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>戻る</Button>
                        <Button variant="success" onClick={getMember}>DB取得</Button>
                        <Button variant="primary" onClick={addMember}>確定</Button>
                    </Modal.Footer>
                    {memberList.map((val, key) => {
                        return <div className="member ms-3" key={val.id}>
                            <div>id: {val.id}</div>
                            <div>password: {val.password}</div>
                            <div>nameKanji: {val.nameKanji}</div>
                            <div>nameKana: {val.nameKana}</div>
                            <div>birthday: {getYmd()}</div>
                            <div>gender: {genderText()}</div>
                            <div>email: {val.email}</div>
                            <div>phone: {val.phone}</div>
                            <div>post: {val.post}</div>
                            <div>address: {val.address}</div>
                            <div>authority: {authorityText()}</div>
                        </div>
                    })}
                </Modal>
            </div>
        </div >
    );
}
export default Edit;