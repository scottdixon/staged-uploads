import React, { useState } from "react";
import { DropZone, Thumbnail, Spinner } from "@shopify/polaris";
import { gql } from 'apollo-boost';
import { useMutation } from "react-apollo";

const STAGED_UPLOADS_CREATE = gql`
  mutation stagedUploadsCreate($input: [StagedUploadInput!]!) {
    stagedUploadsCreate(input: $input) {
      stagedTargets {
        resourceUrl
        url
        parameters {
          name
          value
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const COLLECTION_UPDATE = gql`
  mutation collectionUpdate($input: CollectionInput!) {
    collectionUpdate(input: $input) {
      collection {
        id
        image {
          originalSrc
        }
      }
      job {
        id
      }
      userErrors {
        field
        message
      }
    }
  }
`

function ImageDrop(props) {
  const [loading, setLoading] = useState(false);
  const [collectionUpdate] = useMutation(COLLECTION_UPDATE);
  const [stagedUploadsCreate] = useMutation(STAGED_UPLOADS_CREATE);

  const handleDropZoneDrop = async ([file]) => {
    setLoading(true)

    let { data } = await stagedUploadsCreate({ variables: {
      "input": [
        {
          "resource": "COLLECTION_IMAGE",
          "filename": file.name,
          "mimeType": file.type,
          "fileSize": file.size.toString(),
          "httpMethod": "POST"
        }
      ]
    }})

    const [{ url, parameters }] = data.stagedUploadsCreate.stagedTargets

    const formData = new FormData()

    parameters.forEach(({name, value}) => {
      formData.append(name, value)
    })

    formData.append('file', file)

    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    })

    if (response.ok) {
      const key = parameters.find(p => p.name === 'key')
      await collectionUpdate({ variables: {
          "input": {
            "id": props.collectionId,
            "image": {
              "src": `${url}/${key.value}`
            }
          }
        }
      })
    }

    setLoading(false)
  }

  return (
    <DropZone onDrop={handleDropZoneDrop} allowMultiple={false}>
      { loading ? <Spinner size="large" /> : <Thumbnail source={props.collectionImage} /> }
    </DropZone>
  );
}

export default ImageDrop;
