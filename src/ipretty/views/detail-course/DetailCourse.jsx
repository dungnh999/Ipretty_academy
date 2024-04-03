import React, { useState, useEffect, Fragment } from 'react';
//image
import IconStudent from '../../../public/images/student_comment.png';
import {ConfigProvider, Skeleton, theme} from "antd";


import playIcon from "public/icon_svg/Play"

import SideBar from "ipretty/views/detail-course/components/SideBar";
import WrapperCourse from "ipretty/views/detail-course/components/WrapperCourse";

/**
 * ANTD
 * */

import {Row, Col, Image ,Rate, Typography, List, Flex, Button, Space, Card, Modal} from 'antd'
const {Title,Paragraph , Text} = Typography;
const { getDesignToken, useToken } = theme;

/**
 * Component import
 * */
import MyCoursesService from 'ipretty/services/MyCoursesService';

/**
 * Context
 * */

import { useLessonSurvey } from 'ipretty/context/lesson-survey-student/LessonSurveyStudentContext';
import { useAuth, useTokenAuth} from 'ipretty/context/AppProvider';
import useRouter from "use-react-router";
import useNavigator from 'ipretty/hook/useNavigator';
import {ListLesson} from "./components/ListLesson";
import {CheckOutlined,CarryOutOutlined ,ClockCircleFilled, VideoCameraFilled, HomeFilled, DashboardFilled} from "@ant-design/icons";
import BreadCrumbs from "ipretty/components/BreadCrumbs";
import {useMessageApi} from "ipretty/helpers/utils";
import Viewed from "ipretty/views/store/components/Viewed";
import RatingCourse from "ipretty/views/detail-course/components/RatingCourse";
import TeacherCourse from "ipretty/views/detail-course/components/TeacherCourse";
import ContentsCourse from "ipretty/views/detail-course/components/ContentsCourse";


