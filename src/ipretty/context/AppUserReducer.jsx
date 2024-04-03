export default (state, action) => {
    switch (action.type) {
        case 'CHANGE_VALUE_USER':
            const {indexUserCVU} = action
            return {
                ...state,
                users: state.users.map((user, indexUser) => {
                    if (indexUserCVU == indexUser) {
                        return{
                            ...user,
                            ...action.newValue
                        }
                    }
                })
            }
    }
}