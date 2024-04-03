import React, { useState , useEffect} from 'react'
import { useAuth } from 'ipretty/context/AppProvider'
import { makeStyles , Box , Paper , Grid , Typography ,TextField } from '@material-ui/core';
import { useNotiStackContext } from 'ipretty/context/Notistack';
import IconImage from "ipretty/components/IconImage"
import Save from 'public/icons_ipretty/Save.png'
import { useHistory } from "react-router-dom";
import queryString from "query-string"
import ViewContentPage from 'ipretty/components/ViewContentPage/ViewContentPage'
import BannerService from 'ipretty/services/BannerService'
import Public_white from 'public/icon_svg/Share_white.svg'
import Unpublic_white from 'public/icon_svg/UnShare_white.svg'
import Dialog from 'ipretty/components/Dialog/Dialog'
import Unpublic from 'public/icon_svg/Unshare.svg'
import Public from 'public/icon_svg/share_green.svg'

const useStyles = makeStyles(theme => ({
    bannerDetail: {
        '& .bannerDetail__banner': {
            backgroundRepeat: 'round',
            display: 'flex',
            justifyContent : 'center',
            alignItems: 'center',

            '& .bannerDetail__banner_url' : {
                position : 'absolute',
                left : '135px',
                top : '70px',
                '& .bannerDetail__banner__urlRedirect': {
                    padding : '10px 0px',
                    '& .bannerDetail__banner__urlRedirect__item': {
                        color: '#395B65', 
                        fontSize: '14px', 
                        lineHeight: '20px',
                        fontWeight: 'normal',
                        letterSpacing: '-0.011em'
                    }
                    },
                    '& .bannerDetail__banner__buttonGoback': {
                        padding: '10px 22px',
                        display: 'flex', 
                        fontWeight: 600,
                        fontFamily: 'San Francisco Text',
                        color: '#395B65',
                    },
            },
            
         
        }
    },
    view : {
        [theme.breakpoints.down("lg")]: {
            padding: "0 9.792vw 100px",
        },
        [theme.breakpoints.up("xl")]: {
            padding: "0 9.792vw 100px",
        },
        '& .paperStyle' : {
            padding: '32px'
        },
        '& .title_content' : {
            color: '#395B65',
            fontWeight : 'bold',
            fontSize : '24px',
            lineHeight : '32px',
        },
        "& .contentInfo__left" :{
            paddingRight : 48
        },
        "& .contentInfo__right" :{
            paddingLeft :16,
            paddingRight :32
        },
    },
    label: {
        paddingTop : 32,
        fontFamily: 'San Francisco Text',
        fontSize: 18,
        fontWeight: '600',
        color: '#147B65',
        paddingBottom : 8
    },
    spanStyle : {
        color: '#c32929',
        paddingLeft : 5,
    },
    userInput : {
        "& input" :{
            "&::placeholder" :{
              fontStyle : 'normal'
            }
        },
        "& .MuiInput-root" : {
            background : '#F3F3F3',
            height : '36px',
        },
        '& .errorInput' : {
            color: 'red',
           "& .MuiInputBase-formControl" :{
                border: '1.5px solid red',
           }
         },
    },
}))

