const REPLIED = 4;
const HTTP_OK = 200;
const HTTP_CREATED = 201;
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
/**
 * Request the service to add a Person (POST + person object
 * as the request body).
 *
 * @param person person object WITHOUT id property.
 */
function addPerson(person) {
	const xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == REPLIED) {
			switch (xhr.status) {
				case HTTP_CREATED:
				const url = new URL(xhr.responseText).pathname;
				person.id = url.substring(protURL.length+1);
				tabContacts.insert(person);
				break;
			}
		}
	}
	try {
		xhr.open("POST", protURL, true);
		xhr.setRequestHeader("Content-Type", "application/json");
		const strJSON = JSON.stringify(person);
		xhr.send(strJSON);
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

const idForm = "#idForm";
const idId = "#idId";
const idFirstName = "#idFirstName";
const idName = "#idName";
const idPhone = "#idPhone";
const idCity = "#idCity";
const idOK = "#idOK";
/**
 * Form for contacts query.
 */
class ContactsForm {
	constructor() {
		const form = this.form = document.querySelector(idForm);
		this.eltId = form.querySelector(idId);
		this.firstName = form.querySelector(idFirstName);
		this.name = form.querySelector(idName);
		this.phone = form.querySelector(idPhone);
		this.city = form.querySelector(idCity);
		const btnOK = this.btnOK = document.querySelector(idOK);
		const self = this;
		btnOK.addEventListener("click", () => {
			const pers = self.getPerson();				
			if (pers != undefined)
				addPerson(pers);
		});
	}
	/**
	 * @returns {surname, name, phone, city} from the form fields 
	 *	or undefined if a field is not filled.
	 */
	getPerson() {
		const surname = this.firstName.value;
		const name = this.name.value;
		const phone = this.phone.value;
		const city = this.city.value;
		if (surname.length == 0 || name.length == 0
		|| phone.length == 0 || city.length == 0)
			alert("Les champs avec une étoile doivent être renseignés");
		else
			return {surname, name, phone, city};
	}
}

const tabContacts = new ContactsTable();
const formContacts = new ContactsForm();
getAll()
