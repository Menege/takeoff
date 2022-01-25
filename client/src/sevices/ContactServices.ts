import $api from "../http";
import { AxiosResponse } from "axios";
import { IContact } from "../models/IContact";

export default class ContactServices {
    static fetchContacts (): Promise<AxiosResponse<IContact[]>> {
        return $api.get<IContact[]>('/contacts');
    }

    static addContacts (contacts:object): Promise<AxiosResponse<IContact[]>> {
        return $api.post<IContact[]>('/addcontacts', {contacts});
    }
}
