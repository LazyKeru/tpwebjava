package com.lazykeru.tpwebjavaimt.data;

/*public interface PersonService {
	public long createEmployee(
		PersonDetails employeeDetails);
	public PersonDetails getEmployee(long id);
}*/

public interface PersonService {
	public Collection<Person> getAll();
	public Person getFromId(int id);
	public List<Person> getFromName(String name);
	public boolean deleteFromId(int id);
	public void addPerson(Person p);
}