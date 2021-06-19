import './NotFound.css';

const NotFound = () => {
    return (
        <>
            <div className='notfound__header'>
                <h2>
                    <i className='fas fa-binoculars'></i>Page not found
                </h2>
            </div>
            <div className='notfound__content'>Something went wrong...</div>
        </>
    );
};

export default NotFound;
