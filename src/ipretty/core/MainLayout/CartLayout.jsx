import React, {useEffect,useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {ShoppingCartOutlined} from "@ant-design/icons";
import VirtualList from 'rc-virtual-list';
import {Badge, Dropdown, List, Empty, theme, Button, Typography, Flex, Image, message} from "antd";
import {cartData, selectCount} from 'ipretty/features/counter/counterSlice'
import {numberFormat} from "ipretty/helpers/utils";
import useNavigator from "ipretty/hook/useNavigator";

const { useToken} = theme
const {Title} = Typography;
const CartLayout = () => {
    const { token } = useToken();
    const ContainerHeight = 500;
    const counter = useSelector(selectCount);
    const listCart = useSelector(cartData);
    const navigate = useNavigator()
    const contentStyle = {
        backgroundColor: token.colorBgElevated,
        borderRadius: token.borderRadiusLG,
        boxShadow: token.boxShadowSecondary,
        minWidth: '400px',
        height: 'maxContent',
        maxWidth: '1000px',
    };

    const contentStyleEmpty = {
        backgroundColor: token.colorBgElevated,
        borderRadius: token.borderRadiusLG,
        boxShadow: token.boxShadowSecondary,
        minWidth: '400px',
        minHeight: '400px',
        maxWidth: '500px',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex'
    };

    const changeCart = () => {
        navigate(`/cart`);
    }

    return (
        <Dropdown menu={[]} placement="bottomRight"  arrow={false}
                  dropdownRender={(menu) => (
                      ((!listCart)
                              ? <div style={contentStyleEmpty}>
                                  <Empty
                                      description={
                                          <span>
                                            Không có khoá học
                                          </span>
                                      }
                                  />
                                </div>
                              : <div style={contentStyle}>
                                      <List
                                          size="large"
                                      >
                                          <Flex justify="space-between" align="center" style={{ padding: '6px 10px', borderBottom: '1px solid rgba(5, 5, 5, 0.06)' }}>
                                              <Title level={5}>Giỏ hàng của bạn</Title>
                                              <Button type='text' onClick={() => changeCart()} style={{color: 'var(---backgroud-color-primary)'}}>
                                                  Tới giỏ hàng
                                              </Button>
                                          </Flex>
                                          <VirtualList
                                              data={listCart}
                                              itemHeight={90}
                                              height={ContainerHeight}
                                              itemKey="email"
                                          >
                                              {(item) => (
                                                  <List.Item key={item.email} style={{padding: '12px'}}>
                                                      <Button type='text' style={{height: '100%' , width: '100%', backgroundColor: 'none', border: 'none'}}>
                                                          <Flex align="center" justify='start'>
                                                              <Image
                                                                  width={100}
                                                                  height={67}
                                                                  style={{borderRadius: '9px', objectFit: 'cover', }}
                                                                  preview={false}
                                                                  src={item.course_feature_image} />
                                                              <Flex vertical align='start' style={{ marginLeft: '12px', padding: '11px' }}>
                                                                  <Title
                                                                      level={5}
                                                                      ellipsis={true}
                                                                      style={{margin: 0, width: '200px'}}
                                                                  >{item.course_name}</Title>
                                                                  <div style={{ display: 'inline-block', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                                      {
                                                                          item['course_description']
                                                                      }
                                                                  </div>
                                                                  {
                                                                      item['course_price'] > 0
                                                                          ? <div style={{color: 'var(---backgroud-color-primary)', fontWeight: '400'}}>
                                                                              { numberFormat(item['course_price']) }
                                                                          </div>
                                                                          : <div style={{color: 'var(---backgroud-color-primary)', fontWeight: '400'}}>Miễn Phí</div>
                                                                  }
                                                              </Flex>
                                                          </Flex>
                                                      </Button>
                                                  </List.Item>
                                              )}
                                          </VirtualList>
                                      </List>
                                </div>
                      )
                  )}
        >
            <div style={{
                display: 'flex',
                justifyContent : 'center',
                padding : '20px',
                alignItems: 'center',
                cursor: 'pointer',
                height: '100%'
            }}>
                <Badge count={listCart.length} overflowCount={99}>
                    <ShoppingCartOutlined style={{ fontSize: 24 }}  />
                </Badge>
            </div>
        </Dropdown>
    )
};

export default CartLayout;