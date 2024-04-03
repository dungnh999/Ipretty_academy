import React, {Fragment} from 'react';
import {Typography, List, Card, Image, Space} from 'antd'
const MyCoursesView = (props) => {
    const {Title, Text} = Typography;
    const { Meta } = Card;
    const data = [
        {
            title: 'Title 1',
        },
        {
            title: 'Title 2',
        },
        {
            title: 'Title 3',
        },
        {
            title: 'Title 4',
        },
        {
            title: 'Title 5',
        },
        {
            title: 'Title 6',
        },
        {
            title: 'Title 7',
        },
        {
            title: 'Title 8',
        },
        {
            title: 'Title 9',
        },{
            title: 'Title 10',
        },{
            title: 'Title 11',
        },{
            title: 'Title 12',
        },{
            title: 'Title 13',
        },{
            title: 'Title 14',
        },{
            title: 'Title 15',
        },
    ];
    return(
        <Fragment>
            <Title level={2}>Khoá học của tôi</Title>
            <Space style={{display: 'block'}}>
                <List
                    grid={{
                        gutter: 16,
                        xs: 1,
                        sm: 2,
                        md: 4,
                        lg: 4,
                        xl: 4,
                        xxl: 3,
                    }}
                    pagination={{
                        position : 'bottom',
                        align : 'center',
                        pageSize: 8,
                    }}
                    dataSource={data}
                    renderItem={(item) => (
                        <List.Item>
                            <Card bodyStyle={{padding: 0}}
                                  hoverable
                                  cover={
                                      <div className='img-course'  style={{ overflow: 'hidden'}}>
                                          <Image
                                              preview={false}
                                              src='https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
                                              width={280}
                                              height='100%'
                                          />
                                      </div>
                                  }
                            >
                                <Meta
                                    style={{padding: '7px'}}
                                    title="Europe Street beat"
                                    description="www.instagram.com"
                                />
                            </Card>
                        </List.Item>
                    )}
                />
            </Space>
        </Fragment>
    )
};

export default MyCoursesView;