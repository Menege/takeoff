import React, { useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import { observer } from "mobx-react-lite";
import ContactServices from "../../sevices/ContactServices";
import { IContact } from "../../models/IContact";
import { Context } from "../../index";
import deleteLogo from "./images/del.png";
import editLogo from "./images/edit.webp";
import redLogo from "./images/red.webp";
import NewContact from "./newContact";
import EditContact from "./editContact";
import { Box, Button, Container } from "@mui/material";
const uuid = require("uuid");

function Orders() {
  const { storeMOBX } = useContext(Context);
  const [contacts, setContacts] = useState<IContact[]>([]);
  const [search, setSearch] = useState<string>("");
  const [idOfLinks, setIdOfLinks] = useState<string>("");

  const [dialogAdd, setDialogAdd] = useState<boolean>(false);
  const [dialogEdit, setDialogEdit] = useState<any>({
    open: false,
    info: { name: "", phone: "" },
  });

  //Получаем контакты с сервера
  async function getContacts() {
    try {
      const response = await ContactServices.fetchContacts();
      setContacts(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  //Отрабатываем нажатие на кнопку редактирования контакта
  const handlerEdit = (id: string, info: any) => {
    setDialogEdit({ open: true, info });
    setIdOfLinks(id);
  };

  //Отправляем запрос на получение контактов при рендере
  React.useEffect(() => {
    getContacts();
  }, []);

  //Добавление нового контакта
  const handlerAdd = (newContactName: string, newContactPhone: string) => {
    let idVariable = uuid.v4();
    setContacts([
      ...contacts,
      { _id: idVariable, name: newContactName, phone: newContactPhone },
    ]);
    storeMOBX.addContacts([
      ...contacts,
      { _id: idVariable, name: newContactName, phone: newContactPhone },
    ]);
    setDialogAdd(false);
  };

  //Добавление измененного контакта
  const handlerEditChange = (idProp: any) => {
    const arrCopy = contacts.map((i) =>
      i._id === idOfLinks
        ? Object.assign({}, i, { name: idProp.name, phone: idProp.phone })
        : i
    );
    setContacts(arrCopy);
    setDialogEdit({ open: false });
    storeMOBX.addContacts(arrCopy);
  };

  //Удаление контакта
  const handlerDelete = (i: number) => {
    setContacts(contacts.filter((_, idx) => idx !== i));
    storeMOBX.addContacts(contacts.filter((_, idx) => idx !== i));
  };

  return (
    <React.Fragment>
      <Container maxWidth="sm">
        <Title>Телефонная книга</Title>
        {storeMOBX.user.isActivated ? (
          <TextField
            fullWidth
            id="outlined-basic"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            label="Введите в строке поиска"
            variant="outlined"
          />
        ) : null}
        <Box mt={2}>
          <span
            onClick={() => setDialogAdd(true)}
            style={{ cursor: "pointer" }}
          >
            <img width="60" height="30" src={redLogo} alt="Добавить" />
          </span>
        </Box>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Имя</TableCell>
              <TableCell />
              <TableCell align="right">Номер телефона</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {storeMOBX.user.isActivated
              ? contacts &&
                contacts.map((row, i) =>
                  row.name.includes(search) || row.phone.includes(search) ? (
                    <TableRow key={row._id}>
                      <TableCell>{row.name}</TableCell>
                      <TableCell sx={{ display: "flex", gap: 1 }}>
                        <span
                          onClick={() => handlerEdit(row._id, row)}
                          style={{ cursor: "pointer" }}
                        >
                          <img
                            width="20"
                            height="20"
                            src={editLogo}
                            alt="Редактировать"
                          />
                        </span>
                        <span
                          style={{ cursor: "pointer" }}
                          onClick={() => handlerDelete(i)}
                        >
                          <img
                            width="20"
                            height="20"
                            src={deleteLogo}
                            alt="Удалить"
                          />
                        </span>
                      </TableCell>
                      <TableCell align="right">{`${row.phone}`}</TableCell>
                    </TableRow>
                  ) : null
                )
              : "Данные станут доступны после подтверждения аккаунта. Письмо у вас на почте, просто перейдите по ссылке."}
          </TableBody>
        </Table>
        <Box m={2}>
          <Button variant="contained" onClick={() => storeMOBX.logout()}>
            Выйти
          </Button>
        </Box>
      </Container>
      <NewContact
        isVisible={dialogAdd}
        gateAddDialog={(bool: boolean) => setDialogAdd(bool)}
        addContact={(name: string, phone: string) => handlerAdd(name, phone)}
      />
      <EditContact
        dialogEdit={dialogEdit}
        editContacts={(value: any) => handlerEditChange(value)}
        gateEditDialog={(bool: boolean) => setDialogEdit({ open: false })}
      />
    </React.Fragment>
  );
}

export default observer(Orders);
