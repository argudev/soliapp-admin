import React, { Fragment } from 'react';
import SimpleGallery from 'components/Widgets/SimpleGallery';

const Gallery=({images,callback})=> {
  return (
    <Fragment>
        <SimpleGallery images={images} callback={callback}  />
    </Fragment>
  )
}

export default Gallery