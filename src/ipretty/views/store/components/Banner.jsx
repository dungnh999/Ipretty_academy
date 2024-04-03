import React, {useState, useMemo, useEffect} from 'react'
import BannerService from "../../../services/BannerService";
import { Carousel, Image, Skeleton } from 'antd';


const BannerStore = (props) => {
    const [dataBanner, setDataBanner] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        let mounted = true;
        const runAsync = async () => {
            try {
                if (mounted) {
                    setLoading(true);
                    getListCategory();
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

    function getListCategory(params, sort, fieldName, defautSort) {
        BannerService.getListBanner(
            {...params},
            (res) => {
                console.log(res);
                const data = res.data.data;
                setDataBanner(data);
                setLoading(false);
            },
            (err) => {
            }
        );
    }

    if(loading){
        return (
            <Skeleton.Image active={loading} style={{width: '100%', height: '100%' }}> </Skeleton.Image>
        )
    }

    return (
        <Carousel  autoplay autoplaySpeed={3000} style={{ borderRadius: '12px', overflow: 'hidden' , outline: 'none' ,  marginBottom: '4.8rem', }}>
            {
                dataBanner.map((item, index) => (
                    <Image
                        key={index}
                        height={500}
                        width={1340}
                        src={process.env.URL_UPLOAD + item['bannerUrl']}
                        preview={false}
                    />
                ))
            }
        </Carousel>
    )
}

export default BannerStore;