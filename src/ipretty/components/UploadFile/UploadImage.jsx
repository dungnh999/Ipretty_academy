import { Button, makeStyles, CircularProgress, Box, Typography } from '@material-ui/core';
import React, { useState, useMemo } from 'react'
import { Tooltip, Avatar } from '@material-ui/core';
import BANNER_DEFAULT from '../../../public/icons_ipretty/Default.png'
import { ROOT_API_URL } from 'ipretty/services/constances';
import VIDEO_REPORT from '../../../public/images/video_report.jpg';
const useStyles = makeStyles(theme => ({
    labelLoadingImage :{
        height: '100%',
        display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
    },
}))
function UploadImage(props) {
    const {  classes,avatarURL, handleImageChange, value, title, htmlFor, accept, typeFile,loading,} = props
    const [useDefaultAvatar, setUseDefaultAvatar] = useState(false)
    const classesLoadingImage = useStyles()
    function useDefault(event) {
        event.target.src = BANNER_DEFAULT
        setUseDefaultAvatar(true);
    }

    function renderAvatar(src) {
        if (src) {
            let url = '';
            if (src) {
                url = src.split('/');
              
            }
            let avatarSrc = src;
            if (url[1] == 'storage') {
                avatarSrc = ROOT_API_URL + src;
            }
            return avatarSrc;
        } else {
            return BANNER_DEFAULT
        }
    }

    return (
        <React.Fragment>       
             {loading ?
             <>
             <div className={classesLoadingImage.labelLoadingImage}>
             <CircularProgress size={40}  marginLeft={20} marginTop={6}  />
             </div>
           </>
           : 
            <label className="control-label" htmlFor={htmlFor} >
          
                <Tooltip title={title || ''}>
                    {useDefaultAvatar ? (
                        <Avatar
                            variant="square"
                            className={classes.backGround}
                            src={BANNER_DEFAULT}
                            onError={useDefault}
                        />
                    ) : (
                        <Avatar
                            variant="square"
                            className={classes.backGround}
                            src={ typeFile && typeFile == 'video/mp4' ? VIDEO_REPORT :  avatarURL ? avatarURL : renderAvatar(value)}
                            onError={useDefault}
                        />
                    )}
                </Tooltip>
                <input
                    type="file"
                    id={htmlFor}
                    accept={Array.isArray(accept) ? accept.join(',') : accept}
                    className={classes.input}
                    disabled={false}
                    hidden={true}
                    onChange={handleImageChange}
                />
            </label>
            }
        </React.Fragment>
    )
}

export default UploadImage