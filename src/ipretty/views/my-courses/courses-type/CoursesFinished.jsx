import React, { useState, useEffect } from 'react';
import CoursesLayout from './CoursesLayout';
import MyCoursesService from '../../../services/MyCoursesService';
import Skeleton from 'ipretty/components/Skeleton';
import PaginationBar from 'ipretty/components/PaginationBar';

function CoursesFinished(props) {
    const { params, setParams } = props;
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const [current, setCurrent] = useState(0);
    
    
    useEffect(() => {
        setLoading(true);
        if(params) {
            let _parmas = { ...params, course_status: 'finished', perpage: 8, paging: true };
            MyCoursesService.getMyCourses(_parmas, (responses) => handleSuccess(responses), (errors) => handleError(errors));
        }
        return () => {
            setLoading(false);
        }
    }, [params]);

    const handleSuccess = (responses) => {
        if (responses) {
            setLoading(false);
            if (responses.data && responses.data.data && responses.data.data.data && responses.data.data.data.length) {
                setTotal(responses.data.data.total)
                setCurrent(responses.data.data.current_page)
                responses.data.data.data.forEach(course => {
                    let courseRating = 0;
                    let courseRater = 0;
                    if (course.student_results && course.student_results.length) {
                        course.student_results.forEach(result => {
                            courseRating = courseRating + result.rating;
                            if (result.rating > 0) {
                                courseRater = courseRater + 1;
                            }
                        })
                    }
                    // console.log(courseRating)
                    course.course_rating = parseFloat(courseRating / courseRater);
                    course.course_status = 'Completed'
                });
                setData(responses.data.data.data);

            } else {
                setData([])
            }
        }
    };

    const handleError = (errors) => {
        setLoading(false);
    };

    const handlePageChange = (pageNumber) => {
        setParams({ ...params, page: JSON.stringify(pageNumber) })
    };

    return(
        <>
            {
                loading ? 
                    <>
                        <Skeleton type="list" numberItems={4} height={342} />
                        <Skeleton type="list" numberItems={4} height={342} />
                        <div style={{ marginTop: 16, display: 'flex', 'justifyContent': 'center' }}>
                            <Skeleton type="text" width={200} />
                        </div>
                    </>
                :
                <>
                <CoursesLayout
                    data={data}
                />
                {
                    total > 8 && 
                    <PaginationBar
                        currentPage={current}
                        totalItemsCount={total}
                        handlePageChange={handlePageChange}
                        check={'myCourse'}
                    />
                }
                </>
            }
        </>
    )
}

export default CoursesFinished;