import React, {useRef, useState} from 'react';
import {Button, Card, Col, Empty, Flex, Image, Row, Popover, Space, Typography} from "antd";
import {Swiper, SwiperSlide} from "swiper/react";
import {imageDefault, numberFormat, useMessageApi} from "ipretty/helpers/utils";
import {LeftOutlined, RightOutlined} from "@ant-design/icons";
import useNavigator from "ipretty/hook/useNavigator";
import {addToCartAction} from "ipretty/features/counter/counterSlice";
import {useDispatch, useSelector} from "react-redux";

const { Meta } = Card;
const {Title, Text} = Typography;
const SwiperCourseTemplate = (props) => {
    const { title, data } = props;
    const swiperElRef = useRef();
    const floatLeft = {float: 'left'};
    const navigate = useNavigator();
    const [ellipsis, setEllipsis] = useState(true);
    const dispatch = useDispatch();
    const {contextHolder , showSuccessMessage} = useMessageApi();
    const { counter } = useSelector((state) => state);

    const changeCart = () => {
        navigate(`/cart`);
    }

    const addToCart = (item) => {
        dispatch(addToCartAction(item))
        showSuccessMessage('Thêm giỏ hàng thành công');
    };
    const SwiperButtons = ({prev, next, swiperEl}) => {
        return (
            <>
                <div
                    id={prev}
                    onClick={() => {
                        swiperEl.current.swiper.slidePrev();
                    }}
                    style={{
                        left: '-35px',
                        background: 'black',
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        position: "absolute",
                        top: "99px",
                        fontSize: '23px',
                        display: 'flex',
                        zIndex: 2,
                        color: "#fff",
                        justifyContent: 'center',
                        cursor: "pointer"
                    }}
                ><LeftOutlined /></div>
                <div
                    id={next}
                    onClick={() => {
                        swiperEl.current.swiper.slideNext();
                    }}
                    style={{
                        background: 'black',
                        width: '50px',
                        height: '50px',
                        display: 'flex',
                        borderRadius: '50%',
                        position: 'absolute',
                        zIndex: '2',
                        right: '-33px',
                        fontSize: '23px',
                        justifyContent: 'center',
                        top: '43%',
                        cursor: "pointer"
                    }}
                ><RightOutlined width={20} height={20} />
                </div>
            </>
        )
    }

    const detailCourse = (course) => {
        // if (course.student_result && course.student_result.length) {
        //     let myResult = course.student_result.find(result => result.student_id == user.id && result.isPassed);
        //     if (myResult) {
        //         navigate(`/detail-course/${course.course_id}/completed`);
        //     }else {
        //         navigate(`/detail-course/${course.course_id}`);
        //     }
        // }else {
        //
        // }
        navigate(`/detail-course/${course.course_id}`);
    }

    const isCourseInCart = (course) => {
        return (counter['cartItems'].length > 0) ? counter['cartItems'].some(item => item.course_id === course.course_id) : false;
    };

    return (
        <Space style={{display: "block", marginBottom: '4.8rem'}}>
            <Flex justify='space-between' align="center" className="mb-3">
                <Title className='m-0' level={2}>{title}</Title>
                <Button type="link" className="m-0 load-more-new">Xem thêm</Button>
            </Flex>
            {
                (data.length === 0 ? <Empty/> :
                        <div style={{ position: 'relative'}}>
                            <Swiper
                                // watchSlidesProgress={true}
                                slidesPerView={5}
                                spaceBetween={30}
                                className="mySwiper"
                                ref={swiperElRef}
                            >
                                {
                                    data.map((item, index) => (
                                        <SwiperSlide key={index}>
                                            <Popover placement="right" content={
                                                <Flex vertical style={{padding: '20px', maxWidth: '400px'}}>
                                                    <Title level={3} style={
                                                        ellipsis
                                                            ? {
                                                                width: '100%',
                                                            }
                                                            : undefined
                                                        }
                                                       ellipsis={ellipsis}
                                                    >{item['course_name']}</Title>
                                                    <Text type="success">Ant Design (success)</Text>
                                                    <Text type="secondary">2 total hoursIntermediate LevelSubtitles</Text>
                                                    <Text type="">{item['course_description']}</Text>
                                                    { (!isCourseInCart(item)) ? <Button type="primary" size='large' onClick={() => addToCart(item)} className='w-100 mt-2'>Thêm giỏ hàng</Button>
                                                        : <Button type="primary" size='large' onClick={() => changeCart()} className='w-100 mt-2'>Đi đến giỏ hàng</Button>
                                                    }
                                                </Flex>
                                            }>
                                                <Card bodyStyle={{padding: 0}}
                                                      style={{cursor: "pointer", backgroundColor: '#fff', border: "none"}}
                                                      cover={
                                                          <Image
                                                              height={135}
                                                              alt="Hình ảnh khoá học "
                                                              src={item['course_feature_image']}
                                                              fallback={imageDefault()}
                                                              preview={false}
                                                              style={{
                                                                  objectFit: "cover"
                                                              }}
                                                          />
                                                      }
                                                      onClick={() => detailCourse(item)}
                                                >
                                                    <Meta title={
                                                        <Title level={4} className="title-course m-0">
                                                            <p style={{whiteSpace: 'pre-line'}}>{item['course_name']}</p>
                                                        </Title>
                                                    }
                                                          description={
                                                              <div>
                                                                  <div className="name-gv">
                                                                      <b style={floatLeft}>
                                                                          GV {item['teacher']}
                                                                      </b>
                                                                  </div>
                                                                  <Flex align="center">
                                                                      <Text strong  style={{ marginRight: '5px' }}>4.6</Text>
                                                                      <span className="star-rate">
                                                                     <i className="fa fa-star-o co-or"></i>
                                                                     <i className="fa fa-star-o co-or"></i>
                                                                     <i className="fa fa-star-o co-or"></i>
                                                                     <i className="fa fa-star-o co-or"></i>
                                                                     <i className="fa fa-star-o co-or"></i>
                                                                  </span>
                                                                      <Text type="secondary">(4,324)</Text>
                                                                  </Flex>
                                                                  <Flex justify="start" align="center">
                                                                      <Title className='mb-0' level={5} style={{ marginRight:'5px' }}>{((item['course_price'] > 0) ? numberFormat(item['course_price']) : 'Miễn Phí')}</Title>
                                                                      {(item['course_price'] > 0) ? <Text delete>{item['course_sale_price'] > 0 ? numberFormat(item['course_sale_price']) : 0}</Text> : ''}
                                                                  </Flex>
                                                              </div>
                                                          }
                                                          style={{
                                                              marginTop:' 20px'
                                                          }}
                                                    />
                                                </Card>
                                            </Popover>
                                        </SwiperSlide>
                                    ))
                                }
                            </Swiper>
                            <SwiperButtons
                                prev={`swiper-button-prev`}
                                next={`swiper-button-next`}
                                swiperEl={swiperElRef}/>
                        </div>
                )
            }
        </Space>
    )
};

export default SwiperCourseTemplate;