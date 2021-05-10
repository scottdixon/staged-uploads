import React, { useState } from "react";
import { DropZone, Thumbnail, Spinner } from "@shopify/polaris";

function ImageDrop(props) {
  const [loading, setLoading] = useState(false);

  const handleDropZoneDrop = async ([file]) => {
    setLoading(true)
  }

  return (
    <DropZone onDrop={handleDropZoneDrop} allowMultiple={false}>
      { loading ? <Spinner size="large" /> : <Thumbnail source={props.collectionImage} /> }
    </DropZone>
  );
}

export default ImageDrop;
