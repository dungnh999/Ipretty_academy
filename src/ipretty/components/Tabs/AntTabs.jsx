
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Tabs } from '@material-ui/core';

const AntTabs = withStyles(theme => ({
  root: {
    '& .MuiTab-textColorInherit': {
      opacity: 1
    }
  },
  indicator: {
    backgroundColor: '#44AD92'
  },

}))(Tabs);

export default AntTabs
