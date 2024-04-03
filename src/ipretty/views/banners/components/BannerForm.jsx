import { makeStyles, Typography } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { useAuth } from 'ipretty/context/AppProvider'
import ViewContentPage from 'ipretty/components/ViewContentPage/ViewContentPage'
import IconImage from "ipretty/components/IconImage"
import Save from 'public/icons_ipretty/Save.svg'
import Public_white from 'public/icon_svg/Share_white.svg'
import BannerFeatureImage from './BannerFeatureImage'
import BannerService from 'ipretty/services/BannerService'
import { useNotiStackContext } from 'ipretty/context/Notistack';
import Public from 'public/icon_svg/share_green.svg'
import Unpublic from 'public/icon_svg/Unshare.svg'
import Dialog from 'ipretty/components/Dialog/Dialog'
import Unpublic_white from 'public/icon_svg/UnShare_white.svg'

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

function BannerForm(props) {
    const { banner_id, history, links , isCreate} = props
    const { getTranslation, user } = useAuth()
    const classes = useStyles()
    const { makeShortMessage } = useNotiStackContext();
    const [loadingAction, setLoadingAction] = useState(false)
    const [loadingActionSave, setLoadingActionSave] = useState(false)
    const [loadingActionPublish , setLoadingActionPublish] = useState(false)
    const [loadingSkeleton, setLoadingSkeleton] = useState(false);
    const [isShowUploadFile, setIsShowUploadFile] = useState(false)
    const [isShowColorPickerTitle, setIsShowColorPickerTitle] = useState(false)
    const [isShowColorPickerContent, setIsShowColorPickerContent] = useState(false)
    const [isShowColorPickerIntroduction, setIsShowColorPickerIntroduction] = useState(false)
    const [isShowColorPickerButton, setIsShowColorPickerButton] = useState(false)
    const [isShowColorPickerBgButton, setIsShowColorPickerBgButton] = useState(false)
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
        content : '',
        is_active : 0,
        is_banner : 1,
        introduction : '',
        sub_introduction : '' ,
        color_introduction : 'back' ,
        color_title : 'back',
        color_content : 'back',
        color_button : 'back',
        bg_color_button : 'back'
    })
    const [errors, setErrors] = useState({
        title: '',
        content: '',
        bannerUrl: '',
        introduction : '',
        sub_introduction : '' ,
    })

    const titlePageCreated = getTranslation('CreateBanner')
    const titlePageEdit = getTranslation('EditBanner')

    const listInput = [ 
        { id: 0, label: getTranslation('nameBanner'), onChange: onChangePath, placeholder: getTranslation('Enterbannername'), value: dataBanner.title, isTextField: false, name: "title" },
        {id: 1, isColor: true , labelColor :getTranslation('colornamebanner') , action : handleClickColorTitle , isShowColorPicker : isShowColorPickerTitle , actionClose : handleCloseTitle , color : dataBanner.color_title , valueColor : dataBanner.color_title , handleChangeColor : handleChangeColor , nameColor : 'color_title'},
        { id: 2, label: getTranslation('introductionBanner'), onChange: onChangePath, placeholder: getTranslation('nhập giới thiệu'), value: dataBanner.introduction, isTextField: false, name: "introduction" , },
        {id : 3 , isColor: true  , labelColor : getTranslation('Colorintroduction') , action : handleClickColorIntroduction , isShowColorPicker : isShowColorPickerIntroduction , actionClose : handleCloseIntroduction , color : dataBanner.color_introduction , valueColor : dataBanner.color_introduction , handleChangeColor : handleChangeColor , nameColor : 'color_introduction'},
        { id: 4, label: getTranslation('Subintroduction'), onChange: onChangePath, placeholder: getTranslation('Enteradescriptionofthiscategory'), value: dataBanner.sub_introduction, isTextField: false, name: "sub_introduction" },
        { id: 5, labelColor: getTranslation('backgroundcolorButton'), isColor: true , action : handleClickColorBgButton , isShowColorPicker : isShowColorPickerBgButton , actionClose : handleCloseBgButton , color : dataBanner.bg_color_button , valueColor : dataBanner.bg_color_button , handleChangeColor : handleChangeColor , nameColor : 'bg_color_button' },
        { id: 6, labelColor: getTranslation('ColorfontButton'),isColor: true , action : handleClickColorButton , isShowColorPicker : isShowColorPickerButton , actionClose : handleCloseButton , color : dataBanner.color_button , valueColor : dataBanner.color_button , handleChangeColor : handleChangeColor , nameColor : 'color_button' },
        { id: 7, label: getTranslation('Description'), onChange: onChangePath, placeholder: getTranslation('Enteradescriptionofthiscategory'), value: dataBanner.content, isTextField: false, name: "content"},
        {id: 8 , isColor: true  , labelColor :getTranslation('ColorContent') , action : handleClickColorContent , isShowColorPicker : isShowColorPickerContent , actionClose : handleCloseContent , color : dataBanner.color_content , valueColor : dataBanner.color_content , handleChangeColor : handleChangeColor , nameColor : 'color_content'}
    ]

    function redirectDialog () {
        setIsShowUploadFile(true);
    }

    function handleCloseUploadFile () {
        setIsShowUploadFile(false)
    }

    function handleClickColorTitle () {
        setIsShowColorPickerTitle(true)
    }
    function handleCloseTitle () {
        setIsShowColorPickerTitle(false)
    }

    function handleClickColorContent () {
        setIsShowColorPickerContent(true)
    }
    function handleCloseContent () {
        setIsShowColorPickerContent(false)
    }

    function handleClickColorIntroduction () {
        setIsShowColorPickerIntroduction(true)
    }
    function handleCloseIntroduction () {
        setIsShowColorPickerIntroduction(false)
    }

    function handleClickColorButton () {
        setIsShowColorPickerButton(true)
    }

    function handleCloseButton () {
        setIsShowColorPickerButton(false)
    }
    function handleClickColorBgButton() {
        setIsShowColorPickerBgButton(true)
    }

    function handleCloseBgButton () {
        setIsShowColorPickerBgButton(false)
    }

    useEffect(() => {
        let mounted = true;
        const runAsync = async () => {
            try {
                if (mounted) {
                    if (banner_id) {
                        getDetailBanner(banner_id)
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

    const getDetailBanner = (banner_id) => {
        setLoadingSkeleton(true)
        BannerService.detail(
            banner_id,
            res => {
                setDataBanner(res.data.data)
                // setNameBanner(res.data.data.title)
                setLoadingSkeleton(false);
            },
            err => {
                setLoadingSkeleton(false);
            }
        )
    }

    function handleCancel() {
        history.push('/banners')
    }   

    function handleSave () {
       setErrors(false)
       setLoadingActionSave(true)
       const data = new FormData()
        for (let key in dataBanner) {
            if (banner_id && key == 'bannerUrl' && typeof (dataBanner[key]) === 'string') {
                data.append(key, "");
            }else {
                data.append(key, dataBanner[key]);
            }
        }

        if (!banner_id) {
            BannerService.createBannerNew(data,
                res => {
                    setLoadingActionSave(false)
                    makeShortMessage(getTranslation('Createbannersuccessfully'), "success")
                    setTimeout(() => {
                        history.push('/banners')
                    }, 1000)
                },
                err => {
                    setLoadingActionSave(false)
                    _handleError(err)
                }
            )
        }else {
            BannerService.updateBannerNew(
                banner_id,
                data,
                res => {
                    setLoadingActionSave(false)
                    makeShortMessage(getTranslation('Editbannersuccessfully'), "success")
                    setTimeout(() => {
                        history.push('/banners')
                    }, 1000)
                },
                err => {
                    setLoadingActionSave(false)
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
                context: err.response.data.errors.context ? err.response.data.errors.context : "",
                bannerUrl: err.response.data.errors.bannerUrl ? err.response.data.errors.bannerUrl : "",
                introduction: err.response.data.errors.introduction ? err.response.data.errors.introduction : "",
                sub_introduction: err.response.data.errors.sub_introduction ? err.response.data.errors.sub_introduction : "",
            })
    }
    function handlePublic () {
        setErrors(false)
        setLoadingActionPublish(true)
        const data = new FormData()
         for (let key in dataBanner) {
            if (banner_id && key == 'bannerUrl' && typeof (dataBanner[key]) === 'string') {
                data.append(key, "");
            }else {
                data.append(key, dataBanner[key]);
            }
         }
         data.append('is_active' , 1)
         BannerService.createBannerNew(data,
            res => {
                setLoadingActionPublish(false)
                makeShortMessage(getTranslation('Createbannersuccessfully'), "success")
                setTimeout(() => {
                    history.push('/banners')
                }, 1000)
            },
            err => {
                setLoadingActionPublish(false)
                _handleError(err)
            }

        )
    }

    function handleUnPublicEdit() {
        setLoadingActionPublish(true)
        const data = new FormData()
         for (let key in dataBanner) {
            if (banner_id && key == 'bannerUrl' && typeof (dataBanner[key]) === 'string') {
                data.append(key, "");
            }else {
                data.append(key, dataBanner[key]);
            }
         }
        data.append('is_active' , 0)
        BannerService.updateBannerNew(
            banner_id, data,
            res => {
                setLoadingActionPublish(false)
                makeShortMessage(getTranslation('Unpublishsuccessfully'), "success")
                setTimeout(() => {
                    history.push('/banners')
                }, 1000)
            },
            err => {
                _handleError(err)
            }
        )
    }

    function handlePublicEdit () {
        setLoadingActionPublish(true)
        const data = new FormData()
         for (let key in dataBanner) {
            if (banner_id && key == 'bannerUrl' && typeof (dataBanner[key]) === 'string') {
                data.append(key, "");
            }else {
                data.append(key, dataBanner[key]);
            }
         }
        data.append('is_active' , 1)
        BannerService.updateBannerNew(
            banner_id, data,
            res => {
                setLoadingActionPublish(false)
                makeShortMessage(getTranslation('Publishsuccessfully'), "success")
                setTimeout(() => {
                    history.push('/banners')
                }, 1000)
            },
            err => {
                _handleError(err)
            }
        )
    }
    // console.log(dataBanner)
    function redirectBack() {
        history.push('/banners')
    }
 
    function onChangePath (e) {
        setDataBanner ({...dataBanner , [e.target.name] : e.target.value})
    }
 
    function handleChangeColor (color , nameField) {
        // console.log(color)
        setDataBanner({
            ...dataBanner , 
                [nameField] : color.hex
        })
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
                titleUrl={'banner'}
                data={dataBanner}
                titlePage={isCreate ? titlePageCreated : titlePageEdit}
                onApply={handleSave}
                actions={isCreate ? actionsCreate : ( dataBanner && dataBanner.is_active == 0) ? actionsPublic  :  actionsUnpublic }
                titleImage={'Banner'}
                size={'1920x556'}
                errors={errors}
                onClick={() => history.push("/banners")}
                titleContent={getTranslation('InformationBanner')} 
                lists_input={listInput}
                nameImage="bannerUrl"
                loadingSkeleton={loadingSkeleton}
            >
                <div className={classes.img}>
                    <BannerFeatureImage
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
                        action={dataBanner && dataBanner.is_active == 1 ? handleUnPublicEdit : handlePublicEdit}
                        noIcon={false}
                        // buttonColorGreen={true}
                        loadingButton={loadingActionPublish}
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

export default BannerForm