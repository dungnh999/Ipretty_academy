import React, {useEffect, useState, useRef} from "react";
import useNavigator from "../../../hook/useNavigator";
import CourseService from "../../../services/CourseService";
import {Card, Col, Row, Avatar, Typography, Empty, List, Popover, Space, Flex, Button} from 'antd';
import 'swiper/css';
import 'swiper/css/pagination';
import {Swiper, SwiperSlide} from 'swiper/react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import {Image} from 'antd'
import SwiperCourseTemplate from "ipretty/views/template/swiperCourseTemplate";
const { Meta } = Card;
const { Title, Text } = Typography;

const PromotionStore = (props) => {
    const swiperElRef = useRef();
    const [loading, setLoading] = useState(false)
    const [dataPost, setDataPost] = useState([])
    const navigate = useNavigator();
    useEffect(() => {
        let mounted = true;
        const runAsync = async () => {
            try {
                if (mounted) {
                    setLoading(true);
                    getListPosts();
                }
            } catch (e) {
                if (mounted) {
                    throw e;
                }
            }
        };
        runAsync();
        return () => (mounted = false);
    }, []);

    useEffect(() => {
        handleSwiperProgress("swiper-button-prev", "swiper-button-next", swiperElRef);
    }, [swiperElRef !== undefined]);
    const handleSwiperProgress = (prevButtonId, nextButtonId, swiperElRef) => {
        const prevButton = document.getElementById(prevButtonId);
        const nextButton = document.getElementById(nextButtonId);
        // swiperElRef.on('progress', () => {
        //     if (prevButton) {
        //         prevButton.disabled = swiperElRef.progress === 0;
        //         prevButton.classList.toggle('disabled', swiperElRef.progress === 0);
        //     }
        //
        //     if (nextButton) {
        //         nextButton.disabled = swiperElRef.progress === 1;
        //         nextButton.classList.toggle('disabled', swiperElRef.progress === 1);
        //     }
        // });
    };


    function getListPosts(params, sort, fieldName, defautSort) {
        CourseService.getAllCourse(
            {...params},
            (res) => {
                // setLoading(false);
                const data = res.data.data;
                setDataPost(data)
            },
            (err) => {
            }
        );
    }

    return (
        <SwiperCourseTemplate title={' Ưu đãi giảm giá'} data={dataPost} />
    )
}

export default PromotionStore;


//<Space style={{display: "block"}}>
//             <Flex justify='space-between' align="center">
//                 <Title className='m-0' level={4}>ƯU ĐÃI HÔM NAY</Title>
//                 <Button type="link" className="m-0 load-more-new">Xem thêm</Button>
//             </Flex>
//             {
//                 (dataPost.length === 0 ? <Empty/> :
//                     <div style={{ position: 'relative'}}>
//                         <Swiper
//                             // watchSlidesProgress={true}
//                             slidesPerView={5}
//                             spaceBetween={30}
//                             className="mySwiper"
//                             ref={swiperElRef}
//                         >
//                             {
//                                 dataPost.map((item, index) => (
//                                     <SwiperSlide key={index}>
//                                         <Card bodyStyle={{padding: 0}}
//                                               style={{cursor: "pointer", backgroundColor: '#fff', border: "none"}}
//                                               cover={
//                                                   <Image
//                                                       // width={240}
//                                                       height={135}
//                                                       alt="Hình ảnh khoá học "
//                                                       src={item['course_feature_image']}
//                                                       fallback={imageDefault()}
//                                                       preview={false}
//                                                       style={{
//                                                           objectFit: "cover"
//                                                       }}
//                                                   />
//                                               }
//                                               onClick={() => detailCourse(item)}
//                                         >
//                                             <Meta title={
//                                                         <Title level={4} className="title-course m-0">
//                                                             <p style={{whiteSpace: 'pre-line'}}>{item['course_name']}</p>
//                                                         </Title>
//                                                         }
//                                                   description={
//                                                       <div>
//                                                           <div className="name-gv">
//                                                               <b style={floatLeft}>
//                                                                   GV {item['teacher']}
//                                                               </b>
//                                                           </div>
//                                                           <Flex align="center">
//                                                               <Text strong  style={{ marginRight: '5px' }}>4.6</Text>
//                                                               <span className="star-rate">
//                                                          <i className="fa fa-star-o co-or"></i>
//                                                          <i className="fa fa-star-o co-or"></i>
//                                                          <i className="fa fa-star-o co-or"></i>
//                                                          <i className="fa fa-star-o co-or"></i>
//                                                          <i className="fa fa-star-o co-or"></i>
//                                                      </span>
//                                                               <Text type="secondary">(4,324)</Text>
//                                                           </Flex>
//                                                           <Flex justify="start" align="center">
//                                                               <Title className='mb-0' level={5} style={{ marginRight:'5px' }}>{((item['course_price'] > 0) ? numberFormat(item['course_price']) : 'Miễn Phí')}</Title>
//                                                               {(item['course_price'] > 0) ? <Text delete>{item['course_sale_price'] > 0 ? numberFormat(item['course_sale_price']) : 0}</Text> : ''}
//                                                           </Flex>
//                                                       </div>
//                                                   }
//                                                   style={{
//                                                       marginTop:' 20px'
//                                                   }}
//                                             />
//                                         </Card>
//                                     </SwiperSlide>
//                                 ))
//                             }
//                         </Swiper>
//                         {/*<div ref={navigationNextRef} className='swiper-button-next'></div>*/}
//                         <SwiperButtons
//                             prev={`swiper-button-prev`}
//                             next={`swiper-button-next`}
//                             swiperEl={swiperElRef}/>
//                     </div>
//                     // <List grid={{
//                     //     gutter: 16,
//                     //     xs: 2,
//                     //     sm: 2,
//                     //     md: 5,
//                     //     lg: 5,
//                     //     xl: 5,
//                     //     xxl: 5,
//                     // }} dataSource={dataPost} renderItem={(item) => (
//                     //     <List.Item>
//                     //         {/*<Popover placement="right" content={contentPopover}>*/}
//                     //         {/*    */}
//                     //         {/*</Popover>*/}
//
//                     //     </List.Item>
//                     // )}/>)
//                 )
//             }
//         </Space>