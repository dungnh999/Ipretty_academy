    import React from "react";
    import {Redirect, Route, Switch, HashRouter, BrowserRouter} from "react-router-dom";
    import LoginView from "ipretty/views/auth/view/LoginView";
    import {
        AppProvider,
        AppConsumer,
        useAuth,
        useTokenAuth,
    } from "../../context/AppProvider";
    
    import CourseView from "ipretty/views/course/views/CourseView";
    import CourseNew from "ipretty/views/course/views/CourseNew";
    import ResultView from "ipretty/views/course/views/ResultView";
    import CourseEdit from "ipretty/views/course/views/CourseEdit";
    import CourseDetail from "ipretty/views/course/views/CourseDetail";
    import UserAdd from "ipretty/views/User/views/UserAdd";
    import UserEdit from "ipretty/views/User/views/UserEdit";
    import ProfileView from "ipretty/views/User/views/ProfileView";
    import LessonAdd from "ipretty/views/lesson/views/LessonAdd";
    import LessonDetail from "ipretty/views/lesson/views/LessonDetail";
    import LessonEdit from "ipretty/views/lesson/views/LessonEdit";
    import CourseCategoryView from "ipretty/views/course-category/views/CourseCategoryView";
    import CourseCategoriesAdd from "ipretty/views/course-category/views/CourseCategoriesAdd";
    import CourseCategoriesDetail from "ipretty/views/course-category/views/CourseCategoriesDetail";
    import CourseCategoriesEdit from "ipretty/views/course-category/views/CourseCategoriesEdit";
    import SurveyAdd from "ipretty/views/survey/views/SurveyAdd";
    import SurveyEdit from "ipretty/views/survey/views/SurveyEdit";
    import MainLayout from "../MainLayout/MainLayout";
    import RecoveryView from "ipretty/views/auth/view/RecoveryView";
    import ResetView from "ipretty/views/auth/view/ResetView";
    import RegisterView from "ipretty/views/auth/view/RegisterView";
    import DetailCourse from "ipretty/views/detail-course/DetailCourse";
    import StudentEdit from "ipretty/views/User/views/StudentEdit";
    import ManagementView from "ipretty/views/course/views/ManagementView";
    import LessonOrSurveyStudent from "ipretty/views/lesson-survey-student/LessonOrSurveyStudent";
    import LessonSurveyStudentContextProvider from "ipretty/context/lesson-survey-student/LessonSurveyStudentContext";
    import FormPassword from "ipretty/views/User/components/FormPassword";
    import StudentWorkingSurvey from "ipretty/views/student-work-survey/StudentWorkingSurvey";
    import WorkingSurveyContextProvider from "ipretty/context/student-working-to-survey/WorkingSurveyContext";
    import OverviewCourseProvider from "ipretty/context/OverviewCourseContext";
    import OverviewLearn from "ipretty/views/overview/view/OverviewLearn";
    import ConfirmRegisterSuccess from "ipretty/views/auth/components/ConfirmRegisterSuccess";
    import AdminDetail from "ipretty/views/User/views/AdminDetail";
    import Error403View from "ipretty/views/home/error/Error403View";
    import Error404View from "ipretty/views/home/error/Error404View";
    import Error500View from "ipretty/views/home/error/Error500View";
    import AdminEdit from "ipretty/views/User/views/AdminEdit";
    import FaqContextProvider from "ipretty/context/faq/FaqContext";
    import ManagementUserView from "ipretty/views/User/views/ManagementUserView";
    import FAQCreate from "ipretty/views/faq/views/FAQCreate";
    import FAQEdit from "ipretty/views/faq/views/FAQEdit";
    import FAQView from "ipretty/views/faq/views/FAQView";
    import TeacherDetail from "ipretty/views/User/views/TeacherDetail";
    /**
     * BANNER VIEW
     * */
    import BannerAdd from "ipretty/views/banners/view/BannerAdd";
    import BannerView from "ipretty/views/banners/view/BannerView";
    import BannerEdit from "ipretty/views/banners/view/BannerEdit";
    import HomeView from "ipretty/views/chat/views/HomeView";
    import TrademarkView from "ipretty/views/trademark/view/TrademarkView";
    import TrademarkAdd from "ipretty/views/trademark/view/TrademarkAdd";
    import TrademarkEdit from "ipretty/views/trademark/view/TrademarkEdit";
    import OverviewFaqRoute from "ipretty/views/faq/published-faqs/OverviewFaqRoute";
    import PostView from "ipretty/views/post/view/PostView";
    import PostAdd from "ipretty/views/post/view/PostAdd";
    import PostEdit from "ipretty/views/post/view/PostEdit";
    import PostCategoryView from "ipretty/views/post-category/views/PostCategoriesView";
    import PostCategoryAdd from "ipretty/views/post-category/views/PostCategoriesAdd";
    import PostCategoriesEdit from "ipretty/views/post-category/views/PostCategoriesEdit";
    import ReportError from "ipretty/views/report-error/ReportError";
    import TransactionHistory from "ipretty/views/User/views/TransactionHistory";
    import TransactionSeeDetail from "ipretty/views/User/views/TransactionSeeDetail";
    import ContactWithUs from "ipretty/views/contact-with-us/ContactWithUs";
    import Calendar from "ipretty/views/calendar-event/views/Calendar";
    import TransactionView from "ipretty/views/transactions/TransactionView";
    import TransactionDetail from "ipretty/views/transactions/TransactionDetail";
    import NotificationView from "ipretty/views/notification/view/NotificationView";
    import NotificationAdd from "ipretty/views/notification/view/NotificationAdd";
    import NotificationDetail from "ipretty/views/notification/view/NotificationDetail";
    import ReportCourseAndBusiness from "ipretty/views/report-course-sale/ReportCourseAndBusiness";
    
    // DANH SÁCH STORE
    import Store from "ipretty/views/store/views/Store";
    
    // IMPORT CONSTANTS
    import {ROUTES} from "ipretty/constants/Routers";
    import LearnLayout from "../MainLayout/LearnLayout";
    import LearnView from "../../views/learn/views/LearnView";
    import CartLayoutView from "../../views/CartLayout/views/CartLayoutView";
    
    import {ConfigProvider} from "antd";
    import CheckoutView from "ipretty/views/checkout/views/CheckoutView";
    import MyCoursesView from "ipretty/views/my-courses/MyCoursesView";
    import PersonalView from "ipretty/views/personal/PersonalView";
    import LandingPage from "ipretty/core/MainLayout/LandingPage";
    import TenThermaEvent from "ipretty/views/events/views/10ThermaEvent";
    import CategoryView from "ipretty/views/category/CategoryView";
    // const PublicRoute = ({component: Component, isLoggedIn, ...rest}) => (
    //     <Route
    //         {...rest}
    //         render={(props) =>
    //             <AppConsumer>
    //                 {(context) => (
    //                     <MainLayout>
    //                         <Component {...props} context={context}/>
    //                     </MainLayout>
    //                 )}
    //             </AppConsumer>
    //         }
    //     />
    // )
    
    // const AuthenticatedDetailRoute = ({component: Component, ...rest}) => {
    //     const RenderComponent = Component;
    //     const context = useAuth();
    //     return (
    //         <Route
    //             {...rest}
    //             render={(props) => (
    //                 <AppConsumer>
    //                     {(context) => <RenderComponent {...props} context={context}/>}
    //                 </AppConsumer>
    //             )}
    //         />
    //     );
    // };
    //
    // // Kiểm tra đăng nhập
    // const LoginRoute = ({ component: Component, isLoggedIn, ...rest }) => (
    //     <Route
    //         {...rest}
    //         render={(props) => (
    //             !isLoggedIn ? (
    //                 <Component {...props} />
    //             ) : (
    //                 <Redirect to="/" /> // Chuyển hướng đến trang chính nếu đã đăng nhập
    //             )
    //         )}
    //     />
    // );
    //
    // //  Những Route kiểm tra đăng nhập
    // const ProtectedRoute = ({component: Component, isLoggedIn, ...rest}) => (
    //     <Route
    //         {...rest}
    //         render={(props) =>
    //             isLoggedIn ? (
    //                 <AppConsumer>
    //                     {(context) => (
    //                         <MainLayout>
    //                             <Component {...props} context={context}/>
    //                         </MainLayout>
    //                     )}
    //                 </AppConsumer>
    //             ) : (
    //                 <Redirect to="/login"/>
    //             )
    //         }
    //     />
    // )
    //
    // const Routes = () => {
    //     const {isAuthenticated} = useToken();
    //     console.log(1);
    //     return (
    //         <>
    //             <BrowserRouter>
    //                 <Switch>
    
    //                     <LoginRoute exact path="/login" component={LoginView} isLoggedIn={isAuthenticated}/>
    //                     <PublicRoute path="/" component={Store}/>
    //                     <ProtectedRoute
    //                         exact
    //                         path={ROUTES.REPORT_ERROR}
    //                         component={ReportError}
    //                         isLoggedIn={isAuthenticated}
    //                     />
    //                     <ProtectedRoute
    //                         exact
    //                         path={ROUTES.ERROR_404}
    //                         component={Error404View}
    //                     />
    //                     <ProtectedRoute
    //                         exact
    //                         path={ROUTES.ERROR_403}
    //                         component={Error403View}
    //                     />
    //                     <ProtectedRoute
    //                         exact
    //                         path={ROUTES.ERROR_500}
    //                         component={Error500View}
    //                     />
    //                     <ProtectedRoute
    //                         exact
    //                         path={ROUTES.CONTACT}
    //                         component={ContactWithUs}
    //                         isLoggedIn={isAuthenticated}
    //                     />
    //                     <ProtectedRoute
    //                         exact
    //                         path={ROUTES.COURSES}
    //                         component={CourseView}
    //                         isLoggedIn={isAuthenticated}
    //                     />
    //                     <ProtectedRoute
    //                         exact
    //                         path={ROUTES.COURSES_ADD}
    //                         component={CourseNew}
    //                         isLoggedIn={isAuthenticated}
    //                     />
    //                     <ProtectedRoute
    //                         exact
    //                         path="/courses/:courseId/user/:userId/learning-process"
    //                         component={ResultView}
    //                         isLoggedIn={isAuthenticated}
    //                     />
    //                     <ProtectedRoute
    //                         exact
    //                         path={ROUTES.COURSES_DETAIL}
    //                         component={CourseDetail}
    //                         isLoggedIn={isAuthenticated}
    //                     />
    //                     <ProtectedRoute
    //                         exact
    //                         path={ROUTES.COURSES_UPDATE}
    //                         component={CourseEdit}
    //                         isLoggedIn={isAuthenticated}
    //                     />
    //                     <ProtectedRoute
    //                         exact
    //                         path={ROUTES.USER}
    //                         component={ManagementUserView}
    //                         isLoggedIn={isAuthenticated}
    //                     />
    //                     <ProtectedRoute
    //                         exact
    //                         path={ROUTES.USER_ADD}
    //                         component={UserAdd}
    //                         isLoggedIn={isAuthenticated}
    //                     />
    //                     <ProtectedRoute
    //                         exact
    //                         path={ROUTES.USER_UPDATE}
    //                         component={AdminEdit}
    //                         isLoggedIn={isAuthenticated}
    //                     />
    //                     <ProtectedRoute
    //                         exact
    //                         path={ROUTES.USER_DETAIL}
    //                         component={AdminDetail}
    //                         isLoggedIn={isAuthenticated}
    //                     />
    //                     <ProtectedRoute
    //                         exact
    //                         path="/teacher/:id/detail"
    //                         component={TeacherDetail}
    //                         isLoggedIn={isAuthenticated}
    //                     />
    //                     <ProtectedRoute
    //                         exact
    //                         path={ROUTES.USER_UPDATE}
    //                         component={UserEdit}
    //                         isLoggedIn={isAuthenticated}
    //                     />
    //                     <ProtectedRoute
    //                         exact
    //                         path="/students/edit"
    //                         component={StudentEdit}
    //                         isLoggedIn={isAuthenticated}
    //                     />
    //                     <ProtectedRoute
    //                         exact
    //                         path={ROUTES.USER_CHANGE_PASSWORD}
    //                         component={FormPassword}
    //                         isLoggedIn={isAuthenticated}
    //                     />
    //                     <ProtectedRoute
    //                         exact
    //                         path="/lessons/add"
    //                         component={LessonAdd}
    //                         isLoggedIn={isAuthenticated}
    //                     />
    //                     <ProtectedRoute
    //                         exact
    //                         path="/lessons/:id/detail"
    //                         component={LessonDetail}
    //                         isLoggedIn={isAuthenticated}
    //                     />
    //                     <ProtectedRoute
    //                         exact
    //                         path="/lessons/:id/edit"
    //                         component={LessonEdit}
    //                         isLoggedIn={isAuthenticated}
    //                     />
    //                     <ProtectedRoute
    //                         exact
    //                         path="/course-categories"
    //                         component={CourseCategoryView}
    //                         isLoggedIn={isAuthenticated}
    //                     />
    //                     <ProtectedRoute
    //                         exact
    //                         path="/course-categories/add"
    //                         component={CourseCategoriesAdd}
    //                         isLoggedIn={isAuthenticated}
    //                     />
    //                     <ProtectedRoute
    //                         exact
    //                         path="/course-categories/:id/detail"
    //                         component={CourseCategoriesDetail}
    //                         isLoggedIn={isAuthenticated}
    //                     />
    //                     <ProtectedRoute
    //                         exact
    //                         path="/course-categories/:id/edit"
    //                         component={CourseCategoriesEdit}
    //                         isLoggedIn={isAuthenticated}
    //                     />
    //                     <ProtectedRoute
    //                         exact
    //                         path="/courses/:courseId/students"
    //                         component={ManagementView}
    //                         isLoggedIn={isAuthenticated}
    //                     />
    //                     <ProtectedRoute
    //                         exact
    //                         path="/report-course-business"
    //                         component={ReportCourseAndBusiness}
    //                         isLoggedIn={isAuthenticated}
    //                     />
    //                     <ProtectedRoute
    //                         exact
    //                         path="/profile"
    //                         component={ProfileView}
    //                         isLoggedIn={isAuthenticated}
    //                     />
    //                     <ProtectedRoute
    //                         exact
    //                         path="/transaction-history"
    //                         component={TransactionHistory}
    //                         isLoggedIn={isAuthenticated}
    //                     />
    //                     <ProtectedRoute
    //                         exact
    //                         path="/transaction-history/:order_id/detail"
    //                         component={TransactionSeeDetail}
    //                         isLoggedIn={isAuthenticated}
    //                     />
    //                     <ProtectedRoute
    //                         exact
    //                         path="/surveys/add"
    //                         component={SurveyAdd}
    //                         isLoggedIn={isAuthenticated}
    //                     />
    //                     <ProtectedRoute
    //                         exact
    //                         path="/surveys/:id/edit"
    //                         component={SurveyEdit}
    //                         isLoggedIn={isAuthenticated}
    //                     />
    //                     <ProtectedRoute
    //                         exact
    //                         path="/notifications"
    //                         component={NotificationView}
    //                         isLoggedIn={isAuthenticated}
    //                     />
    //                     <ProtectedRoute
    //                         exact
    //                         path="/notifications/:notification_id/edit"
    //                         component={NotificationDetail}
    //                         isLoggedIn={isAuthenticated}
    //                     />
    //                     <ProtectedRoute
    //                         exact
    //                         path="/notifications/add"
    //                         component={NotificationAdd}
    //                         isLoggedIn={isAuthenticated}
    //                     />
    //
    //                     <ProtectedRoute
    //                         exact
    //                         path="/faqs/add"
    //                         component={FAQCreate}
    //                         isLoggedIn={isAuthenticated}
    //                     />
    //                     <ProtectedRoute
    //                         exact
    //                         path="/faqs/:id/edit"
    //                         component={FAQEdit}
    //                         isLoggedIn={isAuthenticated}
    //                     />
    //
    //                     <ProtectedRoute
    //                         exact
    //                         path="/categories"
    //                         component={CategoryView}
    //                         isLoggedIn={isAuthenticated}
    //                     />
    //                     <ProtectedRoute exact path="/chat" component={HomeView}/>
    //                     <ProtectedRoute
    //                         exact
    //                         path="/chat/:userId"
    //                         component={HomeView}
    //                         isLoggedIn={isAuthenticated}
    //                     />
    //                     <ProtectedRoute
    //                         exact
    //                         path="/categories/add"
    //                         component={CategoryAdd}
    //                         isLoggedIn={isAuthenticated}
    //                     />
    //                     <ProtectedRoute
    //                         exact
    //                         path="/categories/:category_id/edit"
    //                         component={CategoryEdit}
    //                         isLoggedIn={isAuthenticated}
    //                     />
    //                     <ProtectedRoute
    //                         exact
    //                         path="/banners"
    //                         component={BannerView}
    //                         isLoggedIn={isAuthenticated}
    //                     />
    //                     <ProtectedRoute
    //                         exact
    //                         path="/banners/add"
    //                         component={BannerAdd}
    //                         isLoggedIn={isAuthenticated}
    //                     />
    //                     <ProtectedRoute
    //                         exact
    //                         path="/banners/:banner_id/edit"
    //                         component={BannerEdit}
    //                         isLoggedIn={isAuthenticated}
    //                     />
    //                     <ProtectedRoute
    //                         exact
    //                         path="/trademarks"
    //                         component={TrademarkView}
    //                         isLoggedIn={isAuthenticated}
    //                     />
    //                     <ProtectedRoute
    //                         exact
    //                         path="/trademarks/add"
    //                         component={TrademarkAdd}
    //                         isLoggedIn={isAuthenticated}
    //                     />
    //                     <ProtectedRoute
    //                         exact
    //                         path="/trademarks/:banner_id/edit"
    //                         component={TrademarkEdit}
    //                         isLoggedIn={isAuthenticated}
    //                     />
    //                     <ProtectedRoute
    //                         exact
    //                         path="/posts"
    //                         component={PostView}
    //                         isLoggedIn={isAuthenticated}
    //                     />
    //                     <ProtectedRoute
    //                         exact
    //                         path="/posts/addPost"
    //                         component={PostAdd}
    //                         isLoggedIn={isAuthenticated}
    //                     />
    //                     <ProtectedRoute
    //                         exact
    //                         path="/posts/:banner_id/edit"
    //                         component={PostEdit}
    //                         isLoggedIn={isAuthenticated}
    //                     />
    //                     <ProtectedRoute
    //                         exact
    //                         path="/post-categories"
    //                         component={PostCategoryView}
    //                         isLoggedIn={isAuthenticated}
    //                     />
    //                     <ProtectedRoute
    //                         exact
    //                         path="/post-categories/addCategories"
    //                         component={PostCategoryAdd}
    //                         isLoggedIn={isAuthenticated}
    //                     />
    //                     <ProtectedRoute
    //                         exact
    //                         path="/post-categories/:category_id/edit"
    //                         component={PostCategoriesEdit}
    //                         isLoggedIn={isAuthenticated}
    //                     />
    //                     <ProtectedRoute
    //                         exact
    //                         path="/faqs"
    //                         component={FAQView}
    //                         isLoggedIn={isAuthenticated}
    //                     />
    //                     <ProtectedRoute
    //                         exact
    //                         path="/checkout"
    //                         component={CheckoutView}
    //                         isLoggedIn={isAuthenticated}
    //                     />
    //                     {/* <ProtectedRoute
    //                               exact
    //                               path="/calendar-events"
    //                               component={CalendarEventView}
    //                           /> */}
    //                     <ProtectedRoute
    //                         exact
    //                         path="/calendar-events"
    //                         component={Calendar}
    //                         isLoggedIn={isAuthenticated}
    //                     />
    //                     <ProtectedRoute
    //                         exact
    //                         path="/calendar-events/:eid"
    //                         component={Calendar}
    //                         isLoggedIn={isAuthenticated}
    //                     />
    //                     <ProtectedRoute
    //                         exact
    //                         path="/transactions"
    //                         component={TransactionView}
    //                     />
    //                     <ProtectedRoute
    //                         exact
    //                         path="/transactions/:id/detail"
    //                         component={TransactionDetail}
    //                         isLoggedIn={isAuthenticated}
    //                     />
    //                     <ProtectedRoute
    //                         exact
    //                         path="/cart"
    //                         component={CartLayoutView}
    //                         breadcrumbName='Giỏ hàng'
    //                         isLoggedIn={isAuthenticated}
    //                     />
    //                     <ProtectedRoute
    //                         exact
    //                         path="/cart"
    //                         component={CartLayoutView}
    //                         breadcrumbName='Khoá học của tôi'
    //                         isLoggedIn={isAuthenticated}
    //                     />
    //                     <ProtectedRoute
    //                         exact
    //                         path="/my-courses"
    //                         component={MyCoursesView}
    //                         isLoggedIn={isAuthenticated}
    //                     />
    //                     {/* <AuthenticatedManagementRoute
    //                               exact
    //                               path="/faqs/:id/question"
    //                               component={FAQQuestion}
    //                               /> */}
    //                     <ProtectedRoute
    //                         exact
    //                         path="/personal"
    //                         component={PersonalView}
    //                         isLoggedIn={isAuthenticated}
    //                     />
    //                 </Switch>
    //             </BrowserRouter>
    //         </>
    //     )
    //     // return (
    //     //   <>
    //     //       {/*<BrowserRouter>*/}
    //     //       {/*    <Switch>*/}
    //     //       {/*        <Route path="/events">*/}
    //     //       {/*            <LandingPage>*/}
    //     //       {/*                <AuthenticatedDetailRoute*/}
    //     //       {/*                    exact*/}
    //     //       {/*                    path="/events/10therma"*/}
    //     //       {/*                    component={TenThermaEvent}*/}
    //     //       {/*                />*/}
    //     //       {/*            </LandingPage>*/}
    //     //       {/*        </Route>*/}
    //     //       {/*    </Switch>*/}
    //     //       {/*</BrowserRouter>*/}
    //     //     {isAuthenticated ? (
    //     //       <BrowserRouter>
    //     //           <Switch>
    //     //               <Route path="/learning">
    //     //                   <OverviewCourseProvider>
    //     //                       <LearnLayout>
    //     //
    //     //                               <AuthenticatedDetailRoute
    //     //                                   exact
    //     //                                   path="/learning/:course_id"
    //     //                                   component={LearnView}
    //     //                               />
    //     //                       </LearnLayout>
    //     //                   </OverviewCourseProvider>
    //     //               </Route>
    //     //               <Route path="/">
    //     //                   <MainLayout>
    //     //                       <Switch>
    //
    //     //                       </Switch>
    //     //                   </MainLayout>
    //     //               </Route>
    //     //           </Switch>
    //     //       </BrowserRouter>
    //     //     ) : (
    //     //       <Switch>
    //     //         <PublicRoute exact path="/*" component={LoginView} />
    //     //         <PublicRoute exact path="/register" component={RegisterView} />
    //     //         <PublicRoute exact path="/login" component={LoginView} />
    //     //         <PublicRoute exact path="/recovery" component={RecoveryView} />
    //     //         <PublicRoute exact path="/recovery-admin" component={RecoveryView} />
    //     //         <PublicRoute exact path="/reset" component={ResetView} />
    //     //         <PublicRoute exact path="/reset-admin" component={ResetView} />
    //     //         <PublicRoute
    //     //           exact
    //     //           path="/confirm-success"
    //     //           component={ConfirmRegisterSuccess}
    //     //         />
    //     //         <PublicRoute
    //     //           exact
    //     //           path="/contact-with-us"
    //     //           component={ContactWithUs}
    //     //         />
    //     //       </Switch>
    //     //     )}
    //     //   </>
    //     // );
    // };
    // const Router = () => {
    //     const theme = {
    //         token: {
    //             fontFamily: "Montserrat",
    //             colorBorder: '#003a33'
    //         },
    //         components: {
    //             Button: {
    //                 colorPrimary: '#003a33',
    //                 colorLink: '#003a33'
    //             },
    //         }
    //     }
    //     return (
    //         <AppProvider>
    //             <AppConsumer>
    //                 {(context) => (
    //                     <BrowserRouter>
    //                         <ConfigProvider theme={theme}>
    //                             <Routes/>
    //                         </ConfigProvider>
    //                     </BrowserRouter>
    //                 )}
    //             </AppConsumer>
    //         </AppProvider>
    //     );
    // };
    
    
    // const PublicRoutes = () => (
    //     <Switch>
    //         <Route exact path="/login" component={LoginView} />
    //         <Route exact path="/register" component={RegisterView} />
    //         <Route exact path="/recovery" component={RecoveryView} />
    //         <Route exact path="/recovery-admin" component={RecoveryView} />
    //         <Route exact path="/reset" component={ResetView} />
    //         <Route exact path="/reset-admin" component={ResetView} />
    //         <Route exact path="/confirm-success" component={ConfirmRegisterSuccess} />
    //         <Route exact path="/contact-with-us" component={ContactWithUs} />
    //         <Route path="/" component={Store} />
    //     </Switch>
    // );
    //
    // // Các Route cần kiểm tra đăng nhập
    // const PrivateRoutes = () => (
    //     <Switch>
    //         <Route exact path="/events/10therma" component={TenThermaEvent} />
    //         <Route exact path="/profile" component={ProfileView} />
    //     </Switch>
    // );
    
    
    const ProtectedRoute = ({ component: Component, isLoggedIn, ...rest }) => (
        <Route
            {...rest}
            render={(props) =>
                isLoggedIn ? (
                    <MainLayout>
                        <Component {...props} />
                    </MainLayout>
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    );

    const LearnRoute = ({ component: Component, isLoggedIn, ...rest }) => (
        <Route
            {...rest}
            render={(props) =>
                isLoggedIn ? (
                    <LearnLayout>
                        <Component {...props} />
                    </LearnLayout>
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    );

    const PublicRoute = ({ component: Component, ...rest }) => (
        <Route
            {...rest}
            render={(props) => (
                <MainLayout>
                    <Component {...props} />
                </MainLayout>
            )}
        />
    );

    const AppRoutes = ({ isLoggedIn }) => {
        const { isAuthenticated } = useTokenAuth();
        return (
            <>
                <Switch>
                    {/* PUBLIC */}
                    <PublicRoute exact path="/" component={Store} />
                    <PublicRoute
                        exact
                        path="/cart"
                        component={CartLayoutView}
                    />
                    <Route exact path="/events/10therma" component={TenThermaEvent}/>
                    <Route exact path="/login" component={LoginView} />
                    {/*<Route component={Error404View} />*/}
    
                    {/* PRIVATE */}
                    <ProtectedRoute exact path={ROUTES.REPORT_ERROR} component={ReportError} isLoggedIn={isAuthenticated} />
                    <LessonSurveyStudentContextProvider>
                        <OverviewCourseProvider>
                            <LearnRoute
                                exact
                                path="/course/learning/:course_id"
                                component={LearnView}
                                isLoggedIn={true}
                            />
                        </OverviewCourseProvider>
                        <PublicRoute exact path="category/:slug_name/" component={CategoryView} />
                        <PublicRoute exact path="/detail-course/:course_id" component={DetailCourse} />
                        <PublicRoute
                            exact
                            path="/checkout"
                            component={CheckoutView}
                            isLoggedIn={isAuthenticated}
                        />
                        <ProtectedRoute exact path="/detail-course/:course_id/completed" component={DetailCourse}/>
                        <ProtectedRoute
                            exact
                            path="/detail-course/:course_id/lesson/:lesson_id"
                            component={LessonOrSurveyStudent}
                            isLoggedIn={isAuthenticated}
                        />
                        <ProtectedRoute
                            exact
                            path="/detail-course/:course_id/survey/:survey_id"
                            component={LessonOrSurveyStudent}
                            isLoggedIn={isAuthenticated}
                        />
                       <ProtectedRoute
                            exact
                            path="/detail-course/:course_id/overview"
                            component={OverviewLearn}
                            isLoggedIn={isAuthenticated}
                        />
                        <WorkingSurveyContextProvider>
                            <ProtectedRoute
                                exact
                                path="/detail-course/:course_id/survey/:survey_id/working"
                                component={StudentWorkingSurvey}
                                isLoggedIn={isAuthenticated}
                            />
                        </WorkingSurveyContextProvider>
                        <FaqContextProvider>
                            <ProtectedRoute
                                // exact
                                path="/published-faqs"
                                component={OverviewFaqRoute}
                                isLoggedIn={isAuthenticated}
                            />
                        </FaqContextProvider>
                    </LessonSurveyStudentContextProvider>
                </Switch>
            </>
        )
    }
    
    
    const Router = () => {
        const theme = {
            token: {
                fontFamily: "Open Sans",
                colorBorder: '#003a33',
                colorPrimary: '#003724',
                colorPrimaryText: '#FBD0CD',
                fontSizeLG: '14px',
                fontSizeHeading1: '32px',
                fontSizeHeading2: '24px',
                fontWeightStrong: '700'
            },
            components: {
                Button: {
                    colorPrimary: '#003a33',
                    colorLink: '#003a33',
                    groupBorderColor: '#003a33'
                },
                Menu: {
                    activeBarBorderWidth: '0'
                },
                Input: {
                    activeBorderColor: '#003a33',
                    hoverBorderColor: '#003a33'
                },
                Collapse: {

                }
            }
        };
        return (
            <BrowserRouter>
                <AppProvider>
                    <AppConsumer>
                        {(context) => (
                            <ConfigProvider theme={theme}>
                                <AppRoutes/>
                            </ConfigProvider>
                        )}
                    </AppConsumer>
                </AppProvider>
            </BrowserRouter>
        );
    };
    export default Router;
