import JoditEditor from "jodit-react"
import React, { useRef, useState } from 'react'

const Editor = React.memo((props) => {
    const { setContent, content, placeholder } = props
    const config = {
        readonly: false,
        enter: 'br',
        placeholder: placeholder,
        showPlaceholder: true,
        defaultActionOnPaste: 'insert_only_text',
        defaultActionOnPasteFromWord: 'insert_only_text',
        askBeforePasteHTML: false,
        askBeforePasteFromWord: false,
    }
    const editor = useRef(null)

    return (
        <React.Fragment>
            <JoditEditor
                ref={editor}
                value={content}
                config={config}
                tabIndex={1} // tabIndex of textarea
                onBlur={newContent => setContent(newContent)}
                onChange={newContent => { }}

            />
        </React.Fragment>
    )
})

export default Editor