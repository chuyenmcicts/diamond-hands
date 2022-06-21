import Navbar from './Navbar/Navbar';

interface IProps {
    onGetStarted: () => void;
}
const component = (props: IProps) => (
    <>
        <Navbar />
        <p className="header-content">Not Your <span className="header-content-key">Keys</span>, Not Your <span className="header-content-key">Coins</span>.</p>
        <p className="content">If your crypto is stored in a wallet you don't have the private keys for, like a wallet on an exchange, is it really yours? <br></br>Many will say it isn't.</p>
        <div className="container-button">
            <button type="button" className="btn btn-grad" onClick={props.onGetStarted} >Get Started</button>
        </div>
    </>
)

export default component;
