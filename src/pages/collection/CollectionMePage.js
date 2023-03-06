import React from "react";
import { withRouter } from "react-router";

import CardCollectionDetails from "../../component/Card/CardCollectionDetails";
import SectionTitle, { MenuWrapper, CollectionWrapper } from "../../component/SectionTitle";

import { myCollection } from "../../tempData/data";

const CollectionMe = ({ history }) => {

  const onBuyCollect = () => {
  }

  return (
    <>
      <MenuWrapper className="animation-fadeInRight">
        <SectionTitle title="My Collection" long />
      </MenuWrapper>

      <CollectionWrapper>
        {
          myCollection.map((item) =>
            <CardCollectionDetails
              key={item.id}
              card={item}
              onBuyCollect={onBuyCollect}
              price_d
              price_f
              amount={item.amount}
              isSell
            />
          )
        }
      </CollectionWrapper>
    </>
  );
};

export default withRouter(CollectionMe);
