import React , {useState} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import ReactBeforeSliderComponent from 'react-before-after-slider-component';
import 'react-before-after-slider-component/dist/build.css';
import {Modal, Button} from 'react-bootstrap'
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import 'ipretty/styles/landingPage/10therma/style.css';

// import required modules
import {Autoplay, Pagination, Navigation} from 'swiper/modules';
import Modal10Therma from "ipretty/views/events/views/Modal10Therma";
import {SmileOutlined} from "@ant-design/icons";
import {notification } from 'antd';
import { Spin } from 'antd';

const TenThermaEvent = (props) => {
    return (<div>
        <Hearder/>
        <Container/>
        <FooterTherma/>
    </div>)
};

function Hearder() {
    return (<div className="header">
        <div className="container page-header-10therma">
            <div className="flex-row">
                <a className="back-link" href="/services/"></a>
                <img width="1916" height="44"
                     src="https://upload-dungnh-dev.s3.ap-southeast-1.amazonaws.com/public/video/10therma/Asset/logo/Logo-1536x35.png"
                     className="attachment-full size-full wp-image-19" alt=""/>
            </div>
            <p className="s-desc">Công nghệ xóa nhăn nâng cơ hiện đại nhất thế giới</p>
            <div className="header-button">
                <div className="btn-div">
                    <h4 className="m-0 p-0" style={{textAlign: 'center'}}>Vẫn là bạn nhưng trẻ trung hơn</h4>
                </div>
            </div>
        </div>
    </div>)
}


function Container({handleShow}) {
    const [showModal, setShowModal] = useState(false);
    const handleShowModal = () => {
        setShowModal(true);
    };
    return (<div className="container-fluid p-0 m-0">
        <Banner/>
        <Customer handleShowModal={handleShowModal}/>
        <AfterBefore/>
        <Widget/>
        <CongNghe handleShowModal={handleShowModal}/>
        <Positive/>
        <KhienBan/>
        <DieuTri/>
        <ImageAfterBefore/>
        <ChungChi/>
        <TikTok/>
        <QA/>
        <FormCustomer/>
        <Modal10Therma showModal={showModal} setShowModal={setShowModal} />
    </div>)
}

function Banner() {
    return (<section className="banner">
        <div className="image-banner">
            <video className="w-100 h-100" autoPlay controls
                   src="https://upload-dungnh-dev.s3.ap-southeast-1.amazonaws.com/public/video/10therma/Asset/video/banner.mp4"></video>
        </div>
    </section>)
}

function Customer({handleShowModal}) {

    return (<section className="tu-van-ngay">
        <div className="container p-4 text-center">
            <div className="mb-3">
                <a href="javascripts::void(0)" onClick={() => handleShowModal()}>
                    <div className="hc">
                        <i className="fa-solid fa-heart"></i>
                    </div>
                    TƯ VẤN NGAY
                </a>
                <div className="content-tu-van">
                    <p className="text-center">
                        Hãy để chúng tôi giúp bạn tìm lại phiên bản tuổi thanh xuân tưởng chừng như là điều không
                        thể. Sử dụng công nghệ được nhiều tổ chức thế giới công nhận cùng dòng máy thế hệ mới nhất
                        chính là chìa khóa mở đường cho hành trình đi ngược lão hóa chỉ có tại Dermaster Viet Nam
                    </p>
                </div>
            </div>
        </div>
    </section>)
}

function AfterBefore() {
    return (<section className="swiper-after-before">
        <div className="container">
            <Swiper
                // install Swiper modules
                // modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2000, disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <div className="item-image">
                        <img
                            src="https://upload-dungnh-dev.s3.ap-southeast-1.amazonaws.com/public/video/10therma/Asset/AfterBefore/1/1.png"
                            className="w-100"/>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="item-image">
                        <img
                            src="https://upload-dungnh-dev.s3.ap-southeast-1.amazonaws.com/public/video/10therma/Asset/AfterBefore/1/2.png"
                            className="w-100"/>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="item-image">
                        <img
                            src="https://upload-dungnh-dev.s3.ap-southeast-1.amazonaws.com/public/video/10therma/Asset/AfterBefore/1/3.png"
                            className="w-100"/>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="item-image">
                        <img
                            src="https://upload-dungnh-dev.s3.ap-southeast-1.amazonaws.com/public/video/10therma/Asset/AfterBefore/1/4.png"
                            className="w-100"/>
                    </div>
                </SwiperSlide>
            </Swiper>
            {/*<swiper-container className="mySwiper" pagination="true" pagination-dynamic-bullets="true"*/}
            {/*                  data-swiper-autoplay="3000" navigation="true">*/}

            {/*</swiper-container>*/}
        </div>
    </section>)
}

