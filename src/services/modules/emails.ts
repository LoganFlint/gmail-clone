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

export async function archiveEmailById(id: number): Promise<Email> {
    const email = await getEmailById(id);
    return await archiveEmail(email);
}

export async function archiveEmail(email: Email): Promise<Email> {
    if(email.archived === true) return email;
    email.archived = true;
    return await updateEmail(email);
}

export async function unarchiveEmailById(id: number): Promise<Email> {
    const email = await getEmailById(id);
    return await unarchiveEmail(email);
}

export async function unarchiveEmail(email: Email): Promise<Email> {
    if(email.archived === false) return email;
    email.archived = false;
    return await updateEmail(email);
}

export async function toggleArchiveById(id: number): Promise<Email> {
    const email = await getEmailById(id);
    return await toggleArchive(email);
}

export async function toggleArchive(email: Email): Promise<Email> {
    email.archived = !email.archived;
    return await updateEmail(email);
}

export async function toggleRead(email: Email): Promise<Email> {
    email.read = !email.read;
    return await updateEmail(email);
}

export async function goNewer(email: Email): Promise<Email> {
    let archived = email.archived = false
    let read = email.read = true
    let id = email.id ++
    return await getEmailById(id)
    
    // return await updateEmail(email);
}

// export async function goOlder(email: Email): Promise<Email> {
//     email.read = !email.read;
//     return await updateEmail(email);
// }