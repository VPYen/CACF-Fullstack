const Modal = ({handleClose, show, children}) => {
    const toggleShowHideClassName = show ? "modal display-flex" : "modal display-none";
    return(
        <div className={toggleShowHideClassName}>
            <section className="modal-main">
            <div className="col1Modal">
                <button className="closeWindow" onClick={() => {handleClose(false)}}>X</button>
            </div>
            <div className="col2Modal">
                {children}
            </div>
            </section>
        </div>
    )
};

export default Modal;