export default (state, action) => {
    switch (action.type) {
        case 'SHOW_ERROR_FAQ':
            const error = action.payload
            
            return {
                ...state,
                error: error
            }
    
        default:
            break;
    }
}