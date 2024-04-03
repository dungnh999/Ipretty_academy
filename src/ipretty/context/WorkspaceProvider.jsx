import React, { useContext, useEffect, useState } from "react";

// export interface WorkspaceContextProps {
//     listWorkspaces: Function,
//     createWorkspace: Function,
//     findCurrentWorkspace: Function,
//     authorizedWorkspaces: Workspace[],
//     currentWorkspace: Workspace,
//     workspaceUsers: any
// }

export const WorkspaceContext = React.createContext(null);

export const WorkspaceConsumer = WorkspaceContext.Consumer;

export const WorkspaceProvider = ({children}) => {
    const [authorizedWorkspaces, setAuthorizedWorkspaces] = useState([]);
    const [currentWorkspace, setCurrentWorkspace] = useState(null);
    const [workspaceUsers, setWorkspaceUsers] = useState([]);
    const createWorkspace = () => {}

    const listWorkspaces = () => {
        
    }

    const findCurrentWorkspace = (workspaceId) => {
        
    }

    return (
        <WorkspaceContext.Provider value={{authorizedWorkspaces, createWorkspace, listWorkspaces, currentWorkspace, findCurrentWorkspace, workspaceUsers}}>
            {children}
        </WorkspaceContext.Provider>
    )
}

export const useWorkspace = () => useContext(WorkspaceContext)