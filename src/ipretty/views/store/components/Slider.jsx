import React from "react";
import BannerStore from "./Banner";
import MenuStore from "./Menu";
import {Col, Row, Card, Flex, Typography, Button, Image, Carousel} from 'antd';

const SliderStore = (props) => {
    return (
        // <Card
        //     hoverable={false}
        //     style={{ marginBottom: '30px'}}
        //     bodyStyle={{
        //         padding: '10px',
        //         overflow: 'hidden',
        //     }}
        // >
        //     {/*<Flex justify="space-between">*/}
        //     {/*    /!*<Flex*!/*/}
        //     {/*    /!*    vertical*!/*/}
        //     {/*    /!*    align="flex-end"*!/*/}
        //     {/*    /!*    justify="space-between"*!/*/}
        //     {/*    /!*    style={{*!/*/}
        //     {/*    /!*        width: '25%'*!/*/}
        //     {/*    /!*    }}*!/*/}
        //     {/*    /!*>*!/*/}
        //     {/*    /!*    <MenuStore/>*!/*/}
        //     {/*    /!*</Flex>*!/*/}
        //     {/*   */}
        //     {/*</Flex>*/}
        //
        // </Card>
        <Flex
            style={{
                width: '100%',
                display: 'block'
            }}
        >
            <BannerStore/>
        </Flex>
    )
}

export default SliderStore;