import React, { useState, useEffect, useMemo } from 'react'
import { makeStyles } from '@material-ui/core'
import { useAuth } from 'ipretty/context/AppProvider'
import IconImage from "ipretty/components/IconImage"
import Save from '../../../../public/icons_ipretty/Save.svg'
import Public_white from '../../../../public/icon_svg/Share_white.svg';
import Share from '../../../../public/icons_ipretty/Export.png';
import { useNotiStackContext } from 'ipretty/context/Notistack';
import Dialog from 'ipretty/components/Dialog/Dialog';
import ViewPageNotification from './ViewPageNotification';
import PushNotificationService from 'ipretty/services/PushNotificationService';

const useStyles = makeStyles(theme => ({
    sizeDialog: {
        width: '370px'
    }
}))

function NotificationForm(props) {
    const { isCreate, history, links, notification_id } = props
    const { getTranslation } = useAuth()
    const classes = useStyles()
    const isNotification = true;
    const [loadingActionSave, setLoadingActionSave] = useState(false);
    const [loadingActionShare, setLoadingActionShare] = useState(false);
    const { makeShortMessage } = useNotiStackContext();
    const [loading, setLoading] = useState(false);
    const [loadingSkeleton, setLoadingSkeleton] = useState(false);
    const [isShowPopupCopy, setIsShowPopupCopy] = useState(false);
    const [content, setContent] = useState('');
    const [isDisable, setIsDisable] = useState(true);
    const [dataNotification, setDataNotification] = useState({
        notification_title: '',
        notification_cat: '',
        group_receivers: '',
        notification_message: '',
        isPublished: 0
    });
    const [errors, setErrors] = useState({
        notification_title: '',
        notification_cat: '',
        group_receivers: '',
        notification_message: '',
    })

    const actions = [
        { id: 1, action: handleCancel, icon: '', noIcon: true, label: getTranslation('Cancel'), buttonClass: 'button button__cancel button--white' },
        { id: 2, action: !notification_id ? handlePublicCreate : handlePublicEdit, icon: <IconImage srcIcon={Share} />, label: getTranslation('Public'), noIcon: false, buttonClass: 'button button__cancel button--white', loading: loadingActionShare },
        { id: 3, action: handleSave, icon: <IconImage srcIcon={Save} />, label: getTranslation('Save'), noIcon: false, buttonClass: 'button button__save button--green', loading: loadingActionSave },
    ]

    const [typeNotification, setTypeNotification] = useState([
        { id: 'choose', name: `${getTranslation('choose')}--`, },
        { id: 'AD', name: `${getTranslation('advertisement')}`, },
        { id: 'DOC', name: `${getTranslation('documentary')}`, },
        { id: 'POL', name: `${getTranslation('policyChangeTerms')}`, },
        { id: 'HOL', name: `${getTranslation('holidays')}`, },
        { id: 'FUNC', name: `${getTranslation('addNewFeatures')}`, }
    ]);

    const [valueSelect, setValueSelect] = useState([]);
    const [receive, setReceive] = useState([
        { id: 0, name: 'Admin' },
        { id: 1, name: 'teacher' },
        { id: 2, name: 'employee' },
        { id: 3, name: 'user' }
    ])

    function onChangePath(e, name) {
            setDataNotification({
                ...dataNotification,
                [name]: e.target.value
            })        
    }
    function handleFilter(nameField, value) {
        switch (value) {
            case `${getTranslation('advertisement')}`:
                setValueSelect(['user', 'employee']);
                value = 'AD';
                setDataNotification({
                    ...dataNotification,
                    [nameField]: value
                })
                break;
            case `${getTranslation('documentary')}`:
                setValueSelect(['user', 'employee', 'teacher']);
                value = 'DOC';
                setDataNotification({
                    ...dataNotification,
                    [nameField]: value
                })
                break;
            case `${getTranslation('policyChangeTerms')}`:
                setValueSelect(['user', 'employee', 'teacher']);
                value = 'POL';
                setDataNotification({
                    ...dataNotification,
                    [nameField]: value
                })
                break;
            case `${getTranslation('holidays')}`:
                setValueSelect(['user', 'employee', 'teacher']);
                value = 'HOL';
                setDataNotification({
                    ...dataNotification,
                    [nameField]: value
                })
                break;
            case `${getTranslation('addNewFeatures')}`:
                setValueSelect(['user', 'employee', 'teacher']);
                value = 'FUNC';
                setDataNotification({
                    ...dataNotification,
                    [nameField]: value
                })
                break;
            case `${getTranslation('choose')}--`:
                setValueSelect([]);
                value = '';
                setDataNotification({
                    ...dataNotification,
                    [nameField]: value
                })
                break;
            default:
                setValueSelect([]);
                break;
        } 
        setIsDisable(false);
    }
    function handleReceive(nameField, value) {
        setDataNotification({
            ...dataNotification,
            [nameField]: value
        })
    }

    function handleValue(value) {
        if (typeof value !== 'string') {
            return '';
        } else {
            let array = value.split(',');
            let valueReceive = [];
            if (array && array.length > 0) {
                array.map((item) => {
                    valueReceive.push(getTranslation(item));
                })
            }
            return valueReceive.toString()
        }
       
    }

    const listInput = [
        { id: 0, label: getTranslation('title'), onChange: onChangePath, placeholder: getTranslation('title'), value: dataNotification.notification_title, isTextField: true, name: "notification_title" },
        { id: 1, list: typeNotification, label: getTranslation('notificationType'), handleData: handleFilter, fieldFilter: 'notification_cat', placeholder: `${getTranslation('choose')}--`, value: dataNotification.notification_cat, isSelect: true },
        { id: 2, list: receive, label: getTranslation('receiver'), handleData: handleReceive, fieldFilter: 'group_receivers', placeholder: `${getTranslation('choose')}--`, value: handleValue(dataNotification.group_receivers), valueSelect: valueSelect, isNotification: isNotification, isTextField: true, isSelect: true, isMultipleSelect: true },
        { id: 3, label: getTranslation('notificationContent'), onChange: onChangePath, placeholder: getTranslation('notificationContent'), value: dataNotification.notification_message, isTextField: true, name: "notification_message", isPost: true  },
    ]

    const titleEdit = getTranslation('editNotifications');
    const titleCreate = getTranslation('createNotifications');

    function handleCancel() {
        history.push('/notifications')
    };
    useEffect(() => {
        setContent(dataNotification.notification_message)
    }, [dataNotification.notification_message])

    useEffect(() => {
        setDataNotification({ ...dataNotification, notification_message: content})
    }, [content])

    useEffect(() => {
        let mounted = true;
        const runAsync = async () => {
            try {
                if (mounted) {
                    if (notification_id) { detailNotification(notification_id) }
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

    const detailNotification = (notification_id) => {
        setLoadingSkeleton(true)
        PushNotificationService.getDetailNotification(
            notification_id,
            res => {
                let dataAPI = {
                    notification_title: '',
                    notification_cat: '',
                    group_receivers: '',
                    notification_message: '',
                    isPublished: 0
                }
                dataAPI.notification_title = res.data.data.notification_title;
                dataAPI.notification_cat = res.data.data.notification_cat;
                dataAPI.group_receivers = res.data.data.group_receivers;
                dataAPI.notification_message = res.data.data.notification_message;
                dataAPI.isPublished = res.data.data.isPublished ? 1 : 0;
                setDataNotification(dataAPI);
                setLoading(false);
                setLoadingSkeleton(false);
            },
            err => {
                setLoadingSkeleton(false);
            }
        )
    }

    function handleSave() {
        setLoadingActionSave(true);
        let data = new FormData()
        for (let key in dataNotification) {
            data.append(key, dataNotification[key]);
        }
        if (!notification_id) {
            PushNotificationService.createNotification(data,
                res => {
                    makeShortMessage(res.data.message, "success")
                    setTimeout(() => {
                        setLoadingActionSave(false)
                        history.push('/notifications')

                    }, 1000)
                },
                err => {
                    setLoadingActionSave(false);
                    _handleError(err)
                }
            )
        } else {
            PushNotificationService.editNotification(
                notification_id,
                data,
                res => {     
                    makeShortMessage(res.data.message, "success")
                    setTimeout(() => {
                        setLoadingActionSave(false)
                        history.push('/notifications')
                    }, 1000)
                },
                err => {
                    setTimeout(() => {
                        setLoadingActionSave(false);
                        makeShortMessage(err.response.data.message, "error")
                        _handleError(err)
                    }, 1000)
                    
                }
            )
        }
    };
    function _handleError(err) {
        setErrors({
            ...errors,
            notification_title: err.response.data.errors.notification_title ? err.response.data.errors.notification_title : "",
            notification_cat: err.response.data.errors.notification_cat ? err.response.data.errors.notification_cat : "",
            group_receivers: err.response.data.errors.group_receivers ? err.response.data.errors.group_receivers : "",
            notification_message: err.response.data.errors.notification_message ? err.response.data.errors.notification_message : ""
        })
    }
    function handlePublicCreate() {
        setLoadingActionShare(true);
        const data = new FormData();
        for (let key in dataNotification) {
            data.append(key, dataNotification[key]);
        }
        data.append('isPublished', 1)
        PushNotificationService.createNotification(
            data,
            res => {
                setTimeout(() => {
                    setDataNotification({ ...dataNotification, isPublished: 1 });
                    setLoadingActionShare(false)
                    if (dataNotification.isPublished == 1) {
                        makeShortMessage(getTranslation("updatePublishedMessage"), "error");
                    } else {
                        makeShortMessage(res.data.message, "success")
                        history.push('/notifications')
                    }

                }, 1000)
            },
            err => {
                setTimeout(() => {
                    setLoadingActionShare(false)
                    _handleError(err)
                }, 1000)
            }
        )
    }
    function handlePublicEdit() {
        setLoadingActionShare(true);
        const data = new FormData();
        if(dataNotification.isPublished == 0 ){
            for (let key in dataNotification) {
                if (key == 'isPublished') {
                    data.append(key, 1);
                }else {
                    data.append(key, dataNotification[key]);
                }
            }
        }
        if (dataNotification.notification_title == '' || dataNotification.group_receivers == '' || dataNotification.notification_message == '') {
            PushNotificationService.editNotification(
                notification_id, data,
                res => {
                },
                err => {
                    setTimeout(() => {
                        if (dataNotification.isPublished == 1) {
                            makeShortMessage(getTranslation("updatePublishedMessage"), "error");
                        } else {
                            setLoadingActionShare(false)
                            _handleError(err)
                        }
                    }, 1000)
                }
            )
        } else {
            setTimeout(() => {
                setLoadingActionShare(false)
                setIsShowPopupCopy(true);
            }, 1000)
        }
    }
    function allowRelease() {
        setLoading(true);
        const data = new FormData();
        if (dataNotification.isPublished == 0) {
            for (let key in dataNotification) {
                if (key == 'isPublished') {
                    data.append(key, 1);
                } else {
                    data.append(key, dataNotification[key]);
                }
            }
        }
        PushNotificationService.editNotification(
            notification_id, data,
            res => {
                setTimeout(() => {
                    setLoading(false)
                    if (dataNotification.isPublished == 0) {
                        setDataNotification({ ...dataNotification, isPublished: 1 });
                        makeShortMessage(getTranslation("Publishsuccessfully"), "success")
                        history.push('/notifications')
                    }
                }, 1000)
            },
            err => {
            }
        )
    }

    function handleClosePoppCopy() {
        setIsShowPopupCopy(false)
    }

    function redirectBack() {
        history.push('/notifications')
    }
    return (
        <>
            <ViewPageNotification
                data={dataNotification}
                links={links}
                isCreate={isCreate}
                redirectBack={redirectBack}
                titlePage={isCreate ? titleCreate : titleEdit}
                actions={actions}
                titleImage={getTranslation('catalogCover')}
                titleContent={getTranslation('information')}
                lists_input={listInput}
                errors={errors}
                loadingSkeleton={loadingSkeleton}
                content={content}
                setContent={setContent}
                nameContent="notification_message"
                isDisable={isDisable}
            >
            </ViewPageNotification>
            {isShowPopupCopy && (
                <Dialog
                    open={isShowPopupCopy}
                    loadingButton={loading}
                    onClose={handleClosePoppCopy}
                    actionLabel={getTranslation('Public')}
                    action={allowRelease}
                    noIcon={false}
                    title={getTranslation('Public')}
                    iconButton={<IconImage srcIcon={Public_white} />}
                    getTranslation={getTranslation}
                    className={classes.sizeDialog}
                >
                    {getTranslation('areYouSureToRelease')}
                </Dialog>
            )}

        </>
    );
}

export default NotificationForm