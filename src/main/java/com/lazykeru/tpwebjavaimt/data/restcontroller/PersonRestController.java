package com.lazykeru.tpwebjavaimt.data.restcontroller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

import java.util.Collection;

import com.lazykeru.tpwebjavaimt.data.model.Person;
import com.lazykeru.tpwebjavaimt.data.itf.PersonItf;

@RestController
public class PersonRestController {
	
	@Autowired
	PersonItf pi;
	
	// Will return the list of people as a json list / No visual side
	@GetMapping("/person")
	public Collection<Person> getAll() {
		return pi.getAll();
	}
	
	// Add person
	@PostMapping("/person")
	public ResponseEntity<String> add(@RequestBody Person newPerson) {
		if (pi.getFromId(newPerson.getId()) != null){
			return ResponseEntity.status(HttpStatus.CONFLICT).body("Personne deja existante");
		}
		pi.addPerson(newPerson);
		return ResponseEntity.status(HttpStatus.CREATED).body("http://localhost:8080/rechercher/"+newPerson.getId());
	}
	
	// Research by id
	@GetMapping("/person/{id}")
	public ResponseEntity<?> GetById(@PathVariable int id) {
		if (pi.getFromId(id) == null){
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No one found corresponding to the id");
		}
		return ResponseEntity.status(HttpStatus.OK).body(pi.getFromId(id));
	}
	
	// Research by id
	@GetMapping("/person/name/{name}")
	public ResponseEntity<?> GetById(@PathVariable String name) {
		if (pi.getFromName(name) == null){
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No one found corresponding to the id");
		}
		return ResponseEntity.status(HttpStatus.OK).body(pi.getFromName(name));
	}
	
	// Delete by id
	@DeleteMapping("/person/{id}")
	public ResponseEntity<?> DeleteById(@PathVariable int id) {
		if (pi.getFromId(id) == null){
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No one found to be deleted with this ID");
		}
		pi.deleteFromId(id);
		return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
	}
	
	@PutMapping("/entree")
	public ResponseEntity<?> remplace(@RequestBody Person updatedPerson) {		
		if (pi.getFromId(updatedPerson.getId()) == null){
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Pas de personne a mettre a jour avec cet ID");
		}
		pi.addPerson(updatedPerson);
		return ResponseEntity.status(HttpStatus.NO_CONTENT).build();		
	}
}