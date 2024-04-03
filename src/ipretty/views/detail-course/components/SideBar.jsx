import React, {} from 'react';
import {useLessonSurvey} from "ipretty/context/lesson-survey-student/LessonSurveyStudentContext";
import {imageDefault, numberFormat} from "ipretty/helpers/utils";
import useNavigator from "ipretty/hook/useNavigator";
import {Button, Card, Flex, Image, Typography} from "antd"
import CourseService from "ipretty/services/CourseService";
import {ClockCircleFilled, DashboardFilled, HomeFilled, VideoCameraFilled} from "@ant-design/icons";
import {addToCartAction} from "ipretty/features/counter/counterSlice";
import {useDispatch, useSelector } from 'react-redux'
import {useTokenAuth} from "ipretty/context/AppProvider";

const {Meta} = Card;
const {Text, Title} = Typography;
const SideBar = () => {
    const { dataCourse } = useLessonSurvey();
    const { courseInfo } = dataCourse;
    const navigate = useNavigator();
    const dispatch = useDispatch();
    const { counter } = useSelector((state) => state);
    const {isAuthenticated} = useTokenAuth();

    const  joinLearn = () => {
        checkIsJoinCourse(
            courseInfo['course_id'],
            () => {
                navigate(`/course/learning/${courseInfo['course_id']}`);
            }
        )
    }

    function checkIsJoinCourse(course_id, callback) {
        CourseService.checkJoinCourse(course_id, (responses) => callback(responses), (errors) => handleError(errors))
    }

    const addToCart = (item) => {
        dispatch(addToCartAction(item))
        showSuccessMessage('Thêm giỏ hàng thành công');
    };

    const changeCart = () => {
        navigate(`/cart`);
    }

    const isCourseInCart = (course) => {
        return (counter['cartItems'].length > 0) ? counter['cartItems'].some(item => item.course_id === course.course_id) : false;
    };

    return (
        <Card
            hoverable
            style={{
                width: '340px',
                position: "sticky",
                marginTop: '-27.4rem',
                top: '6rem'
            }}
            cover={<Image alt="example" preview={false} src={courseInfo['course_feature_image']} fallback={imageDefault()} height='135' width='240' style={{ width: '100%', height: '200px', objectFit: 'cover'}} />}
        >
            <Meta description={
                <Flex align="start" gap={12} vertical>
                    <Title level={2}>{
                        (courseInfo['course_price'] > 0) ?
                            numberFormat(courseInfo['course_price']) :
                            'Miễn phí'
                    } </Title>
                    {
                        (isAuthenticated && courseInfo['is_register'])
                            ? <Button type="primary" size='large' onClick={() => joinLearn()} className='w-100'>Vào học ngay</Button>
                            : (!isCourseInCart(courseInfo))
                                ? <Button type="primary" size='large' onClick={() => addToCart(courseInfo)} className='w-100'>Thêm giỏ hàng</Button>
                                : <Button type="primary" size='large' onClick={() => changeCart()} className='w-100'>Đi đến giỏ hàng</Button>

                    }
                    {
                        (!(isAuthenticated && courseInfo['is_register']))
                            ? <Button primary size='large' className='w-100'>Mua ngay</Button>
                            : ''
                    }
                    <Title level={5}>Bao gồm: </Title>
                    <Flex gap={6}>
                        <DashboardFilled/>
                        <Text>Trình độ trung bình</Text>
                    </Flex>
                    <Flex gap={6}>
                        <ClockCircleFilled/>
                        <Text>Tổng số { courseInfo['number_course_lesson']} bài học</Text>
                    </Flex>
                    <Flex gap={6}>
                        <VideoCameraFilled />
                        <Text> Thời lượng 08 giờ 47 phút</Text>
                    </Flex>
                    <Flex gap={6}>
                        <HomeFilled />
                        <Text> Học mọi lúc, mọi nơi</Text>
                    </Flex>
                </Flex>
            } />
        </Card>
    );
}

export default SideBar;




