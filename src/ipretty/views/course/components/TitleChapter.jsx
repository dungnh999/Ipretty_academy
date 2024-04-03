import { IconButton, Tooltip } from "@material-ui/core"
import React, { useCallback } from "react"
import TitleRequired from "ipretty/components/TitleRequired"
import TextInput from "ipretty/components/TextInput"
import Delete from '../../../../public/icons_ipretty/Delete.png'
import DrapAndDrop from '../../../../public/icons_ipretty/Drag.png'
import IconImage from "ipretty/components/IconImage"
import { useAuth } from 'ipretty/context/AppProvider'

const TitleChapter = React.memo((props) => {
    const {
        classes,
        chapter_name,
        indexChapter,
        changeValueChapter,
        removeChapter,
        dispatchError
    } = props
    const { getTranslation } = useAuth()

    const onChange = useCallback(e => {
        dispatchError({ type: 'GET_ERROR_DATA_COURSE', payload: '' })
        changeValueChapter(indexChapter, { chapter_name: e.target.value })
    }, [changeValueChapter, indexChapter])

    const handleRemoveChapter = useCallback(() => {
        dispatchError({ type: 'GET_ERROR_DATA_COURSE', payload: '' })
        removeChapter(indexChapter)
    }, [removeChapter, indexChapter])

    return (
        <div className="infromation">
            <div className="infomation-item">
                <div className="infomation-item__title">
                    <TitleRequired title={` ${getTranslation('Chapter')} ${indexChapter + 1}`} required={true} />
                </div>
                <div className="infomation-item__input">
                    <TextInput
                        placeholder={getTranslation('Enterchaptername')}
                        onChange={onChange}
                        fullWidth
                        value={chapter_name || ''}
                        noMargin
                    />
                </div>
                <div className="button-chapter">
                    <div className="button-chapter__remove">
                        <Tooltip title={getTranslation('RemoveChapter')} placement="bottom">
                            <IconButton onClick={handleRemoveChapter}>
                                <IconImage srcIcon={Delete} />
                            </IconButton>
                        </Tooltip>
                    </div>
                    <div className="button-chapter__drap-drop">
                        <IconImage srcIcon={DrapAndDrop} />
                    </div>
                </div>
            </div>
        </div>
    )
})

export default TitleChapter