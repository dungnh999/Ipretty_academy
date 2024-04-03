import React, {useEffect, useState} from "react";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import UserService from "../../../services/UserService";
import {Card, Empty, Flex, Image, Space, Typography} from 'antd';
import {Swiper, SwiperSlide} from "swiper/react";

const {Title, Paragraph , Text} = Typography;

const TeachersStore = (props) => {
    const [dataTeachers, setDataTeachers] = useState([])
    const [loading, setLoading] = useState(false)
    const [apiCalled , setApiCalled] = useState(false)
    useEffect(() => {
        if(!apiCalled){
            getListTeachers({ role: 'teacher' });
            setApiCalled(true)
        }
        // let mounted = true;
        // const runListTeacherAsync = async () => {
        //     try {
        //         // if (mounted) {
        //         // }
        //         getListTeachers({ role: 'teacher' });
        //     } catch (e) {
        //         // if (mounted) {
        //         //     throw e;
        //         // }
        //     }
        // };
        // runListTeacherAsync();
        // return () => (mounted = false);
    }, [apiCalled]);


    function getListTeachers(params) {
        UserService.getUsersByRole(
            {...params},
            (res) => {
                const data = res.data.data;
                setDataTeachers(data);
            },
            (err) => {
            }
        );
    }

    console.log('logs' , dataTeachers);

    const heightName = { style : 'height: 30px'}
    const styleA = { color: '#273167' , fontSize: '20px', textTransform: 'capitalize'}
    if(!dataTeachers.length){
        return (
            <Space style={{display: "block"}}>
                <Title level={4}>GIÁO VIÊN TIÊU BIỂU</Title>
                <Empty />
            </Space>
        )
    }
    return (
       <Space style={{display: "block",  marginBottom: '4.8rem'}}>
           <Title level={4}>Giảng viên tiêu biểu</Title>
           <Swiper
               slidesPerView={4}
               spaceBetween={30}
               className="mySwiper"
           >
               {
                   dataTeachers.map((item, index) => (
                       <SwiperSlide key={index}>
                           <Card
                               bordered={false}
                               bodyStyle={{
                                   padding: '0',
                               }}
                               style={{
                                   overflow: 'hidden',
                                   borderRadius: '12px',
                               }}>
                               <Flex justify="center" align="center" vertical>
                                   <div style={{
                                       width: '100%',
                                       background: '#003a33',
                                       borderRadius: '0px 14px'
                                   }}>
                                       <div className='card-image' style={{
                                           position: 'relative',
                                           borderRadius: '50%',
                                           background: 'rgb(255, 255, 255)',
                                           padding: '3px',
                                           width: '150px',
                                           margin:'26px auto',
                                       }}>
                                           <Image
                                               src={item['avatar']}
                                               preview={false}
                                               style={{
                                                   borderRadius: "50%",
                                                   height: "150px",
                                                   width: "150px",
                                                   objectFit: 'cover',
                                                   borderColor: '#00563d',
                                                   border: '3px solid'
                                               }}/>
                                       </div>
                                   </div>
                                   <div className='card-content'>
                                       <Flex align="center" justify="center" vertical style={{    padding: '10px 14px'}}>
                                           <Title level={4}>{item['name']}</Title>
                                           <Paragraph style={{textAlign: 'center'}}>
                                               <Text type="secondary">
                                                   Mohamed Yousef Mohamed Yousef Mohamed Yousef Mohamed Yousef Mohamed Yousef Mohamed Yousef Mohamed Yousef
                                               </Text>
                                           </Paragraph>
                                       </Flex>
                                   </div>
                               </Flex>
                           </Card>
                       </SwiperSlide>
                   ))
               }
           </Swiper>
           {/*<div>*/}
               {/*<OwlCarousel className='owl-loading' nav={false} dots={false} autoplay={true} autoplayTimeout={1500} items={4}>*/}
               {/*    {*/}
               {/*        dataTeachers.map((item, index) => (*/}
               {/*            <div key={index} className="inner-box-teacher item"  style={{*/}
               {/*                boxShadow: '2px 2px 8px rgba(0, 0, 0, .07951'*/}
               {/*            }}>*/}
               {/*                <div className="img-teacher">*/}
               {/*                    <img src={item['avatar']} alt="Nguyễn Hiếu" />*/}
               {/*                </div>*/}
               {/*                <div className="name-teacher" style={heightName}>*/}
               {/*                    <a href="/teacher/nguyen-hieu" style={styleA}>{item['name']}</a>*/}
               {/*                </div>*/}
               {/*                <div className="des-teacher">{item['name']}</div>*/}
               {/*            </div>*/}
               {/*        ))*/}
               {/*    }*/}
               {/*    {*/}
               {/*        dataTeachers.map((item, index) => (*/}
               {/*            <div key={index} className="inner-box-teacher item"  style={{*/}
               {/*                    boxShadow: '2px 2px 8px rgba(0, 0, 0, .07951'*/}
               {/*                }}>*/}
               {/*                <div className="img-teacher">*/}
               {/*                    <img src={item['avatar']} alt="Nguyễn Hiếu" />*/}
               {/*                </div>*/}
               {/*                <div className="name-teacher" style={heightName}>*/}
               {/*                    <a href="/teacher/nguyen-hieu" style={styleA}>{item['name']}</a>*/}
               {/*                </div>*/}
               {/*                <div className="des-teacher">{item['name']}</div>*/}
               {/*            </div>*/}
               {/*        ))*/}
               {/*    }*/}
               {/*    {*/}
               {/*        dataTeachers.map((item, index) => (*/}
               {/*            <div key={index} className="inner-box-teacher item"  style={{*/}
               {/*                boxShadow: '2px 2px 8px rgba(0, 0, 0, .07951'*/}
               {/*            }}>*/}
               {/*                <div className="img-teacher">*/}
               {/*                    <img src={item['avatar']} alt="Nguyễn Hiếu" />*/}
               {/*                </div>*/}
               {/*                <div className="name-teacher" style={heightName}>*/}
               {/*                    <a href="/teacher/nguyen-hieu" style={styleA}>{item['name']}</a>*/}
               {/*                </div>*/}
               {/*                <div className="des-teacher">{item['name']}</div>*/}
               {/*            </div>*/}
               {/*        ))*/}
               {/*    }*/}
               {/*</OwlCarousel>*/}
           {/*</div>*/}
       </Space>
    )
}


export default TeachersStore;