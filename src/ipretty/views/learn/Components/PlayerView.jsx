import React, {useEffect} from 'react';
import ReactPlayer from "react-player";
import {useOverviewLearn} from "ipretty/context/OverviewCourseContext";
import { ROOT_API_URL } from 'ipretty/services/constances';
import LessonService from "ipretty/services/LessonService";

const PlayerView = (props) => {
    const { dataCourse } = useOverviewLearn();
    const {course, dataLessonById} = dataCourse;

    const onEnded = () => {
        if(!dataLessonById.isPassed) {
            updateProcessLesson();
        }
    };

    const updateProcessLesson = () => {
        const data = new FormData()
        data.append('course_id', course.course_id)
        data.append('lesson_id', dataLessonById.id)
        data.append('view_duration', dataLessonById.lesson_duration)
        LessonService.updateProcessLesson(data,
            (res) => {
                if(res.data && res.data.data && res.data.data.lesson_id) {
                    const dataCheckLesson = res.data.data
                    console.log(dataCheckLesson);
                    // updateLessonLearned({ chapterIndex, chapterItemIndex, dataCheckLesson })
                    // if (dataCheckLesson.isCompletedCourse && !dataCheckLesson.isConfirmNotice) {
                    //     finishLesson(dataCheckLesson.course_name);
                    // }
                }
            },
            (err) => {
                console.log(err)
            }
        )
    };

    return (
        <div id="player_videojs" style={{ background: "black", padding: '0 8.5%'}}>
            <ReactPlayer
                controls
                width={'100%'}
                height={'100%'}
                url={dataLessonById.main_attachment}
                onEnded={onEnded}
                config={{ file: { attributes: { controlsList: 'nodownload' } } }}
            />
        </div>
    );
};

export default PlayerView;