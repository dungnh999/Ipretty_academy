import React, {useEffect, useState} from 'react';
import SwiperCourseTemplate from "ipretty/views/template/swiperCourseTemplate";
import CourseService from "ipretty/services/CourseService";

const Viewed = (props) => {
    const [dataPost, setDataPost] = useState([])
    useEffect(() => {
        let mounted = true;
        const runAsync = async () => {
            try {
                if (mounted) {
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
    function getListPosts(params, sort, fieldName, defautSort) {
        CourseService.getAllCourse(
            {...params},
            (res) => {
                const data = res.data.data;
                setDataPost(data)
            },
            (err) => {
            }
        );
    }
    return (
        <SwiperCourseTemplate title='Khoá học đã xem' data={dataPost}/>
    );
};

export default Viewed;