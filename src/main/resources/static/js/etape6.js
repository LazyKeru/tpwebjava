const REPLIED = 4;
const HTTP_OK = 200;
const HTTP_CREATED = 201;
const HTTP_NO_CONTENT = 204;
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
					return;
				}
				for (const jso of jsa)
					tabContacts.upsert(jso);
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
				tabContacts.upsert(person);
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
/**
 * Request the service for Person (GET with id url parameter).
 * 
 * @param id The Person id.
 */
function getFromId(id) {
	const xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == REPLIED) {
			switch (xhr.status) {
				case HTTP_OK:
				const jso = JSON.parse(xhr.responseText);
				formContacts.update(jso);
				break;
			}
		}
	}
	try {
		xhr.open("GET", `${protURL}/${id}`, true);
		xhr.send();
	} catch (err) {
		alert(err.name + " " + protURL);
	}
}
/**
 * Request the service to modify a Person (PUT with id url parameter +
 * Person JSON object as the request body).
 *
 * @param person Person object with id property defined.
 */
function updatePerson(person) {
	const xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == REPLIED) {
			switch (xhr.status) {
				case HTTP_OK:
				case HTTP_NO_CONTENT:
				tabContacts.upsert(person);
				break;
			}
		}
	}
	try {
		xhr.open("PUT", `${protURL}/${person.id}`, true);
		xhr.setRequestHeader("Content-Type", "application/json");
		const strJSON = JSON.stringify(person);
		xhr.send(strJSON);
	} catch (err) {
		alert(err.name + " " + protURL);
	}
}
/**
 * Request the service to remove a Person (DELETE with id url parameter).
 *
 * @param person Person object with id property defined.
 */
function delFromId(id) {
	const xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == REPLIED) {
			switch (xhr.status) {
				case HTTP_NO_CONTENT:
				const url = new URL(xhr.responseURL).pathname;
				const id = url.substring(protURL.length+1);
				tabContacts.remove(id);
				formContacts.update();
				break;
			}
		}
	}
	try {
		xhr.open("DELETE", `${protURL}/${id}`, true);
		xhr.send();
	} catch (err) {
		alert(err.name + " " + protURL);
	}
}

const idContactsTable = "#idContactsTable";
const idDel = "#idDel";
const COL_SURNAME = 1;
const COL_NAME = 2;
const COL_PHONE = 3;
const COL_CITY = 4;
/**
 *  table of contacts
 */
class ContactsTable {
	constructor() {
		const table = this.table = document.querySelector(idContactsTable);
		const btnDel = this.btnDel = document.querySelector(idDel);
		table.addEventListener("click", 
			/**
			 * Handles click on a checkbox by requesting details on selected contact.
			 *
			 * @param The click event object.
			 */
			function(event) {
				let radio = event.target;
				if (radio.type == "radio") {
					const radios = table.querySelectorAll(`input[type=radio]`);
					for (const radio of radios)
						if (radio.checked) {
							btnDel.disabled = false;
							return getFromId(radio.value);
						}
				}
			}
		);
		btnDel.addEventListener("click", () => {
			const radios = table.querySelectorAll(`input[type=radio]`);
			for (const radio of radios)
				if (radio.checked)
					delFromId(radio.value);
		});
	}
	/**
	 * Insert or update the row of a person.
	 * 
	 * @param jso The person to insert / update.
	 */
	upsert(jso) {
		const elts = this.table.querySelectorAll(`input[type=radio]`);
		for (const elt of elts)
			if (elt.value == jso.id) {
				const tr = elt.closest("tr");
				tr.cells[COL_SURNAME].innerHTML = jso.surname;
				tr.cells[COL_NAME].innerHTML = jso.name;
				tr.cells[COL_PHONE].innerHTML = jso.phone;
				tr.cells[COL_CITY].innerHTML = jso.city;
				return;
			}
		this.table.rows[0].insertAdjacentHTML("afterend", `<tr>
			<td><input type="radio" name="id" value="${jso.id}"></td>
			<td>${jso.surname}</td>
			<td>${jso.name}</td>
			<td>${jso.phone}</td>
			<td>${jso.city}</td>
		</tr>`);
	}
	/**
	 * Remove the row of the specified id.
	 *
	 * @param The id of the Person to remove.
	 */
	remove(id) {
		const radios = this.table.querySelectorAll(`input[type=radio]`);
		for (const radio of radios)
			if (radio.value == id) {
				radio.closest("tr").remove();
				this.btnDel.disabled = true;
			}
	}
}

const idForm = "#idForm";
const idId = "#idId";
const idFirstName = "#idFirstName";
const idName = "#idName";
const idPhone = "#idPhone";
const idCity = "#idCity";
const idOK = "#idOK";
const idNew = "#idNew";
/**
 * Form for contacts query.
 */
class ContactsForm {
	constructor() {
		const form = this.form = document.querySelector(idForm);
		const id = this.eltId = form.querySelector(idId);
		this.firstName = form.querySelector(idFirstName);
		this.name = form.querySelector(idName);
		this.phone = form.querySelector(idPhone);
		this.city = form.querySelector(idCity);
		const btnOK = this.btnOK = document.querySelector(idOK);
		const self = this;
		btnOK.addEventListener("click", () => {
			const pers = self.getPerson();				
			if (pers != undefined)
				if (id.value == "")
					addPerson(pers);
				else {
					pers.id = id.value;
					updatePerson(pers);
				}
		});
		const btnNew = document.querySelector(idNew);
		btnNew.addEventListener("click", () => {
			self.update();
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
		const id = this.eltId.value;
		if (surname.length == 0 || name.length == 0
		|| phone.length == 0 || city.length == 0)
			alert("Les champs avec une étoile doivent être renseignés");
		else {
			const pers = {surname, name, phone, city};
			if (id != "")
				pers.id = id;
			return pers;
		}
	}
	/**
	 *	Fill the form with person data for modification or empty the form,
	 *	planning for new person addition.
	 *
	 *	@param person {surname, name, phone, city, id} or undefined.
	 */
	update(person) {
		this.btnOK.innerHTML = person == undefined ? "Ajouter" : "Modifier";
		if (person == undefined)
			person = {surname : "", name : "", phone : "", city : "", id : ""};
		this.eltId.value = person.id;
		this.firstName.value = person.surname;
		this.name.value = person.name;
		this.phone.value = person.phone;
		this.city.value = person.city;
	}
}

const tabContacts = new ContactsTable();
const formContacts = new ContactsForm();
getAll()
