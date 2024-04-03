
import React, { useMemo } from 'react'
import { Tooltip, Avatar } from '@material-ui/core';
import { ROOT_API_URL } from 'ipretty/services/constances'
import Upload from '../../../../public/icons_ipretty/Upload.png'
import IconImage from "ipretty/components/IconImage"
import { useAuth } from 'ipretty/context/AppProvider'

const SesionUploadImage = React.memo((props) => {
    const { classes, uploadFile, value, title, nameField, indexQuestion } = props
    const { getTranslation } = useAuth()
    const accept = useMemo(() => '.jpg,.jpeg,.gif,.png,.bmp', [])

    function renderAvatar(src) {
        let url = '';
        if (src) {
            url = src.split('/');
        }
        let avatarSrc = src;
        if (url[1] == 'storage') {
            avatarSrc = ROOT_API_URL + src;
        }
        return avatarSrc;
    }

    return (
        <div className="upload">
            <label className="control-label" htmlFor={indexQuestion} >
                <Tooltip title={title || ''}>
                    {value == '' ? (
                        <div className="button">
                            <IconImage srcIcon={Upload} /><span>{getTranslation('UploadNewPhotos')}</span>
                        </div>
                    ) : (
                        <Avatar
                            variant="square"
                            className={classes.backGround}
                            src={renderAvatar(value)}
                        />
                    )}

                </Tooltip>
                <input
                    type="file"
                    id={indexQuestion}
                    accept={Array.isArray(accept) ? accept.join(',') : accept}
                    className={classes.input}
                    disabled={false}
                    hidden={true}
                    onChange={uploadFile(nameField, indexQuestion)}
                />
            </label>
        </div>
    )
})

export default SesionUploadImage