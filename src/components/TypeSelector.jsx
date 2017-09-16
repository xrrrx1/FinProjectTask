import React from 'react';

function TypeSelector(props) {
    return (
        <select className="type-selector" onChange={props.onSelect}>
            {props.types.map(type => {
                return (
                    <option
                        value={type.key}
                        key={type.id}>
                            {type.name}
                        </option>
                );
            })}
        </select>
    );
}

TypeSelector.propTypes = {
    types: React.PropTypes.array.isRequired,
    onSelect: React.PropTypes.func.isRequired
};

export default TypeSelector;