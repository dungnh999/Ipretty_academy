
import React, { useMemo, useCallback } from 'react'
import TitleRequired from 'ipretty/components/TitleRequired'
import TextInput from 'ipretty/components/TextInput'
import { useAuth } from 'ipretty/context/AppProvider';
import { Typography } from '@material-ui/core';

const CoursePrice = React.memo((props) => {
    const { indexCourse, changeDataFields, coursePrice, courseCurrency } = props
    const { getTranslation } = useAuth()
    const currencys = useMemo(() => [
        {
            id: 'VND',
            name: 'VND'
        },
        {
            id: 'USD',
            name: 'USD'
        },
        {
            id: 'EUR',
            name: 'EUR'
        },
    ], [])

    const onChange = nameField => useCallback(e => {
        if ( nameField == 'course_price' ) {
            changeDataFields(nameField, indexCourse, { [nameField]: !e.target.value || e.target.value < 0 ? 0 : e.target.value })
        } else {
            changeDataFields(nameField, indexCourse, { [nameField]: e.target.value })
        }
    }, [changeDataFields, nameField, indexCourse])

    return (
        <div className="infomation-item price">
            <div className="infomation-item__title">
                <TitleRequired title={getTranslation('CoursePrice')} required={false} />
            </div>
            <div className="infomation-item__input">
                <div className="infomation-item__input--price">
                    <TextInput
                        onChange={onChange('course_price')}
                        fullWidth
                        value={coursePrice || 0}
                        noMargin
                        type={'number'}
                    />
                </div>
                <div className="infomation-item__input--currency">
                    {/* <TextInput
                        select
                        options={currencys}
                        onChange={onChange('course_currency')}
                        fullWidth
                        value={courseCurrency || 'VND'}
                        noMargin
                    /> */}
                    <Typography>
                        VND
                    </Typography>
                </div>
            </div>
        </div>
    )
})

export default CoursePrice