import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import { useParams } from 'react-router-dom'

import CardCollectionDetails from "../../component/Card/CardCollectionDetails";
import SectionTitle, { MenuWrapper, CollectionWrapper } from "../../component/SectionTitle";

import { query } from '@onflow/fcl'
import { LIST_DAPPY_TEMPLATES } from '../../flow/list-dappy-templates.script'

const CollectionDetails = ({ history }) => {
  const param = useParams()
  const { collectID } = param;
  const [dappy, setDappy] = useState(null);
  useEffect(() => {
    const fetchDappyTemplates = async () => {
      try {
        let res = await query({ cadence: LIST_DAPPY_TEMPLATES })
        setDappy(res[collectID]);
      } catch (err) {
      }
    }
    fetchDappyTemplates()

  }, [collectID]);


  const onBuyCollect = (item) => {
    history.push('/collection-me');
  }



  return (
    <>
      <MenuWrapper className="animation-fadeInRight">
        <SectionTitle title="Collection" long />
      </MenuWrapper>
      <CollectionWrapper>
        { dappy && 
          <CardCollectionDetails
            card={dappy}
            name
            details
            price_d
            price_f
            onBuyCollect={onBuyCollect}
          />
        }
      </CollectionWrapper>
    </>
  );
};

export default withRouter(CollectionDetails);