const DetailCourse = (props) => {
    const { match } = props;
    const { course_id } = match.params;
    const {updateDataDetailCourse, dataCourse } = useLessonSurvey();
    const { courseInfo } = dataCourse;
    const { getTranslation } = useAuth();
    const {location} = useRouter();
    const navigate = useNavigator();
    const [relatedCourses, setRelatedCourses] = useState([])
    const [opinions, setOpinions] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [ellipsis, setEllipsis] = useState(true);
    const { token } = useToken();
    const {contextHolder , showSuccessMessage} = useMessageApi();
    const studentComments = [
        {
            bannerUrl: IconStudent,
            title: 'The courses here are amazing',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consequat viverra habitant urna facilisi proin scelerisque semper netus. Interdum posuere habitant et integer euismod. Vel neque metus vestibulum ege',
            name: 'Mr. Tran Quan joined',
            position: 'Professional beauty care for salon...'
        },
        {
            bannerUrl: IconStudent,
            title: 'The courses here are amazing',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consequat viverra habitant urna facilisi proin scelerisque semper netus. Interdum posuere habitant et integer euismod. Vel neque metus vestibulum ege',
            name: 'Mr. Tran Quan joined',
            position: 'Professional beauty care for salon...'
        },
        {
            bannerUrl: IconStudent,
            title: 'The courses here are amazing',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consequat viverra habitant urna facilisi proin scelerisque semper netus. Interdum posuere habitant et integer euismod. Vel neque metus vestibulum ege',
            name: 'Mr. Tran Quan joined',
            position: 'Professional beauty care for salon...'
        }
    ]

    useEffect(() => {
        getDetailMyCourse(course_id);
    }, [course_id]);

    const getDetailMyCourse = (idCourse) => {
        MyCoursesService.getDetailCourseNew(idCourse,
            (responses) => handleSuccess(responses), (errors) => handleError(errors))
    };

    const handleSuccess = (responses) => {
        if(responses && responses.data && responses.data.data) {
            const courseData = responses.data.data;
            updateDataDetailCourse(courseData);
        }
    };

    const handleError = (errors) => {

    };

    const styleColorPrimary= {
        color: token.colorPrimaryText,
    }

    const getRelatedCourse = (idCourse) => {
        MyCoursesService.getRelatedCourse(
            idCourse,
            res => {
                if(res.data && res.data.data && res.data.data.length )  {
                    let dataCourses = res.data.data
                    let courses = []
                    dataCourses.forEach(item => {
                        const course = {
                            title : item.course_name,
                            image : item.course_feature_image,
                            teacher : {
                                name: item.teacher ? item.teacher.name : "",
                                avatar: item.teacher ? item.teacher.avatar : ""
                            },
                            star : item.student_result_avg_rating,
                            unit_currency : item.unit_currency,
                            price  : item.course_price,
                            course_id : item.course_id,
                            course_type : item.course_type
                        }
                        courses.push(course)
                    })
                    setRelatedCourses(courses)
                }
            },
            err => {
                console.log(err)
            }
        )
    }

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return(
            <Fragment>
            {contextHolder}
            <div style={{position: 'relative'}}>
                <div style={{backgroundColor: '#004724', color: '#FBD0CD' ,padding: '32px 0px'}}>
                    <div className='container' style={{color: '#FBD0CD'}}>
                        <BreadCrumbs/>
                        <Row>
                            <Col span={20}>
                                <Title level={2} ellipsis={ellipsis} style={styleColorPrimary}>{ courseInfo['name'] }</Title>
                                <Title level={5}
                                       style={
                                           ellipsis
                                               ? {
                                                   width: '100%',
                                                   color: token.colorPrimaryText
                                               }
                                               : {
                                                   color: token.colorPrimaryText
                                               }
                                       }
                                       ellipsis={
                                           ellipsis
                                               ? {
                                                   rows: 2,
                                                   expandable: true,
                                                   symbol: 'Xem thêm',
                                               }
                                               : false
                                       }
                                >
                                    {courseInfo['description']}
                                </Title>
                                <Flex align='center' justify='left' gap={10}>
                                    <Text style={styleColorPrimary}>4.5</Text>
                                    <Rate disabled defaultValue={2}/> (5,362 ratings)
                                </Flex>
                                <Flex align='center' justify='left' gap={10}>
                                    <Text style={styleColorPrimary}>Giảng viên: </Text>
                                    <Button style={styleColorPrimary} type='link'>{courseInfo['teacher_name']}</Button>
                                </Flex>
                                <Flex align='center' justify='left' gap={10}>
                                    <Text style={styleColorPrimary}><CarryOutOutlined /> Ngày tạo: { courseInfo['created_at'] }</Text>
                                </Flex>
                            </Col>
                            <Col span={4}></Col>
                        </Row>
                    </div>
                </div>
                <div className='container' style={{padding: '32px 0px'}}>
                    <Row gutter={14} style={{marginBottom: '4.8rem'}}>
                        <Col span={20}>
                            <WrapperCourse/>
                            <ContentsCourse/>
                            <TeacherCourse/>
                            <RatingCourse/>
                        </Col>
                        <Col span={4}>
                            <SideBar/>
                        </Col>
                    </Row>
                    <Viewed/>
                </div>
            </div>

            {/*<Row>*/}
            {/*    <Col span={16}>*/}
            {/*        <Title level={2}>*/}
            {/*            { courseInfo['name'] }*/}
            {/*        </Title>*/}
            {/*        <Text type="secondary">*/}
            {/*            {courseInfo['description']}*/}
            {/*        </Text>*/}
            {/*        <Title level={4}>*/}
            {/*            Bạn sẽ học được gì?*/}
            {/*        </Title>*/}
            {/*        <List*/}
            {/*            grid={{ gutter: 16, column: 2 }}*/}
            {/*            size="small"*/}
            {/*            dataSource={courseInfo['course_target']}*/}
            {/*            renderItem={(item) =>*/}
            {/*                <List.Item style={{lineHeight: '1.6',  marginBottom: '18px', fontSize: "1.4rem",     padding: '0'}}>*/}
            {/*                    <CheckOutlined twoToneColor="#ff4d4f" style={{ color: 'var(---backgroud-color-primary)'}} />  { item.value }*/}
            {/*                </List.Item>}*/}
            {/*        />*/}
            {/*        <Title level={4}>*/}
            {/*            Nội dung khóa học*/}
            {/*        </Title>*/}
            {/*        <Flex justify='space-between'>*/}
            {/*            <Space>*/}
            {/*                <Text>*/}
            {/*                    <Text strong style={{ marginRight: '8px'}}>{ courseInfo['number_learning']}</Text>*/}
            {/*                    chương*/}
            {/*                    <Text strong style={{ margin: '8px 8px'}}>{ courseInfo['number_course_lesson']}</Text>*/}
            {/*                    bài học*/}
            {/*                </Text>*/}
            {/*            </Space>*/}
            {/*            <Button type='link'>Mở rộng tất cả</Button>*/}
            {/*        </Flex>*/}
            {/*        <ListLesson/>*/}
            {/*    </Col>*/}
            {/*    <Col span={8}>*/}
            {/*        <div style={styleSticky} id='preview-course'>*/}
            {/*            <div className='img-preview' onClick={showModal} style={{...{ background: 'url('+ courseInfo['course_feature_image'] +')' } , ...styleBackgroundImage}}>*/}
            {/*                <SVG style={styleSVG} src={playIcon}></SVG>*/}
            {/*                <p style={{fontSize:'1.6rem', textAlign: 'center', color: '#fff', verticalAlign: 'middle'}}>Xem giới thiệu khóa học</p>*/}
            {/*            </div>*/}
            {/*            <Title level={4} style={{*/}
            {/*                fontSize: "32px",*/}
            {/*                fontWeight: '400',*/}
            {/*                margin: '0 auto',*/}
            {/*                opacity: '.8'*/}
            {/*            }}>Miễn Phí</Title>*/}
            {/*            {(courseInfo['is_register'] > 0) ? <Button size='large' type='button' style={styleButton} onClick={JoinLeanr}>Vào học ngay</Button> : <Button size='large' type='button' style={styleButton} onClick={checkIsJoinCourse(courseInfo['course_id'], "")}>Đăng ký ngay</Button>}*/}
            {/*            <List*/}
            {/*                style={{ padding: '24px 0 10px 4px' }}*/}
            {/*                grid={{ gutter: 16, column: 2 }}*/}
            {/*                size="small"*/}
            {/*            >*/}
            {/*                <List.Item>*/}
            {/*                    <DashboardFilled/> Trình độ trung bình*/}
            {/*                </List.Item>*/}
            {/*                <List.Item>*/}
            {/*                    <ClockCircleFilled/> Tổng số { courseInfo['number_course_lesson']} bài học*/}
            {/*                </List.Item>*/}
            {/*                <List.Item>*/}
            {/*                    <VideoCameraFilled /> Thời lượng 08 giờ 47 phút*/}
            {/*                </List.Item>*/}
            {/*                <List.Item>*/}
            {/*                    <HomeFilled /> Học mọi lúc, mọi nơi*/}
            {/*                </List.Item>*/}
            {/*            </List>*/}
            {/*        </div>*/}
            {/*    </Col>*/}
            {/*</Row>*/}
            {/*<ListCourse/>*/}
            {/*/!*<TitleCourse/>*!/*/}
            {/*/!*<div className="u-detail-course" style={{ width: '1170px', margin: '0 auto' }}>*!/*/}
            {/*/!*    <Row  gutter={16}>*!/*/}
            {/*/!*        <Col span={16}>*!/*/}
            {/*/!*            <div className="u-detail-block-left">*!/*/}
            {/*/!*                <WrapperCourse/>*!/*/}
            {/*/!*            </div>*!/*/}
            {/*/!*            <div className="tab-detail hidden-xs" >*!/*/}
            {/*/!*                <ul>*!/*/}
            {/*/!*                    <li><a href="#u-des-course">Giới thiệu</a></li>*!/*/}
            {/*/!*                    <li><a href="#u-list-course">Nội dung khóa học</a></li>*!/*/}
            {/*/!*                    <li><a href="#u-course-teacher">Thông tin giảng viên</a></li>*!/*/}
            {/*/!*                    <li><a href="#u-rate-hv">Đánh giá</a></li>*!/*/}
            {/*/!*                </ul>*!/*/}
            {/*/!*            </div>*!/*/}
            {/*/!*            <DescriptionCourse />*!/*/}
            {/*/!*            <InfoTeacherCourse/>*!/*/}
            {/*/!*            <ListLesson/>*!/*/}
            {/*/!*            <ListCourse/>*!/*/}
            {/*/!*        </Col>*!/*/}
            {/*/!*        <Col span={8}>*!/*/}
            {/*/!*            <SideBar/>*!/*/}
            {/*/!*        </Col>*!/*/}
            {/*/!*    </Row>*!/*/}
            {/*/!*</div>*!/*/}
            {/*<Modal*/}
            {/*    title="Giới thiệu khoá học"*/}
            {/*    open={isModalOpen}*/}
            {/*    width='60%'*/}
            {/*    centered*/}
            {/*    footer={null}*/}
            {/*    onCancel={handleCancel}*/}

            {/*>*/}
            {/*    <Title level={4}>Lập Trình JavaScript Cơ Bản</Title>*/}
            {/*    <div id="player_videojs" style={{ background: "black", padding: '0 8.5%'}}>*/}
            {/*        <ReactPlayer*/}
            {/*            controls*/}
            {/*            playing={true}*/}
            {/*            width={'100%'}*/}
            {/*            height={'100%'}*/}
            {/*            url={courseInfo['course_feature_image']}*/}
            {/*            config={{ file: { attributes: { controlsList: 'nodownload' } } }}*/}
            {/*        />*/}
            {/*    </div>*/}
            {/*</Modal>*/}
        </Fragment>
    )
};

export default DetailCourse;