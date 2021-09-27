package com.lazykeru.tpwebjavaimt.data.itf;

import java.util.Collection;

import com.lazykeru.tpwebjavaimt.data.model.Person;

public interface PersonItf {
	
	public Collection<Person> getAll();
	public Person getFromId(int id);
	public boolean deleteFromId(int id);
	public void addPerson(Person p);
	
}
