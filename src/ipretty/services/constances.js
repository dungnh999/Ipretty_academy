const API_URL = process.env.API_URL + '/api/';

export const ROOT_API_URL = process.env.API_URL;

export const LOGIN_URL = API_URL + 'auth/login';

export const LOGIN_BY_TOKEN = API_URL + 'auth/login-by-token'

export const SIGNUP_URL = API_URL + 'auth/signup';

export const GET_ME_URL = API_URL + 'auth/me';

export const GET_USER_URL = API_URL + 'users';

export const GET_ALL_DEPARTMENT_URL = API_URL + 'user_departments'

export const GET_LESSON_URL = API_URL + 'lessons';

export const RESET_PASSWORD_URL = API_URL + 'auth/reset-password';

export const SEND_REQUEST_URL = API_URL + 'auth/send-request-reset';

export const CREATE_USER_URL = API_URL + 'create-account'

export const UPLOAD_AVATAR_URL = API_URL + 'upload-avatar'

export const UPDATE_PROFILE_URL = API_URL + 'update-profile'

export const CHANGE_PASSWORD_URL = API_URL + 'change-password'

export const DELETE_LESSONS_URL = API_URL + 'delete-lessons'

export const GET_COURSE_CATEGORIES_UR = API_URL + 'course_categories'

export const GET_COURSE_CATEGORIES_MENU_URL = API_URL + 'course-categories-menu'

export const GET_COURSE_CATEGORIES_TYPE_URL = API_URL + 'course-categories-type';

export const GET_SURVEY_URL = API_URL + 'surveys';

export const GET_USER_BY_ROLE = API_URL + 'user-by-role';

export const GET_MY_COURSES = API_URL + 'my-courses';

export const GET_COURSE_URL = API_URL + 'courses';
export const GET_ALL_COURSE_URL = API_URL + 'get-list-course';

export const API_CHANGE_LANGUAGE = API_URL + 'setLang'

export const GET_ME_PROFILE = API_URL + 'me';

export const ANSWER_USER = API_URL + 'answers'

export const REWORK_SURVEY = API_URL + 'rework-survey'

export const RESEND_EMAIL = API_URL + 'auth/resend-email-active'

export const COURSE_URL_ADD_STUDENT_INTO_COURSE = API_URL + 'add-students-into-course'

export const COURSE_URL_ADD_LEADER_INTO_COURSE = API_URL + 'add-leaders-into-course'

export const COURSE_URL_CLONE = API_URL + 'clone-courses'

export const DETAIL_COURSE_STUDENT = API_URL + 'course-detail'

export const SEARCH_COURSE = API_URL + 'search-courses'

export const PERMISSIONS = {
    MANAGE_COURSES: 'manage_courses',
    VIEW_COURSE: 'view_course',
    UPDATE_COURSE: 'update_course',
    DELETE_COURSE: 'delete_course',
    MANAGE_STUDENTS: 'manage_students',
    MANAGE_LEADERS: 'manage_leaders',
    MANAGE_MEMBERS: 'manage_members',
    MANAGE_LESSONS: 'manage_lessons',
    MANAGE_SURVEYS: 'manage_surveys',
    MANAGE_DASHBOARD: 'manage_dashboard',
    MANAGE_CONTENTS: 'manage_contents',
    MANAGE_TRANSLATIONS: 'manage_translations',
    MANAGE_FAQS: 'manage_faqs',
    MANAGE_NOTIFICATIONS: 'manage_notifications'
}
export const LEARNING_PROCESS = API_URL + 'learning-process'

export const FREE_COURSE = API_URL + 'my-free-courses'

export const GET_CATEGORY_HIGHLIGHT = API_URL + 'list-rank-course-category'

export const GET_COURSE_HIGHLIGHT = API_URL + 'list-rank-course'

export const GET_LIST_QUESTION = API_URL + 'faqs'

export const GET_DETAIL_QUESTION_IN_TOPIC = API_URL + 'frequently_asked_questions'

export const ACTIVE_ACCOUNT = '/active'

export const LOCK_USER = '/lock'

export const INVITE_USER = API_URL + 'invite-users'

export const UPDATE_PROCESS_LESSON = API_URL + 'finish-lesson'

export const UPLOAD_FILE_USERS = API_URL + 'upload-invite-users'

export const GET_LIST_POSTION_URL = API_URL + 'positions'

export const GET_EXPORT_TEMPLATE = API_URL + 'export-template'

export const GET_LIST_FAQS = API_URL + 'faqs'

export const CHECK_JOIN_COURSE_URL = 'check-joined-course';

export const IMPORT_USER = API_URL + 'upload-users'

export const CONFIRM_NOTICE = API_URL + 'confirm-notice';

export const RATING_COMMENT = 'rating-comment';

export const DETAIL_SURVEY_STUDENT = API_URL + 'survey-detail'

export const GET_ALL_POST = API_URL + 'posts'

export const CREATE_BANNER_URL = API_URL + 'posts'

export const CHANGE_PUBLISHED = '/change-published'

export const LIST_CATEGORY_COURSE = API_URL + 'course_categories';

export const CREATE_CATEGORY_COURSE = API_URL + 'course_categories';

export const LIKE_OR_DISLIKE_FAQ_QUESTION = API_URL + 'faq-question-like-dislike';

