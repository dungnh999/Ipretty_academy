import { dataURLtoFile } from "ipretty/helpers/contextHelper"

export default (state, action) => {
    switch (action.type) {
        case 'UPLOAD_BANNER':
            return {
                ...state,
                ...action.newValue
            }
        case 'GET_VALUE_BANNER':
            const course = action.payload

            return {
                ...state,
                course_feature_image: '',
                certificate_image: '',
                render_course_feature_image: course.course_feature_image,
                render_certificate_image: course.certificate_image,
            }
        case 'REMOVE_VALUE_BANNER':

            return {
                ...state,
                course_feature_image: '',
                certificate_image: '',
                render_course_feature_image: '',
                render_certificate_image: ''
            }
        case 'GET_VALUE_BANNER_IN_LOCALSTORAGE':
            const courseGVBIL = action.payload

            return {
                ...state,
                course_feature_image: courseGVBIL. render_course_feature_image ? courseGVBIL.render_course_feature_image : '',
                certificate_image: courseGVBIL.render_certificate_image ? courseGVBIL.render_certificate_image : '',
                render_course_feature_image: courseGVBIL.render_course_feature_image,
                render_certificate_image: courseGVBIL.render_certificate_image,
                // certificate_image_base64: courseGVBIL.certificate_image_base64,
                // course_feature_image_base64: courseGVBIL.course_feature_image_base64
                
            }
            
        case 'GET_ERROR_UPLOAD_FILE':
            const valueGEUF = action.payload

            return {
                ...state,
                error: valueGEUF
            }
        default:
            break;
    }
}