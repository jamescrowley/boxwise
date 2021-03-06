import { connect } from "react-redux";

import AppDrawerAuth from "../components/AppDrawerAuth";
import { firebaseSignOut } from "../actions";

const mapStateToProps = ({ profile, user }) => ({ profile, user });
const mapDispatchToProps = dispatch => ({
  onSignOut: () => dispatch(firebaseSignOut())
});
const mergeProps = ({ profile, user }, dispatchProps, ownProps) => ({
  user,
  profile,
  ...dispatchProps,
  ...ownProps,
  notAuthenticated: !user.data || !profile.data,
  loading: user.loading || profile.loading
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(AppDrawerAuth);
