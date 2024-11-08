import React from 'react'

const SimpleGallery = ({ images, callback }) => {
    const formantlistimg = (data) => {
        let images = [];
        data.map((value, index) => {
            images.push({
                url: value.image,
                title: "Imagen " + index
            });
        });
        return images;
    }
    return (
        <div className="gallerygf">
            {images.map((src, index) => (
                <div className="gallerygf-item" key={src.id}>
                    <img src={src.image} alt={`Gallery ${index + 1}`} onClick={() => { callback(index, formantlistimg(images)) }} />
                </div>
            ))}
        </div>
    )
}

export default SimpleGallery