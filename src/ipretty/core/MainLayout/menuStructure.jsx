import { Security, Person, NoteAdd, Web,
  Whatshot, VerifiedUser, Assessment,
  InvertColors, CheckCircleOutline, BeachAccess, Camera, Explore} from '@material-ui/icons';
import React, { useEffect } from "react";
import { useAuth } from 'ipretty/context/AppProvider'
import { useWorkspace } from 'ipretty/context/WorkspaceProvider';


function createMenuStructure() {
  const { getTranslation } = useAuth();
  const {authorizedWorkspaces} = useWorkspace();

  return [
    {
      ariaLabel: "myInformation",
      label: getTranslation('My information'),
      icon: <Person/>,
      url: '/home'
    },
    {
      ariaLabel: "billing",
      label: getTranslation('Billing'),
      icon: <NoteAdd/>,
      url: "/home/billing"
    },
    {
      ariaLabel: "workspace",
      label: getTranslation('Workspaces'),
      icon: <VerifiedUser/>,
      url: "/",
    },
    {
      ariaLabel: "confidentiality",
      label: 'Confidentiality',
      icon: <Security/>,
      url: '/home/confidentiality'
    },
  ];
}

function createMenuDashboardStructure(workspaceId) {
  const { getTranslation } = useAuth()
  return [
    {
      ariaLabel: "dashboard",
      label: getTranslation('Dashboard'),
      icon: <Web/>,
      url: `/home/workspace/${workspaceId}/dashboard`
    },
    {
      ariaLabel: "firewall",
      label: getTranslation('Firewall'),
      icon: <Whatshot/>,
      url: `/home/workspace/${workspaceId}/firewall`
    },
    {
      ariaLabel: "endpoint",
      label: getTranslation('Endpoint'),
      icon: <VerifiedUser/>,
      url: `/home/workspace/${workspaceId}/endpoint`
    },
    {
      ariaLabel: "vulnerability",
      label: getTranslation('Vulnerability'),
      icon: <BeachAccess/>,
      url: `/home/workspace/${workspaceId}/vulnerability`
    },
    {
      ariaLabel: "monitoring",
      label: getTranslation('Monitoring'),
      icon: <Assessment/>,
      url: `/home/workspace/${workspaceId}/monitoring`
    },
    {
      ariaLabel: "dataLeak",
      label: getTranslation('Data leak'),
      icon: <InvertColors/>,
      url: `/home/workspace/${workspaceId}/data-leak`

    },
    {
      ariaLabel: "webScoring",
      label: getTranslation('Web scoring'),
      icon: <CheckCircleOutline/>,
      url: `/home/workspace/${workspaceId}/web-scoring`

    },
    {
      ariaLabel: "license",
      label: getTranslation('License'),
      icon: <Camera/>,
      url: `/home/workspace/${workspaceId}/license`
    },
    {
      ariaLabel: "bestPractises",
      label: getTranslation('Best Practises'),
      icon: <Explore/>,
      url: `/home/workspace/${workspaceId}/best-practises`

    },
  ];
}

var menuStructure = {
    createMenuStructure: createMenuStructure,
    createMenuDashboardStructure: createMenuDashboardStructure
};

export default menuStructure;
