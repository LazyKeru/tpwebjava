package com.lazykeru.tpwebjavaimt.data.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestParam;
import com.lazykeru.tpwebjavaimt.data.itf.PersonItf;

@Controller
public class PersonController {
	
	@Autowired
	PersonItf pi;
	
	@GetMapping("/person/research")
	public String research(Model model, @RequestParam (name="name", required=false, defaultValue="*") String name) {
			if (name.equals("*"))
				model.addAttribute("entries", pi.getAll());
			else 
				model.addAttribute("entries", pi.getFromName(name));
			return "research";
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