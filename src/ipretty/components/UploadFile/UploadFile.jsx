import React, { useMemo } from 'react'
import { useDropzone } from 'react-dropzone'
import PropTypes from 'prop-types'
import { toBase64, convertToBlob } from 'ipretty/helpers/contextHelper'

const baseStyle = {
    transition: 'border .24s ease-in-out',
};

const activeStyle = {
    borderColor: '#2196f3'
};

const acceptStyle = {
    borderColor: '#00e676'
};

const rejectStyle = {
    borderColor: '#ff1744'
};

const UploadFile = React.memo((props) => {
    const { attachments, maxFiles, handleUpload, uploadMultipleFiles, isToBase64, isToBlob, iconUpload, titleButton, acceptFile } = props
    const { getRootProps, getInputProps, open, isDragActive, isDragAccept, isDragReject } = useDropzone({
        noClick: true,
        noKeyboard: true,
        maxFiles: maxFiles,
        accept: acceptFile,
        onDrop: acceptedFiles => {
            if (!uploadMultipleFiles) {
                acceptedFiles.map(file => {
                    handleUpload(attachments, file)
                });
            } else {
                if (isToBase64) {
                    loopToBase64(acceptedFiles, attachments)
                } else if (isToBlob) {
                    loopToBlob(acceptedFiles, attachments)
                } else {
                    handleUpload(attachments, acceptedFiles)
                }

            }
        }
    })
    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isDragActive,
        isDragReject,
        isDragAccept
    ])

    async function loopToBase64(acceptedFiles, attachments) {
        const acceptedFileLength = acceptedFiles.length
        let files = []
        for (let i = 0; i < acceptedFileLength; i++) {
            await toBase64(acceptedFiles[i]).then(
                data => files.push(data)
            );
        }
        handleUpload(attachments, acceptedFiles, files)
    }

    async function loopToBlob(acceptedFiles, attachments) {
        const acceptedFileLength = acceptedFiles.length
        let files = []
        for (let i = 0; i < acceptedFileLength; i++) {
            await convertToBlob(acceptedFiles[i]).then(
                data => files.push(data)
            );
        }
        handleUpload(attachments, acceptedFiles, files)
    }

    return (
        <div {...getRootProps({ style })}>
            <input {...getInputProps()} />
            <button type="button" onClick={open}>
                {iconUpload}{titleButton && (<span>{titleButton}</span>)}
            </button>
        </div>
    )
})

UploadFile.prototype = {
    attachments: PropTypes.string,
    handleUpload: PropTypes.func,
    uploadMultipleFiles: PropTypes.bool,
    isToBase64: PropTypes.bool
}

export default UploadFile