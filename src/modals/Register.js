import './Form.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Axios from 'axios';

function Register() {
  const id = 'DB入力時自動生成';
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

  const addMember = () => {
    Axios.post('http://localhost:3001/create', {
      id: id, password: password, nameKanji: nameKanji, nameKana: nameKana, birthday: birthday, gender: gender, email: email, phone: phone, post: post, address: address, authority: authority
    }).then(() => {
      setMemberList([...memberList, {
        id: id, password: password, nameKanji: nameKanji, nameKana: nameKana, birthday: birthday, gender: gender, email: email, phone: phone, post: post, address: address, authority: authority
      }])

    });
  };

  const getMembers = () => {
    Axios.get('http://localhost:3001/members').then((response) => {
      setMemberList(response.data)
    });
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        新規登録
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>会員情報登録</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label className="formName">名前（漢字）</Form.Label>
              <Form.Control type="text" placeholder="図書タロウ" onChange={(event) => {
                setNameKanji(event.target.value);
              }} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="formName">名前（カタカナ）</Form.Label>
              <Form.Control type="text" placeholder="トショタロウ" onChange={(event) => {
                setNameKana(event.target.value);
              }} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="formName">生年月日</Form.Label>
              <div className="col-md-auto">
                <Form.Group>
                  <Form.Control type="date" name="dob" onChange={(event) => {
                    const e = event.target.value;
                    setBirthday(e);
                    setPassword(e.replace(/-/g, ''));
                  }} />
                </Form.Group>
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="formName">性別</Form.Label>
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
              <Form.Label className="formName">メールアドレス</Form.Label>
              <Form.Control type="text" placeholder="mirine@global.com" onChange={(event) => {
                setEmail(event.target.value);
              }} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="formName">電話番号</Form.Label>
              <Form.Control type="number" placeholder="09012345678" onChange={(event) => {
                setPhone(event.target.value);
              }} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="formName">郵便番号</Form.Label>
              <Form.Control type="number" placeholder="1350051" onChange={(event) => {
                setPost(event.target.value);
              }} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="formName">住所</Form.Label>
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
            <div className="alert alert-danger my-auto" role="alert">
              errorFormを正しく入力してください。
            </div>
          </Form>
          <div className="App">
            <button className="buttons" onClick={addMember}>Add Member</button>
          </div>
          <div className="members">
            <button className="buttons" onClick={getMembers}>Show Members</button>
            {memberList.map((val, key) => {
              function getYmd() {
                let d = new Date(val.birthday);
                return d.getFullYear() + '-' + ((d.getMonth() + 1) > 9 ? (d.getMonth() + 1).toString() : '0' + (d.getMonth() + 1)) + '-' + (d.getDate() > 9 ? d.getDate().toString() : '0' + d.getDate().toString());
              }
              function genderText() {
                if (val.gender === 0) {
                  return '男性'
                }
                return '女性'
              }

              function authorityText() {
                if (val.authority === 0) {
                  return '一般会員'
                }
                return '管理者'
              }
              return <div className="member" key={val.id}>
                <h5>id: {val.id}</h5>
                <h5>password: {val.password}</h5>
                <h5>nameKanji: {val.nameKanji}</h5>
                <h5>nameKana: {val.nameKana}</h5>
                <h5>birthday: {getYmd()}</h5>
                <h5>gender: {genderText()}</h5>
                <h5>email: {val.email}</h5>
                <h5>phone: {val.phone}</h5>
                <h5>post: {val.post}</h5>
                <h5>address: {val.address}</h5>
                <h5>authority: {authorityText()}</h5>
                ********************************
              </div>
            })}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary">クリア</Button>
          <Button variant="primary">登録</Button>
        </Modal.Footer>
      </Modal>
    </div >
  );
}

export default Register;