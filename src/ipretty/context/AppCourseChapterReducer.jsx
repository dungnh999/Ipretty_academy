
export default (state, action) => {
    switch (action.type) {
        case 'ADD_CHAPTERS':
            const { indexChapterAC } = action
            let _stateInit = [...state.chapters]
            _stateInit.push({
                chapter_name: '',
                lessons: [],
                survey: '',
                delete_survey_id: '',
                number_order: indexChapterAC
            })
            return {
                ...state,
                chapters: [..._stateInit]
            }
        case 'CHANGE_CHAPTER_NAME':
            return {
                ...state,
                chapters: state.chapters.map((chapter, idxch) => {
                    if (idxch == action.indexChapter) {
                        return {
                            ...chapter,
                            ...action.newValue
                        }
                    }
                    return chapter
                })
            }
        case 'REMOVE_CHAPTER':
            const { indexChapterRemove } = action
            let newChapterRemove = [...state.chapters]
            newChapterRemove.splice(indexChapterRemove, 1)
            return {
                ...state,
                chapters: newChapterRemove,
            }
        case 'REMOVE_LESSON_IN_CHAPTER':
            const { indexChapterRLIC, indexLessonRLIC } = action
            return {
                ...state,
                chapters: state.chapters.map((chapter, indexChapter) => {
                    if (indexChapterRLIC == indexChapter) {
                        let newLessons = [...chapter.lessons]
                        newLessons.splice(indexLessonRLIC, 1)
                        return {
                            ...chapter,
                            lessons: newLessons
                        }
                    }
                    return chapter
                })
            }
        case 'GET_VALUE_CHAPTER':
            const course = action.payload
            let chaptersGVC = course.course_resources.chapters
            // console.log(course.course_resources.chapters, 'course.course_resources.chapters')
            chaptersGVC && chaptersGVC.length > 0 && chaptersGVC.map((chapter, index) => {
                chapter.delete_survey_id = ''
                return chapter
            })

            return {
                ...state,
                chapters: chaptersGVC
            }
        case 'GET_CHAPTER_CREATE_LESSON':
            const chapters = action.payload
            chapters && chapters.length > 0 && chapters.map((chapter, index) => {
                chapter.delete_survey_id = chapter.delete_survey_id ? chapter.delete_survey_id : ''
                return chapter
            })

            return {
                ...state,
                chapters: chapters
            }
        case 'REMOVE_VALUE_CHAPTER':

            return {
                ...state,
                chapters: []
            }
        case 'DRAP_AND_DROP_CHAPTER':
            const newChapters = action.payload
            newChapters && newChapters.length > 0 && newChapters.map((item, index) => {
                item.number_order = index
                return item
            })
            return {
                ...state,
                chapters: newChapters
            }
        case 'GET_VALUE_LESSON_CHAPTER':
            const lessonsGVLC = action.payload.items
            const indexChapterGVLC = action.payload.indexChapter

            return {
                ...state,
                chapters: state.chapters.map((chapter, indexChapter) => {
                    if (indexChapter == indexChapterGVLC) {
                        return {
                            ...chapter,
                            lessons: lessonsGVLC
                        }
                    }
                    return chapter
                })
            }
        case 'REMOVE_SURVEY_CHAPTER': 
            const { indexChapterRSC, surveyIdRSC } = action

            return {
                ...state,
                chapters: state.chapters.map((chapter, indexChapter) => {
                    if (indexChapterRSC == indexChapter) {
                        return {
                            ...chapter,
                            survey: '',
                            delete_survey_id: chapter.chapter_id ? surveyIdRSC : ''
                        }
                    }
                    return chapter
                })
            }
            
        default:
            state;
    }
}