package com.lazykeru.tpwebjavaimt.data.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ModelAttribute;

import java.util.Collection;

import com.lazykeru.tpwebjavaimt.data.model.Person;
import com.lazykeru.tpwebjavaimt.data.itf.PersonItf;

@RestController
public class PersonController {
	
	@Autowired
	PersonItf pi;
	
	// Will return the list of people as a json list / No visual side
	@GetMapping("/person/list")
	public Collection<Person> getAll() {
		return pi.getAll();
	}
	
	/*@GetMapping("/annuaire/recherche")
	public String recherche(Model model, @RequestParam (name="name", required=false, defaultValue="*") String name) {
			if (name.equals("*"))
				person.addAttribute("entries", PersonService.getAll());
			else person.addAttribute("entries", PersonService.getFromName(name));
				return "annuaire/recherche";
	}*/
	
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