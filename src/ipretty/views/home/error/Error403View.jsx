import React from 'react';
import { useAuth } from 'ipretty/context/AppProvider';
import ErrorView from 'ipretty/views/home/error/ErrorView';

const Error403View = (props) => {

    const { getTranslation } = useAuth();

    return (
        <ErrorView
        numberError={"403"}
        message={getTranslation("youDoNotHaveAccess")}
        getTranslation={getTranslation}
      />     
    )
}

export default Error403View;
