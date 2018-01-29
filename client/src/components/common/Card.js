import React from 'react';

const Card = ({ label, data }) => {
    const { cardContainer, labelStyle, dataStyle } = styles;
    return (
        <div className="card blue-grey darken-1">
            <div style={cardContainer} className="card-content white-text">
                <span style={labelStyle} className="card-title">{label}</span>
                <p style={dataStyle}>{data}</p>
            </div>
        </div>
    )
}

const styles = {
    cardContainer: {
        padding: 10,
        marginLeft: 50
    },
    labelStyle: {
        fontSize: 18
    },
    dataStyle: {
        fontSize: 14
    }
}

export { Card };