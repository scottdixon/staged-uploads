import { Heading, Page, Frame, Toast } from "@shopify/polaris";
import ResourceListWithCollections from '../components/ResourceListWithCollections';
import { useState, useCallback } from "react";

const Index = () => {
  const [toastMessage, setToastMessage] = useState();
  return (
    <Page>
      <Frame>
        <ResourceListWithCollections setToastMessage={setToastMessage} />
        { toastMessage && (
          <Toast content={toastMessage} onDismiss={() => setToastMessage() } />
        )}
      </Frame>
    </Page>
  )
};

export default Index;
