import { useRef } from 'react';
import PropTypes from 'prop-types';
import Button, { BUTTON_OPTIONS } from '../Button/Button';
import './FilePicker.css';

const FilePicker = ({
    onSubmit,
    setFile,
    file,
    isLoading,
    uploadAvatarProgress,
}) => {
    const ref = useRef();

    const pickFileHandler = () => {
        ref.current.click();
    };

    const pickedHandler = (e) => {
        if (e.target.files && e.target.files.length === 1) {
            const pickedFile = e.target.files[0];
            setFile(pickedFile);
        }
    };

    return (
        <form
            className='file-picker'
            onSubmit={onSubmit}
            encType='multipart/form-data'
        >
            <input
                type='file'
                name='file'
                id='file'
                accept='.png,.jpg,.jpeg'
                style={{ display: 'none' }}
                ref={ref}
                onChange={pickedHandler}
            />

            <Button
                onClick={pickFileHandler}
                type='button'
                options={[BUTTON_OPTIONS.outline]}
            >
                Pick file
            </Button>

            <Button disabled={isLoading || !file} type='submit'>
                Update
            </Button>
            {uploadAvatarProgress !== null && (
                <span className='file-picker__upload-progres'>
                    {uploadAvatarProgress}%
                </span>
            )}
        </form>
    );
};

FilePicker.propTypes = {
    onSubmit: PropTypes.func,
    setFile: PropTypes.func,
    file: PropTypes.object,
    uploadAvatarProgress: PropTypes.number,
};

export default FilePicker;
