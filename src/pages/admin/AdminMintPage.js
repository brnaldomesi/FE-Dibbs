import React, { useState } from "react";
import { withRouter } from "react-router";
// import { useParams } from 'react-router-dom'

import AdminMint from "../../component/Card/AdminMint";
import SectionTitle, { MenuWrapper, CollectionWrapper } from "../../component/SectionTitle";
import useMintAndList from "../../hooks/useMintAndList"
// import MinterLoader from "../../component/admin/MinterLoader"
const CollectionDetails = ({ history }) => {
  // const param = useParams()
  const [dappy, setDappy] = useState({
    id: '111',
    name: 'test1',
    details: 'my details test 1',
    supply: 'test supply 1',
    price_d: 324,
    price_f: 222,
    image: '',
    amount: 10,
  });


  const onSuccess = itemId => {
    // Wait for new listing to be created by the API
    // Mutations don't work because they get overwritten when the new page is loaded
    setTimeout(() => {
      history.push('/collections/' + itemId);
    }, 1000)
  }

  const [
    // {isLoading, transactionStatus},
     mint] =
    useMintAndList(onSuccess)

  const onMintCollect = () => {
    // mint()
  };

  


  return (
    <>
      <MenuWrapper className="animation-fadeInRight">
        <SectionTitle title="ADMINISTRATOR" long />
      </MenuWrapper>
      {/* <MinterLoader isLoading={true} /> */}
      <CollectionWrapper>
        { dappy && 
          <AdminMint
            card={dappy}
            name
            details
            price_d
            price_f
            onMintCollect={onMintCollect}
          />
        }
      </CollectionWrapper>
    </>
  );
};

export default withRouter(CollectionDetails);
