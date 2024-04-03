import React, { useCallback, useMemo, useState } from 'react'
import UploadImage from 'ipretty/components/UploadFile/UploadImage'
import { getBase64 } from 'ipretty/helpers/contextHelper'
const BannerFeatureImage = React.memo((props) => {
    const { classes, setBannerUrl, value } = props
    const acceptFile = 'image/png, image/jpeg, image/jpg, image/gif'
    const [error, setError] = useState('')
    const [bannerImageUrl, setBannerImageUrl] = useState({ file: null })
   
    function handleImageChange(e) {
        setBannerUrl(e.target.files[0]);
        setBannerImageUrl({ file: URL.createObjectURL(e.target.files[0]) });
    }
    return (
        <React.Fragment>
            <UploadImage
                handleImageChange={handleImageChange}
                avatarURL={bannerImageUrl.file}
                classes={classes}
                value={value}
                htmlFor={'update-avatar'}
                acceptFile={acceptFile}
            />
            {error && error != '' ? (
                <div className={classes.showError}>{error}</div>
            ) : ''}
        </React.Fragment>
    )
})

export default BannerFeatureImage