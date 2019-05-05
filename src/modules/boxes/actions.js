import { firebase, db } from "firebaseFactory";
import { createAsyncAction } from "redux/actionCreators";

// eslint-disable-next-line no-underscore-dangle
export const BOX_ADD = createAsyncAction(
  "BOX_ADD_START",
  "BOX_ADD_SUCCESS",
  "BOX_ADD_ERROR"
);

export const addBox = ({
  product,
  profile,
  organization,
  quantity,
  comment
}) => dispatch => {
  dispatch({ type: BOX_ADD.START });
  const box = {
    quantity,
    comment,
    organization: db.doc(organization.ref),
    product: db.doc(`products/${product.id}`),
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    createdBy: db.doc(profile.ref),
    humanID: Math.floor(Math.random() * 1000000)
  };

  return db
    .collection("boxes")
    .add(box)
    .then(ref => ref.get())
    .then(box => box.data())
    .then(
      box => {
        dispatch({ type: BOX_ADD.SUCCESS, payload: box });
        return { error: false, data: box };
      },
      error => {
        dispatch({ type: BOX_ADD.ERROR, payload: error });
        return { error };
      }
    );
};
