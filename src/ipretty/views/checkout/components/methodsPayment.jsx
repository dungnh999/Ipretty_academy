import React from 'react';
import {Flex, Segmented, Card, Typography} from "antd"
const {Title, Text} = Typography

const MethodsPayment = (props) => {
    const methods = [
        {
            name : 'MOMO',
            logo : 'https://cdn2.topica.vn/22886f7c-607d-4e28-9443-7fc586c865c6/product/5fe9c4a644d203002598b55a',
            type : 1
        },
        {
            name : 'VNPAY',
            logo : 'https://cdn2.topica.vn/22886f7c-607d-4e28-9443-7fc586c865c6/product/vnpay',
            type : 4
        },
        {
            name : 'CHUYỂN KHOẢN',
            logo : 'https://cdn2.topica.vn/22886f7c-607d-4e28-9443-7fc586c865c6/product/vnpay',
            type : 3
        },
    ]
    return (
        <>
            <Title level={5}>Phương thức thanh toán</Title>
            <Flex gap="large" align="flex-start" justify="space-between">
                { methods.map((item) => (
                    <Card bordered={false} style={{ width: '100%', textAlign: 'center', flex: 1}}>
                        <img src={item.logo} width={50} height={50}/>
                        <p>{item.name}</p>
                    </Card>
                ))}



                {/*<Segmented*/}
                {/*    style={{*/}
                {/*        width: '100%'*/}
                {/*    }}*/}
                {/*    options={[*/}
                {/*        {*/}
                {/*            label: (*/}
                {/*                <Flex align='center' justify='center' vertical*/}
                {/*                      style={{*/}
                {/*                          height: "140px",*/}
                {/*                          width: "140px",*/}
                {/*                      }}*/}
                {/*                >*/}
                {/*                    <Image preview={false}*/}
                {/*                           src="https://cdn2.topica.vn/22886f7c-607d-4e28-9443-7fc586c865c6/product/5fe9c4a644d203002598b55a"*/}
                {/*                           width={40} height={40}/>*/}
                {/*                    <div>Ví Momo</div>*/}
                {/*                </Flex>*/}
                {/*            ),*/}
                {/*            value: '1',*/}
                {/*        },*/}
                {/*        {*/}
                {/*            label: (*/}
                {/*                <Flex align='center' justify='center' vertical*/}
                {/*                      style={{*/}
                {/*                          height: "140px",*/}
                {/*                          width: "140px",*/}
                {/*                      }}*/}
                {/*                >*/}
                {/*                    <Image preview={false}*/}
                {/*                           src="https://cdn2.topica.vn/22886f7c-607d-4e28-9443-7fc586c865c6/product/5fe9c4a444d203002598b556"*/}
                {/*                           width={40} height={40}/>*/}
                {/*                    <div>Thẻ Quốc Tế</div>*/}
                {/*                </Flex>*/}
                {/*            ),*/}
                {/*            value: '2',*/}
                {/*        },*/}
                {/*        {*/}
                {/*            label: (*/}
                {/*                <Flex align='center' justify='center' vertical*/}
                {/*                      style={{*/}
                {/*                          height: "140px",*/}
                {/*                          width: "140px",*/}
                {/*                      }}*/}
                {/*                >*/}
                {/*                    <Image preview={false}*/}
                {/*                           src="https://cdn2.topica.vn/5f9a7e51cb5acb5e85ce3010/product/621df7d47133c100271ad0e4"*/}
                {/*                           width={40} height={40}/>*/}
                {/*                    <div>Thẻ ATM Nội Địa</div>*/}
                {/*                </Flex>*/}
                {/*            ),*/}
                {/*            value: '3',*/}
                {/*        },*/}
                {/*        {*/}
                {/*            label: (*/}
                {/*                <Flex align='center' justify='center' vertical*/}
                {/*                      style={{*/}
                {/*                          height: "140px",*/}
                {/*                          width: "140px",*/}
                {/*                      }}*/}
                {/*                >*/}
                {/*                    <Image preview={false}*/}
                {/*                           src="https://cdn2.topica.vn/22886f7c-607d-4e28-9443-7fc586c865c6/product/vnpay"*/}
                {/*                           width={40} height={40}/>*/}
                {/*                    <div>VNPAY QR</div>*/}
                {/*                </Flex>*/}
                {/*            ),*/}
                {/*            value: '4',*/}
                {/*        },*/}
                {/*    ]}*/}
                {/*/>*/}
            </Flex>
        </>
    )
};

export default MethodsPayment;