package com.lazykeru.tpwebjavaimt.data.service;

import com.lazykeru.tpwebjavaimt.data.model.Person;
import com.lazykeru.tpwebjavaimt.data.itf.PersonItf;

import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.List;
import java.util.ArrayList;

@Service
public class PersonService implements PersonItf {
	
	Map<Integer,Person> hm;
	
	public PersonService() {
		super();
		hm = new HashMap<Integer,Person>();
		hm.put(1, new Person(1,"Eddard", "Stark", "0606060606", "Lille"));
		hm.put(2, new Person(2,"Marry", "Poppin", "0606060606", "London"));
		hm.put(3, new Person(3,"Joe", "Biden", "0606060606", "New-York"));
	}
	
	public Collection<Person> getAll() {
		return (Collection<Person>) (hm.values());
	}
	
	
	public Collection<Person> getFromName(String name) {
		Collection<Person> res = new ArrayList<Person>();
		for(int i : hm.keySet()) {
			if(hm.get(i).getName().equals(name))
				res.add(hm.get(i));
		}
		return res;
	}
	
	
	public Person getFromId(int id) {
		return hm.get(id);
	}
	
	
	public boolean deleteFromId(int id) {
		if(hm.remove(id) != null) return true;
		return false;
	}
	
	public void addPerson(Person p){
		hm.put(p.getId(), p);
	}
}