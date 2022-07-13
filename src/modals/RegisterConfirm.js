import React, { useState } from 'react';
import './Form.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { memberList } from './Register'

function RegisterConfirm() {
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
                    <Modal.Title>登録情報確認</Modal.Title>
                </Modal.Header>
                <Modal.Body>
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
                        return <div className="member mx-auto" key={val.id}>
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
                        </div>
                    })}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>戻る</Button>
                    <Button variant="primary" onClick={ }>確定</Button>
                </Modal.Footer>
            </Modal>
        </div >
    );
}

export default RegisterConfirm;