import { useState, useEffect, useContext } from 'react';
import { authContext } from '../../context/auth-context';
import FilePicker from '../shared/FileUpload/FilePicker';
import './AvatarUploadSection.css';

const AvatarUploadSection = () => {
    const [preview, setPreview] = useState();
    const [file, setFile] = useState();
    const { updateAvatar, uploadAvatarProgress } = useContext(authContext);

    const submitHandler = (e) => {
        e.preventDefault();

        updateAvatar(file, () => {
            setFile(null);
        });
    };

    useEffect(() => {
        if (!file) {
            return;
        }

        const fileReader = new FileReader();

        fileReader.onload = () => {
            setPreview(fileReader.result);
        };

        fileReader.readAsDataURL(file);
    }, [file]);

    return (
        <div className='settings__section'>
            <h3>Avatar</h3>
            <div className='file__preview'>
                {preview ? (
                    <img src={preview} alt='Avatar preview' />
                ) : (
                    <span className='file__preview-placeholder'>
                        Pick an image
                    </span>
                )}
            </div>
            <FilePicker
                onSubmit={submitHandler}
                setFile={setFile}
                file={file}
                preview={preview}
                uploadAvatarProgress={uploadAvatarProgress}
            />
        </div>
    );
};

export default AvatarUploadSection;
