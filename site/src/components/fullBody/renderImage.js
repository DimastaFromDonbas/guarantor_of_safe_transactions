import React, { useState, useEffect } from 'react';

const ImageDisplay = ({ imageData }) => {
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        const reader = new FileReader();
        reader.readAsDataURL(new Blob([imageData]));
        reader.onload = () => {
            setImageUrl(reader.result);
        };
    }, [imageData]);

    return (
        <div>
            {imageUrl && <img src={imageUrl} alt="Image" />}
        </div>
    );
};

export default ImageDisplay;