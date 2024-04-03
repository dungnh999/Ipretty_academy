        import React, {useEffect, useState} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import {Button, Collapse, List, Space, Tabs, theme, Avatar, Divider , Typography , Skeleton } from "antd";
import {CheckCircleFilled, PlaySquareFilled, PlusOutlined} from "@ant-design/icons";
import {useOverviewLearn} from "../../../context/OverviewCourseContext";
import useNavigator from "ipretty/hook/useNavigator";

const { Text, Title } = Typography;
const LessonList = (props) => {
    const {dataCourse, getLessonById} = useOverviewLearn();
    const navigate = useNavigator();
    const {course ,listChapterLesson} = dataCourse;
    const [collapse, setCollapse] = useState([]);
    const [active, setActive] = useState([]);
    const { token } = theme.useToken();
    const urlParams = new URLSearchParams(window.location.search);
    const paramValue = urlParams.get('id');
    const [Selected, setSelected] = useState(paramValue);
    const chooseVideo = (id, key , keyLesson) => {
        navigate(`/course/learning/${course.course_id}?id=${id}`)
        getLessonById({key , keyLesson});
        setSelected(id);
    }
    console.log(course)
    // if(!paramValue) {
    //     chooseVideo(paramValue) ?
    // }
    const styleListItem = {padding: '10px 0 10px 2px' ,textAlign: 'left', width: "100%" , borderBottom: '0'}
    const styleListItemActive = {padding: '10px 0 10px 2px',textAlign: 'left', width: "100%", background: '#165e2d' }
    useEffect(() => {
        const allPanelKeys = Array.from({ length: listChapterLesson.length }, (_, index) => String(index));
        setActive(allPanelKeys)
        const newCollapse = listChapterLesson.map((item, key) => {
            return {
                key: key,
                label: (
                    <Space direction='vertical' size={0}>
                        <Title level={5} style={{ margin: 0, textTransform: 'capitalize' }}>{key + 1}. {item['chapter_name']}</Title>
                        <Text type="secondary">2/3 18:00</Text>
                    </Space>
                ),
                children: (
                    <InfiniteScroll
                        dataLength={listChapterLesson.length}
                        hasMore={listChapterLesson.length < 50}
                        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                        scrollableTarget="scrollableDiv"
                    >
                        <List
                            bordered={false}
                            size='small'
                            dataSource={item['lessons']}
                            renderItem={(item, keyLesson) => (
                                <List.Item style={item['id'] == Selected ? styleListItemActive : styleListItem}>
                                    <Button
                                        type='link'
                                        onClick={() => chooseVideo(item['id'], key, keyLesson)}
                                        size="large"
                                        style={{ height: "100%", width: "100%", padding: 0 , margin: '0 0 0 28px'}}
                                    >
                                        <Space style={{ display: "flex", justifyContent: "space-between" }}>
                                            <Space direction='vertical' size={0} style={{ alignItems: "start"}}>
                                                <Text  style={{ padding: 0, margin: 0, fontWeight: '500'}} size={0}>Bài {keyLesson + 1}: {item['lesson_name']}</Text>
                                                <Text type="secondary">
                                                    <PlaySquareFilled style={{ marginRight: '4px'}} />8:00
                                                </Text>
                                            </Space>
                                            {item['isPassed']
                                                ?   <Space style={{ width: '36px'}}>
                                                        <CheckCircleFilled style={{ color: "green" }} />
                                                    </Space>
                                                : ''}
                                        </Space>
                                    </Button>
                                </List.Item>
                            )}
                        />
                    </InfiniteScroll>
                )
            };
        });
        setCollapse(newCollapse);
    }, [listChapterLesson, Selected])

    return (
        <div className="u-list-course" id='u-list-course' style={{margin: 0, padding: 0}}>
            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                <Collapse
                    bordered={false}
                    expandIconPosition='end'
                    size="small"
                    // expandIcon={({ isActive }) => isActive ? <MinusOutlined style={{ color : 'var(---backgroud-color-primary)' , fontSize:'20px' }} /> : <PlusOutlined style={{ color : 'var(---backgroud-color-primary)' , fontSize:'20px' }}/>}
                    style={{
                        background: token.colorBgContainer,
                        padding: 0
                    }}
                    items={collapse}
                />
            </Space>
            {/*<div className='panel-group' id="accordion">*/}
            {/*    <div class="panel-heading">*/}
            {/*        <div class="row">*/}
            {/*            <div class="col-md-12">*/}
            {/*                <h4 class="panel-title">*/}
            {/*                    <a data-toggle="collapse" data-parent="#accordion" href="#collapse1"*/}
            {/*                       className="collapsed" aria-expanded="true">*/}
            {/*                        <i class="fa fa-minus-square" aria-hidden="true"></i>*/}
            {/*                        Phần 1: KIẾM TIỀN ONLINE VỚI UNICA AFFILIATE</a>*/}
            {/*                </h4>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    <div id='collapse1' className="panel-collapse collapse in">*/}
            {/*        <div class="panel-body">*/}
            {/*            <div onClick={chooseVideo} idLesson='222222' class="col active_lesson">*/}
            {/*                <div class="container-fluid">*/}
            {/*                    <div class="row">*/}
            {/*                        <div class="col-xs-7 col-md-10">*/}
            {/*                            <div class="title">*/}
            {/*                                <a className="lecture_avtives_13481" href="javascript:void(0)">*/}
            {/*                                    <i class="fa fa-play"></i>*/}
            {/*                                    Bài 1: Quy luật giá trị </a>*/}
            {/*                            </div>*/}
            {/*                        </div>*/}
            {/*                        <div class="col-xs-3 col-md-2">*/}
            {/*                            <div class="time">07:38</div>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*            <div onClick={chooseVideo} idLesson='222222' class="col">*/}
            {/*                <div class="container-fluid">*/}
            {/*                    <div class="row">*/}
            {/*                        <div class="col-xs-7 col-md-10">*/}
            {/*                            <div class="title">*/}
            {/*                                <a className="lecture_avtives_13481" href="javascript:void(0)">*/}
            {/*                                    <i class="fa fa-play"></i>*/}
            {/*                                    Bài 1: Quy luật giá trị </a>*/}
            {/*                            </div>*/}
            {/*                        </div>*/}
            {/*                        <div class="col-xs-3 col-md-2">*/}
            {/*                            <div class="time">07:38</div>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*            <div onClick={chooseVideo} idLesson='222222' class="col">*/}
            {/*                <div class="container-fluid">*/}
            {/*                    <div class="row">*/}
            {/*                        <div class="col-xs-7 col-md-10">*/}
            {/*                            <div class="title">*/}
            {/*                                <a className="lecture_avtives_13481" href="javascript:void(0)">*/}
            {/*                                    <i class="fa fa-play"></i>*/}
            {/*                                    Bài 1: Quy luật giá trị </a>*/}
            {/*                            </div>*/}
            {/*                        </div>*/}
            {/*                        <div class="col-xs-3 col-md-2">*/}
            {/*                            <div class="time">07:38</div>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*            <div onClick={chooseVideo} idLesson='222222' class="col">*/}
            {/*                <div class="container-fluid">*/}
            {/*                    <div class="row">*/}
            {/*                        <div class="col-xs-7 col-md-10">*/}
            {/*                            <div class="title">*/}
            {/*                                <a className="lecture_avtives_13481" href="javascript:void(0)">*/}
            {/*                                    <i class="fa fa-play"></i>*/}
            {/*                                    Bài 1: Quy luật giá trị </a>*/}
            {/*                            </div>*/}
            {/*                        </div>*/}
            {/*                        <div class="col-xs-3 col-md-2">*/}
            {/*                            <div class="time">07:38</div>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*            <div onClick={chooseVideo} idLesson='222222' class="col">*/}
            {/*                <div class="container-fluid">*/}
            {/*                    <div class="row">*/}
            {/*                        <div class="col-xs-7 col-md-10">*/}
            {/*                            <div class="title">*/}
            {/*                                <a className="lecture_avtives_13481" href="javascript:void(0)">*/}
            {/*                                    <i class="fa fa-play"></i>*/}
            {/*                                    Bài 1: Quy luật giá trị </a>*/}
            {/*                            </div>*/}
            {/*                        </div>*/}
            {/*                        <div class="col-xs-3 col-md-2">*/}
            {/*                            <div class="time">07:38</div>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*            <div onClick={chooseVideo} idLesson='222222' class="col">*/}
            {/*                <div class="container-fluid">*/}
            {/*                    <div class="row">*/}
            {/*                        <div class="col-xs-7 col-md-10">*/}
            {/*                            <div class="title">*/}
            {/*                                <a className="lecture_avtives_13481" href="javascript:void(0)">*/}
            {/*                                    <i class="fa fa-play"></i>*/}
            {/*                                    Bài 1: Quy luật giá trị </a>*/}
            {/*                            </div>*/}
            {/*                        </div>*/}
            {/*                        <div class="col-xs-3 col-md-2">*/}
            {/*                            <div class="time">07:38</div>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*            <div onClick={chooseVideo} idLesson='222222' class="col">*/}
            {/*                <div class="container-fluid">*/}
            {/*                    <div class="row">*/}
            {/*                        <div class="col-xs-7 col-md-10">*/}
            {/*                            <div class="title">*/}
            {/*                                <a className="lecture_avtives_13481" href="javascript:void(0)">*/}
            {/*                                    <i class="fa fa-play"></i>*/}
            {/*                                    Bài 1: Quy luật giá trị </a>*/}
            {/*                            </div>*/}
            {/*                        </div>*/}
            {/*                        <div class="col-xs-3 col-md-2">*/}
            {/*                            <div class="time">07:38</div>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*            <div onClick={chooseVideo} idLesson='222222' class="col">*/}
            {/*                <div class="container-fluid">*/}
            {/*                    <div class="row">*/}
            {/*                        <div class="col-xs-7 col-md-10">*/}
            {/*                            <div class="title">*/}
            {/*                                <a className="lecture_avtives_13481" href="javascript:void(0)">*/}
            {/*                                    <i class="fa fa-play"></i>*/}
            {/*                                    Bài 1: Quy luật giá trị </a>*/}
            {/*                            </div>*/}
            {/*                        </div>*/}
            {/*                        <div class="col-xs-3 col-md-2">*/}
            {/*                            <div class="time">07:38</div>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*            <div onClick={chooseVideo} idLesson='222222' class="col">*/}
            {/*                <div class="container-fluid">*/}
            {/*                    <div class="row">*/}
            {/*                        <div class="col-xs-7 col-md-10">*/}
            {/*                            <div class="title">*/}
            {/*                                <a className="lecture_avtives_13481" href="javascript:void(0)">*/}
            {/*                                    <i class="fa fa-play"></i>*/}
            {/*                                    Bài 1: Quy luật giá trị </a>*/}
            {/*                            </div>*/}
            {/*                        </div>*/}
            {/*                        <div class="col-xs-3 col-md-2">*/}
            {/*                            <div class="time">07:38</div>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*            <div onClick={chooseVideo} idLesson='222222' class="col">*/}
            {/*                <div class="container-fluid">*/}
            {/*                    <div class="row">*/}
            {/*                        <div class="col-xs-7 col-md-10">*/}
            {/*                            <div class="title">*/}
            {/*                                <a className="lecture_avtives_13481" href="javascript:void(0)">*/}
            {/*                                    <i class="fa fa-play"></i>*/}
            {/*                                    Bài 1: Quy luật giá trị </a>*/}
            {/*                            </div>*/}
            {/*                        </div>*/}
            {/*                        <div class="col-xs-3 col-md-2">*/}
            {/*                            <div class="time">07:38</div>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*            <div onClick={chooseVideo} class="col">*/}
            {/*                <div class="container-fluid">*/}
            {/*                    <div class="row">*/}
            {/*                        <div class="col-xs-7 col-md-10">*/}
            {/*                            <div class="title">*/}
            {/*                                <a className="lecture_avtives_13481" href="javascript:void(0)">*/}
            {/*                                    <i class="fa fa-play"></i>*/}
            {/*                                    Bài 1: Quy luật giá trị </a>*/}
            {/*                            </div>*/}
            {/*                        </div>*/}
            {/*                        <div class="col-xs-3 col-md-2">*/}
            {/*                            <div class="time">07:38</div>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*            <div onClick={chooseVideo} class="col">*/}
            {/*                <div class="container-fluid">*/}
            {/*                    <div class="row">*/}
            {/*                        <div class="col-xs-7 col-md-10">*/}
            {/*                            <div class="title">*/}
            {/*                                <a className="lecture_avtives_13481" href="javascript:void(0)">*/}
            {/*                                    <i class="fa fa-play"></i>*/}
            {/*                                    Bài 1: Quy luật giá trị </a>*/}
            {/*                            </div>*/}
            {/*                        </div>*/}
            {/*                        <div class="col-xs-3 col-md-2">*/}
            {/*                            <div class="time">07:38</div>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*            <div onClick={chooseVideo} class="col">*/}
            {/*                <div class="container-fluid">*/}
            {/*                    <div class="row">*/}
            {/*                        <div class="col-xs-7 col-md-10">*/}
            {/*                            <div class="title">*/}
            {/*                                <a className="lecture_avtives_13481" href="javascript:void(0)">*/}
            {/*                                    <i class="fa fa-play"></i>*/}
            {/*                                    Bài 1: Quy luật giá trị </a>*/}
            {/*                            </div>*/}
            {/*                        </div>*/}
            {/*                        <div class="col-xs-3 col-md-2">*/}
            {/*                            <div class="time">07:38</div>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*            <div onClick={chooseVideo} class="col">*/}
            {/*                <div class="container-fluid">*/}
            {/*                    <div class="row">*/}
            {/*                        <div class="col-xs-7 col-md-10">*/}
            {/*                            <div class="title">*/}
            {/*                                <a className="lecture_avtives_13481" href="javascript:void(0)">*/}
            {/*                                    <i class="fa fa-play"></i>*/}
            {/*                                    Bài 1: Quy luật giá trị </a>*/}
            {/*                            </div>*/}
            {/*                        </div>*/}
            {/*                        <div class="col-xs-3 col-md-2">*/}
            {/*                            <div class="time">07:38</div>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*            <div onClick={chooseVideo} class="col">*/}
            {/*                <div class="container-fluid">*/}
            {/*                    <div class="row">*/}
            {/*                        <div class="col-xs-7 col-md-10">*/}
            {/*                            <div class="title">*/}
            {/*                                <a className="lecture_avtives_13481" href="javascript:void(0)">*/}
            {/*                                    <i class="fa fa-play"></i>*/}
            {/*                                    Bài 1: Quy luật giá trị </a>*/}
            {/*                            </div>*/}
            {/*                        </div>*/}
            {/*                        <div class="col-xs-3 col-md-2">*/}
            {/*                            <div class="time">07:38</div>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*            <div onClick={chooseVideo} class="col">*/}
            {/*                <div class="container-fluid">*/}
            {/*                    <div class="row">*/}
            {/*                        <div class="col-xs-7 col-md-10">*/}
            {/*                            <div class="title">*/}
            {/*                                <a className="lecture_avtives_13481" href="javascript:void(0)">*/}
            {/*                                    <i class="fa fa-play"></i>*/}
            {/*                                    Bài 1: Quy luật giá trị </a>*/}
            {/*                            </div>*/}
            {/*                        </div>*/}
            {/*                        <div class="col-xs-3 col-md-2">*/}
            {/*                            <div class="time">07:38</div>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*            <div onClick={chooseVideo} class="col">*/}
            {/*                <div class="container-fluid">*/}
            {/*                    <div class="row">*/}
            {/*                        <div class="col-xs-7 col-md-10">*/}
            {/*                            <div class="title">*/}
            {/*                                <a className="lecture_avtives_13481" href="javascript:void(0)">*/}
            {/*                                    <i class="fa fa-play"></i>*/}
            {/*                                    Bài 1: Quy luật giá trị </a>*/}
            {/*                            </div>*/}
            {/*                        </div>*/}
            {/*                        <div class="col-xs-3 col-md-2">*/}
            {/*                            <div class="time">07:38</div>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*            <div onClick={chooseVideo} class="col">*/}
            {/*                <div class="container-fluid">*/}
            {/*                    <div class="row">*/}
            {/*                        <div class="col-xs-7 col-md-10">*/}
            {/*                            <div class="title">*/}
            {/*                                <a className="lecture_avtives_13481" href="javascript:void(0)">*/}
            {/*                                    <i class="fa fa-play"></i>*/}
            {/*                                    Bài 1: Quy luật giá trị </a>*/}
            {/*                            </div>*/}
            {/*                        </div>*/}
            {/*                        <div class="col-xs-3 col-md-2">*/}
            {/*                            <div class="time">07:38</div>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    )
};

export default LessonList;