function Widget() {
    return (<section className="widget">
        <div className="container">
            <div className="widget-box">
                <div className="row">
                    <div className="col-lg-4 mb-3">
                        <div className="card">
                            <img className="card-img-top"
                                 src="https://upload-dungnh-dev.s3.ap-southeast-1.amazonaws.com/public/video/10therma/Asset/widget/1.webp"
                                 alt="Card image cap"/>
                            <div className="card-body p-0">
                                <h4 className="title">Thon gọn body</h4>
                                <p className="caption card-text">Đầu tip body làm giảm chùng da, làm mượt, căng và
                                    thon gọn da các vùng trên cơ thể như bụng, đùi, đầu gối, cánh tay, đồng thời
                                    giúp nâng mông, ngực.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 mb-3">
                        <div className="card">
                            <img className="card-img-top"
                                 src="https://upload-dungnh-dev.s3.ap-southeast-1.amazonaws.com/public/video/10therma/Asset/widget/2.webp"
                                 alt="Card image cap"/>
                            <div className="card-body p-0">
                                <h4 className="title">Nâng cơ mắt</h4>
                                <p className="caption card-text">Đầu tip làm săn mí mắt, nâng cung chân mày, giảm
                                    nếp chân chim và, giảm chùng da và trẻ hoá vùng mắt một cách toàn diện cho
                                    ánh nhìn trẻ trung rạng rỡ hơn.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 mb-3">
                        <div className="card">
                            <img className="card-img-top"
                                 src="https://upload-dungnh-dev.s3.ap-southeast-1.amazonaws.com/public/video/10therma/Asset/widget/3.webp"
                                 alt="Card image cap"/>
                            <div className="card-body p-0">
                                <h4 className="title">Trẻ hóa mặt</h4>
                                <p className="caption card-text">Đầu tip làm căng, săn chắc da vùng mặt, cổ cho hiệu
                                    quả tức thì, đồng thời nâng đỡ cơ, thon gọn đường viền hàm, trẻ hoá khuôn
                                    mặt, cho làn da căng mướt tự nhiên.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>)
}

function CongNghe({handleShowModal}) {
    return (<section className="cong-nghe">
        <div className="background">
            <div className="container">
                <div className="row flex-column-reverse flex-lg-row justify-content-center align-items-center">
                    <div className="col-lg-6 col-md-12">
                        <img
                            src="https://upload-dungnh-dev.s3.ap-southeast-1.amazonaws.com/public/video/10therma/Asset/10therma/01.png"
                            className="w-100" width="496" height="741"/>
                    </div>
                    <div className="col-lg-6 col-md-12">
                        <div className="content-cong-nghe">
                            <div className="title-content">
                                <h3 className="text-center">Công nghệ</h3>
                                <p className="text-center">
                                    <strong>10 THERMA</strong> cho hiệu quả điều trị tối ưu với sóng RF đơn cực hay
                                    còn gọi là tần số sóng vô tuyến đưa năng lượng nhiệt 40-60 độ vào làm nóng các
                                    lớp mô ở cả 3 lớp da: Lớp biểu bì, lớp bì giàu Collagen, và lớp mỡ dưới da. 10
                                    THERMA sử dụng hệ thống làm mát độc quyền để bảo vệ lớp biểu bì an toàn trong
                                    khi truyền nhiệt RF tần số cao đến lớp trung bì, từ đó sửa chữa, tăng sinh
                                    collagen và cải thiện độ đàn hồi, giảm thiểu nếp nhăn da.
                                </p>
                            </div>
                        </div>
                        <div className="tag-cong-nghe">
                            <span className="digit text-white">1.279.896</span>
                            <span className="text-tag">NGƯỜI ĐÃ THỰC HIỆN</span>
                        </div>
                        <div className="btn-action plus-arrow">
                            <a style={{cursor: 'pointer'}} onClick={() => handleShowModal()}>Đăng ký tư vấn</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>)
}

