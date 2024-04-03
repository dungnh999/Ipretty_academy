import React, { useEffect, useState } from 'react';
import CoursesLayout from './CoursesLayout';
import MyCoursesService from '../../../services/MyCoursesService';
import Skeleton from 'ipretty/components/Skeleton';
import PaginationBar from 'ipretty/components/PaginationBar';
import { useAuth } from 'ipretty/context/AppProvider';

function CoursesAll(props) {
    const { params, setParams } = props;
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const [current, setCurrent] = useState(0);
    const { user } = useAuth()

    useEffect(() => {
        setLoading(true);
        if(params) {
            delete params.course_status;
            let _parmas = { ...params, perpage: 8, paging: true };
            MyCoursesService.getMyCourses(_parmas, (responses) => handleSuccess(responses), (errors) => handleError(errors));
        }
        return () => {
            setLoading(false);
        }
    }, [params]);

    const handleSuccess = (responses) => {
        if(responses) {
            setLoading(false);
            if (responses.data && responses.data.data && responses.data.data.data && responses.data.data.data.length > 0) {
                setTotal(responses.data.data.total)
                setCurrent(responses.data.data.current_page)
                responses.data.data.data.forEach(course => {
                    let courseRating = 0;
                    let courseRater = 0;
                    if (course.student_results && course.student_results.length) {
                        // if (course.student_result[0] && course.student_result[0].isPassed) {
                        //     course.course_status = 'Completed'
                        // }else {
                        //     course.course_status = 'Learning'
                        // }
                        course.student_results.forEach(result => {

                            // courseRating = courseRating + result.rating;
                            if (result.rating > 0) {
                                courseRating = courseRating + result.rating;
                                courseRater = courseRater + 1;
                            }

                            if (result.student_id == user.id && result.isPassed) {
                                course.course_status = 'Completed'
                            } else if (result.student_id == user.id && !result.isPassed) {
                                course.course_status = 'Learning'
                            }
                        })
                        
                    } 
                    // else  {
                    if (Number(course.course_price) == 0 && course.course_type == "Business") {
                        course.course_status = 'Free'
                    } else if (course.course_type == "Local") {
                        course.course_status = 'Local'
                    } else if (course.course_type == "Group") {
                        course.course_status = 'Group'
                    } else if (Number(course.course_price) != 0 && course.course_type == "Business") {
                        course.course_status = course.course_price ? course.course_price.toLocaleString('vi-VI') + ' ' + course.unit_currency : 0 + ' ' + course.unit_currency
                    }
                    // }

                    if (courseRating) {
                        course.course_rating = parseFloat(courseRating / courseRater);
                    }
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

export default CoursesAll;