import axios from "axios";

export interface Email {
  archived: boolean;
  body: string;
  from: string;
  id: number;
  read: boolean;
  sentAt: string;
  subject: string;
  markedToDelete: boolean;
}

export async function requestAllEmails(): Promise<Email[]> {
  const { data } = await axios.get<Email[]>("http://localhost:3000/emails");

  return data;
}

export async function requestPrimary(): Promise<Email[]> {
  const { data } = await axios.get<Email[]>("http://localhost:3000/emails");

  return data.filter((email) => !email.archived && !email.markedToDelete);
}

export async function requestArchived(): Promise<Email[]> {
  const { data } = await axios.get<Email[]>("http://localhost:3000/emails");

  return data.filter((email) => email.archived);
}

export async function requestTrash(): Promise<Email[]> {
  const { data } = await axios.get<Email[]>("http://localhost:3000/emails");

  return data.filter((email) => email.markedToDelete);
}

export async function sendEmail(email: Partial<Email>): Promise<void> {
  await axios.post("http://localhost:3000/emails", email);
}

export async function getEmailById(id: number): Promise<Email> {
  const { data } = await axios.get<Email>(`http://localhost:3000/emails/${id}`);

  return data;
}

export async function updateEmail(email: Email): Promise<Email> {
  const { data } = await axios.put<Email>(
    `http://localhost:3000/emails/${email.id}`,
    email
  );

  return data;
}

export async function deleteEmail(email: Email): Promise<void> {
  await axios.delete<void>(`http://localhost:3000/emails/${email.id}`);
}

export async function archiveEmailById(id: number): Promise<Email> {
  const email = await getEmailById(id);
  return await archiveEmail(email);
}

export async function archiveEmail(email: Email): Promise<Email> {
  if (email.archived === true) return email;
  email.archived = true;
  email.markedToDelete = false;
  return await updateEmail(email);
}

export async function unarchiveEmailById(id: number): Promise<Email> {
  const email = await getEmailById(id);
  return await unarchiveEmail(email);
}

export async function unarchiveEmail(email: Email): Promise<Email> {
  if (!email.archived) return email;

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
  if (email.read === true) return email;
  email.read = true;
  return await updateEmail(email);
}

export async function readEmailById(id: number): Promise<Email> {
  const email = await getEmailById(id);
  return await readEmail(email);
}

export async function unreadEmail(email: Email): Promise<Email> {
  if (email.read === false) return email;
  email.read = false;
  return await updateEmail(email);
}

export async function unreadEmailById(id: number): Promise<Email> {
  const email = await getEmailById(id);
  return await unreadEmail(email);
}

export async function markForDeletion(email: Email): Promise<Email> {
  if (email.markedToDelete) return email;

  email.markedToDelete = true;
  email.archived = false;
  return await updateEmail(email);
}

export async function deleteForever(email: Email): Promise<void> {
  if (email.markedToDelete) {
    await deleteEmail(email);
  }
}

export async function markForDeletionById(id: number): Promise<Email> {
  const email = await getEmailById(id);
  return await markForDeletion(email);
}

export async function unmarkForDeletion(email: Email): Promise<Email> {
  if (!email.markedToDelete) return email;

  email.markedToDelete = false;
  email.archived = false;

  return await updateEmail(email);
}

export async function unmarkForDeletionById(id: number): Promise<Email> {
  const email = await getEmailById(id);
  return await unmarkForDeletion(email);
}
