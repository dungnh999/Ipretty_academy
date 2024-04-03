

import React, { useCallback, useMemo, useState } from 'react'
import UploadImage from 'ipretty/components/UploadFile/UploadImage'
import { getBase64 } from 'ipretty/helpers/contextHelper'
import { useAuth } from "ipretty/context/AppProvider";
import SurveyService from 'ipretty/services/SurveyService';

const CourseFeatureImage = React.memo((props) => {
    const { classes, courseFeatureImage, uploadBannerCourse, value } = props
    const acceptFile = 'image/png, image/jpeg, image/jpg, image/gif'
    const [error, setError] = useState('')
    const { getTranslation } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    

    const handleImageChange = nameField => useCallback(e => {
        const file = e.target.files[0];
        let acceptFiles = acceptFile.split(', ')
        setIsLoading(true);
        if (!acceptFiles.includes(file.type)) {
            setError(`${getTranslation('Pleaseselectfilewithcorrectformat')} ${acceptFile}`)
            uploadBannerCourse({ [nameField]: '', 'render_course_feature_image': '' })
            setIsLoading(false);
            return false
        }
        setError('')
        let data = new FormData()
        data.append('image_attachment', file)
        SurveyService.uploadFile(
            data,
            res => {
                let response = res.data.data
                setIsLoading(false);
                setError('')
                uploadBannerCourse({ [nameField]: response.url, 'render_course_feature_image': response.url})
                setIsLoading(false);
            //    console.log(response,"response")
            },
            err => {
                setIsLoading(false);
                console.log(err)
            }
        )

    }, [uploadBannerCourse, nameField])
  


    return (
        <React.Fragment>
            <UploadImage   
                handleImageChange={handleImageChange('course_feature_image')}
                avatarURL={courseFeatureImage}
                classes={classes}
                value={value}
                htmlFor={'course_feature_image'}
                acceptFile={acceptFile}
                loading={isLoading}
            />
            {error && error != '' ? (
                <div className={classes.showError}>{error}</div>
            ) : ''}
        </React.Fragment>
    )
})

export default CourseFeatureImage