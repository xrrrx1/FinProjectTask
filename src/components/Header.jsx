import React from 'react';

function Header(props) {
    return (
        <header>
            <h1>{props.name} {props.lastPrice}<span>{props.currency}</span></h1>
            <div className="code">{props.code}</div>
            <div className="description">{props.fullName}</div>
        </header>
    );
}

Header.propTypes = {
    name: React.PropTypes.string.isRequired,
    code: React.PropTypes.string.isRequired,
    fullName: React.PropTypes.string.isRequired,
    lastPrice: React.PropTypes.string.isRequired,
    currency: React.PropTypes.string.isRequired
};

export default Header;