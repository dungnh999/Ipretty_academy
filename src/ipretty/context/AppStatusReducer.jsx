
export default (state, action) => {
    switch (action.type) {
        case 'CHANGE_STATUS_LESSON':
            const { newValueCSL } = action
            return {
                ...state,
                ...newValueCSL
            }
        case 'CHANGE_STATUS_SURVEY':
            const { newValueCSS } = action
            return {
                ...state,
                ...newValueCSS
            }
        case 'SHOW_AND_CLOSE_DIALOG':
            
            const { status, Component, title, list, field, fieldRender, selected } = action.payload

            return {
                ...state,
                status: status,
                Component: Component,
                title: title,
                list: list,
                field: field,
                fieldRender: fieldRender,
                selected: selected
            }
        default:
            break;
    }
}