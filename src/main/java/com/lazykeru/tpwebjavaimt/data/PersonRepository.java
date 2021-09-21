package com.lazykeru.tpwebjavaimt.data;

import java.util.List;
import org.springframework.data.repository.CrudRepository;

public interface PersonRepository extends CrudRepository<PersonDetails,Long> {
	EmployeeDetails findByFirstName(String firstName);
	List<EmployeeDetails> findByLastName(String lastName);
}
