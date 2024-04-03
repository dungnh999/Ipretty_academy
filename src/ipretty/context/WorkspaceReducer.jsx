// export enum ActionType {
//     GetAuthorizedUsers,
//     AddRequestAction,
//     ModifyRequestAction,
//     DeleteAccessRequest,
//     ClearAllAccessRequests,   
//     ModifyAction, 
// }

// type Action = {
//     type: ActionType.AddRequestAction,
//     payload: WorkspaceAccessRequest,
// } | {
//     type: ActionType.ModifyRequestAction,
//     payload: {
//         requestIndex: number,
//         name: string,
//         value: any,
//     }
// } | {
//     type: ActionType.GetAuthorizedUsers,
//     payload: {
//         values: WorkspaceAccessRequest[]
//     }
// } | {
//     type: ActionType.ClearAllAccessRequests,
//     payload: {}
// } | {
//     type: ActionType.DeleteAccessRequest,
//     payload: {
//         requestIndex: number,
//     }
// }

export const workpsaceReducer = (state, action) => {
    switch(action.type) {
        case ActionType.GetAuthorizedUsers:
            let _values = [];
            if (action.payload.values.length > 1) {
                for(let i = 1; i < action.payload.values.length; i++) {
                    _values.push(action.payload.values[i]);
                } 
                return {
                    accessRequests: _values,
                }
            }
            else {
                return {
                    accessRequests: [
                        {
                            id: '',
                            workspaceId: '',
                            email: '',
                            clientRole: {
                                writePermission: false,
                                readPermission: false, 
                            }   
                        }
                    ]
                }
            }
        case ActionType.AddRequestAction: 
            return {
                accessRequests : [
                    ...state.accessRequests,
                    {
                        id: '',
                        workspaceId: '',
                        email: '',
                        clientRole: {
                            writePermission: false,
                            readPermission: false, 
                        }
                    }
                ],
            }
        case ActionType.ModifyRequestAction:
            return {
                ...state, 
                accessRequests: state.accessRequests.map((accessRequest, index) => {
                    if (index === action.payload.requestIndex) {
                        return {
                            ...accessRequest,
                                [action.payload.name]: action.payload.value,
                            clientRole: {
                                ...accessRequest.clientRole,
                                [action.payload.name]: action.payload.value
                            }
                        }
                    }
                    return accessRequest;
                })
            }
        case ActionType.ClearAllAccessRequests:
            return {
                ...state,
                accessRequests: [{
                    id: '',
                    workspaceId: '',
                    email: '',
                    clientRole: {
                        writePermission: false,
                        readPermission: false, 
                    }
                }]
            }
        case ActionType.DeleteAccessRequest:
            return {
                accessRequests: state.accessRequests.filter((accessRequest, index) => index !== action.payload.requestIndex)
            }
        default:
            return state;

    } 
}