const REPLIED = 4;
const HTTP_OK = 200;
const protURL = "/person";

/**
 * Request the service for all Persons (GET with no id url parameter).
 */
function getAll() {
	const xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == REPLIED) {
			switch (xhr.status) {
				case HTTP_OK:
				const jsa = JSON.parse(xhr.responseText);
				if (jsa.length == 0) {
					alert("L'annuaire est vide' !");
					return
				}
				for (const jso of jsa)
					tabContacts.insert(jso);
				break;
			}
		}
	}
	try {
		xhr.open("GET", protURL, true);
		xhr.send();
	} catch (err) {
		alert(err.name + " " + protURL);
	}
}

const idContactsTable = "#idContactsTable";
/**
 *  table of contacts
 */
class ContactsTable {
	constructor() {
		this.table = document.querySelector(idContactsTable);
	}
	/**
	 * Insert the row of a person.
	 * 
	 * @param jso The person to insert.
	 */
	insert(jso) {
		this.table.rows[0].insertAdjacentHTML("afterend", `<tr>
			<td><input type="radio" name="id" value="${jso.id}"></td>
			<td>${jso.surname}</td>
			<td>${jso.name}</td>
			<td>${jso.phone}</td>
			<td>${jso.city}</td>
		</tr>`);
	}
}
const tabContacts = new ContactsTable();
getAll()
