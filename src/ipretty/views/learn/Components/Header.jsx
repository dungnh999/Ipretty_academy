import React from "react";
import logoSrc from "public/logo/Logo-header.svg";
import {useOverviewLearn} from "../../../context/OverviewCourseContext";
import {QuestionCircleFilled, FileTextFilled , LeftOutlined} from '@ant-design/icons';
import {Progress, Space, Row, Col, Button, Flex, Typography, Image} from 'antd'
const {Title}  = Typography;
const HeaderView = () => {

    const marginStyle = {marginRight : '10px'}
    const { dataCourse } = useOverviewLearn();
    const { course } = dataCourse;
    const twoColors = { '0%': '#108ee9', '100%': '#87d068'};
    const goBack = () => {
        window.history.back(); // Quay lại trang trước
    };
    return (
        <Flex align="center" justify="space-between" gap="2.5" className='h-100'>
            <Button type='link' className='h-100'>
                <Image src={logoSrc} height={34} width={91} preview={false}/>
            </Button>
            <Flex flex={1} className='h-100'>
                <Title level={1} className='m-0'>
                    <Button type='link' className='h-100' style={{ fontSize: '16px', color: '#fff' }}>
                        { course['name'] }
                    </Button>
                </Title>
            </Flex>
            <Flex justify='space-between' align='center'>
                <Progress type="circle" size={35} percent={course.percent_done} trailColor='#fff' strokeColor={twoColors} format={(percent) => <span style={{ color: '#fff' ,fontWeight: 'bold', verticalAlign: 'middle' ,fontSize: '6px'}}>{percent}%</span>} />
                <div className="title-progress" style={{marginLeft: '12px', color: '#fff', fontWeight: 'bold'}}>{course.number_learning}/{course.number_course_lesson} bài học</div>
            </Flex>
            <Button type="text" style={{ color: '#fff'}} icon={<FileTextFilled />}>Ghi chú</Button>
            <Button type="text" style={{ color: '#fff'}} icon={<QuestionCircleFilled />}>Hướng dẫn</Button>
        </Flex>
        // <div className="menu-learn-v2 navbar-fixed-top">
        //     <div className="container-fluid">
        //         <div className="row" style={{display: 'flex', alignItems : 'center', justifyContent: 'end'}}>
        //             <div className="col-lg-8 col-md-8 col-sm-8 col-xs-10 d-flex">
        //                 <Button onClick={goBack} type='text' style={{ fontWeight: '800', color: '#fff' , fontSize: '19px', height: '100%'}}>
        //                     <LeftOutlined/>
        //                 </Button>
        //                 <div className="mln-logo hidden-sm hidden-xs" style={marginStyle}>
        //                     <a href="/"><img src={logoSrc} alt="" /></a>
        //                 </div>
        //                 <a href="/">
        //                     <img className="hidden-lg hidden-md" src={logoSrc} alt=""/>
        //                 </a>
        //                 <div className="mln-name-course">
        //                     <Title level={4} style={{ margin: 0, color: '#fff'}}>{ course['name'] }</Title>
        //                 </div>
        //             </div>
        //             <div className="col-lg-4 col-md-3 col-sm-3 hidden-xs flr-mb" style={{display: 'flex', justifyContent : 'end'}}>
        //                 <Space direction="horizontal">
        //                     <Flex justify='space-between' align='center'>
        //                         <Progress type="circle" size={35} percent={course.percent_done} trailColor='#fff' strokeColor={twoColors} format={(percent) => <span style={{ color: '#fff' ,fontWeight: 'bold', verticalAlign: 'middle' ,fontSize: '6px'}}>{percent}%</span>} />
        //                         <div className="title-progress" style={{marginLeft: '12px', color: '#fff', fontWeight: 'bold'}}>{course.number_learning}/{course.number_course_lesson} bài học</div>
        //                     </Flex>
        //                     <Button type="text" style={{ color: '#fff'}} icon={<FileTextFilled />}>Ghi chú</Button>
        //                     <Button type="text" style={{ color: '#fff'}} icon={<QuestionCircleFilled />}>Hướng dẫn</Button>
        //                 </Space>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    )
}



export default HeaderView;