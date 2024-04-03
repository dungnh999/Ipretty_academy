import React from "react";
import Logo from "ipretty/components/Logo";
import logoSrc from "public/logo/Logo-header.svg";
import { ROUTES } from "ipretty/constants/Routers";
import useNavigator from "../../hook/useNavigator";
import AvatarHeader from "./AvatarHeader";
import { Input ,Button} from "antd"

const { Search } = Input;


const homeStyle = {
    width: '100%',
    zIndex: '16',
    top: '0'
}

const searchStyle = {
    display: 'none',
    zIndex: 1
}

const buttonActionStyle = {
    marginRight: '8px'
}

const backgroundStyle = {
    background: 'url(' + logoSrc + ') no-repeat left top'
}

const hasMenuStyle = {
    background: 'url(http://localhost:8000/LandingPage/images/logo-ipretty.svg) no-repeat left top'
}

function HeaderStore(props) {
    const navigate  = useNavigator();
    const buttonCart = () => {
        navigate(ROUTES.CART);
    }

    const buttonHome = () => {
        navigate(ROUTES.HOME);
    }

    const logoDemo = {
        width: '150px',
        height: 'auto',
        background: 'rgba(255,255,255,.2)',
        borderRadius: '6px'
    }

    return (
        <div>
            <div className="demo-logo" style={logoDemo}>
                <Button type={"link"}>
                    <img src={logoSrc} style={{ width : '100%' }}/>
                </Button>
            </div>
            <Search placeholder="input search text"  style={{ width: 200 }} />
        </div>
    // <header>
        //     <div className="js-group-menu clearfix"></div>
        //     <div className="ipretty-home-menutop hidden-xs" style={homeStyle}>
        //         <div className="container">
        //             <div className="row col-width-lg">
        //                 <div className="col-lg-2 col-md-2 col-sm-3 cate-md">
        //                     <span className="ipretty-menu-cate hidden-sm pd-new-home">
        //                         <a href="javascript:void(0)" onClick={buttonHome} style={backgroundStyle}>
        //                             <h1>Học Online: 2.000+ Khóa học trực tuyến cho người đi làm </h1>
        //                         </a>
        //                     </span>
        //                     <div className="hidden-lg hidden-md hidden-xs">
        //                         <a className="unica-logo" href="">
        //                             <Logo logoSrc={logoSrc}></Logo>
        //                         </a>
        //                         <div className="ipretty-menu-cate">
        //                             <i className="fa fa-th"></i>
        //                             <nav id="mysidebarmenu" className="amazonmenu">
        //                                 <ul>
        //                                     <li className="hassub">
        //                                         <a title="Khóa học Ngoại Ngữ trực tuyến nhiều người học"
        //                                            href="/course/ngoai-ngu">
        //                                             <i className="fa fa fa-language"></i> Ngoại ngữ</a>
        //                                         <ul className="issub" style={hasMenuStyle}>
        //                                             <li><a href="/course/ngoai-ngu">Tất cả Ngoại ngữ.</a></li>
        //                                             <li><a href="/tag/tieng-han">Tiếng Hàn</a></li>
        //                                             <li><a href="/tag/tieng-duc">Tiếng Đức</a></li>
        //                                             <li><a href="/tag/tieng-trung">Tiếng Trung</a></li>
        //                                             <li><a href="/tag/tieng-nhat">Tiếng Nhật</a></li>
        //                                             <li><a href="/tag/tieng-anh">Tiếng Anh</a></li>
        //                                         </ul>
        //                                     </li>
        //                                     <li className="hassub">
        //                                         <a title="Khóa Học Marketing Từ Case Study Thực Chiến"
        //                                            href="/course/marketing">
        //                                             <i className="fa fa fa-line-chart"></i>
        //                                         </a>
        //                                         <ul className="issub" style={hasMenuStyle}>
        //                                             <li><a href="/course/marketing">Tất cả Marketing.</a></li>
        //                                             <li><a href="/tag/facebook-marketing">Facebook Marketing</a></li>
        //                                             <li><a href="/tag/zalo-marketing">Zalo Marketing</a></li>
        //                                             <li><a href="/tag/email-marketing">Email Marketing</a></li>
        //                                             <li><a href="/tag/google-ads">Google Ads</a></li>
        //                                             <li><a href="/tag/seo">Seo</a></li>
        //                                             <li><a href="/tag/youtube-marketing">Youtube Marketing</a></li>
        //                                             <li><a href="/tag/content-marketing">Content Marketing</a></li>
        //                                             <li><a href="/tag/video-marketing">Video marketing</a></li>
        //                                             <li><a href="/tag/affiliate-marketing">Affiliate Marketing</a></li>
        //                                             <li><a href="/tag/marketing-online">Marketing Online</a></li>
        //                                         </ul>
        //                                     </li>
        //                                 </ul>
        //                             </nav>
        //                         </div>
        //                     </div>
        //                 </div>
        //                 <div className="col-lg-4 col-md-4 col-sm-4 cate-sm">
        //                     <form className="ipretty-search-boxtop navbar-form form-inline" method="GET"
        //                           action="/search">
        //                         <input autoComplete="on" name="key" id="text_search" value="" type="text"
        //                                className="form-control ipretty-form" placeholder="Tìm khóa học, giảng viên"
        //                                required=""/>
        //                         <button type="submit" className="btn ipretty-btn-search">
        //                             <i className="fa fa-search"></i>
        //                         </button>
        //                         <div className="autocomplete-search" style={searchStyle}></div>
        //                     </form>
        //                 </div>
        //                 <div className="col-lg-6 col-md-6 col-sm-5 cate-sm p-0">
        //                     <ul className="db-item">
        //                         <li>
        //                             <a className="db-item-learn hidden-xs" href="/dashboard/user/course">
        //                                 <i className="fa fa-sign-in"></i> Vào học
        //                             </a>
        //                         </li>
        //                         <li className="mgtOp mt-0">
        //                             <a className="db-item-group-icon hidden-xs" href="/dashboard/user/group">
        //                                 <i className="fa fa-users"></i>
        //                             </a>
        //                         </li>
        //                         <li className="mgtOp mt-0">
        //                             <Badge count={5}>
        //                                 <a href="javascript:void(0)" onClick={buttonCart} className="ipretty-cart">
        //                                     <i className="fa fa-shopping-cart"></i>
        //                                 </a>
        //                             </Badge>
        //
        //                             <div className="notification-add-cart">
        //                                 <a className="icon-close"><i className="fa fa-close"></i></a>
        //                                 <p className="status">
        //                                     <svg stroke="currentColor" fill="currentColor" strokeWidth="0"
        //                                          viewBox="0 0 512 512" height="1em" width="1em"
        //                                          xmlns="http://www.w3.org/2000/svg">
        //                                         <path
        //                                             d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path>
        //                                     </svg>
        //                                     Thêm vào giỏ hàng thành công!
        //                                 </p>
        //                                 <a className="btn btn-view-cart" href="/gio-hang">Xem giỏ hàng và thanh toán</a>
        //                             </div>
        //                         </li>
        //                         <li className="btn-group mgtOp mt-0">
        //                             <AvatarHeader/>
        //                         </li>
        //                     </ul>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </header>
    )
}

export default HeaderStore;