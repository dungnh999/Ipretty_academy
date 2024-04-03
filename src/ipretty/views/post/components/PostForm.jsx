import { makeStyles, Typography } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { useAuth } from 'ipretty/context/AppProvider'
import ViewContentPage from 'ipretty/components/ViewContentPage/ViewContentPage'
import IconImage from "ipretty/components/IconImage"
import Save from 'public/icons_ipretty/Save.svg'
import Public_white from 'public/icon_svg/Share_white.svg'
import PostFeatureImage from './PostFeatureImage'
import BannerService from 'ipretty/services/BannerService'
import { useNotiStackContext } from 'ipretty/context/Notistack';
import Public from 'public/icon_svg/share_green.svg'
import Unpublic from 'public/icon_svg/Unshare.svg'
import Dialog from 'ipretty/components/Dialog/Dialog'
import Unpublic_white from 'public/icon_svg/UnShare_white.svg'
import { initialPramsCourse } from 'ipretty/helpers/contextHelper'
import queryString from "query-string"

const useStyles = makeStyles(theme => ({ 
    backGround: {
        width: '100%',
        height: '152px',
        borderRadius: '5px',
        "& .MuiAvatar-img": {
            width: '100%',
            maxWidth: '100%'
        }
    },
}))

function PostForm(props) {
    const { banner_id, history, links , isCreate , isPost} = props
    const { getTranslation, user } = useAuth()
    const classes = useStyles()
    const { makeShortMessage } = useNotiStackContext();
    const [isShowUploadFile, setIsShowUploadFile] = useState(false)
    const [loadingActionSave, setLoadingActionSave] = useState(false)
    const [loadingActionPublish , setLoadingActionPublish] = useState(false)
    const [loadingAction , setLoadingAction] = useState(false)
    const [categories, setCategories] = useState([])
    const [loadingSkeleton, setLoadingSkeleton] = useState(false);
    const [params, setParams] = useState(initialPramsCourse(queryString.parse(location.search, { arrayFormat: 'comma' })))
    const [ content , setContent ] = useState('')
    const [slugCategory , setSlugCategory] = useState(false)

    const actionsCreate = [
        { id: 1, action: handleCancel, icon: '', noIcon: true, label: getTranslation('Cancel'), buttonClass: 'button button__cancel button--white' },
        { id: 2, action: handleSave, icon: <IconImage srcIcon={Save} />  , label: getTranslation('Save')  ,noIcon: false, buttonClass: 'button button__save button--green', loading: loadingActionSave },
        { id: 3, action: handlePublic, icon: <IconImage srcIcon={Public_white} />  , label: getTranslation('Public')  ,noIcon: false, buttonClass: 'button button__public button--green', loading: loadingActionPublish },      
    ]
    const actionsPublic = [
        { id: 1, action: handleCancel, icon: '', noIcon: true, label: getTranslation('Cancel'), buttonClass: 'button button__cancel button--white' },
        { id: 2, action: redirectDialog, icon: <IconImage srcIcon={Public} />  , label: getTranslation('Public')  ,noIcon: false, buttonClass: 'button button__public button--white', loading: loadingAction }, 
        { id: 3, action: handleSave, icon: <IconImage srcIcon={Save} />  , label: getTranslation('Save')  ,noIcon: false, buttonClass: 'button button__save button--green', loading: loadingAction },     
    ]
    const actionsUnpublic = [
        { id: 1, action: handleCancel, icon: '', noIcon: true, label: getTranslation('Cancel'), buttonClass: 'button button__cancel button--white' },
        { id: 2, action: redirectDialog, icon: <IconImage srcIcon={Unpublic} />  , label: getTranslation('NotPublic')  ,noIcon: false, buttonClass: 'button button__notPublic button--white', loading: loadingAction },
        { id: 3, action: handleSave, icon: <IconImage srcIcon={Save} />  , label: getTranslation('Save')  ,noIcon: false, buttonClass: 'button button__save button--green', loading: loadingAction },     
    ]

    const [ dataBanner , setDataBanner ] = useState({
        title : '',
        bannerUrl : '',
        description : '',
        category_id : '',
        content : '',
        is_active : 0,
        isTrademark : 0,
        is_banner : 0
    })

    const [errors, setErrors] = useState({
        title: '',
        description: '',
        bannerUrl: '',
        category_id : '',
        content : '',
    })

    const titlePageCreated = getTranslation('CreatePost')
    const titlePageEdit = getTranslation('EditPost')

    const listInput = [ 
        { id: 0, label: getTranslation('PostName'), onChange: onChangePath, placeholder: getTranslation('Enterarticlename'), value: dataBanner.title, isTextField: true, name: "title" },
        { id: 1, label: getTranslation('Category'), onChange: onChangePath, placeholder: getTranslation('Enterarticlename'), value: dataBanner.category_id, options : categories ? categories : '' ,isTextField: true, isSelect: true ,name: "category_id" },
    ]

    const listInputText = [ 
        { id: 0, label: getTranslation('PostName'), onChange: onChangePath, placeholder: getTranslation('Enterarticlename'), value: dataBanner.title, isTextField: true, name: "title" },
        { id: 1, label: getTranslation('Category'), onChange: onChangePath, placeholder: getTranslation('Enterarticlename'), value: dataBanner.category_id, options : categories ? categories : '' ,isTextField: true, isSelect: true ,name: "category_id" },
        { id: 2, label: getTranslation('Description'), onChange: onChangePath, placeholder: getTranslation('Enteradescriptionofthiscategory'), value: dataBanner.content, isTextField: false, isContent : true ,name: "content"},

    ]
    
    function redirectDialog () {
        setIsShowUploadFile(true);
    }

    function handleCloseUploadFile () {
        setIsShowUploadFile(false)
    }
    
    useEffect(() => {
        setContent(dataBanner.content)
    }, [dataBanner.content])

    useEffect(() => {
        setDataBanner({...dataBanner , content: content})
    }, [content])
    
    useEffect(() => {
        let mounted = true;
        const runAsync = async () => {
            try {
                if (mounted) {
                    if (banner_id) {
                        getDetailBanner(banner_id)
                    }
                    getPostCategory()
                }
            } catch (e) {
                if (mounted) {
                    throw e;
                }
            }
        };
        runAsync();
        return () => (mounted = false);
    }, [])

    function getPostCategory () {
        BannerService.getAllPostCategory(
            res => {
                const data = res.data.data
                const categories = []
                data.forEach(item => {
                    if(item.isPublished == true ){
                        const category ={
                            name : item.category_name ,
                            id : item.category_id,
                            slug : item.category_slug
                        }
                        categories.push(category)
                    }
                })
                setCategories(categories)
            },
           err => {
                console.log(err)
           } 
        )
    }
    const getDetailBanner = (banner_id) => {
        setLoadingSkeleton(true);
        BannerService.detail(
            banner_id,
            res => {
                if(res.data.data.category.category_slug === 'phan-hoi-khach-hang') {
                    setSlugCategory(true)
                }
                setDataBanner(res.data.data)
                setLoadingSkeleton(false);
            },
            err => {
                console.log(err)
                setLoadingSkeleton(false);
            }
        )
    }

    function handleCancel() {
        history.push('/posts')
    }       

    function handleSave () {
        setErrors(false)
        setLoadingActionSave(true)
        const data = new FormData()
         for (let key in dataBanner) {
             if (banner_id && key == 'bannerUrl' && ( typeof (dataBanner[key]) === 'string' || (dataBanner[key]) === null )) {
                 data.append(key, "");
             }else {
                 data.append(key, dataBanner[key]);
             }
         } 
        if (!banner_id) {
            BannerService.createBanner(data, 
                res => {
                    setLoadingActionSave(false)
                    makeShortMessage(getTranslation('Createpostsuccessfully'), "success")
                    setTimeout(() => {
                        history.push('/posts')
                    }, 1000)
                },
                err => {
                    setLoadingActionSave(false)
                    _handleError(err)
                }

            )
        }else {
            BannerService.updateBanner(
                banner_id,
                data,
                res => {
                    setLoadingAction(false)
                    makeShortMessage(getTranslation('Editpostsuccessfully'), "success")
                    setTimeout(() => {
                        history.push('/posts')
                    }, 1000)
                },
                err => {
                    _handleError(err)
                }

            )
        }

    }

    function _handleError(err) {
        setLoadingAction(false);
            setErrors({
                ...errors,
                title: err.response.data.errors.title ? err.response.data.errors.title : "",
                description: err.response.data.errors.description ? err.response.data.errors.description : "",
                bannerUrl: err.response.data.errors.bannerUrl ? err.response.data.errors.bannerUrl : "",
                category_id: err.response.data.errors.category_id ? err.response.data.errors.category_id : "",
                content: err.response.data.errors.content ? err.response.data.errors.content : "",
            })
    }
    
    function handlePublic () {
       setErrors(false)
       setLoadingActionPublish(true)
       const data = new FormData()
       for (let key in dataBanner) {
        if (banner_id && key == 'bannerUrl' && ( typeof (dataBanner[key]) === 'string' || (dataBanner[key]) === null )) {
            data.append(key, "");
        }else {
            data.append(key, dataBanner[key]);
        }
    } 
         data.append('is_active' , 1)
         BannerService.createBanner(data ,
             res =>{
                setLoadingActionPublish(false)
                 makeShortMessage(getTranslation('Createpostsuccessfully'), "success")
                 setTimeout(() => {
                     history.push('/posts')
                 }, 1000)
             },
             err => {
                setLoadingActionPublish(false)
                _handleError(err)
             }
 
         ) 
    }

    function handleUnPublicEdit() {
       const data = new FormData()
       for (let key in dataBanner) {
        if (banner_id && key == 'bannerUrl' && ( typeof (dataBanner[key]) === 'string' || (dataBanner[key]) === null )) {
            data.append(key, "");
        }else {
            data.append(key, dataBanner[key]);
        }
    } 

        data.append('is_active' , 0)
        BannerService.updateBanner(
            banner_id, data,
            res => {
                makeShortMessage(getTranslation('Unpublishsuccessfully'), "success")
                setTimeout(() => {
                    history.push('/posts')
                }, 1000)
            },
            err => {
                _handleError(err)
            }
        )
    }

    function handlePublicEdit () {
        const data = new FormData()
        for (let key in dataBanner) {
            if (banner_id && key == 'bannerUrl' && (typeof (dataBanner[key]) === 'string' || (dataBanner[key]) === null )) {
                data.append(key, "");
            }else {
                data.append(key, dataBanner[key]);
            }
        } 
        data.append('is_active' , 1)
        BannerService.updateBanner(
            banner_id, data,
            res => {
                makeShortMessage(getTranslation('Publishsuccessfully'), "success")
                setTimeout(() => {
                    history.push('/posts')
                }, 1000)
            },
            err => {
                _handleError(err)
            }
        )
    }

    function redirectBack() {
        history.push('/posts')
    }

    function onChangePath (e) {
        if (e.target.name === 'category_id') {
        var category = categories.find((item) => item.id == e.target.value)
            if (category.slug =='phan-hoi-khach-hang') {
                setSlugCategory(true)
            }else {
                setSlugCategory(false)
            }
        setDataBanner ({...dataBanner , [e.target.name] : e.target.value})
    } else {
        setDataBanner ({...dataBanner , [e.target.name] : e.target.value})
    }
    }
 

    function setBannerUrl(bannerUrl) {
        setDataBanner({
            ...dataBanner,
            bannerUrl: bannerUrl
        });
    }


    return (
        <>
            <ViewContentPage 
                links={links}
                isCreate={banner_id ? false : true}
                redirectBack={redirectBack}
                data={dataBanner}
                isPost={isPost}
                category={categories}
                titleUrl={getTranslation('post')}
                titlePage={isCreate ? titlePageCreated : titlePageEdit}
                onApply={handleSave}
                actions={isCreate ? actionsCreate : ( dataBanner && dataBanner.is_active == 0) ? actionsPublic  :  actionsUnpublic }
                titleImage={getTranslation('Banner')}
                size={'1920x556'}
                errors={errors}
                slugCategory={slugCategory}
                onClick={() => history.push("/posts")}
                titleContent={'Thông tin bài viết'} 
                lists_input={slugCategory ? listInputText : listInput} 
                nameImage="bannerUrl"
                loadingSkeleton={loadingSkeleton}
                nameContent = "content"
                content={content}
                setContent={setContent}
            >
                <div className={classes.img}>
                    <PostFeatureImage
                        id='update-avatar'
                        value={dataBanner.bannerUrl}
                        setBannerUrl={setBannerUrl}
                        classes={classes}
                    />  
                </div>
                {isShowUploadFile && (
                    <Dialog
                        maxWidth="xs"
                        open={isShowUploadFile}
                        onClose={handleCloseUploadFile}
                        actionLabel={dataBanner && dataBanner.is_active == 1 ? getTranslation('NotPublic') : getTranslation("Public")}
                        action={dataBanner && dataBanner.is_active == 1 ? handleUnPublicEdit : handlePublicEdit }
                        noIcon={false}
                        // buttonColorGreen={true}
                        loadingButton={loadingAction}
                        title={dataBanner && dataBanner.is_active == 1 ?  getTranslation("unpublic") : getTranslation("Public")}
                        iconButton={dataBanner && dataBanner.is_active == 1 ? <IconImage srcIcon={Unpublic_white} /> : <IconImage srcIcon={Public_white} />}
                        getTranslation={getTranslation}
                        rootDialogContentStyle={classes.styleDialogContent}
                    >
                        {
                            dataBanner && dataBanner.is_active == 1 ? getTranslation('Areyousuretostop') : getTranslation('Areyousuretorelease')
                        }
                    </Dialog>
                )}
            </ViewContentPage>
        </>
    );
}

export default PostForm