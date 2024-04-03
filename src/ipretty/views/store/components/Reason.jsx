const Reason = (props) => {
    return (
        <div class="container">
            <div class="row">
                <div class="col-lg-12 pdm-No">
                    <div class="unica-reason">
                        <h4>3 LÝ DO BẠN NÊN HỌC ONLINE TẠI UNICA</h4>
                        <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4 pdm-No">
                            <div class="reason-4">
                                <div class="img-reason">
                                    <img className="img-responsive lazy" alt=""
                                         src="{{ asset('LandingPage/new/image/icon/icon1.png') }}" />
                                </div>
                                <div class="txt-reason">Giảng viên uy tín
                                    <span>Bài giảng chất lượng</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4 pdm-No">
                            <div class="reason-4">
                                <div class="img-reason">
                                    <img className="img-responsive lazy" alt=""
                                         src="{{ asset('LandingPage/new/image/icon/icon2.png') }}" />
                                </div>
                                <div class="txt-reason">Thanh toán 1 lần
                                    <span>Học mãi mãi</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4 pdm-No">
                            <div class="reason-4">
                                <div class="img-reason">
                                    <img className="img-responsive lazy" alt=""
                                         src="{{ asset('LandingPage/new/image/icon/icon3.png') }}" />
                                </div>
                                <div class="txt-reason">Học trực tuyến
                                    <span>Hỗ trợ trực tiếp</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Reason;