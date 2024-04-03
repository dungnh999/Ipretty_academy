import React from 'react';
import { useAuth } from 'ipretty/context/AppProvider';
import ErrorView from 'ipretty/views/home/error/ErrorView';

const Error404View = (props) => {

    const { getTranslation } = useAuth();

    return (
        <ErrorView
        numberError={"404"}
        message={getTranslation("thisLinkCouldNotBeFound")}
        getTranslation={getTranslation}
      />     
    )
}

export default Error404View;
