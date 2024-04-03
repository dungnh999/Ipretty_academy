
import React, { useState, useMemo } from 'react';
import UploadImage from 'ipretty/components/UploadFile/UploadImage';

const ReportErrorImage = React.memo((props) => {
    const { classes, setImage, value } = props;
    const accept = useMemo(() => '.jpg,.jpeg,.gif,.png,.svg,.mp4', []);
    const [avatarURL, setAvatarURL] = useState({ file: null });
    const [ typeFile , setTypeFile ] = useState()
    function handleImageChange(e) {
        setTypeFile(e.target.files[0].type);
        setImage(e.target.files[0]);
        setAvatarURL({ file: URL.createObjectURL(e.target.files[0]) });
    }
    return (
        <React.Fragment>
            <UploadImage
                handleImageChange={handleImageChange}
                avatarURL={avatarURL.file}
                classes={classes}
                value={value}
                htmlFor={'update-avatar'}
                accept={accept}
                typeFile={typeFile}
            />
        </React.Fragment>
    )
})
export default ReportErrorImage;