function Positive() {
    return (<div class="positive">
        <div class="background-positive">
            <div class="container">
                <div class="title-positive">
                    <h2 class="heading-title text-center">Điểm Nổi Bật</h2>
                </div>
                <div class="row">
                    <div class="col-lg-3 col-md-6 col-sm-12 mb-3">
                        <div class="card">
                            <div class="card-body">
                                <p class="card-text">Tăng hiệu quả điều trị lên 46% được chứng minh qua các nghiên
                                    cứu lâm sàng.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-12 mb-3 ">
                        <div class="card">
                            <div class="card-body">
                                <p class="card-text">Đảm bảo an toàn được chứng nhận bởi viện nghiên cứu Bệnh viện
                                    Gil
                                    Đại học Gachon, khoa Da liễu.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-12 mb-3 ">
                        <div class="card">
                            <div class="card-body">
                                <p class="card-text">Hiệu quả rõ ràng và kéo dài nhờ công nghệ truyền nhiệt đồng
                                    nhất.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-12 mb-3 ">
                        <div class="card">
                            <div class="card-body">
                                <p class="card-text">Không gây mê và cải thiện cảm giác đau nhờ công nghệ rung dọc
                                    và hệ thống làm mát thế hệ mới.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}

function KhienBan() {
    return (<div class="khien-ban mt-4">
        <div class="title-positive">
            <h2 class="heading-title text-center">10THERMA khiến bạn thoải mái thế nào?</h2>
        </div>
        <div class="container">
            <img className="w-100"
                 src="https://upload-dungnh-dev.s3.ap-southeast-1.amazonaws.com/public/video/10therma/Asset/khienban/1.png"/>
            <div class="box-content-khien-ban">
                <h3>Nghệ thuật công nghệ rung dọc</h3>
                <p>Gây tê rung được nghiên cứu bởi Smith và cộng sự (2004), nhận thấy tác dụng giảm đau của rung
                    động có lợi trong việc giảm thiểu cơn đau cho bệnh nhân trải qua các thủ thuật da liễu. Theo
                    lý thuyết cổng kiểm soát cơn đau do Melzack và Wall đưa ra, các sợi thần kinh truyền thông
                    tin từ các thụ thể rung động, kích thích các tế bào trung gian ức chế trong tủy sống, làm
                    giảm tín hiệu đau. Đây là cách Công nghệ rung dọc độc đáo của 10THERMA cải thiện cảm giác
                    đau của bệnh nhân.</p>
            </div>
        </div>
    </div>)
}

function DieuTri() {
    return (<section class="dieu-tri">
        <div class="container">
            <div class="title-dieu-tri">
                <h2 class="text-center">CHỈ ĐỊNH ĐIỀU TRỊ</h2>
            </div>
            <div class="row">
                <div class="col-lg-4 p-0">
                    <div class="group-card">
                        <div class="image-card">
                            <img decoding="async"
                                 src="https://10therma.vn/wp-content/uploads/2023/12/eye-thumb-layout-2.png"
                                 title="eye-thumb-layout-2" alt="eye-thumb-layout-2" className="animation-shrink"/>
                        </div>
                        <div class="button-card">
                            <img decoding="async"
                                 src="https://10therma.vn/wp-content/uploads/2023/12/bnt-note-layout-2.png"
                                 title="bnt-note-layout-2" alt="bnt-note-layout-2"/>
                        </div>
                        <div class="box-title">
                            <div class="title-button-card">
                                <h2>vùng mắt</h2>
                            </div>
                        </div>
                        <div class="content-card">
                            <p>Giảm nếp nhăn, vết chân chim quanh khóe mắt.</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 p-0">
                    <div class="group-card">
                        <div class="image-card">
                            <img decoding="async"
                                 src="https://10therma.vn/wp-content/uploads/2023/12/face-thumb-layout-2.png"
                                 title="face-thumb-layout-2" alt="face-thumb-layout-2"
                                 className="animation-shrink"/>
                        </div>
                        <div class="button-card">
                            <img decoding="async"
                                 src="https://10therma.vn/wp-content/uploads/2023/12/bnt-note-layout-2.png"
                                 title="bnt-note-layout-2" alt="bnt-note-layout-2"/>
                        </div>
                        <div class="box-title">
                            <div class="title-button-card">
                                <h2>KHUÔN MẶT</h2>
                            </div>
                        </div>
                        <div class="content-card">
                            <p> Giảm nhăn trên trán, khóe miệng, mỡ nọng cằm, cải thiện sắc tố và lỗ chân lông.</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 p-0">
                    <div class="group-card">
                        <div class="image-card">
                            <img decoding="async"
                                 src="https://10therma.vn/wp-content/uploads/2023/12/body-thumb-layout-2.png"
                                 title="body-thumb-layout-2" alt="body-thumb-layout-2"
                                 className="animation-shrink"/>
                        </div>
                        <div class="button-card">
                            <img decoding="async"
                                 src="https://10therma.vn/wp-content/uploads/2023/12/bnt-note-layout-2.png"
                                 title="bnt-note-layout-2" alt="bnt-note-layout-2"/>
                        </div>
                        <div class="box-title">
                            <div class="title-button-card">
                                <h2>BODY / CƠ THỂ</h2>
                            </div>
                        </div>
                        <div class="content-card">
                            <p>Giảm mỡ, tái tạo đường nét trên cơ thể, ngăn ngừa chảy xệ, nếp nhăn</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>)
}

const FIRST_IMAGE = {
    imageUrl: 'https://upload-dungnh-dev.s3.ap-southeast-1.amazonaws.com/public/video/10therma/Asset/AfterBefore/after.jpg'
};
const SECOND_IMAGE = {
    imageUrl: 'https://upload-dungnh-dev.s3.ap-southeast-1.amazonaws.com/public/video/10therma/Asset/AfterBefore/before.jpg'
};

function ImageAfterBefore() {
    return (
        <section class="after-before">
            <div class="title-dieu-tri">
                <h2 class="text-center heading-title">TRƯỚC VÀ SAU LIỆU TRÌNH THON GỌN HÀM</h2>
            </div>
            <div class="container">
                <ReactBeforeSliderComponent secondImage={SECOND_IMAGE} firstImage={FIRST_IMAGE} delimiterColor='#452D8C'/>
            </div>
        </section>
    )
}

function ChungChi() {
    return (<section class="chung-chi">
            <div class="title-dieu-tri">
                <h2 class="text-center heading-title">CHỨNG CHỈ / BẰNG CHỨNG NHẬN NHÃN HIỆU</h2>
            </div>
            <div class="container">
                <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                        delay: 2500, disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="mySwiper"
                >
                    <SwiperSlide>
                        <div class="item-image">
                            <img
                                src="https://upload-dungnh-dev.s3.ap-southeast-1.amazonaws.com/public/video/10therma/Asset/chung_chi/Slide-1.jpg"
                                className="w-100"/>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div class="item-image">
                            <img
                                src="https://upload-dungnh-dev.s3.ap-southeast-1.amazonaws.com/public/video/10therma/Asset/chung_chi/Slide-2.jpg"
                                className="w-100"/>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div class="item-image">
                            <img
                                src="https://upload-dungnh-dev.s3.ap-southeast-1.amazonaws.com/public/video/10therma/Asset/chung_chi/Slide-3.jpg"
                                className="w-100"/>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div class="item-image">
                            <img
                                src="https://upload-dungnh-dev.s3.ap-southeast-1.amazonaws.com/public/video/10therma/Asset/chung_chi/Slide-4.jpg"
                                className="w-100"/>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </section>

    )
}

function TikTok() {
    return (<section class="tiktok">
        <div class="group-preview-tiktok">
            <div class="title-dieu-tri pt-4" bis_skin_checked="1">
                <h2 class="text-center heading-title">Đánh giá</h2>
            </div>
            <div class="container">
                <div class="row mb-2">
                    <div class="col-lg-3 col-md-6 col-sm-12 mb-2">
                        <div class="card">
                            <video className="card-img-top"
                                   src="https://upload-dungnh-dev.s3.ap-southeast-1.amazonaws.com/public/video/10therma/Asset/tiktok/1.mp4"
                                   autoPlay loop muted alt="Card image cap"></video>
                            <div class="card-body">
                                <h5 class="card-title">Cao Thị Thi</h5>
                                <h6 class="card-subtitle mb-2 text-muted">25-12-2023</h6>
                                <p>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                </p>
                                <p class="card-text">Tui là tui sợ đau kém lắm, mà làm cái này êm nhaa Mấy bà nhớ
                                    coi hết clip này của tui <strong>#UltraV #10THERMA #IprettyGroup</strong></p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-12 mb-2">
                        <div class="card">
                            <video className="card-img-top"
                                   src="https://upload-dungnh-dev.s3.ap-southeast-1.amazonaws.com/public/video/10therma/Asset/tiktok/2.mp4"
                                   autoPlay loop muted alt="Card image cap"></video>
                            <div class="card-body">
                                <h5 class="card-title">Lưu Kim Ngân</h5>
                                <h6 class="card-subtitle mb-2 text-muted">22-12-2023</h6>
                                <p>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                </p>
                                <p class="card-text">Mấy bà sợ bắp tay to dô coi clip của tui nè, nay có tuyệt chiêu
                                    mới nha 😊😊😊<strong> #ultrav #10therma #iprettygroup #tipslamdep #giammo</strong>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-12 mb-2">
                        <div class="card">
                            <video className="card-img-top"
                                   src="https://upload-dungnh-dev.s3.ap-southeast-1.amazonaws.com/public/video/10therma/Asset/tiktok/3.mp4"
                                   autoPlay loop muted alt="Card image cap"></video>
                            <div class="card-body">
                                <h5 class="card-title">Phương Đoàn Rì Viu🙈</h5>
                                <h6 class="card-subtitle mb-2 text-muted">24-12-2023</h6>
                                <p>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                </p>
                                <p class="card-text">Event ra mắt kỷ nguyên công nghệ mới tại Việt
                                    Nam <strong> 10THERMA!!! #UltraV #10THERMA #IPrettyGroup #lamdep</strong></p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-12 mb-2">
                        <div class="card">
                            <video className="card-img-top"
                                   src="https://upload-dungnh-dev.s3.ap-southeast-1.amazonaws.com/public/video/10therma/Asset/tiktok/4.mp4"
                                   autoPlay loop muted alt="Card image cap"></video>
                            <div class="card-body">
                                <h5 class="card-title">Mỹ Ái Nguyễn</h5>
                                <h6 class="card-subtitle mb-2 text-muted">25-12-2023</h6>
                                <p>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                </p>
                                <p class="card-text">Công nghệ làm đẹp mới toanh, hứa hẹn là sẽ hot lắm nè<strong>#UltraV
                                    #10THERMA #IprettyGroup</strong></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row pb-3">
                    <div class="col-lg-3 col-md-6 col-sm-12 mb-2">
                        <div class="card">
                            <video className="card-img-top"
                                   src="https://upload-dungnh-dev.s3.ap-southeast-1.amazonaws.com/public/video/10therma/Asset/tiktok/5.mp4"
                                   autoPlay loop muted alt="Card image cap"></video>
                            <div class="card-body">
                                <h5 class="card-title">Trương Định - Mẹ Na✅</h5>
                                <h6 class="card-subtitle mb-2 text-muted">24-12-2023</h6>
                                <p>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                </p>
                                <p class="card-text">Cùng khám phá công nghệ Thon gọn mặt, ngừa chảy xệ da cho người
                                    trẻ sợ đau <strong>#UltraV #10THERMA #IprettyGroup</strong></p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-12 mb-2">
                        <div class="card">
                            <video className="card-img-top"
                                   src="https://upload-dungnh-dev.s3.ap-southeast-1.amazonaws.com/public/video/10therma/Asset/tiktok/6.mp4"
                                   autoPlay loop muted alt="Card image cap"></video>
                            <div class="card-body">
                                <h5 class="card-title">Embe 🥑</h5>
                                <h6 class="card-subtitle mb-2 text-muted">22-12-2023</h6>
                                <p>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                </p>
                                <p class="card-text">Cùng Diễm trải nghiệm Ultra V nha<strong>#UltraV #10THERMA
                                    #IprettyGroup</strong></p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-12 mb-2">
                        <div class="card">
                            <video className="card-img-top"
                                   src="https://upload-dungnh-dev.s3.ap-southeast-1.amazonaws.com/public/video/10therma/Asset/tiktok/7.mp4"
                                   autoPlay loop muted alt="Card image cap"></video>
                            <div class="card-body">
                                <h5 class="card-title">Kaityy</h5>
                                <h6 class="card-subtitle mb-2 text-muted">22-12-2023</h6>
                                <p>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                </p>
                                <p class="card-text">cùng tui dự sự kiện soft launching Kỉ nguyên công nghệ mới
                                    10THERMA nha <strong>#UltraV #10THERMA #IprettyGroup</strong></p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-12 mb-2">
                        <div class="card">
                            <video className="card-img-top"
                                   src="https://upload-dungnh-dev.s3.ap-southeast-1.amazonaws.com/public/video/10therma/Asset/tiktok/8.mp4"
                                   autoPlay loop muted alt="Card image cap"></video>
                            <div class="card-body">
                                <h5 class="card-title">Skincare cùng Tập Tập ❤️</h5>
                                <h6 class="card-subtitle mb-2 text-muted">25-12-2023</h6>
                                <p>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                </p>
                                <p class="card-text">Nếu dưới 30 thì có thể trẻ hoá bằng 10therma nhé <strong>#123fabe
                                    #taptapskincare #xuhuong #goclamdep #reviewlamdep #UltraV #10THERMA
                                    #iprettygroup</strong></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>)
}

function QA() {
    return (<section class="QA mt-4">
        <div class="title-positive">
            <h2 class="heading-title text-center">Q&A</h2>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="title-qa mb-4">
                        <h4><span>Q</span> Tôi có thể kỳ vọng những tác dụng gì sau khi điều trị bằng 10THERMA?</h4>
                    </div>
                    <div class="content-q&a">
                        <p> 10THERMA là quy trình ứng dụng tần số vô tuyến đơn cực giúp truyền nhiệt từ bề mặt da
                            một cách an toàn để tái tạo collagen trong da. Bạn có thể mong đợi các hiệu quả như giảm
                            nếp nhăn, lỗ chân lông, tăng độ đàn hồi của da, nâng tông da và cải thiện kết cấu
                            da.</p>
                    </div>
                </div>
                <div class="col-lg-12">
                    <div class="title-qa mb-4">
                        <h4><span>Q</span> Khi nào bạn cảm nhận được hiệu quả của liệu trình?</h4>
                    </div>
                    <div class="content-q&a">
                        <p> Collagen cần có thời gian để tái tạo mới, hiệu quả sẽ dần dần cải thiện sau hai đến ba
                            tháng.</p>
                    </div>
                </div>
                <div class="col-lg-12">
                    <div class="title-qa mb-4">
                        <h4><span>Q</span> Mức độ đau khi điều trị như thế nào?</h4>
                    </div>
                    <div class="content-q&a">
                        <p> 10THERMA sử dụng khí làm mát và chức năng rung để ngăn ngừa bỏng lớp biểu bì trong quá
                            trình truyền nhiệt tần số vô tuyến. Cơn đau trong quá
                            trình điều trị là vừa phải và có thể chịu đựng được.</p>
                    </div>
                </div>
                <div class="col-lg-12">
                    <div class="title-qa mb-4">
                        <h4><span>Q</span> Các biện pháp phòng ngừa sau điều trị là gì?</h4>
                    </div>
                    <div class="content-q&a">
                        <p><strong>10THERMA</strong> là quy trình không xâm lấn, an toàn và không cần thời gian
                            nghỉ dưỡng. Da có thể cảm thấy khô tạm thời sau khi điều trị, vì vậy nên dưỡng ẩm cho da
                            nhiều hơn bình thường.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>)
}

function FormCustomer() {
    const [api, contextHolder] = notification.useNotification();
    const [spinning, setSpinning] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSpinning(true);
        setDataForm(formData)
        // Reset form after submission if needed
    };

    async function setDataForm(formData) {
        let url = 'https://script.google.com/macros/s/AKfycbwQqaOwHgvRftToVEDsc0siHuHPc1yITnxwksrm12ldI9fsEBxAUdwX25jMWq6TYgXKEw/exec   '
        let queryString = new URLSearchParams (formData);
        $.ajax({
            url: url,
            type: "post",
            data: queryString.toString()
        }).then(function(response) {
            setSpinning(false);
            api.open({
                message: 'Đăng kí thành công !',
                description:
                    'Chúng tôi sẽ liên hệ cho bạn sớm nhất!',
                duration: 2,
                icon: <SmileOutlined style={{ color: '#108ee9' }}/>,
            });
            setFormData({ name: '', phone: '' });
        }).catch(function(error) {
            alert('Lỗi')
        });
    }

    return (<section class="form-customer">
        {contextHolder}
        <div class="container">
            <div class="row">
                <div class="col-lg-6">
                    <div class="form-item">
                        <div class="title-form">
                            <h2 class="heading-title">
                                ĐĂNG KÝ LIỆU TRÌNH
                            </h2>
                        </div>
                        <div class="sub-text-title">
                            <p>
                                <em>Đây sẽ là cơ hội để bạn được cập nhật về thiết bị công nghệ hiện đại cao đến từ
                                    Hàn Quốc <strong>10THERMA</strong> máy Nâng cơ – Xoá nhăn – Trẻ hoá giúp nâng
                                    tầm nhan sắc của bạn.</em>
                            </p>
                        </div>
                        <div class="form-submit">
                            <form id="form-customer">
                                <div class="row">
                                    <div class="col-6">
                                        <div class="form-group">
                                            <label htmlFor="exampleInputEmail1" className="form-label">Họ và
                                                tên</label>
                                            <input type="text" className="form-control" id="name"
                                                   placeholder="Nguyễn Văn A" name='name' value={formData.name} onChange={handleChange} aria-describedby="emailHelp"/>
                                            <p class="text-danger d-none"></p>
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="form-group">
                                            <label htmlFor="exampleInputEmail1" className="form-label">Số điện
                                                thoại </label>
                                            <input type="phone" className="form-control" type="text" id="phone"
                                                   placeholder="0938873847" name='phone' value={formData.phone} onChange={handleChange} aria-describedby="emailHelp"/>
                                            <p class="text-danger d-none"></p>
                                        </div>
                                    </div>
                                </div>
                                <Spin tip="Đợi chút..." spinning={spinning} >
                                    <div class="button-form mt-4">
                                        <button type="button" onClick={handleSubmit}>ĐĂNG KÝ NGAY</button>
                                    </div>
                                </Spin>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6"></div>
            </div>
        </div>
    </section>)
}

function FooterTherma() {
    return (<div class="footer-name">
        <img loading="lazy" decoding="async" width="1920" height="581"
             src="https://10therma.vn/wp-content/uploads/2023/12/footer.png"
             className="w-100 attachment-full size-full wp-image-117" alt=""
             srcSet="https://10therma.vn/wp-content/uploads/2023/12/footer.png 1920w, https://10therma.vn/wp-content/uploads/2023/12/footer-300x91.png 300w, https://10therma.vn/wp-content/uploads/2023/12/footer-1024x310.png 1024w, https://10therma.vn/wp-content/uploads/2023/12/footer-768x232.png 768w, https://10therma.vn/wp-content/uploads/2023/12/footer-1536x465.png 1536w"
             sizes="(max-width: 1920px) 100vw, 1920px"/>
    </div>)
}

export default TenThermaEvent;