import React, { useState, useEffect, useMemo } from 'react'
import { useDropzone } from 'react-dropzone'
import Upload from '../../../../public/icons_ipretty/Upload.png'
import IconImage from "ipretty/components/IconImage";
import { useAuth } from 'ipretty/context/AppProvider'

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
    const { classes, attachments, maxFiles, handleUpload, title, acceptFile, dispatcError, typeFiel } = props
        const { getTranslation } = useAuth()
    const maxSize = process.env.MAX_SIZE || 524288000
    const { getRootProps, getInputProps, open, isDragActive, isDragAccept, isDragReject } = useDropzone({
        noClick: true,
        noKeyboard: true,
        accept: acceptFile,
        maxFiles: maxFiles,
        maxSize: maxSize,
        onDropAccepted: acceptedFiles => {
            dispatcError({ type: 'GET_ERROR_UPLOAD_FILE', payload: ''})
            if (attachments == 'main_attachment') {
                if (acceptedFiles.length > 0) {
                    acceptedFiles.map(file => {
                        // console.log(file, 'file')
                        var video = document.createElement('video');
                        video.preload = 'metadata';
                        video.src = URL.createObjectURL(file);
                        video.onloadedmetadata = function () {
                            // console.log(attachments, 'attachments == onloadedmetadata')
                            handleUpload(attachments, file, video.duration)
                        };
                        
                    });
                } else {
                    setFieldError('')
                }
            } else {
                handleUpload(attachments, acceptedFiles)
            }
        },
        onDropRejected: fileRejections=> {
            if (attachments == 'main_attachment') {
                if ( fileRejections.length > 1 ) {
                    dispatcError({ type: 'GET_ERROR_UPLOAD_FILE', payload: { main_attachment: [getTranslation('onlyFileCanBeUploaded')]}})
                } else if (fileRejections[0].errors) {
                    dispatcError({ type: 'GET_ERROR_UPLOAD_FILE', payload: { main_attachment: [getTranslation('onlyFilesWithTheFormat') + ` ${maxSize} Byte`]}})
                }else {
                    dispatcError({ type: 'GET_ERROR_UPLOAD_FILE', payload: { main_attachment: [getTranslation('onlyUploadFilesWithTheFormat') + `${typeFiel}`]}})
                }
            } else {
                dispatcError({ type: 'GET_ERROR_UPLOAD_FILE', payload: { lesson_attachment: [getTranslation('onlyUploadFilesWithTheFormat') + `${typeFiel}`]}})
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

    return (
        <div {...getRootProps({ style })}>
            <input {...getInputProps()} />
            <button type="button" onClick={open}>
                <IconImage srcIcon={Upload} /><span>{title}</span>
            </button>
        </div>
    )
})

export default UploadFile