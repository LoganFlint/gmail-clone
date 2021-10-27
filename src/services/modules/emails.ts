import axios from "axios";

export interface Email {
    archived: boolean,
    body: string,
    from: string,
    id: number,
    read: boolean,
    sentAt: string,
    subject: string
}

export async function requestEmails(): Promise<Email[]> {
    const response = await axios.get("http://localhost:3000/emails")
        .then(({ data }) => data)
        .catch(error => {
            throw error;
        })
    return response as Email[];
}

export async function sendEmail(email: Email): Promise<void> {
    //Currently api is running in http://localhost:8080, MySQL db is running in http://localhost:3060
    //Getting a 404, use JSON server for now (running in 3000)
    //await axios.post("http://localhost:8080/emails", email, { headers: {"Access-Control-Allow-Origin": "*", "Content-Type": "application/json" } } );
    await axios.post("http://localhost:3000/emails", email);
}

export async function getEmailById(id: number): Promise<Email> {
    const response = await axios.get(`http://localhost:3000/emails/${id}`)
        .then(({ data }) => data)
        .catch(error => {
            throw error;
        });
    return response as Email;
}

export async function updateEmail(email: Email): Promise<Email> {
    const response = await axios.put(`http://localhost:3000/emails/${email.id}`, email)
        .then(({ data }) => {
            return data
        })
        .catch(error => {
            throw error;
        });
    return response as Email;
}