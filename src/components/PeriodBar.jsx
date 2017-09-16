import React from 'react';

function PeriodBar(props) {
    return (
        <div className="period-selector">
            {props.periods.map(period => {
                return (
                    <span className={`item${period.selected ? ' active' : ''}`} onClick={() => props.onClick(period.key)} key={period.id}>
                        {period.name}
                    </span>
                );
            })}
        </div>
    );
}

PeriodBar.propTypes = {
    periods: React.PropTypes.array.isRequired,
    onClick: React.PropTypes.func.isRequired
};

export default PeriodBar;