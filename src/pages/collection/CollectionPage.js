import React from "react";
import { useEffect, useState } from 'react'
import { withRouter } from "react-router";

import CardCollectionDetails from "../../component/Card/CardCollectionDetails";
import SectionTitle, { MenuWrapper, CollectionWrapper } from "../../component/SectionTitle";

import { query } from '@onflow/fcl'
import { LIST_DAPPY_TEMPLATES } from '../../flow/list-dappy-templates.script'
const Collection = ({ history }) => {
  const [dappies, setDappies] = useState([]);
  const onBuyCollect = (item) => {
    history.push('/collections/' + item.templateID);
  }
  useEffect(() => {
    const fetchDappyTemplates = async () => {
      try {
        let res = await query({ cadence: LIST_DAPPY_TEMPLATES })
        setDappies(Object.values(res));
        console.log(res, 'ress----');
      } catch (err) {
      }
    }
    fetchDappyTemplates()
  }, [])

  useEffect(() => {
    console.log('dappies ------', dappies, dappies.map(item => item))
  }, [dappies])
  return (
    <>
      <MenuWrapper className="animation-fadeInRight">
        <SectionTitle title="Collection" long />
      </MenuWrapper>

      <CollectionWrapper>
        {
          dappies.map((item) => 
            <CardCollectionDetails
              key={item.templateID}
              name = {item.name}
              card={item}
              onBuyCollect={onBuyCollect}
              price_d = {item.price}
              price_f
            />
          )
        }
      </CollectionWrapper>
    </>
  );
};
export default withRouter(Collection);
