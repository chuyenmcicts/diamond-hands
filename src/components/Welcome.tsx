import React from 'react';

interface IProps {
    onGetStarted: () => void;
}
const component = (props: IProps) => (
    <>
        <p>Not your keys, Not your coins</p>
        <button type="button" className="btn btn-primary" onClick={props.onGetStarted} >Get Started</button>
    </>
)

export default component;
