import React from 'react';
import PromotionStore from "ipretty/views/store/components/Promotion";

const CartView = (props) => {
    return (
        <main>
            <div class="u-bread-cart">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="unica-breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item active">
                                        Giỏ hàng (1 khóa học)
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/**
                ITEM CART
             */}
            <div className="unica-order-cart">
                <div className="container">
                    <div className='row'>
                        <div class="col-lg-9 col-md-9 col-sm-8 col-cart">
                            <div class="u-box-cart2">
                                <div class="row">
                                    <div class="btn btn-danger pull-right delete-all">
                                        Xóa tất cả
                                    </div>
                                </div>
                                <div class="u-cart-course">
                                    <div class="img-cart-course">
                                        <img className="img-responsive"
                                             src="http://localhost:8000/public/4/369793824_687408196759265_2695539581081227157_n.png"
                                             width="140" height="70" alt="" loading="lazy" /></div>
                                    <div class="title-cart-course">
                                        <a href="bi-quyet-ban-le-ngan-don-tren-shopee-zalo-va-facebook" target="_blank">
                                            <p>Bí quyết bán lẻ ngàn đơn trên Shopee, Zalo và Facebook</p></a>
                                        <span>Giảng viên: Trần Hoa</span>

                                    </div>
                                    <div class="price-cart cart-price-sub">
                                        <p> 199,000<sup>đ</sup></p>
                                        <span>1,200,000<sup>đ</sup></span>
                                    </div>
                                    <div class="remove-course">
                                        <i type="course_id" title="Xóa khóa học này" alt="Xóa khóa học này" id="1375"
                                           price_sale="199000" discount="1001000" class="fa fa-times del_cart"
                                           aria-hidden="true"></i>
                                    </div>
                                </div>
                                <div class="u-cart-course">
                                    <div class="img-cart-course">
                                        <img className="img-responsive"
                                             src="http://localhost:8000/public/4/369793824_687408196759265_2695539581081227157_n.png"
                                             width="140" height="70" alt="" loading="lazy" /></div>
                                    <div class="title-cart-course">
                                        <a href="bi-quyet-ban-le-ngan-don-tren-shopee-zalo-va-facebook" target="_blank">
                                            <p>Bí quyết bán lẻ ngàn đơn trên Shopee, Zalo và Facebook</p></a>
                                        <span>Giảng viên: Trần Hoa</span>

                                    </div>
                                    <div class="price-cart cart-price-sub">
                                        <p> 199,000<sup>đ</sup></p>
                                        <span>1,200,000<sup>đ</sup></span>
                                    </div>
                                    <div class="remove-course">
                                        <i type="course_id" title="Xóa khóa học này" alt="Xóa khóa học này" id="1375"
                                           price_sale="199000" discount="1001000" class="fa fa-times del_cart"
                                           aria-hidden="true"></i>
                                    </div>
                                </div>
                                <div class="u-cart-course">
                                    <div class="img-cart-course">
                                        <img className="img-responsive"
                                             src="http://localhost:8000/public/4/369793824_687408196759265_2695539581081227157_n.png"
                                             width="140" height="70" alt="" loading="lazy" /></div>
                                    <div class="title-cart-course">
                                        <a href="bi-quyet-ban-le-ngan-don-tren-shopee-zalo-va-facebook" target="_blank">
                                            <p>Bí quyết bán lẻ ngàn đơn trên Shopee, Zalo và Facebook</p></a>
                                        <span>Giảng viên: Trần Hoa</span>

                                    </div>
                                    <div class="price-cart cart-price-sub">
                                        <p> 199,000<sup>đ</sup></p>
                                        <span>1,200,000<sup>đ</sup></span>
                                    </div>
                                    <div class="remove-course">
                                        <i type="course_id" title="Xóa khóa học này" alt="Xóa khóa học này" id="1375"
                                           price_sale="199000" discount="1001000" class="fa fa-times del_cart"
                                           aria-hidden="true"></i>
                                    </div>
                                </div>
                                <div class="u-cart-course">
                                    <div class="img-cart-course">
                                        <img className="img-responsive"
                                             src="http://localhost:8000/public/4/369793824_687408196759265_2695539581081227157_n.png"
                                             width="140" height="70" alt="" loading="lazy" /></div>
                                    <div class="title-cart-course">
                                        <a href="bi-quyet-ban-le-ngan-don-tren-shopee-zalo-va-facebook" target="_blank">
                                            <p>Bí quyết bán lẻ ngàn đơn trên Shopee, Zalo và Facebook</p></a>
                                        <span>Giảng viên: Trần Hoa</span>

                                    </div>
                                    <div class="price-cart cart-price-sub">
                                        <p> 199,000<sup>đ</sup></p>
                                        <span>1,200,000<sup>đ</sup></span>
                                    </div>
                                    <div class="remove-course">
                                        <i type="course_id" title="Xóa khóa học này" alt="Xóa khóa học này" id="1375"
                                           price_sale="199000" discount="1001000" class="fa fa-times del_cart"
                                           aria-hidden="true"></i>
                                    </div>
                                </div>
                                <div class="u-cart-course">
                                    <div class="img-cart-course">
                                        <img className="img-responsive"
                                             src="http://localhost:8000/public/4/369793824_687408196759265_2695539581081227157_n.png"
                                             width="140" height="70" alt="" loading="lazy" /></div>
                                    <div class="title-cart-course">
                                        <a href="bi-quyet-ban-le-ngan-don-tren-shopee-zalo-va-facebook" target="_blank">
                                            <p>Bí quyết bán lẻ ngàn đơn trên Shopee, Zalo và Facebook</p></a>
                                        <span>Giảng viên: Trần Hoa</span>

                                    </div>
                                    <div class="price-cart cart-price-sub">
                                        <p> 199,000<sup>đ</sup></p>
                                        <span>1,200,000<sup>đ</sup></span>
                                    </div>
                                    <div class="remove-course">
                                        <i type="course_id" title="Xóa khóa học này" alt="Xóa khóa học này" id="1375"
                                           price_sale="199000" discount="1001000" class="fa fa-times del_cart"
                                           aria-hidden="true"></i>
                                    </div>
                                </div>
                                <div class="u-cart-course">
                                    <div class="img-cart-course">
                                        <img className="img-responsive"
                                             src="http://localhost:8000/public/4/369793824_687408196759265_2695539581081227157_n.png"
                                             width="140" height="70" alt="" loading="lazy" /></div>
                                    <div class="title-cart-course">
                                        <a href="bi-quyet-ban-le-ngan-don-tren-shopee-zalo-va-facebook" target="_blank">
                                            <p>Bí quyết bán lẻ ngàn đơn trên Shopee, Zalo và Facebook</p></a>
                                        <span>Giảng viên: Trần Hoa</span>

                                    </div>
                                    <div class="price-cart cart-price-sub">
                                        <p> 199,000<sup>đ</sup></p>
                                        <span>1,200,000<sup>đ</sup></span>
                                    </div>
                                    <div class="remove-course">
                                        <i type="course_id" title="Xóa khóa học này" alt="Xóa khóa học này" id="1375"
                                           price_sale="199000" discount="1001000" class="fa fa-times del_cart"
                                           aria-hidden="true"></i>
                                    </div>
                                </div>
                                <div class="u-cart-course">
                                    <div class="img-cart-course">
                                        <img className="img-responsive"
                                             src="http://localhost:8000/public/4/369793824_687408196759265_2695539581081227157_n.png"
                                             width="140" height="70" alt="" loading="lazy" /></div>
                                    <div class="title-cart-course">
                                        <a href="bi-quyet-ban-le-ngan-don-tren-shopee-zalo-va-facebook" target="_blank">
                                            <p>Bí quyết bán lẻ ngàn đơn trên Shopee, Zalo và Facebook</p></a>
                                        <span>Giảng viên: Trần Hoa</span>

                                    </div>
                                    <div class="price-cart cart-price-sub">
                                        <p> 199,000<sup>đ</sup></p>
                                        <span>1,200,000<sup>đ</sup></span>
                                    </div>
                                    <div class="remove-course">
                                        <i type="course_id" title="Xóa khóa học này" alt="Xóa khóa học này" id="1375"
                                           price_sale="199000" discount="1001000" class="fa fa-times del_cart"
                                           aria-hidden="true"></i>
                                    </div>
                                </div>
                                <div class="u-cart-course">
                                    <div class="img-cart-course">
                                        <img className="img-responsive"
                                             src="http://localhost:8000/public/4/369793824_687408196759265_2695539581081227157_n.png"
                                             width="140" height="70" alt="" loading="lazy" /></div>
                                    <div class="title-cart-course">
                                        <a href="bi-quyet-ban-le-ngan-don-tren-shopee-zalo-va-facebook" target="_blank">
                                            <p>Bí quyết bán lẻ ngàn đơn trên Shopee, Zalo và Facebook</p></a>
                                        <span>Giảng viên: Trần Hoa</span>

                                    </div>
                                    <div class="price-cart cart-price-sub">
                                        <p> 199,000<sup>đ</sup></p>
                                        <span>1,200,000<sup>đ</sup></span>
                                    </div>
                                    <div class="remove-course">
                                        <i type="course_id" title="Xóa khóa học này" alt="Xóa khóa học này" id="1375"
                                           price_sale="199000" discount="1001000" class="fa fa-times del_cart"
                                           aria-hidden="true"></i>
                                    </div>
                                </div>
                                <div class="u-cart-course">
                                    <div class="img-cart-course">
                                        <img className="img-responsive"
                                             src="http://localhost:8000/public/4/369793824_687408196759265_2695539581081227157_n.png"
                                             width="140" height="70" alt="" loading="lazy" /></div>
                                    <div class="title-cart-course">
                                        <a href="bi-quyet-ban-le-ngan-don-tren-shopee-zalo-va-facebook" target="_blank">
                                            <p>Bí quyết bán lẻ ngàn đơn trên Shopee, Zalo và Facebook</p></a>
                                        <span>Giảng viên: Trần Hoa</span>

                                    </div>
                                    <div class="price-cart cart-price-sub">
                                        <p> 199,000<sup>đ</sup></p>
                                        <span>1,200,000<sup>đ</sup></span>
                                    </div>
                                    <div class="remove-course">
                                        <i type="course_id" title="Xóa khóa học này" alt="Xóa khóa học này" id="1375"
                                           price_sale="199000" discount="1001000" class="fa fa-times del_cart"
                                           aria-hidden="true"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-3 col-sm-4">
                            <div class="u-cart-price">
                                <div class="price-cart-box clearfix">
                                    <div class="price-cart-1 text-left">
                                    <span class="price-static">
                                        199,000<sup>đ</sup>
                                    </span>
                                        <span class="price-cart-origin">1,200,000<sup>đ</sup></span>
                                    </div>
                                </div>
                                <div class="price-btn-box">
                                    <a className="btn-one" href="/order/step1">THANH TOÁN</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
};

export default CartView;