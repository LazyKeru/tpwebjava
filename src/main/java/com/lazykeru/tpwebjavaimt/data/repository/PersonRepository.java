package com.lazykeru.tpwebjavaimt.data.repository;

//import java.util.List;
import org.springframework.data.repository.CrudRepository;
import com.lazykeru.tpwebjavaimt.data.model.Person;

public interface PersonRepository extends CrudRepository<Person, Integer> {
	// Person findByFirstName(String firstName);
	// List<Person> findByLastName(String lastName);
}
