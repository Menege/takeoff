import * as React from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import NumberFormat from "react-number-format";

import { observer } from "mobx-react-lite";
import { Box, Button, Container } from "@mui/material";

function EditContact({ dialogEdit, editContacts, gateEditDialog }) {
  const [newContactName, setNewContactName] = React.useState("");
  const [newContactPhone, setNewContactPhone] = React.useState("");

  React.useEffect(() => {
    if (dialogEdit.open === true) {
      setNewContactName(dialogEdit.info.name);
      setNewContactPhone(dialogEdit.info.phone);
    }
  }, [dialogEdit.open]);

  return (
    <React.Fragment>
      <Dialog open={dialogEdit.open}>
        <DialogContent>
          <DialogActions>
            <Button onClick={() => gateEditDialog(false)} color="secondary">
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
            value={newContactName}
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
            value={newContactPhone}
            onChange={(e) => setNewContactPhone(e.target.value)}
            margin="dense"
            id="phone"
            label="Введите телефон"
            type="text"
            fullWidth
          />
          <DialogActions>
            <Button
              onClick={() =>
                editContacts({ name: newContactName, phone: newContactPhone })
              }
              color="primary"
            >
              Изменить
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

export default observer(EditContact);
