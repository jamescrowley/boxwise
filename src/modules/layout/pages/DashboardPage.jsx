import React, { useState } from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { injectIntl, FormattedMessage, defineMessages } from "react-intl";

import { AddBoxDialog } from "modules/boxes/components";

import Page from "../components/Page";
import AppFrame from "../components/AppFrame";

const styles = theme => ({
  paper: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginBottom: theme.spacing.unit * 3
  })
});

const messages = defineMessages({
  headline: {
    id: "dashboard.headline",
    defaultMessage: "Things to do"
  },
  create_box: {
    id: "dashboard.create_box",
    defaultMessage: "Make a box"
  },
  find_box: {
    id: "dashboard.find_box",
    defaultMessage: "Find boxes"
  }
});

const DashboardPage = ({ classes }) => {
  const [addBoxDialogOpen, setAddBoxDialogOpen] = useState(false);
  return (
    <AppFrame title="Dashboard">
      <Page>
        <AddBoxDialog
          open={addBoxDialogOpen}
          onClose={() => setAddBoxDialogOpen(false)}
        />
        <Paper className={classes.paper}>
          <Typography variant="h5" paragraph>
            <FormattedMessage {...messages.headline} />
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setAddBoxDialogOpen(true)}
          >
            <FormattedMessage {...messages.create_box} />
          </Button>
          <br />
          <br />
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to="/boxes"
          >
            <FormattedMessage {...messages.find_box} />
          </Button>
        </Paper>
      </Page>
    </AppFrame>
  );
};

export default withStyles(styles)(injectIntl(DashboardPage));
