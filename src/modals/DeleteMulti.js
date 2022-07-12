import './Form.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function DeleteMulti() {
  //モーダルのshow属性のstateを操作
  const [show, setShow] = useState(false);
  //モーダルを消す
  const handleClose = () => setShow(false);
  //モーダルを開く
  const handleShow = () => setShow(true);

  return (
    <div>
      {/*新規登録ボタン*/}
      <Button variant="danger" onClick={handleShow}>
        一括削除
      </Button>

      <Modal
        //{show}がtrueかfalseかで表示か非表示
        show={show}
        //handleCloseを呼び出しshowをfalseに
        onHide={handleClose}
        //static：背景を暗くする、背景をクリックしてもモーダルを維持
        backdrop="static"
        //false：ESCを押してもモーダルが閉じられない
        keyboard={false}
      >
        {/*閉じるボタン*/}
        <Modal.Header closeButton>
          <Modal.Title>会員情報一括削除確認</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            選択した{'{'}selected_count{'}'}個の会員情報を本当に削除しますか？
          </div>
          <Form>
            <Form.Group className="mb-2 mt-3">
              <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked />
                <label className="form-check-label" for="flexRadioDefault1">
                  会員情報を<strong>非表示</strong>にする。
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                <label className="form-check-label" for="flexRadioDefault2">
                  会員情報をデータベースから完全に<strong>消去</strong>する。
                </label>
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>いいえ</Button>
          <Button variant="danger">はい</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default DeleteMulti;