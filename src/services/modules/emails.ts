import axios from "axios";

export interface Email {
    archived: boolean,
    body: string,
    from: string,
    id: number,
    read: boolean,
    sentAt: string,
    subject: string,
    markedToDelete: boolean
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

export async function deleteEmail(email: Email): Promise<Email> {
    const response = await axios.delete(`http://localhost:3000/emails/${email.id}`)
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
    email.markedToDelete = false;
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

export async function toggleReadById(id: number): Promise<Email> {
    const email = await getEmailById(id);
    return await toggleRead(email);
}

export async function readEmail(email: Email): Promise<Email> {
    if(email.read === true) return email;
    email.read = true;
    return await updateEmail(email);
}

export async function readEmailById(id: number): Promise<Email> {
    const email = await getEmailById(id);
    return await readEmail(email);
}

export async function unreadEmail(email: Email): Promise<Email> {
    if(email.read === false) return email;
    email.read = false;
    return await updateEmail(email);
}

export async function unreadEmailById(id: number): Promise<Email> {
    const email = await getEmailById(id);
    return await unreadEmail(email);
}

export async function goNewer(email: Email): Promise<Email> {
    let id = email.id ++
    return await getEmailById(id)
}

export async function markForDeletion(email: Email): Promise<Email> {
    if(email.markedToDelete === true) return email;
    email.markedToDelete = true;
    email.archived = false;
    return await updateEmail(email);
}

export async function deleteForever(email: Email): Promise<void> {
    if(email.markedToDelete === true){
        console.log(email)
         await deleteEmail(email);
    } 
}

export async function markForDeletionById(id: number): Promise<Email> {
    const email = await getEmailById(id);
    return await markForDeletion(email);
}

export async function unmarkForDeletion(email: Email): Promise<Email> {
    if(email.markedToDelete === false) return email;
    email.markedToDelete = false;
    email.archived = false;
    return await updateEmail(email);
}

export async function unmarkForDeletionById(id: number): Promise<Email> {
    const email = await getEmailById(id);
    return await unmarkForDeletion(email);
}

// export async function deletForever( id: number): Promise<void> {
//     // let emailid = email.id
//     // emailid = id

//     id = await deleteEmail(id);
    
// }