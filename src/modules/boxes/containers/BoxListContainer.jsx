import React from "react";
import { connect } from "react-redux";
import { FirestoreCollection } from "react-firestore";

import { db } from "firebaseFactory";
import { ProductsCollection } from "modules/products/components";

import BoxList from "../components/BoxList";

class BoxListContainer extends React.Component {
  state = {
    selectedProductFilter: ""
  };

  render() {
    const { profile } = this.props;
    const { selectedProductFilter } = this.state;

    if (profile.loading) {
      return <BoxList isLoading boxes={[]} />;
    }
    const { organization } = profile.data;

    const filters = [["organization", "==", db.doc(organization.ref)]];
    if (selectedProductFilter) {
      filters.push([
        "product",
        "==",
        db.doc(`products/${selectedProductFilter}`)
      ]);
    }

    return (
      <FirestoreCollection
        path="boxes"
        filter={filters}
        sort="humanID:asc"
        render={boxresult => {
          return (
            <ProductsCollection
              organizationRef={organization.ref}
              render={productresult => {
                return (
                  <BoxList
                    isLoading={boxresult.isLoading || productresult.isLoading}
                    boxes={boxresult.data}
                    products={productresult.data}
                    selectedProductFilter={selectedProductFilter}
                    onChangeProductFilter={value =>
                      this.setState({ selectedProductFilter: value })
                    }
                  />
                );
              }}
            />
          );
        }}
      />
    );
  }
}

export default connect(state => ({
  profile: state.profile
}))(BoxListContainer);