function PostCategoriesForm (props) {
    const {  links, isCreate, category_id  , location } = props
    const { getTranslation, logout } = useAuth()
    const classes = useStyles()
    const [isShowUploadFile, setIsShowUploadFile] = useState(false)
    let history = useHistory()
    const { makeShortMessage } = useNotiStackContext();
    const [loadingButtonAction, setLoadingButtonAction] = useState(false)
    const [loadingSkeleton, setLoadingSkeleton] = useState(false);
    const [loadingActionDialog, setLoadingActionDialog] = useState(false)
    const [loadingActionPublish , setLoadingActionPublish] = useState(false)

    const [dataCategories, setDataCategories] = useState({
        category_name : '', 
        description : '',
        isPublished : 0,
    })

    const actionsCreate = [
        { id: 1, action: handleCancel, icon: '', noIcon: true, label: getTranslation('Cancel'), buttonClass: 'button button__cancel button--white' },
        { id: 2, action: handleSave, icon: <IconImage srcIcon={Save} />, noIcon: false, label: getTranslation('Save'), buttonClass: 'button button__save button--green', loading: loadingButtonAction }, 
        { id: 3, action: handlePublic, icon: <IconImage srcIcon={Public_white} />  , label: getTranslation('Public')  ,noIcon: false, buttonClass: 'button button__public button--green', loading: loadingActionPublish },      
   
    ]

    const actionsPublic = [
        { id: 1, action: handleCancel, icon: '', noIcon: true, label: getTranslation('Cancel'), buttonClass: 'button button__cancel button--white' },
        { id: 2, action: redirectDialog, icon: <IconImage srcIcon={Public} />  , label: getTranslation('Public')  ,noIcon: false, buttonClass: 'button button__public button--white', loading: loadingActionDialog }, 
        { id: 3, action: handleSave, icon: <IconImage srcIcon={Save} />  , label: getTranslation('Save')  ,noIcon: false, buttonClass: 'button button__save button--green', loading: loadingButtonAction },     
    ]
    const actionsUnpublic = [
        { id: 1, action: handleCancel, icon: '', noIcon: true, label: getTranslation('Cancel'), buttonClass: 'button button__cancel button--white' },
        { id: 2, action: redirectDialog, icon: <IconImage srcIcon={Unpublic} />  , label: getTranslation('NotPublic')  ,noIcon: false, buttonClass: 'button button__notPublic button--white', loading: loadingActionDialog , disabled : dataCategories.category_slug === 'phan-hoi-khach-hang' ? true :  false},
        { id: 3, action: handleSave, icon: <IconImage srcIcon={Save} />  , label: getTranslation('Save')  ,noIcon: false, buttonClass: 'button button__save button--green', loading: loadingButtonAction },     
    ]

    const listInput = [ 
        { id: 0, label: getTranslation('CategoryName'), onChange: onChangePath, placeholder: getTranslation('PlaceholderCategoryName'), value: dataCategories.category_name, isTextField: true ,name: "category_name" , disabled : category_id && dataCategories.category_slug === 'phan-hoi-khach-hang' ? true :  false},
        { id: 1, label: getTranslation('Description'), onChange: onChangePath, placeholder: getTranslation('Fillinthedescription'), value: dataCategories.description , isTextField: true ,isPostCategory : true ,name: "description" },
    ]

    const [errors, setErrors] = useState({
        category_name : '',
    })

    const titlePageCreated = getTranslation('CreatePostcategory')
    const titlePageEdit = getTranslation('Editpostcategory')

    useEffect(() => {
        let mounted = true;
        const runAsync = async () => {
            try {
                if (mounted) {
                    if (category_id) {
                        getDetailPostCategories(category_id)
                    }
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

    function onChangePath (e) {
        setDataCategories ({...dataCategories , [e.target.name] : e.target.value})
    }

    function _handleError(err) {
        setLoadingButtonAction(false);
            setErrors({
                ...errors,
                category_name: err.response.data.errors.category_name ? err.response.data.errors.category_name : "",
            })
    }

    function redirectDialog () {
        setIsShowUploadFile(true);
    }
   
    function handleCloseUploadFile () {
        setIsShowUploadFile(false)
    }

    const getDetailPostCategories = (category_id) => {
        setLoadingSkeleton(true);
        BannerService.detailPostCategories(
            category_id,
            res => {
                setDataCategories(res.data.data)
                setLoadingSkeleton(false);
            },
            err => {
                console.log(err)
                setLoadingSkeleton(false);
            }
        )
    }

    function handleCancel() {
        history.push('/post-categories')
    }

    function redirectBack () {
        history.push('/post-categories')
    }

    function handlePublic () {
        setErrors(false)
        setLoadingActionPublish(true)
        const data = new FormData()
        for (let key in dataCategories) {
            data.append(key, dataCategories[key]);   
         }
        data.append('isPublished' , 1)
          BannerService.createPostCategories(data ,
              res =>{
                 setLoadingActionPublish(false)
                 makeShortMessage(getTranslation('Createpostcategorysuccessfully'), "success")
                 setTimeout(() => {
                     history.push('/post-categories')
                 }, 1000)
              },
              err => {
                 setLoadingActionPublish(false)
                 _handleError(err)
              }
  
          ) 
     }

    function handleSave () {
        setErrors(false)
        setLoadingButtonAction(true)
        const data = new FormData()
        for (let key in dataCategories) {
            data.append(key, dataCategories[key]);
         }
        if (!category_id) {
            data.append('isPublished' , 0)
            BannerService.createPostCategories(data, 
                res => {
                    setLoadingButtonAction(false)
                    makeShortMessage(getTranslation('Createpostcategorysuccessfully'), "success")
                    setTimeout(() => {
                        history.push('/post-categories')
                    }, 1000)
                },
                err => {
                    setLoadingButtonAction(false)
                    _handleError(err)
                }

            )
        }else {
            BannerService.updatePostCategories(
                category_id,
                data,
                res => {
                    setLoadingButtonAction(false)
                    makeShortMessage(getTranslation('Editpostcategorysuccessfully'), "success")
                    setTimeout(() => {
                        history.push('/post-categories')
                    }, 1000)
                },
                err => {
                    _handleError(err)
                }

            )
        }
    }

    function handleUnPublicEdit() {
        const data = new FormData()
         for (let key in dataCategories) {
            data.append(key, dataCategories[key]);   
         }
 
         data.append('isPublished' , 0)
         BannerService.updatePostCategories(
            category_id, data,
             res => {
                 makeShortMessage(getTranslation('Unpublishsuccessfully'), "success")
                 setTimeout(() => {
                     history.push('/post-categories')
                 }, 1000)
             },
             err => {
                 _handleError(err)
             }
         )
     }
 
     function handlePublicEdit () {
         const data = new FormData()
         for (let key in dataCategories) {
            data.append(key, dataCategories[key]);
         }
         data.append('isPublished' , 1)
         BannerService.updatePostCategories(
            category_id, data,
             res => {
                 makeShortMessage(getTranslation('Publishsuccessfully'), "success")
                 setTimeout(() => {
                     history.push('/post-categories')
                 }, 1000)
             },
             err => {
                 _handleError(err)
             }
         )
     }
    return (
        <>
            <ViewContentPage 
                links={links}
                isCreate={category_id ? false : true}
                areTowRows={true}
                redirectBack={redirectBack}
                data={dataCategories}
                titleUrl={getTranslation('category')}
                titlePage={isCreate ? titlePageCreated : titlePageEdit}
                onApply={handleSave}
                actions={isCreate ? actionsCreate : ( dataCategories && dataCategories.isPublished == 0) ? actionsPublic  :  actionsUnpublic }
                errors={errors}
                titleContent={'Thông tin danh mục'} 
                onClick={() => history.push("/post-categories")}
                lists_input={listInput} 
                loadingSkeleton={loadingSkeleton}

            >
            </ViewContentPage>
            {isShowUploadFile && (
                    <Dialog
                        maxWidth="xs"
                        open={isShowUploadFile}
                        onClose={handleCloseUploadFile}
                        actionLabel={dataCategories && dataCategories.isPublished == 1 ? getTranslation('NotPublic') : getTranslation("Public")}
                        action={dataCategories && dataCategories.isPublished == 1 ? handleUnPublicEdit : handlePublicEdit }
                        noIcon={false}
                        // buttonColorGreen={true}
                        loadingButton={loadingActionDialog}
                        title={dataCategories && dataCategories.isPublished == 1 ?  getTranslation("unpublic") : getTranslation("Public")}
                        iconButton={dataCategories && dataCategories.isPublished == 1 ? <IconImage srcIcon={Unpublic_white} /> : <IconImage srcIcon={Public_white} />}
                        getTranslation={getTranslation}
                        rootDialogContentStyle={classes.styleDialogContent}
                    >
                        {
                            dataCategories && dataCategories.isPublished == 1 ? getTranslation('Areyousuretostop') : getTranslation('Areyousuretorelease')
                        }
                    </Dialog>
                )}
        </>
    )
}

export default PostCategoriesForm;