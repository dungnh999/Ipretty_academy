import { makeStyles, Typography } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { useAuth } from 'ipretty/context/AppProvider'
import ViewContentPage from 'ipretty/components/ViewContentPage/ViewContentPage'
import IconImage from "ipretty/components/IconImage"
import Save from 'public/icons_ipretty/Save.svg'
import Public_white from 'public/icon_svg/Share_white.svg'
import TrademarkFeatureImage from './TrademarkFeatureImage'
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

function TrademarkForm(props) {
    const { banner_id, history, links , isCreate} = props
    const { getTranslation, user } = useAuth()
    const classes = useStyles()
    const { makeShortMessage } = useNotiStackContext();
    const [isShowUploadFile, setIsShowUploadFile] = useState(false)
    const [loadingActionSave, setLoadingActionSave] = useState(false)
    const [loadingActionPublish , setLoadingActionPublish] = useState(false)
    const [loadingAction , setLoadingAction] = useState(false)
    const [loadingSkeleton, setLoadingSkeleton] = useState(false);

    const actionsCreate = [
        { id: 1, action: handleCancel, icon: '', noIcon: true, label: getTranslation('Cancel'), buttonClass: 'button button__cancel button--white' },
        { id: 2, action: handleSave, icon: <IconImage srcIcon={Save} />  , label: getTranslation('Save')  ,noIcon: false, buttonClass: 'button button__save button--green', loading: loadingActionSave },
        { id: 3, action: handlePublic, icon: <IconImage srcIcon={Public_white} />  , label: getTranslation('Public')  ,noIcon: false, buttonClass: 'button button__public button--green', loading: loadingActionPublish },      
    ]
    const actionsPublic = [
        { id: 1, action: handleCancel, icon: '', noIcon: true, label: getTranslation('Cancel'), buttonClass: 'button button__cancel button--white' },
        { id: 2, action: redirectDialog, icon: <IconImage srcIcon={Public} />  , label: getTranslation('Public')  ,noIcon: false, buttonClass: 'button button__public button--white', loading: loadingAction }, 
        { id: 3, action: handleSave, icon: <IconImage srcIcon={Save} />  , label: getTranslation('Save')  ,noIcon: false, buttonClass: 'button button__save button--green', loading: loadingActionSave },     
    ]
    const actionsUnpublic = [
        { id: 1, action: handleCancel, icon: '', noIcon: true, label: getTranslation('Cancel'), buttonClass: 'button button__cancel button--white' },
        { id: 2, action: redirectDialog, icon: <IconImage srcIcon={Unpublic} />  , label: getTranslation('NotPublic')  ,noIcon: false, buttonClass: 'button button__notPublic button--white', loading: loadingAction },
        { id: 3, action: handleSave, icon: <IconImage srcIcon={Save} />  , label: getTranslation('Save')  ,noIcon: false, buttonClass: 'button button__save button--green', loading: loadingActionSave },     
    ]

    const [ dataBanner , setDataBanner ] = useState({
        title : '',
        bannerUrl : '',
        description : '',
        isTrademark : 1,
        is_active : 0,
    })
    const [errors, setErrors] = useState({
        title: '',
        description: '',
        bannerUrl: '',
    })

    const titlePageCreated = getTranslation('Createtrademark')
    const titlePageEdit = getTranslation('Edittrademark')
    const listInput = [ 
        { id: 0, label: getTranslation('Namebrand'), onChange: onChangePath, placeholder: getTranslation('Entertrademarkname'), value: dataBanner.title, isTextField: true, name: "title" },
        { id: 1, label: getTranslation('Description'), onChange: onChangePath, placeholder: getTranslation('Enteradescriptionofthiscategory'), value: dataBanner.description, isTextField: false, name: "description" },
    ]
    
    function redirectDialog () {
        setIsShowUploadFile(true);
    }

    function handleCloseUploadFile () {
        setIsShowUploadFile(false)
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
        setLoadingSkeleton(true);
        BannerService.detail(
            banner_id,
            res => {
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
        history.push('/trademarks')
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
            BannerService.createBanner(data, 
                res => {
                    setLoadingActionSave(false)
                    makeShortMessage(getTranslation('Createtrademarksuccessfully'), "success")
                    setTimeout(() => {
                        history.push('/trademarks')
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
                    makeShortMessage(getTranslation('Edittrademarksuccessfully'), "success")
                    setTimeout(() => {
                        history.push('/trademarks')
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
         BannerService.createBanner(data ,
             res =>{
                setLoadingActionPublish(false)
                 makeShortMessage(getTranslation('Createtrademarksuccessfully'), "success")
                 setTimeout(() => {
                     history.push('/trademarks')
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
            if (banner_id && key == 'bannerUrl' && typeof (dataBanner[key]) === 'string') {
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
                    history.push('/trademarks')
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
            if (banner_id && key == 'bannerUrl' && typeof (dataBanner[key]) === 'string') {
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
                    history.push('/trademarks')
                }, 1000)
            },
            err => {
                _handleError(err)
            }
        )
    }

    function redirectBack() {
        history.push('/trademarks')
    }
 
    function onChangePath (e) {
        setDataBanner ({...dataBanner , [e.target.name] : e.target.value})
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
                titleUrl={getTranslation('trademark')}
                titlePage={isCreate ? titlePageCreated : titlePageEdit}
                onApply={handleSave}
                actions={isCreate ? actionsCreate : ( dataBanner && dataBanner.is_active == 0) ? actionsPublic  :  actionsUnpublic }
                titleImage={getTranslation('Trademark')}
                size={'1920x556'}
                errors={errors}
                onClick={() => history.push("/trademarks")}
                titleContent={getTranslation('Trademarkinformation')} 
                lists_input={listInput} 
                nameImage="bannerUrl"
                loadingSkeleton={loadingSkeleton}
            >
                <div className={classes.img}>
                    <TrademarkFeatureImage
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

export default TrademarkForm