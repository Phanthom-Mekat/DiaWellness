import PropTypes from "prop-types";
import { Context } from "./context";
const ContextProvider = ({children}) => {
    const info ={
        name:"POK",
    }
    return (
        <div>
            <Context.Provider value={info}>
                {children} 
            </Context.Provider>
        </div>
    );
};
ContextProvider.propTypes = {
    children: PropTypes.node,
};

export default ContextProvider;