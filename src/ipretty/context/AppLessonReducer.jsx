export default (state, action) => {
    switch (action.type) {
        case 'CHANGE_VALUE_LESSON':
            const {indexLessonCVC} = action
            return {
                ...state,
                lessons: state.lessons.map((lesson, indexLesson) => {
                    if (indexLessonCVC == indexLesson) {
                        return{
                            ...lesson,
                            ...action.newValue
                        }
                    }
                })
            }
        case 'GET_VALUE_LESSON': 
            const lesson = action.payload;
            // console.log(lesson, 'lesson')
            if (lesson && Object.keys(lesson).length > 0) {
                lesson.delete_lesson_attachment = []
            }
            let lessons = []
            lessons.push(lesson)

            return {
                ...state,
                lessons: lessons
            }
        case 'REMOVE_LESSON_ATTACHMENT': 
            const { indexLessonRLA, indexLessonAttachmentRLA, uuidRLA } = action 
            return {
                ...state,
                lessons: state.lessons.map((lesson, indexLesson) => {
                    if (indexLessonRLA == indexLesson) {
                        let lessonAttachments = [...lesson.lesson_attachment]
                        let deleteLessonAttachment = lesson.delete_lesson_attachment
                        deleteLessonAttachment.push(uuidRLA)
                        lessonAttachments.splice(indexLessonAttachmentRLA, 1)
                        // console.log(lessonAttachments, 'lessonAttachments')
                        return {
                            ...lesson,
                            lesson_attachment: lessonAttachments,
                            lesson_attachments: lessonAttachments,
                            delete_lesson_attachment: deleteLessonAttachment
                        }
                    }
                    return lesson
                })
            }
        case 'REMOVE_MAIN_ATTACHMENT': 
            const { indexLessonRMA } = action
            return {
                ...state, 
                lessons: state.lessons.map((lesson, indexLesson) => {
                    if (indexLessonRMA == indexLesson) {
                        return {
                            ...lesson,
                            main_attachment: '',
                            main_attachment_name: ''
                        }
                    }
                    return lesson
                })
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