import { firebase, db } from "firebaseFactory";
import { GetCurrentUser } from "modules/auth/api";

export interface Label {
  id: string;
  humanId: string;
  createdAt: string;
  createdById: string;
  organizationId: string;
}

const getLabelFromData = (doc: firebase.firestore.DocumentSnapshot): Box => {
  const data = doc.data();
  if (!data) throw new Error(`Could not load data from ${doc.ref}`);
  // we don't want to just store raw firebase data in here
  // else you get a load of firebase variables in the redux store
  return {
    id: doc.id,
    humanId: data.humanId,
    organizationId: data.organization.id,
    createdAt: data.createdAt,
    createdById: data.createdBy.id
  };
};

export const generateLabels = async (getCurrentUser: GetCurrentUser) => {};

// TODO: want to subscribe to updates
export const fetchActiveBoxes = async (getCurrentUser: GetCurrentUser) => {
  const { organizationRef } = await getCurrentUser();
  // TODO: we only want to return boxes that are currently 'active'
  return db
    .collection("labels")
    .where("organization", "==", db.doc(organizationRef))
    .orderBy("humanId", "asc")
    .get()
    .then(({ docs }) => {
      return docs.map(getBoxFromData);
    });
};
