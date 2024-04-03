import React from 'react';
import {useLessonSurvey} from "../../../context/lesson-survey-student/LessonSurveyStudentContext";

/**
 * Library Antd
 * */
import {Tabs, Row, Col, Space, Avatar, Card, Rate} from "antd";
import { AndroidOutlined, AppleOutlined } from '@ant-design/icons';
import {ListLesson} from "../../detail-course/components/ListLesson";
const TabPane = Tabs;

const ContentLearn = (props) => {
    const {dataCourse} = useLessonSurvey()
    const {teacherInfo} = dataCourse;
    return (
        <div className='u-tab-overview'>
            <div className='container'>
                <Row>
                    <Col span={24}>
                        <Tabs
                            type="card"
                            defaultActiveKey='active-key'
                            tabBarStyle={{ color: 'red'}}
                            >
                            <TabPane tab="Tổng quan" key="1">
                                <Row gutter={16}>
                                    <Col span={14}  >
                                        <Card className='uom-block-intro' bodyStyle={{ padding : 0}}>
                                            <h3>Chào mừng khóa học</h3>
                                            <p>
                                                Bạn là một trong số những người tuyệt vời khi có mặt ở đây
                                                để tham gia khóa học<strong>&nbsp;KIẾM TIỀN ONLINE VỚI UNICA
                                                AFFILIATE 2017</strong> , được hướng dẫn bởi 5 diễn giả
                                            </p>
                                            <p>
                                                Phía bên phải màn hình là Nội dung bài học. Để vào học, bạn
                                                kích chuột vào tên bài học (bắt đầu từ bài 1) hoặc bất kỳ
                                                bài học nào bạn muốn, màn hình giao diện bài giảng sẽ hiện
                                                ra.
                                            </p>
                                            <p>
                                                Trong quá trình học, nếu có bất kỳ thắc mắc, câu hỏi nào,
                                                bạn hãy nhập vào ô Thảo luận khóa học, Unica và Giảng viên
                                                sẽ hỗ trợ bạn.
                                            </p>
                                            <p>
                                                Chúc bạn có những trải nghiệm tuyệt vời cùng Unica.
                                            </p>
                                        </Card>
                                        <ListLesson/>
                                    </Col>
                                    <Col span={10}>
                                        {/**
                                            INFO
                                         */}
                                       <Card className='uom-block-gv' bodyStyle={{ padding : 0}}>
                                           <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                                               <h3 className='text-center'>Giảng viên</h3>
                                           </Space>
                                           <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                                               <Row gutter={16}>
                                                   <Col span={12} style={{ justifyContent: 'center', display: 'flex', flexFlow: 'column' , alignItems: 'center'}}>
                                                       <Avatar size={125} src={teacherInfo['avatar']} icon={<AppleOutlined />} />
                                                       <p style={{ fontWeight: 'bold' , margin: '0'}} class="p-0">{teacherInfo['name']}</p>
                                                       <span>Chuyên gia</span>
                                                   </Col>
                                                   <Col span={12} style={{ justifyContent: 'center', display: 'flex', alignItems: 'center'}}>
                                                       <div className='uom-gv-right'>
                                                           <ul>
                                                               <li><i class="fa fa-star" aria-hidden="true"></i>
                                                                   <span>643</span> đánh giá
                                                               </li>
                                                               <li><i class="fa fa-users" aria-hidden="true"></i>
                                                                   <span>16564</span> học viên
                                                               </li>
                                                               <li><i class="fa fa-play-circle" aria-hidden="true"></i>
                                                                   <span>19</span> khóa học
                                                               </li>
                                                               <li><i class="fa fa-comments-o"
                                                                      aria-hidden="true"></i> 805 thảo luận
                                                               </li>
                                                           </ul>
                                                       </div>
                                                   </Col>
                                               </Row>
                                           </Space>
                                       </Card>
                                        {/**
                                            REVIEW
                                         */}
                                        {/*<Card className='uom-block-gv' bodyStyle={{ padding : 0}}>*/}
                                        {/*    <Space direction="vertical" size="middle" style={{ display: 'flex', justifyContent: 'center' }}>*/}
                                        {/*        <Row style={{ display: 'flex'}}>*/}
                                        {/*            <Rate style={{ fontSize: 36 }}/>*/}
                                        {/*            <div>*/}
                                        {/*                Đánh giá khoá học*/}
                                        {/*            </div>*/}
                                        {/*        </Row>*/}
                                        {/*    </Space>*/}
                                        {/*    <Space direction="vertical" size="middle" style={{ display: 'flex' }}>*/}
                                        {/*        <Row gutter={16}>*/}
                                        {/*            <Col span={12} style={{ justifyContent: 'center', display: 'flex', flexFlow: 'column' , alignItems: 'center'}}>*/}
                                        {/*                <Avatar size={125} src={teacherInfo['avatar']} icon={<AppleOutlined />} />*/}
                                        {/*                <p class='p-0'>{teacherInfo['name']}</p>*/}
                                        {/*                <span>Chuyên gia</span>*/}
                                        {/*            </Col>*/}
                                        {/*            <Col span={12} style={{ justifyContent: 'center', display: 'flex', alignItems: 'center'}}>*/}
                                        {/*                <ul>*/}
                                        {/*                    <li><i class="fa fa-star" aria-hidden="true"></i>*/}
                                        {/*                        <span>643</span> đánh giá*/}
                                        {/*                    </li>*/}
                                        {/*                    <li><i class="fa fa-users" aria-hidden="true"></i>*/}
                                        {/*                        <span>16564</span> học viên*/}
                                        {/*                    </li>*/}
                                        {/*                    <li><i class="fa fa-play-circle" aria-hidden="true"></i>*/}
                                        {/*                        <span>19</span> khóa học*/}
                                        {/*                    </li>*/}
                                        {/*                    <li><i class="fa fa-comments-o"*/}
                                        {/*                           aria-hidden="true"></i> 805 thảo luận*/}
                                        {/*                    </li>*/}
                                        {/*                </ul>*/}
                                        {/*            </Col>*/}
                                        {/*        </Row>*/}
                                        {/*    </Space>*/}
                                        {/*</Card>*/}
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane tab="Bài học" key="2">
                                <ListLesson></ListLesson>
                            </TabPane>
                            <TabPane tab="Tài liệu" key="3">
                                <Card className='uom-block-intro' bodyStyle={{ padding : 0}}>
                                    <h3>Tài liệu khóa học</h3>
                                    <div className="content">
                                        <p>Không có tài liệu</p>
                                    </div>
                                </Card>
                            </TabPane>
                            <TabPane tab="Hỏi & Đáp" key="4">
                                Tab 4 Content
                            </TabPane>
                            <TabPane tab="Quản lý học tập" key="5">
                                Tab 5 Content
                            </TabPane>
                        </Tabs>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default ContentLearn;