import * as React from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import NumberFormat from "react-number-format";

import { observer } from "mobx-react-lite";
import { Button } from "@mui/material";

function NewContact({ isVisible, gateAddDialog, addContact }) {
  const [newContactName, setNewContactName] = React.useState("");
  const [newContactPhone, setNewContactPhone] = React.useState("");

  return (
    <React.Fragment>
      <Dialog open={isVisible}>
        <DialogContent>
          <DialogActions>
            <Button onClick={() => gateAddDialog(false)} color="secondary">
              Закрыть
            </Button>
          </DialogActions>
          <DialogContentText id="form-dialog-title" color="black">
            {" "}
            Добавить контакт
          </DialogContentText>
          <TextField
            autoFocus
            onChange={(e) => setNewContactName(e.target.value)}
            margin="dense"
            id="name"
            label="Введите имя"
            type="text"
            fullWidth
          />
          <NumberFormat
            autoFocus
            format="+7 (###) ###-##-##"
            mask="_"
            customInput={TextField}
            onChange={(e) => setNewContactPhone(e.target.value)}
            margin="dense"
            id="phone"
            label="Введите телефон"
            type="text"
            fullWidth
          />
          <DialogActions>
            <Button
              onClick={() => addContact(newContactName, newContactPhone)}
              color="primary"
            >
              Добавить
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

export default observer(NewContact);
