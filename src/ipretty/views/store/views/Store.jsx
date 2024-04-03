import React from "react";
import SliderStore from "../components/Slider";
import CourseStore from "../components/Course";
import TeachersStore from "../components/Teacher";
import PromotionStore from "../components/Promotion";
import PostsStore from "../components/Posts";
import CategoryStore from "../components/Category";
import Solutions from "ipretty/views/store/components/Solutions";
import Viewed from "ipretty/views/store/components/Viewed";
const Store = (props) => {
    return (
        <div className='container' style={{margin: '0 auto' , marginTop: "20px"}}>
            <SliderStore/>
            {/*<CourseStore/>*/}
            <Viewed/>
            <Viewed/>
            <PromotionStore/>
            {/*<PostsStore/>*/}
            <CategoryStore/>
            {/*<TeachersStore/>*/}
            {/*<Solutions/>*/}
        </div>
    )
}

export default Store;
