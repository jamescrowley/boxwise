import React from "react";
import { Formik, Field } from "formik";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import DialogContent from "@material-ui/core/DialogContent";
import MenuItem from "@material-ui/core/MenuItem";
import { TextField } from "formik-material-ui";
import Typography from "@material-ui/core/Typography";

import DialogToolbar from "components/DialogToolbar";
import FormErrorText from "components/FormErrorText";

const AddBoxForm = ({ onClose, onSubmit, products }) => (
  <Formik
    initialValues={{
      product: "",
      quantity: "",
      comment: ""
    }}
    validate={values => {
      const errors = {};
      if (!values.product) {
        errors.product = "Select a product.";
      }
      if (!values.quantity) {
        errors.quantity = "Enter the number of items in the box.";
      }
      return errors;
    }}
    onSubmit={onSubmit}
    render={({ handleSubmit, handleChange, isSubmitting, values, errors }) => (
      <form onSubmit={handleSubmit}>
        <DialogToolbar
          title="New box"
          onClose={onClose}
          buttonText={products.length ? "Create" : "Cancel"}
          buttonIsLoading={isSubmitting}
          onClickButton={products.length ? handleSubmit : onClose}
        />
        <DialogContent>
          <FormErrorText message={errors.form} />
          {products.length ? (
            <div>
              <Field
                label="Product"
                name="product"
                component={TextField}
                select
                value={values.product}
                onChange={handleChange}
                fullWidth
                autoFocus
                margin="dense"
              >
                {products.map(({ id, name, category }) => (
                  <MenuItem
                    key={id}
                    value={JSON.stringify({ id, category, name })}
                  >
                    {category} / {name}
                  </MenuItem>
                ))}
              </Field>
              <Field
                label="Number of items"
                name="quantity"
                type="number"
                component={TextField}
                fullWidth
                margin="dense"
                inputProps={{ pattern: "[0-9]*", inputMode: "numeric" }}
              />
              <Field
                label="Comments"
                name="comment"
                component={TextField}
                multiline
                rows="4"
                fullWidth
                margin="dense"
              />
            </div>
          ) : (
            <div>
              <Typography variant="h5" paragraph>
                You must add products before you can create a box
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                component={Link}
                to="/products"
              >
                Go to Products page
              </Button>
            </div>
          )}
        </DialogContent>
      </form>
    )}
  />
);

export default AddBoxForm;
