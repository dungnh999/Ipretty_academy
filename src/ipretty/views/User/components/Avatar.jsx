
import React, { useState, useEffect, useMemo } from 'react';
import { Box, Avatar, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const AvatarUser = React.memo((props) => {
    const { setAvatar, classes, getTranslation, avatar } = props;
    const accept = useMemo(() => '.jpg,.jpeg,.gif,.png,.bmp', []);
    const [useDefaultAvatar, setUseDefaultAvatar] = useState(false);
    const [avatarURL, setAvatarURL] = useState({ file: '' });
 
    function handleImageChange(e) {
        setAvatar(e.target.files[0]);
        setAvatarURL({ file: URL.createObjectURL(e.target.files[0]) });
    }

    function useDefault(event) {
        event.target.src = '';
        setUseDefaultAvatar(true);
    }
    
    return (
        <Box className={classes.boxForm} width={1} my={4} px={3} py={2} >
            <div className="update-file">
                <label className="control-label" htmlFor="update-avatar" >
                    <Tooltip title="Update Profile Picture">
                        {useDefaultAvatar ? (
                            <Avatar
                                className={classes.avatar}
                                src={''}
                                onError={useDefault}
                            />
                        ) : (
                            <Avatar
                                className={classes.avatar}
                                src={avatarURL.file ? avatarURL.file : avatar}
                                onError={useDefault}
                            />
                        )}
                    </Tooltip>
                    <input
                        type="file"
                        id="update-avatar"
                        accept={Array.isArray(accept) ? accept.join(',') : accept}
                        className={classes.input}
                        hidden={true}
                        onChange={handleImageChange}
                    />
                </label>
            </div>
        </Box>
    )
})

export default AvatarUser;