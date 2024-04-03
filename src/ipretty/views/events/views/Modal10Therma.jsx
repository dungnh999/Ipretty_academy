import React, {useEffect, useState} from 'react';
import {Button, Modal} from "react-bootstrap";
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { SmileOutlined } from '@ant-design/icons';
import {notification } from 'antd';
import { Spin } from 'antd';

// import { JWT } from 'google-auth-library';
// import { google } from 'googleapis';
import key from '../auth/key.json'
import {getTokens} from "ipretty/helpers/utils";

const Modal10Therma = ({ showModal, setShowModal }) => {
    const [api, contextHolder] = notification.useNotification();
    const [spinning, setSpinning] = useState(false);
    const handleClose = () => setShowModal(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setSpinning(true);
        setDataForm(formData)
        // Reset form after submission if needed
        setFormData({ name: '', phone: '' });
    };
    async function setDataForm(formData) {
        let url = 'https://script.google.com/macros/s/AKfycbwQqaOwHgvRftToVEDsc0siHuHPc1yITnxwksrm12ldI9fsEBxAUdwX25jMWq6TYgXKEw/exec   '
        let queryString = new URLSearchParams (formData);
        $.ajax({
            url: url,
            type: "post",
            data: queryString.toString()
        }).then(function(response) {
            setSpinning(false);
            handleClose();
            api.open({
                message: 'Đăng kí thành công !',
                description:
                    'Chúng tôi sẽ liên hệ cho bạn sớm nhất!',
                duration: 2,
                icon: <SmileOutlined style={{ color: '#108ee9' }}/>,
            });
        }).catch(function(error) {
            alert('Lỗi')
        });
    }
    return(
        <div
            className="modal show"
            style={{ display: 'block', position: 'initial' }}
        >
            {contextHolder}
            <Modal
                backdrop="static"
                keyboard={false}
                show={showModal}
                size='lg'
                id="modal-form-customer"
            >
                <Modal.Body>
                    <Spin tip="Đợi chút..." spinning={spinning} >
                        <div class="row justify-content-center">
                            <div class="head-form d-flex justify-content-center align-items-center flex-column mb-3">
                                <h3 class="mb-3">ĐẶT DỊCH VỤ</h3>
                                <p class="mb-3">Chúng tôi sẽ liên hệ ngay khi nhận được thông tin</p>
                                <button style={{
                                    width: '248px',
                                    height:'57px',
                                    background: '#834dd0',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '57px',
                                    pointerEvents: 'none',
                                    fontSize: '22px',
                                }}>10 THERMA</button>
                            </div>
                            <form>
                                <div class="row">
                                    <div class="col">
                                        <input type="text" id="name-modal" className="form-control"
                                               placeholder="Nhập tên" name='name' onChange={handleChange}/>
                                    </div>
                                    <div class="col">
                                        <input type="text" id="phone-modal" className="form-control"
                                               placeholder="Số điện thoại" name='phone' onChange={handleChange}/>
                                    </div>
                                </div>
                            </form>
                            <div class="row justify-content-center align-items-center">
                                <button type="button" style={{
                                    width: 'max-content',
                                    marginTop: '15px',
                                    border: 'none',
                                    padding: '12px 24px',
                                    borderRadius: '30px',
                                    fontSize: '19px',
                                    fontWeight: 700,
                                    color: '#fff',
                                    background: '#834dd0',
                                }}
                                        onClick={handleSubmit}
                                >ĐĂNG KÝ NGAY
                                </button>
                                <button type="button" onClick={handleClose} style={{
                                    width: 'max-content',
                                    marginTop: '15px',
                                    border: 'none',
                                    padding: '12px 24px',
                                    borderRadius: '30px',
                                    fontSize: '19px',
                                    fontWeight: 700,
                                    color: 'aliceblue',
                                    background: 'gray',
                                    marginLeft: '12px',
                                }}
                                >Đóng
                                </button>
                            </div>
                        </div>
                    </Spin>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Modal10Therma;