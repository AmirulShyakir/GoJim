import React from 'react';
import styled from 'styled-components/native';

const StyledView = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 10px;
`;

const RowContainer = (props) => {
    return <StyledView {...props}>{props.children}</StyledView>;
};

export default RowContainer;