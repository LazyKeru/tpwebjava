package com.lazykeru.tpwebjavaimt.data.restcontroller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.Collection;

import com.lazykeru.tpwebjavaimt.data.model.Person;
import com.lazykeru.tpwebjavaimt.data.itf.PersonItf;

@RestController
public class PersonRestController {
	
	@Autowired
	PersonItf pi;
	
	// Will return the list of people as a json list / No visual side
	@GetMapping("/person/list")
	public Collection<Person> getAll() {
		return pi.getAll();
	}
	
	// Research by id
	@GetMapping("/person/id/{id}")
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
	@DeleteMapping("/person/id/{id}")
	public ResponseEntity<?> DeleteById(@PathVariable int id) {
		if (pi.getFromId(id) == null){
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No one found to be deleted with this ID");
		}
		pi.deleteFromId(id);
		return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
	}
	
	/*@DeleteMapping("/annuaire/supprimer/{id}")
	public String suppprime(Person person, @PathVariable int id) {
		PersonService.deleteFromId(id);
		person.addAttribute("entries", PersonService.getAll());
		return "redirect:/annuaire/recherche";
	}*/
	
	// controleur d'envoi des personnes a la vue
    /*public String listPersons(@ModelAttribute("persons") Collection<Person> persons) {
        return "list";
    }*/
}