
import React from 'react';
import { useAuth } from 'ipretty/context/AppProvider';
import ErrorView from 'ipretty/views/home/error/ErrorView';

const Error500View = (props) => {

    const { getTranslation } = useAuth();

    return (
        <ErrorView
        numberError="500"
        message={getTranslation("errorServer")}
        getTranslation={getTranslation}
      />     
    )
}

export default Error500View;