export const COMMENT_FAQ_QUESTION = API_URL + 'faq-question-comment';

export const GET_POST_CATEGORY = API_URL + 'post-categories'

export const GET_URL_REMOVE_LEADER = API_URL + 'course'

export const SEE_EXAM_DETAIL = API_URL + 'survey-result-detail';

export const REPORT_ERROR = API_URL + 'report-errors';

export const CONTACT_WITH_US = API_URL + 'send-contacts';

export const GET_DISCOUNT_CODE = API_URL + 'discount_codes';

export const GET_CODE_RANDOM = API_URL + 'discount-code'; 

export const LIST_NOTIFICATION = API_URL + 'notifications';

export const READ_NOTIFICATION = API_URL + 'read-notifications';

export const CHECK_NOTIFICATION = API_URL + 'checked-notifications';

export const GET_MESSENGER_URL = API_URL + 'messages'

export const GET_LIST_USER_CHAT = API_URL + 'list-chat'

export const GET_LIST_MESSENGER = API_URL + 'messages/user'

export const GET_MESSENGER_RECEIVER_SEEN = API_URL + 'messages'

export const GET_URL_USER_ONLINE = API_URL

export const GET_LIST_TRANSACTIONS = API_URL + 'transactions'

export const CHECK_APPROVE_TRANSACTIONS  = API_URL + 'approve-transactions'

export const  LIST_PUSH_NOTIFICATION = API_URL + 'push_notifications';

export const GET_REPORT_DETAIL_COURSE = API_URL + 'report-detail-courses';

export const GET_REPORT_BUSINESS_COURSE = API_URL + 'report-business-courses';

export const GET_LIST_TRANSACTIONS_OF_USER = API_URL + 'transaction-histories'

export const GET_OVERVIEW_DATA = API_URL + 'overview-data'

export const GET_FEATURE_COURSES = API_URL + 'feature-courses'

export const GET_FEATURE_MEMBERS = API_URL + 'feature-members'

export const GET_FEATURE_TEACHERS = API_URL + 'feature-teachers'

export const GET_FEATURE_COURSES_CATEGORIES = API_URL + 'feature-course-categories'

export const GET_LIST_EVENT = API_URL + 'list-events'

export const  APPROVE_EVENT  = API_URL + 'approved-event'

export const CREATE_EVENTS = API_URL + 'events'

export const GET_LIST_ALL_EVENT = API_URL + 'list-all-events'

export const GET_BANNERS_NEW = API_URL + 'banners'

export const GET_ANALYSIS_BUSINESS = API_URL + 'analysis-business'

export const GET_STATISTICAL_COURSES = API_URL + 'statistical-courses'

export const GET_RELATED_COURSES = API_URL + 'related_courses'

export const GET_OVERVIEW_STUDENT = API_URL + 'user-overview-data'

export const GET_OPINIONS = API_URL + 'opinions'

export const RECEIVE_INFO = API_URL + 'receive-information'

export const UPLOAD_IMAGES = API_URL + 'upload-images'

export const GET_URL_UNREAD_MESSAGE = API_URL + 'count-unread-messages'

export const LOG_OUT = API_URL + 'logout'

export const LANDING_PAGE_URL = process.env.API_URL

export const DELETE_EVENT = API_URL + 'remove-events'

export const GET_BANNER = API_URL + 'banners'


export const POST_PAYMENT = API_URL + 'payments'

export const GET_CART = API_URL + ''

export const SOCIAL_LINK = {
    YOUTUBE: 'https://www.youtube.com/channel/UCCOybjecxnqL8PfGnVgFh4A',
    FACEBOOK: 'https://www.facebook.com/ipretty.vietnam',
    INSTAGRAM: 'https://www.instagram.com/ipretty.vn/',
    LINKEDIN: 'https://www.linkedin.com/company/ipretty-cuoc-song-tuoi-dep/',
}

export const FOOTER_URL_REDIRECT = {
    ABOUT_US: LANDING_PAGE_URL + '/page/ve-chung-toi',
    BRANDS: LANDING_PAGE_URL + '/trademarks',
    ENTERPRISE: LANDING_PAGE_URL + '/page/doanh-nghiep',
    NEWS: LANDING_PAGE_URL + '/post-news',
    CAREER_OPPORTUNITY: LANDING_PAGE_URL + '/page/co-hoi-nghe-nghiep',
    ABOUT_IPRETTY: LANDING_PAGE_URL + '/page/ve-ipretty-edu',
    TEAM_OF_EXPERTS: LANDING_PAGE_URL + '/page/doi-ngu-chuyen-gia',
    COURSE_AND_TRAINING: LANDING_PAGE_URL + '/page/khoa-hoc-va-dao-tao',
    TERMS_AND_CONDITION: LANDING_PAGE_URL + '/page/dieu-khoan-va-dieu-kien',
    CATEGORIES: LANDING_PAGE_URL + '/course-categories',
}

export const SOCKET_CONFIG = {
    SOCKET_HOSTNAME: process.env.SOCKET_HOSTNAME,
    SOCKET_PORT: process.env.SOCKET_PORT
}
export const DOWNLOAD = 'download';
export const CERTIFICATES = API_URL + 'certificates'
