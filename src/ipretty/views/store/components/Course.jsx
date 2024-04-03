import React, {useState, useMemo, useEffect} from 'react'
import CourseService from "../../../services/CourseService";
import useNavigator from "ipretty/hook/useNavigator";
import {Card, Flex, Typography, Empty, Popover, Button, List, Space, Image, message} from 'antd';

// Redux
import {useDispatch } from 'react-redux'
import {addToCartAction, increment} from 'ipretty/features/counter/counterSlice'
import {numberFormat , useMessageApi} from "ipretty/helpers/utils";

const {Meta} = Card;
const {Title} = Typography;

const CourseStore = (props) => {
    const {contextHolder , showSuccessMessage} = useMessageApi();
    const [loading, setLoading] = useState(false)
    const [dataPost, setDataPost] = useState([])
    const navigate = useNavigator();
    const dispatch  = useDispatch();
    const contentPopover = (
        <div style={{maxWidth: '500px'}}>
            <div class="course-complement" bis_skin_checked="1">
                <h3 class="title-course">Phân tích kỹ thuật Căn bản đến Nâng cao trong đầu tư chứng khoán</h3>
                <div class="bestseller" bis_skin_checked="1">BestSeller</div>
            </div>
            <p class="description">Nắm chắc 7 tử huyệt trong đầu tư để trở thành những siêu sao trong lĩnh vực phân tích
                kỹ thuật chứng khoán thực chiến.</p>
            <a data-id="ejVUV0FVaGN4UTJsMUpLL09Ecm45QT09" id="1302" price_sale="249000" href="javascript:void(0)"
               onClick="addcart(this,23)" className="btn-cart-course btn-add_cart">
                <i class="fa fa-cart-plus"></i>Thêm vào
                giỏ hàng
            </a>
        </div>
    );

    const addToCart = (item) => {
        dispatch(addToCartAction(item))
        showSuccessMessage('Thêm giỏ hàng thành công');
    };


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

    const floatLeft = {float: 'left'};
    const cleanBoth = {clean: 'both'};
    return (
       <Space style={{display: "block"}}>
           {contextHolder}
           <Flex justify='space-between' align="center">
               <Title level={3}>TOP BÁN CHẠY</Title>
               <Button type="link" className="load-more-new">Xem thêm</Button>
           </Flex>
           <Space style={{display: 'block'}}>
               {
                   (dataPost.length === 0 ? <Empty/> :
                       <List grid={{
                       gutter: 16,
                       xs: 2,
                       sm: 2,
                       md: 4,
                       lg: 4,
                       xl: 4,
                       xxl: 4,
                   }} dataSource={dataPost} renderItem={(item) => (
                           <List.Item>
                               {/*<Popover placement="right" content={contentPopover}>*/}
                               {/*    */}
                               {/*</Popover>*/}
                               <Card bodyStyle={{padding: 0}}
                                     style={{cursor: "pointer", boxShadow: '2px 2px 8px rgba(0, 0, 0, .07951'}}
                                     cover={
                                         <div className='img-course'  style={{ overflow: 'hidden'}}>
                                             <Image
                                                 preview={false}
                                                 src={item['course_feature_image']}
                                                 width={280}
                                                 height='100%'
                                             />
                                         </div>
                                     }
                                     onClick={() => detailCourse(item)}
                               >
                                   <Meta style={{padding: '7px'}}
                                         title={<h3 className="title-course">
                                             <p>{item['course_name']}</p>
                                         </h3>}
                                         description={
                                             <div>
                                                 <div className="name-gv">
                                                     <b style={floatLeft}>
                                                         GV {item['teacher']}
                                                     </b>
                                                     <span
                                                         className="price-b">{item['course_sale_price'] > 0 ? numberFormat(item['course_sale_price']) : 0}
                                                         <sup>đ</sup>
                                                     </span>
                                                 </div>
                                                 <div className="price-course" style={cleanBoth}>
                                                     <div className="rate-combo">
                                                         <p>
                                                             <span className="star-rate">
                                                                 <i className="fa fa-star-o co-or"></i>
                                                                 <i className="fa fa-star-o co-or"></i>
                                                                 <i className="fa fa-star-o co-or"></i>
                                                                 <i className="fa fa-star-o co-or"></i>
                                                                 <i className="fa fa-star-o co-or"></i>
                                                             </span>
                                                         </p>
                                                     </div>
                                                     <span  className="price-a">{((item['course_price'] > 0) ? numberFormat(item['course_price']) : 'Miễn Phí')}</span>
                                                 </div>
                                             </div>
                                         }
                                   />
                               </Card>
                               <Button type='button' onClick={() => addToCart(item)} >Thêm giỏ hàng</Button>
                           </List.Item>
                        )}/>)
               }
           </Space>
       </Space>
    )
}

export default CourseStore;


